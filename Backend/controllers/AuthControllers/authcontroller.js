import { User } from "../../Models/authModels/User.model.js"
import { generateToken } from "../../Utility/generateToken.js"

const signup = async(req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(200).json({message:"Invalid Values", data:{}})
        }
        const user = User({username,password})
        const accesstoken = generateToken({_id:user._id, username:username})
        await user.save()
        res.cookie("accesstoken", accesstoken)
        return res.status(200).json({message:"Signup Successfull", data:{username, password}})
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal Server Error", data:[]})
    }
}

const login = async(req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                message:"Invalid Values", data:{}})
        }
    
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({message:"User not Found", data:{}})
        }
    
        console.log(password)
        if(user.password !== password){
            return res.status(400).json({message:"Incorrect Password"})
        }
    
        const accesstoken = generateToken({_id:user._id, username:username})
        res.cookie("accesstoken", accesstoken)
        return res.status(200).json({message:"Login Successfull", data:{username}})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:error.message, data:[]})
    }
}

export {
    signup,
    login
}