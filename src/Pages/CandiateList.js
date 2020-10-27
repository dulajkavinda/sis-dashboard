import React, { useState, useEffect } from "react";
import {
  getCandidates,
  deleteCandidate,
  createCandidate,
  updateCandidate,
} from "../api/Operations";
import {
  CDataTable,
  CButton,
  CCollapse,
  CCardBody,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTooltip,
} from "@coreui/react";
import { MdMoreVert } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { HiUserRemove } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { Redirect } from "react-router-dom";

const CandidateList = (props) => {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [formmodal, setFormmodal] = useState(false);
  const [editformmodal, setEditformmodal] = useState(false);
  const [candiddatename, setCandiddatename] = useState("");
  const [email, setEmail] = useState("");
  const [ecandiddatename, setEcandiddatename] = useState("");
  const [eemail, setEemail] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const toggleFotm = () => {
    setFormmodal(!formmodal);
  };

  const toggleEditForm = () => {
    setEditformmodal(!editformmodal);
  };

  useState(() => {
    getCandidates(props.match.params.name).then((res) => {
      console.log(props.match.params.name);
      setList(res);
    });
  }, []);

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
    { key: "name", _style: { width: "35%" } },
    { key: "email", _style: { width: "35%" } },
    { key: "oralstate", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "30%" },
      sorter: false,
      filter: false,
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case false:
        return "success";
      case true:
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <div style={{ marginTop: 40, marginLeft: 120, marginRight: 120 }}>
      <CModal show={formmodal} onClose={toggleFotm}>
        <CModalHeader closeButton>Add New Candidate</CModalHeader>
        <CModalBody>
          <form onSubmit={(e) => e.preventDefault && false}>
            <div className="form-group">
              <label for="name">Candidate's Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                aria-describedby="emailHelp"
                placeholder="Name"
                value={candiddatename}
                onChange={(e) => {
                  setCandiddatename(e.target.value);
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter candidates name on CV
              </small>
            </div>
            <div className="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={() => {
                createCandidate(props.match.params.name, candiddatename, email);
                toggleFotm();
              }}
            >
              Add Candidate
            </button>
          </form>
        </CModalBody>
      </CModal>
      <button className="btn btn-outline-dark" onClick={toggleFotm}>
        Add Candidate
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
          oralstate: (item) => (
            <td>
              <CBadge shape="pill" color={getBadge(item.oralstate)}>
                {item.oralstate ? "Completed" : "Pending"}
              </CBadge>
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="lg"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Actions"}
                  <MdMoreVert />
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            if (item.oralstate) {
              return (
                <>
                  <CCollapse show={details.includes(index)}>
                    <td className="py-2">
                      <a
                        className="btn btn-info"
                        type="button"
                        style={{ marginRight: 15 }}
                        onClick={() => toggle()}
                      >
                        View Details <HiViewList />
                      </a>
                      <a
                        href={`/candiates/${props.match.params.name}`}
                        className="btn btn-danger"
                        onClick={() =>
                          deleteCandidate(item._id, props.match.params.name)
                        }
                      >
                        Remove Candidate <HiUserRemove />
                      </a>
                    </td>
                  </CCollapse>
                  <CModal show={modal} onClose={toggle}>
                    <CModalHeader closeButton>{item.name}</CModalHeader>
                    <CModalBody>
                      Oral Test Socore: {item.oraltestscore}
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={toggle}>
                        Cancel
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </>
              );
            } else {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <CModal show={editformmodal} onClose={toggleEditForm}>
                      <CModalHeader closeButton>Edit Candidate</CModalHeader>
                      <CModalBody>
                        <form onSubmit={(e) => e.preventDefault && false}>
                          <div className="form-group">
                            <label for="name">Candidate's Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Name"
                              value={
                                ecandiddatename ? ecandiddatename : item.name
                              }
                              onChange={(e) => {
                                setEcandiddatename(e.target.value);
                              }}
                              onSubmit={(e) => {
                                setEcandiddatename(e.target.value);
                              }}
                            />
                            <small
                              id="emailHelp"
                              className="form-text text-muted"
                            >
                              Enter candidates name on CV
                            </small>
                          </div>
                          <div className="form-group">
                            <label for="email">Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="example@example.com"
                              value={eemail ? eemail : item.email}
                              onChange={(e) => {
                                setEemail(e.target.value);
                              }}
                              onSubmit={(e) => {
                                setEemail(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-success btn-block"
                            onClick={() => {
                              updateCandidate(
                                item._id,
                                props.match.params.name,
                                ecandiddatename,
                                eemail
                              );
                              toggleEditForm();
                            }}
                          >
                            Update Details
                          </button>
                        </form>
                      </CModalBody>
                    </CModal>
                    <a
                      className="btn btn-success"
                      type="button"
                      href={`/quiz/${props.match.params.name}/${item._id}`}
                      style={{ marginRight: 15 }}
                    >
                      Process Interview <VscDebugStart />
                    </a>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={toggleEditForm}
                    >
                      Edit Candidate <AiFillEdit />
                    </button>
                    <a
                      href={`/candiates/${props.match.params.name}`}
                      className="btn btn-danger"
                      onClick={() =>
                        deleteCandidate(item._id, props.match.params.name)
                      }
                    >
                      Remove Candidate <HiUserRemove />
                    </a>
                  </CCardBody>
                </CCollapse>
              );
            }
          },
        }}
      />
    </div>
  );
};

export default CandidateList;
