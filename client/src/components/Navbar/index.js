import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import AuthOptions from "../Auth/AuthOptions";

const liveStream = {
  color: "#36f116",
};

function Navbar(props) {
  const [isOpen, setIsOpen] = useState("collapse");

  const toggleTrueFalse = () => setIsOpen(!isOpen);

  let location = useLocation();

  return location.pathname.includes("signatures") ? null : (
    <>
      <nav
        style={{ backgroundColor: "#0c353e", color: "#ffffff" }}
        className="navbar navbar-expand-sm navbar-light  justify-content-between "
      >
        <Link style={{ color: "#ffffff" }} className="navbar-brand" to="/">
          LIFT Email Signature Generator
          <div
            style={{
              width: "128px",
              fontSize: ".8rem",
              display: "flex",
              alignItem: "center",
            }}
          >
            <span>by&nbsp; </span> Bivouac Studio &nbsp;{" "}
            <img
              class=""
              style={{ width: "16px", objectFit: "contain" }}
              src="/favicon.ico"
              alt="Bivouac Studio"
            ></img>
          </div>
        </Link>

        {/*         {location.pathname !== "/login" && (
          <Link
            to="liste"
            style={{ color: "#ffffff" }}
            className="nav-link"
            href="/signatures/lift"
          >
            <button class="btn btn-outline-info  btn-sm ">
              <span style={liveStream}>&#8226; </span>Team list{" "}
              <span className="sr-only">(current)</span>
            </button>
          </Link>
        )} */}
        {/*         <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleTrueFalse}
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div
          id="navbarNav"
          className="d-flex v-align-center align-items-center"
        >
          {location.pathname !== "/login" && (
            <a
              style={{ color: "#ffffff" }}
              className="nav-link"
              href="/signatures/lift"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button class="btn btn-outline-info  btn-sm ">
                <span style={liveStream}>&#8226; </span>Signatures{" "}
                <span className="sr-only">(current)</span>
              </button>
            </a>
          )}
          {location.pathname !== "/login" && <AuthOptions />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
