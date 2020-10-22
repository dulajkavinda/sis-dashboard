import React, { useState, useEffect } from 'react';
import { CDataTable, CBadge } from '@coreui/react';
import { Form, Col } from 'react-bootstrap';

import LoaderSpinner from './extra/loader.spinner';
import api from '../api/api';

const ResultDashboard = props => {
    const [details, setDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        async function fetchData(){
            // Get all interviews
            let result = await api.getInterviews();
            setInterviews(result)
            setIsLoading(false)
        }

        fetchData();
    }, [])

    const fields = [
        { key: 'name', _style: { width: '30%' } },
        { key: 'email', _style: { width: '20%' } },
        { key: 'writtenscore', label: 'Written Score' },
        { key: 'writtenstatus', label: 'Written Interview' }
    ]

    const createOptions = () => {
        let options = []
        let i = 0
        interviews.forEach(element => {
            options.push(<option key={i++}>{element}</option>)
        })

        return options
    }

    const getStatus = (status) =>{
        if(status)
            return 'success'
        else
            return 'secondary'
    }

    const getBadge = (status) =>{
        if(status)
            return 'Completed'
        else
            return 'Not Completed'
    }

    async function handleChange(e){
        e.preventDefault()
        let id = e.target.value

        // Get candidate list for a selected interview
        let candidates = await api.getCandidates(id);
        setDetails(candidates);
    }

    let content;

    if (isLoading) {
        content = <LoaderSpinner />
    } else {
        content = <div  className="App">
            <h2 style={{ marginBottom: 30 }}>Written Test Scores</h2>
            <div float="left">
                <Form>
                    <Form.Row>
                        <Col xs={7}>
                            <Form.Group controlId="interview">
                                <Form.Row>
                                    <Col xs="auto" style={{ marginTop: 6 }}>
                                        <Form.Label>Interview:</Form.Label>
                                    </Col>
                                    <Col xs={3}>
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
                itemsPerPageSelect={true}
                itemsPerPage={5}
                hover
                sorter
                responsive={true}
                border={true}
                pagination
                scopedSlots={{
                    'writtenstatus':
                        (element) => (
                            <td>
                                <CBadge color={getStatus(element['writtenstate'])}>
                                    {getBadge(element['writtenstate'])}
                                </CBadge>
                            </td>
                        )
                }}
            />
        </div>
    }

    return (
        <div>
            {content}
        </div>
    );

}

ResultDashboard.propTypes = {

};

export default ResultDashboard;