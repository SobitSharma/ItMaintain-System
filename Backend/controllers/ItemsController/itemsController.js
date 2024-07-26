import Items from "../../Models/datamodel/ItemsAdd.model.js";
import moment from "moment-timezone"

function getTimeZoneInIST(){
    const nowIst = moment().tz('Asia/kolkata')
    return nowIst.format("DD-MM-YYYY")
}

const addItem = async(req, res) => {
    try {
        const {item, stock} = req.body;
        if(!item || !stock){
            return res.status(400).json(
                {
                    "status": 400,
                    "message": "Bad Request",
                    "error": "Missing 'itemname' parameter in the request body."
                }
                  
                )
        }  
        const newitem = new Items({
            item,
            maximumStock:stock,
            remainingStock:stock,
            createdAt:getTimeZoneInIST()
        })
    
        await newitem.save();
        return res.status(200).json(
        {
            status:200,
            _id:newitem._id, 
            maximumStock:newitem.maximumStock,
            remainingStock:newitem.remainingStock,
            createdAt:newitem.createdAt
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(
            {
                "status": 11000,
                "message": "Bad Request",
                "error": error.code == 11000 ? "This item already Exists" :"Some Error Ocurred"
            }
        )
    }
}

const getItems = async(req, res) => {
    try {
        const items = await Items.find()
        return res.status(200).json({
            
            "status": 200,
            "message": "Data fetch Sucessfully",
            "data":items
        })
    } catch (error) {
        res.status(501).json({
            "status": 501,
            "message": "Some Error Ocurred",
            "error":error.message
        })
    }
}

const deleteItem = async(req, res) => {
    try {
        const {id} = req.params
        const item = await Items.findByIdAndDelete(id)
        const remaingitems = await Items.find()
        console.log(item)
        return res.status(200).json({
            "status": 200,
            "message": "Data fetch Sucessfully",
            "data":remaingitems
        })
    } catch (error) {
        return res.status(400).json({
            "status": 400,
            "message": "Bad Request",
            "data":error.message
        })
    }
}

const issueItems = async(req, res) => {
    try {
        const {id} = req.params
        const {name, contact, quantity, department, remaining} = req.body
        console.log(name,quantity,contact,department,remaining)
        if(!name || !contact || !quantity){
            return res.status(400).json({
                "status": 400,
                "message": "Data Missing S",
                "data":[]
            })
        }
    
        const item = await Items.findByIdAndUpdate(
            id,
            {
                $push:{ProvidedTo:
                    {
                    Name:name, 
                    Contact:contact, 
                    Quantity:quantity, 
                    IssuedOn:getTimeZoneInIST(), 
                    Department:department,
                    _id:Date.now()
                }
                },
                $set:{remainingStock:remaining}
            },
            {new:true}
        )
    
        return res.status(200).json({
            "status": 200,
            "message": "Data Updated SucessFully",
            "data":item
        })
    } catch (error) {
        console.log(error.message)
    }
    

}

const updateItemsRemaining = async(req, res) => {
    const {id, itemid, quantity} = req.params
    if(!id || !itemid || !quantity){
        return res.status(400).json({
            "status": 400,
            "message": "Data Missing",
            "data":[]
        })
    }


    const findItem = await Items.findById(itemid)
    findItem.remainingStock = parseInt(findItem.remainingStock) + parseInt(quantity)
    findItem.ProvidedTo = findItem.ProvidedTo?.map((single)=> {
        if(single._id == id){
            const calc = parseInt(single.Quantity) - parseInt(quantity)
            if(!(calc==0)){
                return {...single, Quantity:calc}
            }
            else{
                return null
            }
        }
        else{
            return single
        }
    }).filter((single)=>single!==null)

    await findItem.save();

    const itemR = await Items.find()

    return res.status(200).json({
        "status": 200,
        "message": "Sucess",
        "data":itemR
    })
}

const logout = async(req, res) => {
    try {
        res.clearCookie('accesstoken')
        return res.status(200).json({
            "status": 200,
            "message": "Logout Sucess",
            "data":[]
        })
    } catch (error) {
        return res.status(400).json({
            "status": 400,
            "message": "UnExpected Error",
            "data":[]
        })
    }
    
}
export {addItem, getItems, deleteItem, issueItems, updateItemsRemaining, logout}