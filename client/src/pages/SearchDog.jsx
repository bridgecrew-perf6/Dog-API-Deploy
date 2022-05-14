import React from "react";
import { useNavigate } from "react-router-dom";


export default function SearchDog (){
    let navigate = useNavigate();

    return(
        <div className="root">
            <div className="container">
                <form>
                    <input type="search" name="Insert a dog" id="search" />
                    <input type="button" value="Search a DOG" />
                </form>
            </div>
        </div>
    )

}