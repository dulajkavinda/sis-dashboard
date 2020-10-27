import React from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BiUserVoice } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/"></a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/" style={{ fontSize: 20 }}>
                Interviews <BiUserVoice />
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/archives" style={{ fontSize: 20 }}>
                Archives <BiHistory />
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                href="/questions"
                style={{ fontSize: 20 }}
              >
                Questions <RiQuestionAnswerLine />
              </a>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/" style={{ fontSize: 30 }}>
                <AiFillHome />
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/" style={{ fontSize: 30 }}>
                <FiLogOut />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
