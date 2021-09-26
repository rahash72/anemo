import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
height: 30px;
background-color: #1e90df;
color: white;
display: flex;
font-size: 14px;
font-weight: bold;
align-items: center;
justify-content: center;
`;





const Announcement = () => {
    return (
        <Container>
            Buy your stuff here!
        </Container>
    )
}

export default Announcement
