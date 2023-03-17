import { Router } from "express";
import { usersServices } from "../DAO/index.js";
import passport from "passport";
import { createHash } from "../utils.js";

const router = Router();

router.post('/register',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name||!email||!password) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const exists  = await usersServices.getBy({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
    const hashedPassword = await createHash(password);
    const result = await usersServices.save({
        first_name,
        last_name,
        email,
        password: hashedPassword
    })
    res.send({status:"success",payload:result})
})

router.post('/',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail',failureMessage:true}) ,async(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user._id,
        email:user.email,
        role:user.role
    }
    res.send({status:"success",message:"Logueado :)"})
})

router.get('/loginFail', (req,res) =>{
    console.log(req.session.messages);
    if(req.session.message.length > 4) return res.status(400).send({message: "Bloquea los intentos ahora"})
    res.status(400).send({status: "error", error: "Error de autenticacion"});
})

router.get('/github',passport.authenticate('github'),(req,res)=>{})

router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    const user = req.user;
    req.session.user = {
        id: user._id,
        email:user.email,
        role:user.role
    }
    res.send({status:"success",message:"Logueado Pero con github:)"})
})

export default router;