import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {getAllDogs } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../helpers/Pagination";


function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
      },[]);

    let dogs = useSelector((state) => state.dogs);


    return (<div className="root">
        <div className="container">
            <h4 className="title">DOGS </h4>
            {!dogs?console.log("Esperando info"):<Pagination/>}
        </div>
    </div>)

}



export default MainPage;
