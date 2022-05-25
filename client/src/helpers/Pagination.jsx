import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { getAllDogs } from "../redux/actions";
import logo from './pug.gif'
import awaitingImg from '../img/otherDog.gif'
import './Pagination.css'


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

    const prevprevPage = () => {
        if (current_page > 1) {
            setCurrentPage(current_page - 2);
            changePage(current_page - 2);
        }
    }

    const nextnextPage = () => {
        if (current_page < numPages()) {
            setCurrentPage(current_page + 2);
            changePage(current_page + 2);
        }
    }
    function changePage(page) {
        if (page < 1) SetPages(1);
        if (page > numPages()) SetPages(numPages());
        bringPageDogs(((page - 1) * records_per_page), (page * records_per_page))
        SetPages(page)
    }

    const numPages = () => {
        let calculo = 0;
        if(allActualDogs.length === 0){
            calculo = Math.ceil(dogs.length / records_per_page)
        } else{
            if(dogsFiltres[dogsFiltres.length-1] === "createdByDB"){
                calculo = Math.ceil(dogsFromPage.length / records_per_page)
            } else{
                calculo = Math.ceil(allActualDogs.length / records_per_page) //Calculo cuantas paginas serian, con respecto al largo total del arreglo de perros
            }
        }
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
                            <div>
                                <Image src={!e.image.url?awaitingImg:e.image.url} alt={e.name}></Image>
                                <Name>{e.name}</Name>
                                <p>WEIGHT: {e.weight.metric} kg</p>
                                <Title>TEMPERAMENTS:</Title>
                                <p>{e.temperament.map(e=>{return e.name+ " "})}</p>
                            </div>
                            <Button onClick={()=>navigate(`/dog/:${e.name}`)}>Dog Details</Button>
                        </Card>
                    }
                    )
                }
            </Cards>
            <ButtonContainer>
                <ButtonChanges id={pages === 1?"prevButton":"prev"} onClick={prevPage}>PREV</ButtonChanges>
                
                <Pages onClick={prevprevPage} value={current_page - 2} id={pages <= 2?"prevButton":"prev"}>{current_page - 2}</Pages>
                <Pages onClick={prevPage} value={current_page - 1} id={pages <= 1?"prevButton":"prev"}>{current_page - 1}</Pages>

                <Counter>{pages}</Counter>

                <Pages onClick={nextPage} value={current_page + 1} id={(pages >= numPages())?"nextButton":"next"}>{current_page + 1}</Pages>
                <Pages onClick={nextnextPage} value={current_page + 2} id={(pages >= numPages()-1)?"nextButton":"next"}>{current_page + 2}</Pages>

                <ButtonChanges id={(pages === numPages())?"nextButton":"next"} onClick={nextPage}>NEXT</ButtonChanges>
            </ButtonContainer>
        </>
    )
}

export default Pagination;


const Name = styled.h1`
    font-size: large;
    margin-top: 0px;
    margin-bottom: -20px;
    color: black;
`

const Button = styled.button`
    background: #e7c052;
    border-radius: 10px;
    border: 2px solid black;
    color: black;
    margin: 0 0em;
    padding: 0.25em 2em;
    cursor: pointer;
    transition: all 200ms;
    &:hover{
        background: grey;
        color: #ddd;
    }
`

const Pages = styled.button`
    width: 30px;
    height: 40px;
    border-radius: 5px;
    background: #ddd;
    margin-left: 2px;
    padding-left: 7px;
    padding-top: 7px;
    border: 3px solid black;
`

const Image = styled.img`
    width: 250px;
    height: 150px;
    border-radius: 2%;
`

const Counter = styled.div`
    width: 20px;
    height: 30px;
    border-radius: 5px;
    background: grey;
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
    justify-content: space-between;
    width: 250px;
    height: 350px;
    border-radius: 2%;
    border: 2px solid grey;
    color: #ddd;
    padding: 10px;

    div{
        p:last-child{
            height: 65px;
            width: 250px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`

const Title = styled.p`
    color: black;
    font-size:medium;
    margin-top: 2px;
    padding-bottom: -10px;
    margin-bottom: -10px;
`

const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 1200px;
    margin: 0 auto;
    overflow-y: hidden;
    justify-content: center;
    gap: 10px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    bottom: 0;
    top: auto;
    right: 0;
    left: auto;
    &:first-child{
        margin-right: -34px;
    }
`

const Gif = styled.img`
    position: relative;
    left: 25%;
    margin-top: 120px;
    height: 50vh;
    width: 70%;
`


const ButtonChanges = styled.button`
    background: #e7c052;
    border-radius: 10px;
    border: 2px solid black;
    color: black;
    margin: 1px;
    padding: 0;
    width: 40px;
    height: 39px;
    cursor: pointer;
    transition: all 200ms;
    &:hover{
        background: grey;
        color: #ddd;
    }
`