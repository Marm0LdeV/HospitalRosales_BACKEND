import express from "express"

//IMPORTS
import cors from "cors"
import cookieParser from "cookie-parser"
import pacientesRoutes  from "./src/routes/Pacientes.js"
import registerRoutes  from "./src/routes/registerRoutes.js"
import loginRoutes  from "./src/routes/login.js"
import RecoveryPasswordRoutes  from "./src/routes/RecoveryPassword.js"
import logoutRoutes  from "./src/routes/logout.js"



//ejecutar express
const app = express ();

app.use(cors ({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envío de cookies y credenciales
    credentials: true
}))

app.use (cookieParser());

app.use(express.json());

//ENDPOINTS

app.use("/api/pacientes", pacientesRoutes);
app.use("/api/registerPacientes", registerRoutes);
app.use("api/loginPacientes", loginRoutes);
app.use("/api/recoveryPasword", RecoveryPasswordRoutes);
app.use("/api/logout", logoutRoutes)
app.use("api/EspecialidadesMedicas", EspecialidadesRoutes)





export default app;