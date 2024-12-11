import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Logout = () => {
  const navigate = useNavigate();

  return (

    <div
    style={{
      backgroundImage: "url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1733889133~exp=1733892733~hmac=ebefdc3ba1c91d100f1ff384239b12c98fd65e44ba0ed14a2e662e6be8c83060&w=900')", 
      backgroundAttachment: "fixed", 
      backgroundSize: "cover", 
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "98vh", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden",
     
    }} >  
<div
        style={{
          backgroundColor: "#ecf1f8 ", 
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2>You have successfully logged out!</h2>
        <p>We hope to see you again soon.</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")} 
        >
          Sign In Again
        </button>
      </div>
   
      </div>
     
  );
};

export default Logout;
