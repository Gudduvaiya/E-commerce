import React,{useState,useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import './style.css'

function UpdateModaal(){
    const [pname, setpname] = useState("");
  const [price, setprice] = useState();
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const navigate=useNavigate()
  const params=useParams();
  useEffect(()=>{
    ShowProduct();
  },[])
  const ShowProduct=async()=>{
    console.log(params);
    let result=await fetch(`http://localhost:4500/product-details/${params.id}`,{
      headers:{
        'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
      }
    })
    result=await result.json();
    console.log(result);
    setpname(result.pname)
    setcategory(result.category)
    setprice(result.price)
    setcompany(result.company)
  }
  const updateData=async()=>{
    let result=await fetch(`http://localhost:4500/update-product/${params.id}`,{
      method:'Put',
      body:JSON.stringify({pname,company,category,price}),
      headers:{
        'Content-Type':'application/json',
        'Authorization':`bearer ${JSON.parse(localStorage.getItem('auth-token'))}`
      },
      
    })
    result=await result.json();
    console.log(result);
    alert('Product Updated Successfully!')
    navigate('/')
  }
    return(
        <div className="add-product">
             <h2>Update Your Product</h2>
      <div className="products">
        <input type="text" placeholder="Enter Product Name" value={pname} onChange={(e)=>{setpname(e.target.value)}} />
        
        <input type="text" placeholder="Enter Product Type" value={category} onChange={(e)=>{setcategory(e.target.value)}}/>
        <input
          type="text"
          placeholder="Enter Product Company"
          value={company} onChange={(e)=>{setcompany(e.target.value)}}
        />
        <input type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>{setprice(e.target.value)}}/>
        <button className="addproduct-btn" onClick={()=>{updateData()}}>Update </button>
      </div>
        </div>
    )
}
export default UpdateModaal