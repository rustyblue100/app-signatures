import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
          Générateur de signature de courriels
          <div
            style={{
              width: "128px",
              fontSize: ".8rem",
              display: "flex",
              alignItem: "center",
            }}
          ></div>
        </Link>

        <div
          id="navbarNav"
          className="d-flex v-align-center align-items-center"
        >
          {location.pathname !== "/login" && (
            <a
              style={{ color: "#ffffff" }}
              className="nav-link"
              href="/signatures/folospot"
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
