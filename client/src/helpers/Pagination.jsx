import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from 'styled-components'
import Loading from "./Loading";

function Pagination() {
    const [dogsFromPage, setDogsFromPage] = useState([]);
    let dogs = useSelector((state) => state.dogs);
    let records_per_page = 8;

    const [current_page, setCurrentPage] = useState(1);
    const [pages, SetPages] = useState(1);

    useEffect(() => {
        changePage(1);
    }, [dogs]);

    function bringPageDogs(inicio, fin) {
        if(dogs.error){
            alert("Specify a race")
            setDogsFromPage([{
                id: 1,
                name: "Dog not Found",
                life_span:"",
                image:{
                    url: "https://st2.depositphotos.com/3477229/11722/v/600/depositphotos_117229862-stock-illustration-error-page-not-found-cartoon.jpg"
                }
            }]);
        } else{
            let newArr = dogs.slice(inicio, fin)
            setDogsFromPage(newArr)
        }
    }

    const prevPage = () => {
        if (current_page > 1) {
            setCurrentPage(current_page - 1);
            changePage(current_page - 1);
            console.log("Prev:", current_page - 1)
        }
    }

    const nextPage = () => {
        if (current_page < numPages()) {
            setCurrentPage(current_page + 1);
            changePage(current_page + 1);
            console.log("Next:", current_page + 1)
        }
    }

    function changePage(page) {
        // Validate page
        console.log("Page:", page)

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

    return (
        <>
            <Cards>
                {dogsFromPage.length === 0?<Loading/>:
                    dogsFromPage.map((e) => (
                        <Card key={e.id}>
                            <Image src={e.image.url} alt={e.name} />
                            <Title>{e.name}</Title>
                            <p>Weight: {e.weight.metric} kg</p>
                            <Title>Temperaments:</Title>
                            <p>{e.temperament.map(e=>{return e.name+ " "})}</p>
                        </Card>
                    )
                    )
                }
            </Cards>
            <ButtonContainer>
                <Button onClick={prevPage}>Previus</Button>
                <p>{pages}</p>
                <Button onClick={nextPage}>Next</Button>
            </ButtonContainer>
        </>
    )
}

export default Pagination;


const Button = styled.button`
    background: grey;
    border-radius: 3px;
    border: 2px solid black;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
`

const Image = styled.img`
    width: 250px;
    height: 180px;
`

const Card = styled.div`
    background: transparent;
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    width: 250px;
    height: 350px;
    border-radius: 3px;
    border: 2px solid grey;
    color: grey;
    padding: 5px;
`
const Title = styled.p`
    color: black;
    margin-top: 2px;
    pading-bottom: 0px;
    margin-bottom: 0px;
`
const Cards = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-around;
    row-gap: 20px;
    column-gap: 120px;
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

