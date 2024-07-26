import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { router } from "./Routes/mainRoutes.js"
import connect from "./Utility/dataBaseConnection.js"
import cookieParser from "cookie-parser"


configDotenv()
const {flag, url} = await connect()
if(flag){
    const app = express()
    app.use(cors({origin:"*"}))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())

    const PORT = process.env.PORT || 3000
    app.use("/api/v1/", router)
    console.log(url)
    app.listen(PORT, ()=> {console.log("Server Running on PORT", PORT)})
}
else{
    console.log('Error in connecting the mongo DB')
}

