import { Router } from "express";
import { usersServices } from "../DAO/index.js";

const router = Router();

router.post('/register',async(req,res)=>{
    const {first_name, last_name, email, password} = req.body;
    if(!first_name || !email || !password) return res.status(400).send({status:"error",error:"Valores incompletos"});
    const exists  = await usersServices.getBy({email});
    if(exists) return res.status(400).send({status:"error",error:"El usuario ya existe"});
    const result = await usersServices.save({
        first_name,
        last_name,
        email,
        password
    })
    usersServices.save(result);
    res.send({status:"success",payload:result})
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({status:"error", error:"Valores incompletos"});
    const user = await usersServices.getBy({email, password});
    if(!user) return res.status(400).send({status:"error", error:"Correo o contrase;a invalido"});
    req.session.user = {
        id: user.id,
        username: user.first_name,
        email: user.email,
        role: user.role
    }
    console.log(req.session.user);
    res.send({status:"success", message:"Logueado"});
})

export default router;