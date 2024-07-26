import jwt from "jsonwebtoken"
const Protection = async(req, res, next) => {
    try {
        const accesstoken = req.cookies?.accesstoken
        const decode = jwt.verify(accesstoken, process.env.SECRET_KEY)
        if(decode?._id){
            req.userid = decode._id
            req.username = decode.username
            return next()
        }
        else{
            return res.status(401).json({message:"UnAuthorized User", data: []})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({message:"Internal Server Error", data: []})
    }
}

export default Protection