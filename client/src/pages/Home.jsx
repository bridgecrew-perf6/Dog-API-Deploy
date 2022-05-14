import React from "react";
import { useNavigate } from "react-router-dom";
import SearchDog from "./SearchDog"
import MainPage from "./MainPage"

export default function Home (){
    let navigate = useNavigate();

    return(
        <div className="root">
            <div className="container">
                <SearchDog/>
                <MainPage/>
            </div>
        </div>
    )

}