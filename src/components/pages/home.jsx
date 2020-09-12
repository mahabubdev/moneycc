import React, { useState, useEffect } from 'react'
import AppLayout from '../layout/app'
import {
    Form, Button, Row, Col
} from 'react-bootstrap'
import axios from 'axios'
import currencies from '../currency'

function Home (props) {

    // state
    const [calc, setCalc] = useState({
        ammount: 0,
        rate: 0,
        res: 0,
        curr_from: '',
        curr_to: ''
    })

    const [result, setResult] = useState({
        rfrom: null, rto: null, rammount: null, rate: null, req: false
    })
    const [reqData, setReqData] = useState({
        from: '', to: '', ammount: 0
    })

    const resetResult = () => setResult({
        rfrom: null, rto: null, rammount: null, rate: null, req: false
    })

    const onChangeData = (event) => {
        setReqData({
            ...reqData,
            [event.target.name]: event.target.value
        })
    }

    const convertReq = (event) => {
        event.preventDefault()
        // console.log(reqData)
        const API_URL = process.env.API_URL
        const API_KEY = process.env.API_KEY
        // fetch request
        const url_query = API_URL + `${reqData.from}_${reqData.to}&compact=ultra&apiKey=${API_KEY}` 
        
        resetResult()

        axios.get(url_query, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            // console.log(res.data)
            // console.log(typeof(res.data))
            const response = res.data

            const resKey = Object.keys(response)

            // const dataKey = resKey[0] 

            const resVal = Object.values(response)

            const dataVal = resVal[0]

            // console.log(dataKey)
            // console.log('...and..')
            // console.log(dataVal)


            setResult({
                ...result,
                rfrom: reqData.from,
                rto: reqData.to,
                rammount: reqData.ammount,
                rate: dataVal,
                req: true
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }


    // useEffect
    useEffect(() => {
        // set calc
        if(result.req === true){
            let calc_val = result.rammount * result.rate
            console.log(calc_val)

            setCalc({
                ...calc,
                ammount: result.rammount,
                rate: result.rate,
                curr_from: result.rfrom,
                curr_to: result.rto,
                res: calc_val
            })
        }
    }, [result])


    return(
        <AppLayout>
            <Form className="d-flex flex-column my-4" onChange={onChangeData} onSubmit={convertReq}>
                <Row>
                    <Col md={12} sm={12} lg={5} className="ml-auto">
                        <Form.Group controlId="from">
                            <Form.Label>From</Form.Label>
                            <Form.Control type="number" placeholder="Input ammount" name="ammount" />
                            <Form.Control as="select" className="mt-2" name="from">
                                <option key="from">Select...</option>
                                { currencies.map(curr => (<option value={ curr.code } key={ curr.code }>{ `(${curr.code}) ${curr.name}` }</option>)) }
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={12} sm={12} lg={5} className="mr-auto">
                        <Form.Group controlId="from">
                            <Form.Label>To</Form.Label>
                            <Form.Control as="select" name="to">
                                <option key="to">Select...</option>
                                { currencies.map(curr => (<option value={ curr.code } key={ curr.code }>{ `(${curr.code}) ${curr.name}` }</option>)) }
                            </Form.Control>
                            <Button variant="primary" type="submit" className="mt-2">Convert</Button>
                        </Form.Group>
                    </Col>

                    { calc.res === 0 ? (null) : (
                        <Col className="mx-auto d-flex justify-content-center align-items-center flex-column" md={5}>
                            <Form.Label>Result </Form.Label>
                            <Form.Text className="text-bold txt-lg text-success"> { calc.res.toFixed(2) } ({ calc.curr_to }) </Form.Text>
                        </Col>
                    )}

                </Row>
            </Form>

        </AppLayout>
    )
}

export default Home