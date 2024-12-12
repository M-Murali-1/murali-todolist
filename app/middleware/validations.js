const yup = require("yup");

const validateProjectInsertSchema = yup.object({
  name: yup.string().required("Name is required"),
  color: yup.string().required("Color is required"),
  is_favourite: yup.boolean().optional(),
  user_id: yup.number().required("User_id is required"),
}).noUnknown(true, "Invalid keys are provided in the request"); // Enforce only allowed keys;

const validateIdSchema = yup.object({
    id:yup.number().typeError('id must be a number')
    .required('id is required')
    .positive('id must be a positive number') 
})

const validateProjectInsertion = async (req, res, next) => {
  try {
    console.log(Object.entries(req.body).length);
    
    req.body = await validateProjectInsertSchema.validate(req.body, {
      abortEarly: false,strict: true
    });
    console.log(req.body);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ Message: "Required Fields are missing or invalid keys provided", error: err.errors.join(" , ") });
  }
};

const validateId = async (req,res,next)=>{
    try {
        req.params = await validateIdSchema.validate(req.params,{abortEarly:false});
        next();
    }
    catch(err) {
        res.status(400).json({Message:err.errors});
    }
}
const validateTaskSelectSchema = yup.object({
  content: yup.string().optional().typeError("Content should be the string"),
  description: yup.string().optional().typeError("Description should be the string"),
  due_date: yup.string().optional().typeError("Due_Date is invalid"),
  is_completed: yup.boolean().optional(),
  project_id:yup.number().transform(value => (value ? Number(value) : value)).optional().typeError("Project_id should be an integer..!")
}).noUnknown(true, "Invalid filters are provided in the request"); // Enforce only allowed keys;

const validateTaskSelect = async (req,res,next)=>{
  try {
    console.log(typeof req.query.due_date,new Date(req.query.due_date));
    console.log(req.query);
    
    req.query = await validateTaskSelectSchema.validate(req.query,{abortEarly:false});
    next();
  }
  catch(err) {
    console.log("Error occured..!");
    res.status(400).json({Message:err.errors});
  }
}
const validateTaskInsertionSchema = yup.object({
  content: yup.string().required("Content is required"),
  description: yup.string().required("Description is required"),
  due_date: yup.string().required("Due_Date is required").typeError("Due_Date is invalid"),
  is_completed: yup.boolean().optional().typeError("is_completed must be an boolean value"),
  project_id:yup.number().required("Project_id is required")
}).noUnknown(true, "Invalid data are provided in the request other than the required"); // Enforce only allowed keys;


const validateTaskInsertion = async (req,res,next)=>{
  try {
    console.log(req.body);
    req.body = await validateTaskInsertionSchema.validate(req.body,{abortEarly:false});
    next();
  }
  catch(err) {
    console.log("Error occured..!");
    res.status(400).json({Message:err.errors.join(" , ")});
  }
}
module.exports = { validateProjectInsertion,validateId,validateTaskSelect,validateTaskInsertion};
