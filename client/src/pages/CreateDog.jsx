import React, {useState, useEffect} from "react";
import axios from "axios"
import styled from 'styled-components'
import './CreateDog.css'
import { useNavigate } from "react-router-dom";
import validate from './Validate'
import Temperaments from "../helpers/Temperaments";
import { useSelector } from "react-redux";


export default function CreateDog (){
    let AllTempsForNewDog = useSelector(status => status.temperamentsForNewDog)
    let newTempControl = useSelector(status => status.newTempControl)
    // let newTempControl = useSelector(status => status.newTempControl)

    const [errors, setErrors] = useState({});     //Creo un estado dentro del cual veo el estado de los errores. Si lo que estoy ingresando es valido o no
    const [body, setBody] = useState({
        name: "",
        height_max: "",
        height_min: "",
        weight_min: "",
        weight_max: "",
        life_span_min:"",
        life_span_max: "",
        temperament: "",
      });

    const navigate = useNavigate()

    useEffect(() => {
        setErrors(validate({                 
            ...body,
        }));
    }, []);


    useEffect(() => {
        setBody({
            ...body,
            temperament: AllTempsForNewDog
        });
        if(AllTempsForNewDog.length > 0){
            setErrors(validate({  
                ...body,
                temperament: "Ok"
            }));
        }
        if (AllTempsForNewDog.length === 0){
            setErrors(validate({  
                ...body,
                temperament: "Not"
            }));
        }
    }, [newTempControl, AllTempsForNewDog]);


    const handleInputChange = function(e) {   //Funcion en la cual manejo los cambios en inputs pass y user.
        setBody({
            ...body,
            [e.target.name]: e.target.value 
        });
        setErrors(validate({  
            ...body,
            temperament: "Not",                  
            [e.target.name]: e.target.value
        }));
    }

    function onSubmit(e){
        e.preventDefault()
        let newBody = {
            name: body.name,
            height:{min: body.height_min, max: body.height_max},
            weight:{min:body.weight_min, max:body.weight_max},
            life_span: {min:body.life_span_min, max:body.life_span_max},
            image: {
                url: body.image_url
            },
            temperament: body.temperament,
        }
        axios.post(`http://localhost:3001/dog`, newBody)
        .then(()=>{
            alert(`You add a new dog to your family. Congrats`)
            navigate('/home')
        })
        .catch(e => {
            console.error(e)
            alert(e)
        })
    }

    return <Div>
        <Button onClick={()=>navigate('/home')}>Back to main</Button>
        <Form onSubmit={onSubmit}>
            <Fild>
                <label>NAME: </label> 
                <Input autoComplete="off" placeholder="Name" className={errors.name && 'danger'} 
                type="text" name="name" onChange={handleInputChange} required/>

                {errors.name && (<Error className="danger">{errors.name}</Error>)}
            </Fild>
            <Fild>
                <label>HEIGTH: </label> 
                <Input placeholder="Min Height" className={errors.height_min && 'danger'} 
                type="number" name="height_min" onChange={handleInputChange} required/>

                <Input placeholder="Max Height" className={errors.height_max && 'danger'} 
                type="number" name="height_max" onChange={handleInputChange} required/>

                {errors.height_max && (<Error className="danger">{errors.height_max}</Error>)}
                {errors.height_min && (<Error className="danger">{errors.height_min}</Error>)}
            </Fild>

            <Fild>
                <label>WEIGHT: </label>
                <Input placeholder="Min Weight" className={errors.weight_min && 'danger'} 
                type="number" name="weight_min" onChange={handleInputChange} required/>

                <Input placeholder="Max Weight" className={errors.weight_max && 'danger'} 
                type="number" name="weight_max" onChange={handleInputChange} required/>

                {errors.weight_max && (<Error className="danger">{errors.weight_max}</Error>)}
                {errors.weight_min && (<Error className="danger">{errors.weight_min}</Error>)}
            </Fild>

            <Fild>
                <label>LIFE SPAN: </label>
                <Input placeholder="Min Life Span" className={errors.life_span_min && 'danger'} 
                type="number" name="life_span_min" onChange={handleInputChange} />

                <Input placeholder="Max Life Span" className={errors.life_span_max && 'danger'} 
                type="number" name="life_span_max" onChange={handleInputChange}/>

                {errors.life_span_max && (<Error className="danger">{errors.life_span_max}</Error>)}
                {errors.life_span_min && (<Error className="danger">{errors.life_span_min}</Error>)}
            </Fild>

            <Fild>
                <label>IMAGE: </label>
                <Input placeholder="URL Image" className={errors.image_url && 'danger'} 
                type="text" name="image_url" onChange={handleInputChange} required/>

                {errors.image_url && (<Error className="danger">{errors.image_url}</Error>)}
            </Fild>

            <Temperaments/>

            <hr></hr>

            <ButtonInput disabled={errors && !(errors.temperament === '')} type="submit" name="Create Dog" value="Create a Dog"/>

            <hr></hr>
            <hr></hr>

            <Button type="reset">
                <strong>Reset Form</strong>
            </Button>

        </Form>
    </Div>
}

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-content: space-around;
    flex-wrap: wrap;
    color: #ddd;
    padding: 25px;
    margin: 35px;
    border-radius: 5px;
    background:#36373A;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
`

const Input = styled.input`
    background: #d7d7d7;
    border-radius: 2%;
    padding: 5px;
    border: 3px solid white;
    cursor: pointer;
`

const Fild = styled.div`
    background:#202124;
    padding: 15px;
    border-radius: 5px;
    margin: 5px;
`

const Error = styled.p`
    color: red;
    font-size: 15px;
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

const ButtonInput = styled.input`
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