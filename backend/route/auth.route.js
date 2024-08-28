import express from "express"
import { register, login, verify, forgotPassword, changePassword } from "../controller/auth.controller.js";
const auth = express.Router()

auth.post('/register', register);
auth.post('/login', login);
auth.post('/verify', verify);
auth.post('/forgotPassword', forgotPassword);
auth.post('/changePassword', changePassword);


export default auth