import express from "express"

//IMPORTS
import cors from "cors"
import cookieParser from "cookie-parser"





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

app-use("/api/pacientes", pacientesRoutes);






export default app;