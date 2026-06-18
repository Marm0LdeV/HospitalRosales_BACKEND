import mongoose from "mongoose";
import { config } from "./config.js"

mongoose.connect(config.db.URI)

// -- comprobar que todo funcione

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected")
})

connection.on("disconnect", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) => {
    console.log("error Found" + error)
})

