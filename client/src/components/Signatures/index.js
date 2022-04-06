import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Template from "./Template";

function Signatures(props) {
  const [employeData, setEmployeData] = useState([]);
  const [state, setState] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/employes")
        .then((response) => {
          setEmployeData(response.data);
          setState(false);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  return (
    <div className="container" style={{ background: "white !important" }}>
      <div className={"mb-3"}>
        <img
          className={"mt-5"}
          style={{
            marginLeft: 0,
          }}
          src="https://res.cloudinary.com/lift/image/upload/c_scale,w_125/v1598287474/signatures/logos/logo_LIFT_jqscgp.png"
          alt="Lift"
        />
      </div>

      {state === true ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h4
            className={"mb-2"}
            style={{ fontFamily: "Calibri", color: "#00313b" }}
          >
            Write your first name
          </h4>

          <Template />
        </>
      )}
    </div>
  );
}

export default Signatures;
