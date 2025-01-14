import express from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/UserModel.js";

const router = express.Router();

const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
}

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({message: "User already exists!"})

        const user = await User.create({name, email, password})
        if(user) return res.status(201).json({success: "User registered!"})

    }catch(err){
        res.status(400).json({message: "Error crating user"})
    }
})

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(user && await user.matchPassword(password)){
            res.status(200).json({
                    name: user.name,
                    email: user.email,
                    token: generatetoken(user._id),
                    profilePic: user.profilePic || null
                })    
        }else{
            res.status(401).json({message: "Incorrect Credentials! Please try again"})
        }

    }catch(error){
        console.error(`Error: ${error}`)
        res.status(500).json({message: "Error Occured"})
    }
})

router.get("/user", async (req, res) => {
    try{
       const users = await User.find()

       res.json(users)
    }catch(err){
        console.error(`Error: ${err}`);
        res.status(500).json({message: "Server Error"});
    }

})

export default router;