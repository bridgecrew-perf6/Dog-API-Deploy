import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'


function Filters() {
    const [navbarOpen, setNavbarOpen] = useState(false);

    let dogs = useSelector((state) => state.dogs);
    let temperaments = useSelector((state) => state.temperaments);

    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }

    return (
        <Nav>
            <Button onClick={handleToggle}>{navbarOpen ? "Filters" : "Filters"}</Button>
            <Ul navbarOpen={navbarOpen}>
                {!temperaments?<p>Esperando temperamentos</p>:
                temperaments.map(e=>
                    <Options key={e.id}><input type="checkbox" key={e.id}/>{e.name}</Options>
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
        cursor: pointer;
`
const Ul = styled.form`
    ${props => !props.navbarOpen?
        `display:none;`:
        `position: fixed;
        display: flex;
        display; column;
        flex-wrap: wrap;
        justify-content: center;
        margin: 2px;
        top: 0;
        right: 60px;
        bottom:100;
        background: white;
        `
    };

`
  
const Options = styled.label`
    margin: 5px;
    color: black;
    text-transform: uppercase;
`
  
//   .menuNav li:first-child {
//     margin-top: 7rem;
//   }

export default Filters;