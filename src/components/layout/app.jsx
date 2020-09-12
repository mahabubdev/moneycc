import React from 'react'
import Header from './../_Header'
import {
    Container
} from 'react-bootstrap'

function AppLayout (props) {
    return(
        <React.Fragment>
            <Header />
            <Container>
                { props.children }
            </Container>
        </React.Fragment>
    )
}

export default AppLayout