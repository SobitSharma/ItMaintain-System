import mongoose from "mongoose"

const itemAddSchema = new mongoose.Schema({
    item:{
        type:String,
        unique:true
    },
    maximumStock:{
        type:Number,
        require:true
    },
    remainingStock:{
        type:Number,
        require:true
    },
    createdAt:{
        type:String,
        require:true
    },
    ProvidedTo:{
        type:Array,
        default:[]   // [{Name:"Namen", Department:"CS", Issuer:"",Quantity:""}]
    }
})

const Items = mongoose.model("Items", itemAddSchema);
export default Items