const exp = require("express");
const cors = require("cors");
const jwt=require("jsonwebtoken")
const jwtkey="e-comm"     //this key shold be private you can store it in .env file.
require("./db/config");
const userModel = require("./db/userSchema");
const productmodel = require("./db/productSchema");
const app = exp();
app.use(exp.json());
app.use(cors()); //cors is used to prevent un wanted fetch errors... If we don't put this maybe sometimes we will get errors while connecting to backend from frontend

app.get("/", (req, res) => {
  res.send("Project Working!");
});

app.post("/signup", async (req, res) => {
  let post = new userModel(req.body);
  let result = await post.save();
  result = result.toObject(); //to remove password feild from localstorage
  delete result.password;
  jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        res.send({Error:"Something went wrong!"})
      }
      else{
        console.log({result, authToken:token});
        res.send({result, authToken:token}); //This data will send to frontend
      }
  })
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.mail) {
    let data = await userModel.findOne(req.body).select("-password");
    if (data) {
      jwt.sign({data},jwtkey,{expiresIn:"2h"},(err,token)=>{
        err?resp.send({Error:"Something went wrong!"}):resp.send({data,authToken:token})
      })
    } else {
      resp.send({ result: "user not found!" });
    }
  } else {
    resp.send({ result: "please enter your email & password!" });
  }
});

app.post("/add-product",verifyToken, async (req, res) => {
  let data = productmodel(req.body);
  let result = await data.save();
  res.send(result);
  console.log(result);
});

app.get('/product-list',verifyToken,async(req,res)=>{
  let data= await productmodel.find();
  if(data.length>0){
    res.send(data)
    // console.log(data);
  }
  else{
    res.send("No Products found!")
  }
})

app.delete('/delete-product/:id',verifyToken,async(req,res)=>{
  let result=await productmodel.deleteOne({_id:req.params.id})
  res.send(result)
})

// api for put record details in update form 
app.get('/product-details/:id',verifyToken,async(req,res)=>{
  let result=await productmodel.findOne({_id:req.params.id})
  if(result){
    res.send(result)
  }
  else{
    res.send({result:"No Record Found!"})
  }
})

app.put('/update-product/:id',verifyToken,async(req,res)=>{
  let result=await productmodel.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  )
  res.send(result)
})

app.get('/search/:keyword',verifyToken,async(req,res)=>{
  let result= await productmodel.find(
    {
      "$or":[
        {pname:{$regex:req.params.keyword}},
        {category:{$regex:req.params.keyword}},
        {company:{$regex:req.params.keyword}},
        // {price:{$regex:parseInt(req.params.keyword)}},
        // {_id:{$regex:JSON.stringify( req.params.keyword)}},
      ]
  })
  res.send(result)
})

//Middleware Function to verify jwt token
function verifyToken(req,res,next){  
  let authtoken=req.headers['authorization'];   //array
  
  if(authtoken){
    authtoken=authtoken.split(' ')      //this is uesed to remove Bearer key which we entered manually in headers
    console.log("Token is - ",authtoken[1]);      //as authtoken is an array 
    jwt.verify(authtoken[1],jwtkey,(err,valid)=>{
      if(err){
        res.status(401).send({Error:"Token is not valid!"})
        console.log(err);
      }
      else{
        next();     //when next is called means now it end the function and continue to the api function
      }
    })
  }
  else{
    res.status(403).send({Error:"Please enter token in headers!"})
  }
}
app.listen(4500);
