import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CountdownTimer from "react-component-countdown-timer";
import {
  getQuestions,
  voiceProcess,
  addAnswers,
  changeOralState,
} from "../api/Operations";
import { useAlert } from "react-alert";
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { VscDebugStart } from "react-icons/vsc";
import { ImStop } from "react-icons/im";
import { VscSave } from "react-icons/vsc";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const QuizList = (props) => {
  const [list, setList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [startR, setStartR] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [evaluated, setEvaluated] = useState({});
  const [total, setTotal] = useState(0);

  const alert = useAlert();

  useEffect(() => {
    getQuestions(props.match.params.id).then((res) => {
      setList(res);
    });
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
      console.log(answer);
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = (id, name, ans) => {
    addAnswers(name, id, ans).then((res) => {
      setSavedNotes([...savedNotes, evaluated]);
      console.log(total);
      alert.success("done!");
    });
    setEvaluated({});
    setNote("");
  };

  const handeleActive = (i) => {
    setIsListening(true);
    setAnswer([...answer, `active ${i}`]);
  };

  const handeleDisable = (i, name, id, voice) => {
    voiceProcess(name, id, voice)
      .then((res) => {
        setEvaluated(res);
        calculateTotal(res);
      })
      .then(() => {
        setIsListening(false);
        answer[i] = `disable ${i}`;
      });
  };

  const calculateTotal = (result) => {
    setTotal(total + result[3]);
  };

  return (
    <div style={{ marginLeft: 220, marginRight: 220, marginTop: 40 }}>
      {list.map((item, i) => {
        return (
          <div class="card box" style={{ marginTop: 20 }}>
            <div class="card-body">
              <h4>{item.question}</h4>
              {isListening && answer[i] === `active ${i}` ? (
                <span>
                  <FiMic />
                  <FcCheckmark />
                </span>
              ) : (
                <span>
                  <FiMicOff />
                </span>
              )}
              {answer[i] === `active ${i}` ? (
                <div>
                  <p>{note}</p>
                  <button className="btn btn-warning btn-lg" disabled={true}>
                    Save <VscSave />
                  </button>
                </div>
              ) : answer[i] === `disable ${i}` ? (
                <div>
                  <h6>
                    Completed <FcOk />
                  </h6>
                  <form onSubmit={(e) => e.preventDefault() && false}>
                    <input
                      type="hidden"
                      name="answer"
                      value={JSON.stringify({ answer: evaluated })}
                    />
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={() =>
                        handleSaveNote(
                          props.match.params.id,
                          props.match.params.candidateid,
                          JSON.stringify(evaluated)
                        )
                      }
                      type="submit"
                    >
                      Save <VscSave />
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <p></p>
                </div>
              )}

              <button
                className="btn btn-danger btn-lg"
                style={{ marginRight: 20 }}
                onClick={() =>
                  handeleDisable(i, props.match.params.id, item._id, note)
                }
              >
                Stop <ImStop />
              </button>
              <button
                className="btn btn-success btn-lg"
                style={{ marginRight: 20 }}
                onClick={() => handeleActive(i)}
              >
                Start Recording
                <VscDebugStart />
              </button>
            </div>
          </div>
        );
      })}
      <div class="row justify-content-center">
        <button
          className="btn btn-lg btn-outline-info"
          style={{
            marginTop: 20,
            height: 60,
            width: 400,
            fontSize: 30,
            marginBottom: 50,
            marginRight: 20,
          }}
          onClick={() => {
            changeOralState(
              props.match.params.candidateid,
              props.match.params.id,
              total / 10
            );
            alert.success("Interview Completed!");
          }}
          type="button"
        >
          Finish Interview <FaRegCalendarCheck />
        </button>
        <a
          className="btn btn-lg btn-outline-primary"
          style={{
            marginTop: 20,
            height: 60,
            width: 400,
            fontSize: 30,
            marginBottom: 50,
          }}
          href={`/candiates/${props.match.params.id}`}
        >
          Home <BiHome />
        </a>
      </div>
    </div>
  );
};

export default QuizList;
