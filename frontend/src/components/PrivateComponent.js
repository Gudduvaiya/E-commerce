import React from 'react'
import {Navigate,Outlet} from 'react-router-dom';

function PrivateComponent(){
    const auth=localStorage.getItem('user')
    return(
        auth?<Outlet/>:<Navigate to='/signup'/>         //if auth presents means data has in local storage then go as it is but if data not present in localstorage then routes only to signup
    )
}
export default PrivateComponent