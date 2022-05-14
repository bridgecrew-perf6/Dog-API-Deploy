import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing (){
    let navigate = useNavigate();

    return(
        <div className="root">
            <div className="container">
                <div>Welcome to DogsAPI</div>
                <p>Find all information of dogs</p>
                <button onClick={()=>navigate("/home")}>Lets get started</button>
            </div>
        </div>
    )

}