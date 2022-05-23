import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getAllDogs, getAllTemperaments, sort } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../helpers/Pagination";
import Filters from "../helpers/Filters";
import styled from 'styled-components'
import SearchDog from "./SearchDog"
import Loading from "../helpers/Loading";
import Order from "../helpers/Order";

function MainPage() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());    
      },[]);

    let dogs = useSelector((state) => state.dogs);


    return (
    <div className="root">
        <Nav>
          <Order/>
            {/* <Img src={Pug} className="title" onClick={()=>navigate("/home")}></Img>  */}
            <SearchDog/>
            <Title onClick={()=>navigate("/factory")}>
              <h2 >The Dog Factory</h2>
            </Title>
            <Filters/>
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
  background: #292F40;
  margin-bottom: 5px;
`
const Img = styled.img`
  width: 55px;  
  height: 55px;
  margin-right: 245px;
`
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 3px solid white;
  background: #D7D7D7;
  width: 250px;
  height: 30px;  
  cursor: pointer;
`




export default MainPage;
