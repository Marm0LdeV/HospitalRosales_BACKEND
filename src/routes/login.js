import express from "express";

import loginPacientesController from "../controller/loginPacientesController";

const router = express.Router();

router.route("/").post(loginPacientesController.login);

export default router;