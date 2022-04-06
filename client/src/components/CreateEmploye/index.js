import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import avatarDefault from "../../avatar-default.svg";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/userContext";

function CreationEmploye(props) {
  const [preNom, setPreNomValue] = useState("");
  const [nom, setNomValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [role, setRoleValue] = useState("");
  /*  const [roleFr, setRoleFrValue] = useState(""); */
  const [telephone, setTelephoneValue] = useState("");
  /*   const [linkedin, setLinkedinValue] = useState(""); */
  const [avatarValue, setAvatarValue] = useState(avatarDefault);

  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);

  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  const avatar = imageUrl ? imageUrl : avatarValue;

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    const CLOUDINARY_UPLOAD_PRESET = "tdwt4k84";
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const options = {
      method: "POST",
      body: formData,
    };
    // replace cloudname with your Cloudinary cloud_name
    fetch("https://api.cloudinary.com/v1_1/lift/image/upload", options)
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
        setImageAlt(`An image of ${res.original_filename}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.location.id) {
      const fetchData = async () => {
        await axios
          .get("/employes/" + props.location.id.id)
          .then((res) => {
            setPreNomValue(res.data.preNom);
            setNomValue(res.data.nom);
            setEmailValue(res.data.email);
            setRoleValue(res.data.role);
            /*   setRoleFrValue(res.data.roleFr); */
            setTelephoneValue(res.data.telephone);
            /*       setLinkedinValue(res.data.linkedin); */
            setAvatarValue(res.data.avatar);
          })
          .catch((error) => console.log(error));
      };

      fetchData();
    }
  }, [props.location.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("nom: " + nom);

    const user = {
      preNom,
      nom,
      email,
      role,
      /*       roleFr, */
      telephone,
      /*       linkedin, */
      avatar: avatar !== "" ? avatar : avatarValue,
      value: preNom + " " + nom,
    };

    if (props.location.id) {
      axios
        .post("/employes/update/" + props.location.id.id, user)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    } else {
      axios
        .post("/employes/add", user)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    }

    if (props.location.id) {
      alert("Member updated!");
    } else {
      alert("Member added!");
    }

    setTimeout(function () {
      history.push("/");
    }, 300);
  };

  return (
    <div className="container pb-5 ">
      <h1 className="mt-5 text-center">
        {props.location.id ? `Edit team member` : `Add a team member`}
      </h1>
      <Link className="text-info" to={"/"}>
        <span>&#8592;</span>&nbsp;back
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <main className="upload-form">
            <section className="left-side">
              <form>
                <div className="form-group" style={{ margin: 0 }}>
                  <input type="file" />
                </div>

                <button
                  type="button"
                  className="btn btn-outline-secondary "
                  onClick={handleImageUpload}
                >
                  Upload
                </button>
              </form>
            </section>
            <section className="right-side">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="displayed-image"
                  width="92"
                  height="92"
                />
              ) : (
                <img
                  src={avatarValue}
                  alt={imageAlt}
                  className="displayed-image"
                  width="92"
                  height="92"
                />
              )}
            </section>
          </main>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">First Name</label>
          <input
            value={preNom}
            onChange={(e) => setPreNomValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Dominique "
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Last Name</label>
          <input
            value={nom}
            onChange={(e) => setNomValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=" Tardif"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmailValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="dominiquetardif@hotmail.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Job title</label>
          <input
            value={role}
            onChange={(e) => setRoleValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Director"
          />
        </div>
        {/*         <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Role FR</label>
          <input
            value={roleFr}
            onChange={(e) => setRoleFrValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Directeur"
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Phone</label>
          <input
            value={telephone}
            onChange={(e) => setTelephoneValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="(514) 777-7777"
          />
        </div>
        {/*         <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Linkedin</label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedinValue(e.target.value)}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="https://www.linkedin.com/in/john-doe/"
          />
        </div> */}
        <button type="submit" className="btn btn-outline-success">
          {props.location.id ? `Update` : `Add`}
        </button>
      </form>
    </div>
  );
}

export default CreationEmploye;
