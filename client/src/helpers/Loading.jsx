import React from "react";
import styled from 'styled-components'
import logo from './pug.gif'


function Loading() {

    return (
        // <div id="overlay"><img src="../../public/img/404.png" alt="Be patient..." /></div>

        // <Div>
        //     <img src={'../../public/img/pugFoto.jpg'} alt="" />
        // </Div>
        <div>
          <Gif src={logo} alt="loading..." />
        </div>
        )
    
}
    const Gif = styled.img`
    position: relative;
    left: 40%;
    margin-top: 200px;
    height: 40vh;
    width: 25%;
    `
      export default Loading;
