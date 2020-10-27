import React, { useState, useEffect } from 'react';
import { CButton, CDataTable, CBadge } from '@coreui/react';
import { Form, Col, Card, Spinner } from 'react-bootstrap';

import api from '../api/api';

import 'bootstrap/dist/css/bootstrap.min.css';

const SortedList = () => {
    const [details, setDetails] = useState([])
    const [interviews, setInterviews] = useState([])
    const [interview, setInterview] = useState({})
    const [loading, setLoading] = useState(false)
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        async function fetchData() {
            let response = await api.getInterviews();
            setInterviews(response);
        }

        fetchData();
    }, []);

    const fields = [
        { key: 'name', _style: { width: '30%' } },
        { key: 'email', _style: { width: '20%' } },
        { key: 'overallscore', label: 'Overall Score' },
        { key: 'oralstatus', label: 'Oral Interview' },
        { key: 'writtenstatus', label: 'Written Interview' },
        { key: 'expertarea', label: 'Expert Area' }
    ]

    async function handleChange(e) {
        e.preventDefault()
        let id = e.target.value;

        let response = await api.getCandidates(id);
        setInterview(id)
        setDetails(response)
        setCandidates(response)
    }

    const createOptions = () => {
        let options = []
        let i = 0
        interviews.forEach(element => {
            options.push(<option key={i++}>{element}</option>)
        })

        return options
    }

    const createPredictButton = () => {
        if (details.length === 0) {
            return <p></p>
        } else {
            return (<div style={{ float: "left" }}><CButton size="md" color="info" onClick={predict}>Predict</CButton></div>)
        }
    }

    const predicting = () => {
        if (loading) {
            return (<div><Spinner style={{ float: "left", marginLeft: 10, marginTop: 5 }} animation="border" role="status" variant="primary"><span className="sr-only">Loading...</span></Spinner><p style={{ fontWeight: "bold", float: "left", marginLeft: 5, marginTop: 8 }}>Predicting...</p></div>)
        } else {
            return <div></div>
        }
    }

    const getStatus = (status) => {
        if (status)
            return 'success'
        else
            return 'secondary'
    }

    const getBadge = (status) => {
        if (status)
            return 'Completed'
        else
            return 'Not Completed'
    }

    const handleDomainChange = e => {
        e.preventDefault()
        let list = []
        candidates.forEach(element => {
            if (element['expertarea'] === e.target.value) {
                list.push(element)
            }
        })

        setDetails(list)
        list = []
        if (e.target.value === 'Choose...')
            setDetails(candidates)
    }

    async function predict(e){
        e.preventDefault()
        let ids = []
        setLoading(true)
        details.forEach((ele) => {
            if (typeof ele['expertarea'] === 'undefined')
                ids.push(ele["_id"])
        })
        let response = api.getPredictions(interview, ids);
        setDetails(response)
        setLoading(false)
    }

    return (
        <Card>
            <Card.Body>
                <div>
                    <div float="left">
                        <Form>
                            <Form.Row>
                                <Col xs="auto">
                                    <Form.Group controlId="domain">
                                        <Form.Row>
                                            <Col xs="auto" style={{ marginTop: 6 }}>
                                                <Form.Label>Domain:</Form.Label>
                                            </Col>
                                            <Col xs="auto">
                                                <Form.Control as="select" style={{ paddingBottom: 10, cursor: "pointer" }} onChange={handleDomainChange}>
                                                    <option>Choose...</option>
                                                    <option>Automobile</option>
                                                    <option>Medicine</option>
                                                    <option>Space</option>
                                                    <option>Graphics</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                </Col>
                                <Col xs={7}>
                                    <Form.Group controlId="interview">
                                        <Form.Row>
                                            <Col xs="auto" style={{ marginTop: 6 }}>
                                                <Form.Label>Interview:</Form.Label>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Control as="select" placeholder="interview" style={{ paddingBottom: 10, cursor: "pointer" }} onChange={handleChange}>
                                                    <option>Choose...</option>
                                                    {
                                                        createOptions()
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                    <CDataTable
                        items={details}
                        fields={fields}
                        itemsPerPageSelect
                        itemsPerPage={5}
                        hover
                        sorter
                        pagination
                        responsive={true}
                        border={true}
                        scopedSlots={{
                            'oralstatus':
                                (element) => (
                                    <td>
                                        <CBadge color={getStatus(element['oralstate'])}>
                                            {getBadge(element['oralstate'])}
                                        </CBadge>
                                    </td>
                                ),
                            'writtenstatus':
                                (element) => (
                                    <td>
                                        <CBadge color={getStatus(element['writtenstate'])}>
                                            {getBadge(element['writtenstate'])}
                                        </CBadge>
                                    </td>
                                ),
                            'expertarea':
                                (element) => {
                                    if (element['expertarea'] === null || element['expertarea'] === '') {
                                        return <td></td>
                                    } else {
                                        return <td>{element['expertarea']}</td>
                                    }
                                }

                        }}
                    />
                    {
                        createPredictButton()
                    }
                    {
                        predicting()
                    }
                </div>
            </Card.Body>
        </Card>
    );
};



export default SortedList;