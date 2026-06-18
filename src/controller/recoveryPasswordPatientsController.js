import HTMLRecoveryEmail from "../utils/sendMailRecovery";

import {config} from "../../config.js";

import pacientesModel from "../models/Pacientes.js"

const recoveryPasswordController = {};

//Solicitar el codigo por correo electronico
recoveryPasswordController.requestCode = async (req, res) => {
    try {
        //Solicitamos los datos
        const {email} = req.body;
        
        //Validar que el correo se este en la BD
        const userFound = await pacientesModel.findOne({ email });

        if (!userFound){
            return res.json({message: "User not found"});
        }
        //generar código aleatorio
        const code = crypto.randomBytes(3).toString("hex")

        //Guardar todo en un token
        const token = JsonWebTokenError.sign(
            //#1- ¿Que vamos a guardar?
        {email, code, usertype: "patient", verified:false},
        config.JWT.secret,
        {expiresIn: "15m"}
        );

        const mailOptions = {
            from: config.mail.user_email,
            to: email,
            subject: "Correo de recuperación",
            body: "Usa este codigo para recuperar tu cuenta",
            html: HTMLRecoveryEmail(code)
        };
        
        WebTransportError.sendMail(mailOptions,(error,info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).jsom({message: "error sending mail"})
            }
            return res.status(200).json({message: "email sent"})
        });
    } catch (error) {
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server error"})
    }
};

//Verificar el codigo
recoveryPasswordController.verifyCode = async (register) => {
    try {
        const {codeRequest} = req.body;
        
        //Obtenemos la informacion que esta dentro del token
        //Acceso l token que esta en la cookie recoveryCookie
        const token = req.cookies.recoveryCookie;
        const decoded = JsonWebTokenError.verify(token,config.JWT.secret);

        if(codeRequest !== decoded.code) {
            return res.status(400).json({message: "Invalid code"});
        }

        const newToken = JsonWebTokenError.sign(
            {email: decoded.email,usertype:"patient", verifie: true},
            config.JWT.secret,
            {expiresIn: "15m"},
        );
        
        res.cookie("recoveryCookie", newToken, { maxAge: 15*60*1000});

        return res.status(200).json({message: "Code verified succesfully"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

recoveryPasswordController.newPassword = async (req,res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Password doesn't match"})
        }
        const token = req.cookies.recoveryCookie;
        const decoded = JsonWebTokenError.verify(token,comfig.JWT.secret);

        await pacientesModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHsh},
            {new: true}
        );

        res.clearCookie (recoveryCookie);
        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "INternal server error"});
    }
};

export default recoveryPasswordController