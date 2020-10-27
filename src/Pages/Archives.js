import React, { useState, useEffect } from "react";
import { getArchives, changeInterviewState } from "../api/Operations";
import { CDataTable, CCollapse, CCardBody } from "@coreui/react";
import { HiViewList } from "react-icons/hi";
import { RiRestartLine } from "react-icons/ri";

const ArchiveList = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getArchives().then((res) => {
      setList(res);
      console.log(res);
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
    {
      key: "show_details",
      label: "",
      _style: { width: "22%" },
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
                <a
                  className="btn btn-info"
                  type="button"
                  href={`/candidatearchives/${item.name}`}
                  style={{ marginRight: 15 }}
                >
                  View Details <HiViewList />
                </a>
                <a
                  href="/"
                  className="btn btn-secondary"
                  onClick={() => changeInterviewState(item.name)}
                >
                  Resume <RiRestartLine />
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
  );
};

export default ArchiveList;
