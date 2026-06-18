import express from "express";
import pacientesController  from "../controller/PacientesController";
import uploader from "../utils/cloudinaryconfig.js"

const router =  express.Router();

router.route("/")
.get(pacientesController.getPacientes)

router.route("/:id")
.put(uploader.single("image"),pacientesController.updatePacientes)
.delete(pacientesController.deletePacientes)

export default router;