import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../helpers/Loading";
import { getDogByID } from "../redux/actions";


export default function DogsID (){
    let navigate = useNavigate()
    const {id} = useParams()
    let dog = useSelector((state) => state.dogByID);
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDogByID(id))
    }, []) 


    return <div>
        <button onClick={()=> navigate('/')}>Back Home</button>
        {dog.length === 0 ?<><Loading /><h1>Searching Dog</h1></>: dog ==="Id not found"?
        <div>
            <h1>ID from dog not found</h1>
            <h2>Try another id</h2>
        </div>
        : <div>
                <h1>{dog[0].name}</h1>
                <p>{dog[0].breed_group}</p>
                <img src={dog[0].image.url} alt="" />
        </div>
        }
    </div>
}