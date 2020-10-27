import React, { useState, useEffect } from 'react';
import { CDataTable, CButton, CBadge } from '@coreui/react';
import { Link } from 'react-router-dom';
import { Col, Form } from 'react-bootstrap';

import api from '../api/api';

const WrittenExam = () => {

    const [details, setDetails] = useState([])
    const [interviews, setInterviews] = useState([])
    const [interviewId, setInterviewId] = useState({})

    useEffect(() => {
        async function fetchData() {
            // Get the list of interviews
            let response = await api.getInterviews();
            setInterviews(response);
        }
        
        fetchData();
    }, [])

    const fields = [
        { key: 'name', _style: { width: '40%' } },
        { key: 'email', _style: { width: '20%' } },
        { key: 'status', label: 'Oral Interview' },
        { key: 'show_details', label: '' }
    ]

    async function handleChange(e){
        e.preventDefault()
        setInterviewId(e.target.value)

        // Get candidate list for the selected interview
        let response = await api.getCandidates(e.target.value);
        setDetails(response)
    }

    const createOptions = () => {
        let options = []
        let i = 0
        interviews.forEach(element => {
            options.push(<option key={i++}>{element}</option>)
        })

        return options
    }

    return (
        <div className="App" style={{ marginTop: 10 }}>
            <Form>
                <Form.Group controlId="interview">
                    <Form.Row>
                        <Col xs="auto" style={{ marginTop: 5 }}><h5>Select the interview:</h5></Col>
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
            </Form>

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
                    'status':
                        (item) => (
                            <td>
                                <CBadge color={'success'}>
                                    {'completed'}
                                </CBadge>
                            </td>
                        ),
                    'show_details':
                        (item) => {
                            return (
                                <td className="py-2">
                                    <Link to={`/written-test/exam/${item._id}/${interviewId}`}><CButton size="sm" color="success">Exam Page</CButton></Link>
                                </td>
                            )
                        }
                }}
            />
        </div>
    );
}

export default WrittenExam;