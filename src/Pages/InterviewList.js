import React, { useState, useEffect } from "react";
import {
  getInterviews,
  changeInterviewState,
  createInterview,
} from "../api/Operations";
import { CDataTable, CCollapse, CCardBody } from "@coreui/react";
import { VscDebugStart } from "react-icons/vsc";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Redirect } from "react-router-dom";

const InterviewList = (props) => {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState([]);
  const [intname, setIntname] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getInterviews().then((res) => {
      setList(res);
      console.log(res);
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
    { key: "name", _style: { width: "40%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "22%" },
      sorter: false,
      filter: false,
    },
  ];

  const createNewInterview = (name, date) => {
    createInterview(name, date).then((res) => {
      return <Redirect to="/" />;
    });
  };

  return (
    <div style={{ marginTop: 40, marginLeft: 120, marginRight: 120 }}>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <form
            className="form-inline"
            onSubmit={(e) => e.preventDefault && false}
          >
            <div className="form-group mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="interview_20200202"
                value={intname}
                onChange={(e) => {
                  setIntname(e.target.value);
                }}
              />
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="date"
                name="date"
                className="form-control"
                id="inputPassword2"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark mb-2"
              onClick={() => createInterview(intname, date)}
            >
              Create Interview
            </button>
          </form>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
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
                  <a
                    className="btn btn-success"
                    type="button"
                    href={`/candiates/${item.name}`}
                    style={{ marginRight: 15 }}
                  >
                    Start Interview <VscDebugStart />
                  </a>
                  <a
                    href="/"
                    className="btn btn-danger"
                    onClick={() => changeInterviewState(item.name)}
                  >
                    Finish Interview <FaRegCalendarCheck />
                  </a>
                </td>
              );
            },
            details: (item, index) => {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody></CCardBody>
                </CCollapse>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default InterviewList;
