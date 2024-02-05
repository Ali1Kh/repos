import multer , {diskStorage} from 'multer'
import {nanoid} from "nanoid"

export const fileValidation = {
    images: ["image/png","image/jpeg"],
    files:["application/pdf"]
}

// File System
export function uploadFile({ folder , filter }){

    const storage = diskStorage({destination:`uploads/${folder}`,filename:(req , file , cb)=>{
        cb(null , nanoid() + "__" + file.originalname)
    }})
    
    const fileFilter = (req, file ,cb)=>{
        if (!filter.includes(file.mimetype)) {
           return cb(new Error("Invalid format , file must be png or jpg!"),false) 
        }
        return cb(null,true)
    }
    const multerUpload = multer({storage , fileFilter})
    
    return multerUpload
}

// Cloud
export function uploadFileCloud({filter}){

    const storage = diskStorage({})
    
    const fileFilter = (req, file ,cb)=>{
        if (!filter.includes(file.mimetype)) {
           return cb(new Error("Invalid format , file must be png or jpg!"),false) 
        }
        return cb(null,true)
    }
    const multerUpload = multer({storage , fileFilter})
    
    return multerUpload
}