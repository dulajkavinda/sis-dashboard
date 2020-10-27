import { BASE_URL } from "./Config";

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const getInterviews = async () => {
  try {
    let interview = await fetch(`${BASE_URL}/getInterviews`);
    let rerult = await interview.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const getArchives = async () => {
  try {
    let interview = await fetch(`${BASE_URL}/getArchives`);
    let rerult = await interview.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const getCandidates = async (name) => {
  try {
    let candidate = await fetch(`${BASE_URL}/getCandidates/${name}`);
    let rerult = await candidate.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async (name) => {
  try {
    let question = await fetch(`${BASE_URL}/getQuestions/${name}`);
    let rerult = await question.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuestions = async (name) => {
  try {
    let question = await fetch(`${BASE_URL}/getAllQuestions/${name}`);
    let rerult = await question.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const voiceProcess = async (name, id, voice) => {
  try {
    let question = await fetch(`${BASE_URL}/api/voice/${name}/${id}/${voice}`);
    let rerult = await question.json();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const addAnswers = async (name, id, ans) => {
  try {
    let question = await fetch(
      `${BASE_URL}/addVocalData/${name}/${id}/${ans}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: ans,
      }
    );
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const changeOralState = async (name, id, score) => {
  try {
    let question = await fetch(
      `${BASE_URL}/changeState/${name}/${id}/${score}`,
      requestOptions
    );
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const changeInterviewState = async (name) => {
  try {
    let question = await fetch(
      `${BASE_URL}/changeInterviewState/${name}`,
      requestOptions
    );
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCandidate = async (id, name) => {
  try {
    let question = await fetch(`${BASE_URL}/deleteCandidate/${id}/${name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuiz = async (id, name) => {
  try {
    let question = await fetch(`${BASE_URL}/deleteQuiz/${id}/${name}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const createInterview = async (name, date) => {
  try {
    let question = await fetch(`${BASE_URL}/createInterview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        int_name: name,
        date: date,
      }),
    });
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const createCandidate = async (interview, name, email) => {
  try {
    console.log(interview);
    let question = await fetch(`${BASE_URL}/createCandidate/${interview}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (interview, questions, keywords, answer) => {
  try {
    let question = await fetch(`${BASE_URL}/addQuestion/${interview}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: questions,
        keywords: keywords,
        answer: answer,
      }),
    });
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};

export const updateCandidate = async (id, interview, name, email) => {
  try {
    let question = await fetch(
      `${BASE_URL}/updateCandidate/${id}/${interview}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }
    );
    let rerult = await question.text();
    return rerult;
  } catch (error) {
    console.log(error);
  }
};
