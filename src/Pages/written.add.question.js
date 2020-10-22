import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import api from '../api/api';

const AddQuestion = props => {

    const [details, setDetails] = useState({})

    async function onSubmit(e){
        e.preventDefault();
        // Insert a new question
        let resp = await api.addQuestion(details);
        console.log(resp);
    }

    const handleChange = e => {
        let temp = details;
        temp[e.target.id] = e.target.value
        setDetails(temp)
    }

    return (
        <div className="App">
            <Form onSubmit={onSubmit}>
                <div>
                    <Form.Group align="left" controlId="question">
                        <Form.Label>Question:</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter question" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group align="left" controlId="answer">
                        <Form.Label>Answer:</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter answer" onChange={handleChange} />
                    </Form.Group>
                </div>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
        </div>
    );
};

AddQuestion.propTypes = {

};

export default AddQuestion;