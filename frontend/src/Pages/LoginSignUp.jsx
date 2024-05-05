import React from "react";
import "./CSS/loginsignup.css";
import { useState } from "react";
import Swal from "sweetalert2";
const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData,setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const login = async ()=>{
console.log("login function executed",formData);
try{

  const response= await fetch('http://localhost:4000/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})

const data = await response.json();
if(data.success){
  
  localStorage.setItem("auth-token",data.token);
  
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Login successful!",
    showConfirmButton: false,
    timer: 1500
  })

  setTimeout(() => {
    window.location.replace("/");
  }, 1500);
} else{
  //alert(data.errors);
  Swal.fire({
    icon: "error",
    title: "Error",
    text:
      data.errors || "Login failed",
    confirmButtonText: "OK",
    confirmButtonColor: "#d33",
  });
}

}catch(error){
  console.log(error);
}   

  }
  const signup = async ()=>{
 console.log("signup function executed",formData);
 try{

  const response= await fetch('http://localhost:4000/signup', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})

const data = await response.json();
if(data.success){
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Sign up successful!",
    showConfirmButton: false,
    timer: 1500
  })
  localStorage.setItem("auth-token",data.token);
  setTimeout(() => {
    window.location.replace("/");
  }, 1500);
  
} else{
  //alert(data.errors);
  Swal.fire({
    icon: "error",
    title: "Error",
    text:
      data.errors || "Sign up failed",
    confirmButtonText: "OK",
    confirmButtonColor: "#d33",
  });
}

}catch(error){
  console.log(error);
}   
  }

  const changeHandler = (e)=>{
    const { name , value} = e.target;
    setFormData({...formData,[name]:value})
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input onChange={changeHandler} type="text" name="username" value={formData.username} placeholder="Your Name" />
          ) : null}
          <input onChange={changeHandler} type="email" name="email" value={formData.email} placeholder="Email" />
          <input onChange={changeHandler} type="password" name="password" value={formData.password} placeholder="Password" />
        </div>
        <button onClick={()=> state === "Login" ? login() : signup()}>Continue</button>
        <p className="loginsignup-login">
          {state === "Login"
            ? "Don't have an account ? "
            : "Already have an account ? "}
          <span
            onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
          >
            Click here
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing ,I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
