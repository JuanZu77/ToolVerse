// import React, { useEffect, useState } from 'react'
// import Cookie from 'js-cookie'
// import { Outlet, useNavigate } from 'react-router-dom'
// import axios from 'axios'


export default function Protected() {
  //   const navigate=useNavigate()
  //   const [isAuthenticated,setIsAuthenticated]=useState(true)


  // useEffect(()=>{
  //       async function checkLogin() {
  //         const tokenCookie = Cookie.get('token'); // Obtén el valor de la cookie 'token'
  //         console.log(tokenCookie)
  //             try {
  //                 const { data } = await axios.get('/verify', {
  //                   withCredentials: true,
  //                   headers: {
  //                     Authorization: `Bearer ${tokenCookie}`
  //                   }
  //                 })
  //                 console.log(data)
  //              if(data){
  //                setIsAuthenticated(true)
  //              }
  //             } catch (error) {
  //               console.log(error)
  //               setIsAuthenticated(false)
  //             }
    
  //       }
  //   checkLogin()
   
  // },[])

  // useEffect(()=>{
  //   if(!isAuthenticated)navigate('/login')
  // },[isAuthenticated,navigate])
  // console.log(isAuthenticated)

  
  //   return <Outlet/>
}
