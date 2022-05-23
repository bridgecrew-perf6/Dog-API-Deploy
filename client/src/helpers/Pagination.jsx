import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components'
import { getAllDogs } from "../redux/actions";
import logo from './pug.gif'
import awaitingImg from '../img/otherDog.gif'

function Pagination() {
    const [dogsFromPage, setDogsFromPage] = useState([]);
    const [allActualDogs, setAllDogs] = useState([]);
    const [current_page, setCurrentPage] = useState(1);
    const [pages, SetPages] = useState(1);
    
    let dogs = useSelector((state) => state.ordersDogs);
    var dogsFiltres = useSelector((state) => state.dogsFiltres);

    let records_per_page = 8;
    let dispatch = useDispatch()

    useEffect(() => {
        changePage(1)
        SetPages(1)
        setCurrentPage(1)
    }, [dogs, dogsFiltres]);

    function bringPageDogs(inicio, fin) {
        if(dogs.error){
            alert("Specify an existence breed")
            navigate('/home')
        }else{
            let newArr= [];
            if(dogsFiltres.length === 0) {
                setAllDogs([]);
                newArr = dogs.slice(inicio, fin)
            } else{
                if(dogsFiltres[dogsFiltres.length-1] === "createdByDB"){
                    let auxArr = dogs.filter((e)=>{
                        return (e.createdByDB == true)
                    })
                    newArr = auxArr.slice(inicio, fin)
                } else{
                    let auxArr = [];
                    if(allActualDogs.length>0){
                        auxArr = allActualDogs.filter((e)=>{
                            return (e.temperament.find((f) => f.name == dogsFiltres[dogsFiltres.length-1]))
                        })
                        setAllDogs(auxArr);
                    }else {
                        auxArr = dogs.filter((e)=>{
                            return (e.temperament.find((f) => f.name == dogsFiltres[dogsFiltres.length-1]))
                        })
                        setAllDogs(auxArr);
                    }
                    newArr = auxArr.slice(inicio, fin)
                } 
            }
            setDogsFromPage(newArr)
        }
    }

    const prevPage = () => {
        if (current_page > 1) {
            setCurrentPage(current_page - 1);
            changePage(current_page - 1);
        }
    }

    const nextPage = () => {
        if (current_page < numPages()) {
            setCurrentPage(current_page + 1);
            changePage(current_page + 1);
        }
    }

    function changePage(page) {
        if (page < 1) SetPages(1);
        if (page > numPages()) SetPages(numPages());

        bringPageDogs(((page - 1) * records_per_page), (page * records_per_page))
        SetPages(page)
        // if (page == 1) {
        //     btn_prev.style.visibility = "hidden";
        // } else {
        //     btn_prev.style.visibility = "visible";
        // }

        // if (page == numPages()) {
        //     btn_next.style.visibility = "hidden";
        // } else {
        //     btn_next.style.visibility = "visible";
        // }
    }

    const numPages = () => {
        let calculo = Math.ceil(dogs.length / records_per_page) //Calculo cuantas paginas serian, con respecto al largo total del arreglo de perros
        return calculo;
    }
    let navigate = useNavigate()    

    return (
        <>
            {dogs.length < 171 ?<Button onClick={()=> dispatch(getAllDogs())}>Back Home</Button>: null}
            <Cards>
                {dogsFromPage.length === 0?<div><Gif src={logo} alt="404" /><h1>Check your filters! Dog Not Found</h1></div>:
                    dogsFromPage.map(function (e){
                        return <Card key={e.id}>
                            <Image src={!e.image.url?awaitingImg:e.image.url} alt={e.name}></Image>
                            <Name>{e.name}</Name>
                            <p>WEIGHT: {e.weight.metric} kg</p>
                            <Title>TEMPERAMENTS:</Title>
                            <p>{e.temperament.map(e=>{return e.name+ " "})}</p>
                            <Button onClick={()=>navigate(`/dog/:${e.name}`)}>Dog Details</Button>
                        </Card>
                    }
                    )
                }
            </Cards>
            <ButtonContainer>
                <Button onClick={prevPage}>PREV</Button>
                <Counter>{pages}</Counter>
                <Button onClick={nextPage}>NEXT</Button>
            </ButtonContainer>
        </>
    )
}

export default Pagination;


const Name = styled.h1`
    font-size: large;
    font: 100;
    margin-top: 0px;
    margin-bottom: -20px;
    color: black;
`

const Button = styled.button`
    background: #e7c052;
    border-radius: 10px;
    border: 2px solid black;
    color: black;
    margin: 0 1em;
    padding: 0.25em 2em;
    cursor: pointer;
    transition: all 200ms;
    &:hover{
        background: grey;
        color: #ddd;
    }
`

const Image = styled.img`
    width: 250px;
    height: 150px;
    border-radius: 2%;
`

const Counter = styled.p`
    width: 20px;
    height: 30px;
    border-radius: 5px;
    background: #ddd;
    margin-left: 2px;
    padding-left: 7px;
    padding-top: 7px;
    border: 3px solid black;

`

const Card = styled.div`
    background: #36373A;
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 250px;
    height: 350px;
    border-radius: 2%;
    border: 2px solid grey;
    color: #ddd;
    padding: 10px;
`
const Title = styled.p`
    color: black;
    font-size:medium;
    margin-top: 2px;
    pading-bottom: -10px;
    margin-bottom: -10px;
`
const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    row-gap: 10px;
    column-gap: 90px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 100;
    right: 44%;
    lefth: 50;
    bottom: 2%;
`

const Gif = styled.img`
    position: relative;
    left: 25%;
    margin-top: 120px;
    height: 50vh;
    width: 70%;
`