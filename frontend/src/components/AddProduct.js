import React, { useState } from "react";

const AddProduct = () => {
  const [pname, setpname] = useState("");
  const [price, setprice] = useState();
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const[err,seterr]=useState(false)
  async function SendData(){
    if(!pname || !price || !category || !company){
      seterr(true)
      return false;
    }
    //getting userid of user
    let userid=JSON.parse( localStorage.getItem('user'))._id
    let result=await fetch('http://localhost:4500/add-product',{
        method:'post',
        body:JSON.stringify({pname,price,category,company,userid}),
        headers:{
            'Content-Type':'application/json',
            'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
        }
    })
    result=result.json();
    console.log(result);
    if(result){
      alert('Product Added Successfully!')
    }

  }
  return (
    <div className="add-product">
      <h2>Add A New Product</h2>
      <div className="products">
        <input type="text" placeholder="Enter Product Name" value={pname} onChange={(e)=>{setpname(e.target.value)}} />
        
        {err && !pname && <span className="invalid-input">Product Name can not be blank!</span>} 
        <input type="text" placeholder="Enter Product Type" value={category} onChange={(e)=>{setcategory(e.target.value)}}/>
        {err && !category && <span className="invalid-input">Product Category can not be blank!</span>} 
        <input
          type="text"
          placeholder="Enter Product Company"
          value={company} onChange={(e)=>{setcompany(e.target.value)}}
        />
        {err && !company && <span className="invalid-input">Product Company can not be blank!</span>} 
        <input type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>{setprice(e.target.value)}}/>
        {err && !price && <span className="invalid-input">Product Price can not be blank!</span>} 
        <button className="addproduct-btn" onClick={SendData}>Add Product</button>
      </div>
    </div>
  );
};
export default AddProduct;
