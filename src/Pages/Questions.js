import React, { useState, useEffect } from "react";
import {
  getAllQuestions,
  getInterviews,
  addQuestion,
  deleteQuiz,
} from "../api/Operations";
import {
  CDataTable,
  CButton,
  CCollapse,
  CCardBody,
  CModalBody,
  CModalHeader,
  CModal,
} from "@coreui/react";
import { AiFillEdit } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Questions = (props) => {
  const [list, setList] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formmodal, setFormmodal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");

  useState(() => {
    getInterviews().then((result) => {
      setInterviews(result);
    });
  }, []);

  const handleSelect = (e) => {
    getAllQuestions(e).then((res) => {
      setList(res);
    });
    setSelected(e);
  };

  const toggleFotm = () => {
    setFormmodal(!formmodal);
  };

  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "question", _style: { width: "40%" } },
    { key: "def_ans", _style: { width: "40%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "30%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div style={{ marginTop: 40, marginLeft: 120, marginRight: 120 }}>
      {selected ? (
        <h3 style={{ marginBottom: 20 }}>
          Question Set For <span className="badge badge-dark">{selected}</span>{" "}
        </h3>
      ) : (
        <p></p>
      )}
      <DropdownButton
        alignRight
        title="Select Interview"
        id="dropdown-menu-align-right"
        variant="outline-dark"
        onSelect={handleSelect}
      >
        {interviews.map((item, i) => {
          return (
            <Dropdown.Item eventKey={item.name}>{item.name}</Dropdown.Item>
          );
        })}
      </DropdownButton>
      <CModal show={formmodal} onClose={toggleFotm}>
        <CModalHeader closeButton>Add Question</CModalHeader>
        <CModalBody>
          <form onSubmit={(e) => e.preventDefault && false}>
            <div className="form-group">
              <label for="question">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                name="question"
                aria-describedby="emailHelp"
                placeholder="Question"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="answer">Pre-defined Answer</label>
              <input
                type="answer"
                className="form-control"
                id="answer"
                name="answer"
                placeholder="Pre-defined Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="keyword">Add Keyword</label>
              <input
                type="keyword"
                className="form-control"
                id="keyword"
                name="keyword"
                placeholder="Enter Keywords An"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />

              {keywords.map((item) => {
                return (
                  <span
                    class="badge badge-pill badge-success"
                    style={{ marginLeft: 5 }}
                  >
                    {item}{" "}
                  </span>
                );
              })}
              <button
                className="btn btn-outline-success"
                type="button"
                style={{ marginTop: 10, marginBottom: 10 }}
                onClick={() => {
                  setKeywords([...keywords, keyword]);
                  setKeyword("");
                }}
              >
                <RiAddLine />
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={() => {
                {
                  addQuestion(selected, question, keywords, answer);
                  console.log(selected);
                }
                toggleFotm();
              }}
            >
              Add Question
            </button>
          </form>
        </CModalBody>
      </CModal>
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          toggleFotm();
        }}
        style={{ marginRight: 10 }}
      >
        Add Question
      </button>
      <CDataTable
        items={list}
        fields={fields}
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Actions"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <a
                    href={`/candidatearchives/${props.match.params.name}`}
                    className="btn btn-warning"
                    style={{ marginRight: 20 }}
                    onClick={() => {
                      /* deleteCandidate(item._id, props.match.params.name) */
                    }}
                  >
                    Edit Question <AiFillEdit />
                  </a>
                  <a
                    href={`/Questions`}
                    className="btn btn-danger"
                    onClick={() => {
                      deleteQuiz(item._id, selected);
                    }}
                  >
                    Delete Question <HiUserRemove />
                  </a>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </div>
  );
};

export default Questions;
