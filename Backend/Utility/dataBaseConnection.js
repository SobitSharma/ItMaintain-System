import mongoose, { mongo } from "mongoose";

async function connect(){
    const URL = process.env.DBURL
    try {
        let mongoUrl = await mongoose.connect(URL)
        return {flag:true, url:mongoUrl.connection.host}
    } catch (error) {
        console.log(error.message)
        return {flag:false}
    }
}

export default connect