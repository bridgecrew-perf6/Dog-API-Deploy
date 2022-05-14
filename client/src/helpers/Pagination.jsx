import React, { Component, useEffect, useState } from "react";
import {getAllDogs, getAllTEmperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {
    const [dogsFromPage, setDogsFromPage] =useState([]);
    let dogs = useSelector((state) => state.dogs);
    let records_per_page = 8;

    const [current_page, setCurrentPage] =useState(1);
    const [pages, SetPages] =useState(1);

    useEffect(() => {
        bringPageDogs(0,8)
    },[]);

    function bringPageDogs(inicio, fin){
        let newArr = dogs.slice(inicio,fin)
        setDogsFromPage(newArr)
    }

    const prevPage = ()=>{
        if (current_page > 1) {
            setCurrentPage(current_page-1);
            changePage(current_page);
            console.log("Prev:", current_page)
        }
    }

    const nextPage = ()=>{
        if (current_page < numPages()) {
            setCurrentPage(current_page+1);            
            changePage(current_page);
            console.log("Next:", current_page)
        }
    }

    function changePage(page){
        // Validate page
        if (page < 1) SetPages(page = 1);
        if (page > numPages()) page = numPages();

        bringPageDogs(((page-1) * records_per_page),(page * records_per_page))
        console.log("Page:",page)
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

    const numPages = ()=>{
        let calculo = Math.ceil(dogs.length / records_per_page) //Calculo cuantas paginas serian, con respecto al largo total del arreglo de perros
        return calculo;
    }

    return (
    <>
        {!dogsFromPage?console.log("Esperando"):
            dogsFromPage.map(e =>(
                        <div className="body" key={e.id}>
                            <h2>{e.name}</h2>
                            <p>{e.life_span}</p>
                            <button>More info</button>
                        </div>
                    )
            )
        }
        <button onClick={prevPage}>Previus</button>
        <p>{pages}</p>
        <button onClick={nextPage}>Next</button>
    </>
    )


}

export default Pagination;