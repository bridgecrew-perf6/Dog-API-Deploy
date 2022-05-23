import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import { setFilters } from "../redux/actions";
import './Filters.css'

function Filters() {
    const dispatch = useDispatch();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [temperamentsFilter, setTemperamentsFilter] = useState([]);

    let temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(setFilters(temperamentsFilter))
    }, [temperamentsFilter]);


    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }
    const handlerSelection = (e) => {
        if(temperamentsFilter.includes(e.target.value)){
            setTemperamentsFilter(temperamentsFilter.filter(prop=>prop!==e.target.value))
        } else{
            setTemperamentsFilter([...temperamentsFilter, e.target.value]);
        }
    }

    return (
        <Nav>
            <Button onClick={handleToggle}>{navbarOpen ? "Filters" : "Filters"}</Button>
            <Ul navbarOpen={navbarOpen}>
                <p>Filter races created by you:</p>
                <label className="switch">
                    <input onChange={handlerSelection} value="createdByDB" type="checkbox"/>
                    <span className="slider round"></span>
                </label>
                <hr/>
                {!temperaments?<p>Esperando temperamentos</p>:
                    temperaments.map(e=>
                        <Options key={e.id}><input type="checkbox" value={e.name} onChange={handlerSelection} key={e.id}/>{e.name}</Options>
                    )
                }
            </Ul>
        </Nav>
      )
}

const Nav = styled.div`
    position: fixed;
    top: 14px;
    right: 10px;
    bottom:100;
`

const Button = styled.button`
    background: #e7c052;
    border-radius: 10px;
    border: 2px solid black;
    color: black;
    margin: 0 1em;
    padding: 0.25em 2em;
    cursor: pointer;
`

const Ul = styled.form`
    ${props => !props.navbarOpen?
        `display:none;`:
        `
        display:flex;
        flex-direction: column;
        width:200px; 
        height:500px;
        overflow-y:scroll;
        overflow-x:hidden;        
        background: #d7d7d7;
        `
    };

`
  
const Options = styled.label`
    margin: 5px;
    color: black;
    text-transform: uppercase;
`

export default Filters;