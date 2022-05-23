import image from '../img/404.png'
import styled from 'styled-components'


export default function NotFound() {
    return <Container>
        <Title>Page Not Found :,D</Title>
        <Image src={image}/>
    </Container>
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center
`

const Title = styled.h1`
    margin-top: 250px;
    justify-content: center;
`

const Image = styled.img`
    width: 500px;
    height: 500px;
    border-radius: 2%;
    position: fixed;
    bottom: 0;
    right: 0;
`