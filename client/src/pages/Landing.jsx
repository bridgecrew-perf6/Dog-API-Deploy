import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import background from '../img/perros.gif'

export default function Landing (){
    let navigate = useNavigate();

    return(
        <Div>
            <Container>
                <div>Welcome to DogsAPI</div>
                <p>Find all information of dogs</p>
                <Button onClick={()=>navigate("/home")}>Lets get started</Button>
            </Container>
        </Div>
    )

}

const Div = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 100vw;
    height: 100vh;
    background: url(${background}) no-repeat #202124 center;    
`
const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-aling: center;
    width: 250px;
    height: 250px;
    background-color:#36373A;
    border: 3px solid white;
    border-radius: 5%;
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