import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { setNewTemperament, setDogTemperament, newTemperamentControl, getAllTemperaments} from "../redux/actions";
import axios from "axios"


export default function Temperaments() {
    const dispatch = useDispatch()
    let temperaments = useSelector((state) => state.temperaments);
    const [temperamentList, setTemperaments] = useState([])
    const [newTemperament, setNewTemp] = useState("")


    useEffect(() => {
        dispatch(setDogTemperament(temperamentList))
    }, [temperamentList]);


    const handlerSelection = (e) => {
        if(temperamentList.includes(e.target.value)){
            setTemperaments(temperamentList.filter(prop=>prop!==e.target.value))
        } else{
            setTemperaments([...temperamentList, e.target.value]);
        }
    }
    const handleInputChange = (e) => {   
        setNewTemp(e.target.value)
        dispatch(newTemperamentControl(e.target.value))
    }

    const handleSubmitTemp = (e) => {
        e.preventDefault()
        setNewTemp(newTemperament);
        let newBody = {
            newTemperament: [newTemperament]
        }

        axios.post(`http://localhost:3001/temperament`, newBody)
        .then(()=>{
            alert(`You add a new Temperament`)
            dispatch(getAllTemperaments())
        })
        .catch(e => {
            console.error(e)
            alert(e)
        })
        setNewTemp("")
    }

    return  <Contanier>
                <Display>
                    <div><h3>Temperaments:</h3></div>
                    <div>{temperamentList.length === 0?<p className="danger">No temperament selected or created</p>:temperamentList.map(e=>
                            <div><p>{e}</p></div>
                        )}
                    </div>
                    
                </Display>
                <div>
                    <p>Select a temperament of the existent: </p>
                    {!temperaments?<p>Esperando temperamentos</p>:
                        temperaments.map(e=>
                            <label key={e.id}><input type="checkbox" value={e.name} onChange={handlerSelection} key={e.id}/>{e.name}</label>
                        )
                    }
                </div>       
                <div>
                    <p>Or create a new temperament: </p>
                    <form onSubmit={handleSubmitTemp}>
                        <input placeholder="Enter a new temperament" type="text" name="temperament" onChange={handleInputChange} value={newTemperament} />
                        <ButtonInput onClick={handleSubmitTemp} type="button" value="Add new Temp" disabled={!newTemperament}/>
                    </form>
                </div>
            </Contanier>
}


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

const Contanier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Display = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    div{
        display:flex;
        flex-direction: row;
        margin:5px;
    }
`