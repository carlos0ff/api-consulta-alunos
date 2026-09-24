const express = require("express");
const alunoController = require("../controllers/AlunoController");
const validarId = require("../middlewares/validarId");

const router = express.Router();
router.get("/:id", validarId, alunoController.findById);

module.exports = router;
