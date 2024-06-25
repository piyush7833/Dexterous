import express from "express"
import multer from "multer"
import { CreateMaterial, DeleteMaterial, GetAllMaterial, GetMaterialById, UpdateMaterial } from "../controllers/material.controller.js";

const router=express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//create a material
router.post("/create",upload.single('file'),CreateMaterial )
router.put("/update/:id",upload.single('file'),UpdateMaterial )
router.get("/get-all",GetAllMaterial )
router.get("/get/:id",GetMaterialById )
router.delete("/delete/:id",DeleteMaterial )




export default router;