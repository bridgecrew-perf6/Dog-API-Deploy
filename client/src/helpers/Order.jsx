import React from "react";
import { useDispatch } from "react-redux";
import { sort } from "../redux/actions";
import { useSelector } from "react-redux";
import styled from 'styled-components'



function Order() {
    const dispatch = useDispatch()

    let ordersDogs = useSelector(status => status.ordersDogs)

    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }

    return (<>
        <Input name="select" onChange={onSelectChange} disabled={ordersDogs.length < 171}>
            <option value="" selected>Select Order options</option>

            <option value="ascendente">Order from A-Z</option>
            <option value="descendente">Order from Z-A</option>
            <option value="weigthDesc">Order from heaviest to lightest</option>
            <option value="weigthAsc">Order from lightest to heaviest</option>
        </Input>
    </>
      )
}

export default Order;

const Input = styled.select`
    background: #d7d7d7;
    border-radius: 2%;
    padding: 5px;
    border: 3px solid white;
    cursor: pointer;
`
