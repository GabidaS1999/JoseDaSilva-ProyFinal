import { Router } from "express";
import passport from "passport";
import { authToken } from "../utils.js";
import auth from './views.router.js'

const router = Router();

router.get("/login", (req,res)=>{
    res.render('login',{
        style:'login.css'
    })
});

router.get("/register", (req,res)=>{
    res.render('register',{
        style:'register.css'
    })
});


router.get("/", (req,res)=>{
    res.render('profile2', {
        user: req.user,
        style:"private.css"
    })
});


export default router;

