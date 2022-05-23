import React from "react";
import { useDispatch } from "react-redux";
import styled from 'styled-components'
import { get_a_SingleDog } from "../redux/actions";


export default function SearchDog (){
    const dispatch = useDispatch();
    const [input, setInput] = React.useState("");
    
    const handleInputChange = function(e) {   //Funcion en la cual manejo los cambios en inputs pass y user.
        setInput(e.target.value);
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(get_a_SingleDog(input));
        setInput("")
    }

    return(
        <div className="root">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <Input type="text" name='dogsName' placeholder='Tipe a breed' onChange={handleInputChange}  value={input} />                 
                    <Button type="button" value="Search a DOG" onClick={handleSubmit}></Button>
                </form>
            </div>
        </div>
    )

}


const Button = styled.input`
    background: #e7c052;
    border-radius:  0px 10px 10px 0px ;
    border: 2px solid black;
    color: black;
    width: 150px;
    height: 34px;
    margin: 0 1em;
    margin-left: 0px;
    padding: 0.25em 1em;
    cursor: pointer;
`
const Input = styled.input`
    background: #d7d7d7;
    border-radius: 2%;
    padding: 5px;
    border: 3px solid white;
    cursor: pointer;
`