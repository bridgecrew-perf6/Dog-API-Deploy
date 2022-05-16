import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { get_a_SingleDog } from "../redux/actions";


export default function SearchDog (){
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [input, setInput] = React.useState("");
    
    const handleInputChange = function(e) {   //Funcion en la cual manejo los cambios en inputs pass y user.
        setInput(e.target.value);
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        dispatch(get_a_SingleDog(input));
    }

    return(
        <div className="root">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input type="text" name='dogsName' placeholder='Tipe a Dog or a Race' onChange={handleInputChange}  value={input} />                 
                    <input type="button" value="Search a DOG" onClick={handleSubmit}>
                        {/* <Link to={`/dogs/${e.id}`} className="button">Search</Link> */}
                    </input>
                </form>
            </div>
        </div>
    )

}