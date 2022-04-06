const router = require("express").Router();
let Employe = require("../models/employe.model");

router.route("/").get((req, res) => {
  Employe.find()
    .then((employes) => res.json(employes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Employe.findById(req.params.id)
    .then((employes) => res.json(employes))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST
router.route("/add").post((req, res) => {
  const {
    avatar,
    preNom,
    nom,
    email,
    role,
    telephone,
    linkedin,
    value,
  } = req.body;

  const newEmploye = new Employe({
    avatar,
    preNom,
    nom,
    email,
    role,
    telephone,
    linkedin,
    value,
  });

  newEmploye
    .save()
    .then(() => res.json("Employe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE
router.route("/:id").delete((req, res) => {
  Employe.findByIdAndDelete(req.params.id)
    .then((employes) => res.json("Employes deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE
router.route("/update/:id").post((req, res) => {
  Employe.findById(req.params.id)
    .then((employe) => {
      employe.preNom = req.body.preNom;
      employe.nom = req.body.nom;
      employe.email = req.body.email;
      employe.role = req.body.role;
      /*       employe.roleFr = req.body.roleFr; */
      employe.telephone = req.body.telephone;
      employe.linkedin = req.body.linkedin;
      employe.avatar = req.body.avatar;
      employe.value = req.body.value;

      employe
        .save()
        .then(() => res.json("Employe updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
