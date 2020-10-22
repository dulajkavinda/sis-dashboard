import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import LoaderSpinner from './extra/loader.spinner';
import api from '../api/api';

const ExamView = props => {

    let map = new Map();
    let { candidate, interviewId } = useParams();

    const [answers, setAnswers] = useState([])
    const [elements, setElements] = useState([])
    const [show, setShow] = useState(false);
    const history = useHistory()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCompleteClose = () => {
        setShow(false)
        history.push('/written-test/completed')
    };

    useEffect(() => {
       async function fetchData(){
           // Get random set of questions
           let questions = await api.getRandomQuestions();
           setElements(questions);
       }

       fetchData();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        let ansObj;
        handleShow()
        for (let key of map.keys()) {
            ansObj = {
                "_id": key,
                "answer": map.get(key)
            }
            answers.push(ansObj)
            setAnswers([...answers, answers]);
        }

        // Send questions and answers for marking.
        let result = await api.sendQuestions(candidate, interviewId, answers);
        console.log(result);
    }

    function handleChange(event) {
        event.preventDefault();
        map.set(event.target.id, event.target.value)
    }


    if (elements.length === 0) {
        return <LoaderSpinner/>;
    } else {
        return (
            <div className="App">

                <Form onSubmit={handleSubmit}>
                    {elements.map((elem) => (
                        <div key={elem["_id"]}>
                            <Form.Group align="left" controlId={elem["_id"]}>
                                <Form.Label>{elem["question"]}</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter answer" onChange={handleChange} />
                            </Form.Group>
                        </div>
                    ))}
                    <Button type="submit">Add</Button>
                    {
                        <div>
                            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title><span className="modal_title">Finish Attemp?</span></Modal.Title>
                                </Modal.Header>
                                <Modal.Body><span style={{ fontSize: 18 }}>Please note that after you finish your attempt, you will not be able to change your answers.</span></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleCompleteClose}>
                                        Finish Attempt
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                            </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    }
                </Form>

            </div>
        );
    }

}

ExamView.propTypes = {
    elements: PropTypes.array
};

export default ExamView;