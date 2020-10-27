import React, { useState, useEffect } from "react";
import { getCandidates, deleteCandidate } from "../api/Operations";
import { CDataTable, CButton, CCollapse, CCardBody } from "@coreui/react";
import { MdMoreVert } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { HiUserRemove } from "react-icons/hi";

const ArchiveCandidate = (props) => {
  const [list, setList] = useState([]);

  useState(() => {
    getCandidates(props.match.params.name).then((res) => {
      setList(res);
    });
  }, []);

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
    { key: "name", _style: { width: "40%" } },
    { key: "email", _style: { width: "40%" } },
    { key: "oraltestscore", _style: { width: "40%" } },
    { key: "writtenscore", _style: { width: "40%" } },
    { key: "expertarea", _style: { width: "40%" } },
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
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div style={{ marginTop: 40, marginLeft: 120, marginRight: 120 }}>
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
          },
        }}
      />
    </div>
  );
};

export default ArchiveCandidate;
