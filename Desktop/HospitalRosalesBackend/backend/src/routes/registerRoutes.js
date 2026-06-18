import express from "express"; 
import registerPacientesController from "../controller/registerPacientesController";

const router = express.Router();

router.route("/").post(registerPacientesController.register);
router.route("/verifyCodeEmail").post(registerPacientesController.verifyCode);

export default router;