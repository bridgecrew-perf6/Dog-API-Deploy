import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components'

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
            <ButtonContainer>
                <Button onClick={prevPage}>Previus</Button>
                <p>{pages}</p>
                <Button onClick={nextPage}>Next</Button>
            </ButtonContainer>
            <Cards>
                {!dogsFromPage?console.log("Esperando info"):
                    dogsFromPage.map((e) => (
                        <Card className="body" key={e.id}>
                            <Image src={e.image.url} alt={e.name} />
                            <h2>{e.name}</h2>
                            <p>{e.life_span}</p>
                            <Button>More Info</Button>
                        </Card>
                    )
                    )
                }
            </Cards>
        </>
    )
}

export default Pagination;


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid blue;
  color: blue;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
        props.primary &&
        css`
      background: palevioletred;
      color: white;
    `};
`

const Image = styled.img`
  width: 100%;  height: 100%;
`

const Card = styled.div`
  background: transparent;
  display:flex;
  flex-direction: column;
  width: 8rem;
  border-radius: 3px;
  border: 2px solid blue;
  color: blue;
  margin: 0 1em;
  padding: 0.25em 1em;
`

const Cards = styled.div`
  display:flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  row-gap: 20px;
  column-gap: 200px;
  width: 100vw;
  height: 50vh;
`
const ButtonContainer = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
  margin-top: -50px;
`

