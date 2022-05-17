import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {getAllDogs, getAllTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../helpers/Pagination";
import Filters from "../helpers/Filters";
import styled from 'styled-components'
import SearchDog from "./SearchDog"
import Loading from "../helpers/Loading";


function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
      },[]);

    let dogs = useSelector((state) => state.dogs);


    return (
    <div className="root">
        <Nav>                
            <SearchDog/>
            <Filters/>
            <h4 className="title">DOGS </h4>
        </Nav>
        <div className="container">
            {dogs.length===0?<Loading />:<Pagination/>}
        </div>
    </div>)

}


const Nav = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;  
  height: 55px;
  background: grey;
  margin-bottom: 5px;
`



export default MainPage;
