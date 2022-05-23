import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components'


export default function CreateDog (){
    let dogs = useSelector((state) => state.dogs);
    let ordersDogs = useSelector((state) => state.ordersDogs);

    let navigate = useNavigate()
    const {name} = useParams()
    let newDog = name.replace(":", "")

    let thisDog = dogs.filter(e => e.name === newDog)

    if(thisDog){
        thisDog = ordersDogs.filter(e => e.name === newDog)
    }

    console.log(thisDog)
    return  <Container>
                <ButtonContainer>
                    <Button onClick={()=>navigate('/home')}>Back to main</Button>
                </ButtonContainer>
                <BodyContainer>
                    <h1>{thisDog[0].name}</h1>
                    <Img src={thisDog[0].image.url} alt={thisDog[0].name} />
                    <p><strong>Weight:</strong> {thisDog[0].weight.metric} kg</p>
                    <p><strong>Height:</strong> {thisDog[0].height.metric} mts</p>
                    <p><strong>Life span:</strong> {thisDog[0].life_span}</p>
                    <p><strong>{!(thisDog[0].temperament[0].name === "")?'Temperaments:': null}</strong> {!(thisDog[0].temperament[0].name === "") ? thisDog[0].temperament.map(e=>{return e.name+ " "}) : null}</p>
                </BodyContainer>
            </Container>
}


const Container = styled.div`
    background:#36373A;
    padding: 15px;
    border-radius: 5px;
    margin: 45px;
    margin-top: 10px;
    margin-bottom: 8px;

    display:flex;
    flex-direction: column;
    div{
        display:flex;
        flex-direction: column;
    }
`
const BodyContainer = styled.div`
    align-items: center;
`

const ButtonContainer = styled.div`
    align-items: start;
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

const Img = styled.img`
    height: 450px;
    weight: 450px;
    border-radius: 10px;
    border: 2px solid white;

`