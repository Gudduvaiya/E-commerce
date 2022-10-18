import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

const Home=()=>{
    const[products,setproducts]=useState([])
    useEffect(()=>{
        ShowProductLists();
    },[])

    async function ShowProductLists(){
        let result=await fetch('http://localhost:4500/product-list',{
            headers:{
                'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
            }
        })        //as it is a get api so not need to define method,body etc.
        result=await result.json()
        setproducts(result)
    }
    console.log(products);
    
    const deleteProduct=async(id,name)=>{
        let result=await fetch(`http://localhost:4500/delete-product/${id}`,{
            method:'Delete',
            headers:{
                'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
            }
        })
        result=await result.json()
        if(result){
            ShowProductLists()
            alert(`${name} deleted Successfully!`)
        }
    }

    const searchProduct=async(e)=>{
        let keyword=e.target.value
        if(keyword){

            let result=await fetch(`http://localhost:4500/search/${keyword}`,{
                headers:{
                    'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
                }
            })
            result=await result.json()
            if(result){
                setproducts(result)
            }
        }
        else{
            ShowProductLists()
        }
    }
    const auth=localStorage.getItem('user')
    return(
        <div>
            <h1 style={{textAlign:"center"}}>Welcome to PandaKart <span style={{color:"#0e68f8"}}>{JSON.parse(auth).name}</span></h1>       {/* as the data stored in localstorage is in json format so nThis will parse the json into string so we can print it */}
                <h3 style={{textAlign:"center",marginTop:"0px"}}>Your Products</h3>
                <div className="search">
                <input type='text' placeholder="Search from your Products..." onChange={searchProduct}/>
                </div>
            <ul className="productul">
                <li>Seriel Number</li>
                <li>Product Category</li>
                <li>Product Name</li>
                <li>Product Company</li>
                <li>Product Price</li>
                <li>Product Operations</li>
            </ul>
            <div style={{paddingBottom: "25px"}}>

            {
                products.length>0 ? products.map((item,key)=>
                    <ul className="productulMap">
                    <li>{key+1}</li>
                    <li>{item.category}</li>
                    <li>{item.pname}</li>
                    <li>{item.company}</li>
                    <li>Rs. {item.price}</li>
                    <li className="update-delete-li">
                    <Link to={"/update-product/"+item._id}><button className="update-btn">Update</button></Link>
                    <button className="delete-btn" onClick={()=>deleteProduct(item._id,item.pname)}>Delete</button></li>
                    </ul>
                )
                :<h3 style={{color:"red",textAlign:"center"}}>No Results Found!</h3>
            }
            </div>
        </div>
    )
}
export default Home