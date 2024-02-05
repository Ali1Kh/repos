import {DataTypes} from "sequelize"

export const validation = (schema)=> {
    return (req , res , next)=>{
      const data = {...req.body , ...req.params, ...req.query} 
        
      const validateResult = schema.validate(data,{abortEarly:false})
        
        if (validateResult.error) {
            const errorMessages = validateResult.error.details.map((obj)=>{
              return obj.message
            })
      
            return next(new Error(errorMessages))
          }
        
        return next()
    }
}

// TODO check 'DataTypes.ObjectId ?'
export const ObjectIdValidation = (value , helper)=>{
  if (DataTypes.ObjectId.isValid(value)) return true
  return helper.message("Inavlid Object Id") 
}
