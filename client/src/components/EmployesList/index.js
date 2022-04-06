import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import avatarDefault from "../../avatar-default.svg";
import UserContext from "../../context/userContext";

function EmployeList(props) {
  const [employeData, setEmployeData] = useState([]);
  const [nomValue, setNomValue] = useState("");
  const [state, setState] = useState(true);

  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

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

  console.log(employeData);

  function deleteFilm(id) {
    axios.delete("/employes/" + id).then((res) => {
      console.log("Employés deleted");
    });
    setEmployeData(employeData.filter((employe) => employe._id !== id));
  }

  const ListEmployes = (_id) => {
    return (
      nomValue !== ""
        ? employeData.filter((nom) => nom.value === nomValue)
        : employeData
    )
      .slice(0)
      .reverse()
      .map((employe) => (
        <tr key={employe._id}>
          <td style={{ fontSize: "14px" }} className="align-middle">
            <img
              src={employe.avatar ? employe.avatar : avatarDefault}
              alt={employe.preNom + " " + employe.nom}
              width="76"
              height="76"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />{" "}
          </td>
          <td style={{ fontSize: "14px" }} className="align-middle">
            {employe.preNom}
          </td>
          <td style={{ fontSize: "14px" }} className="align-middle">
            {employe.nom}
          </td>
          <td style={{ fontSize: "14px" }} className="align-middle">
            {employe.email}
          </td>
          <td style={{ fontSize: "14px" }} className="align-middle">
            {employe.role}
          </td>

          <td style={{ fontSize: "14px" }} className="align-middle">
            {employe.telephone}
          </td>

          <td
            style={{ fontSize: "14px", border: "none" }}
            className="align-middle d-flex mt-3"
          >
            <Link
              to={{
                pathname: "/ajouter-employe/" + employe._id,
                id: { id: employe._id },
              }}
            >
              <button
                class="btn btn-secondary btn-sm rounded-0 mr-2"
                type="button"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              >
                <i class="fa fa-edit"></i>
              </button>
            </Link>

            <button
              onClick={() =>
                window.confirm(
                  "Êtes-vous sûr de vouloir supprimer cet élément ?"
                ) && deleteFilm(employe._id)
              }
              class="btn btn-danger btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <div className="container" /* style={{ maxWidth: "1300px" }} */>
      {state === true ? (
        <p className="mt-5">Loading...</p>
      ) : (
        <>
          <h1 className="mt-5 mb-2 text-center">Employés</h1>

          <div className=" mt-4 pb-3 ">
            <span className="text-info">+</span>{" "}
            <Link className="text-info" to="/ajouter-employe">
              Ajouter un employé
            </Link>
          </div>

          <div className="pb-3">
            <ReactSearchBox
              placeholder="Recherche..."
              onChange={(value) => setNomValue(value)}
              data={employeData}
              callback={(record) => console.log(record)}
            />
          </div>
          <table
            className="table table-bordered table-striped"
            style={{ height: "80px" }}
          >
            <thead>
              <tr>
                <th className="align-middle">Avatar</th>
                <th className="align-middle">Prénom</th>
                <th className="align-middle">Npm</th>
                <th className="align-middle">Courriel</th>
                <th style={{ width: "14%" }} className="align-middle">
                  Fonction
                </th>
                {/*           <th tyle={{ width: "" }}>Role FR</th> */}
                <th style={{ width: "12%" }} className="align-middle">
                  Phone
                </th>
                {/*        <th className="align-middle">Linkedin</th> */}
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>{ListEmployes()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default EmployeList;
