import { Router } from "express";
import { login, signup } from "../controllers/AuthControllers/authcontroller.js";
import Protection from "../Middlware/ProtectRoute.js";
import { addItem, deleteItem, getItems, issueItems, logout, updateItemsRemaining } from "../controllers/ItemsController/itemsController.js";

const router = new Router()
router.post("/signup", signup)
router.post("/login", login)
router.post("/additems", Protection, addItem)
router.get("/getitems", Protection, getItems)
router.get('/deleteitem/:id', Protection, deleteItem)
router.post('/issue/:id', Protection, issueItems)
router.post("/return/:id/:quantity/:itemid", Protection, updateItemsRemaining)
router.post('/logout',Protection, logout )
export {router}