const EXPERTISE_BASE_URL = 'https://expert-areas-backend.herokuapp.com';
const WRITTEN_BASE_URL = 'https://written-test-backend.herokuapp.com';

// Get all predictions
function getPredictions(interview, ids) {
    const predictions = fetch(EXPERTISE_BASE_URL + '/expertise/add/keywords',
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify({
                "interview_id": interview,
                "candidates": ids
            })
        })
        .then(res => res.json())
        .then(response => {
            return response
        })
        .catch(error => console.log(error));

    return predictions;
}

// Get candidate list for a selected interview
function getCandidates(id) {
    const candidates = fetch(EXPERTISE_BASE_URL + '/getCandidates/' + id)
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));
    return candidates;
}

// Get list of interviews
function getInterviews() {
    let interviews = fetch(EXPERTISE_BASE_URL + `/getInterviews`,
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));

    return interviews;
}

// Insert a new question
function addQuestion(details) {
    let result = fetch(WRITTEN_BASE_URL + '/written/add-qna',
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));
    return result;
}

// Get random questions
function getRandomQuestions() {
    let questions = fetch(WRITTEN_BASE_URL + `/written/get-random-questions`,
        {
            method: "GET"
        })
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));

    return questions;
}

// Send questions and answers for marking
function sendQuestions(candidate, interviewId, answers) {
    let result = fetch(WRITTEN_BASE_URL + `/written/check`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify({ "candidate": candidate, "interview": interviewId, "answers": answers })
        })
        .then(res => res.json())
        .then(response => {
            return response;
        })
        .catch(error => console.log(error));

    return result;
}

module.exports = {
    getPredictions,
    getCandidates,
    getInterviews,
    addQuestion,
    getRandomQuestions,
    sendQuestions
};