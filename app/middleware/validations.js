const yup = require("yup");

const validateProjectInsertSchema = yup.object({
  name: yup.string().required("Name is required"),
  color: yup.string().required("Color is required"),
  is_favourite: yup.boolean().optional(),
  user_id: yup.number().required("User_id is required"),
});

const validateIdSchema = yup.object({
    id:yup.number().typeError('id must be a number')
    .required('id is required')
    .positive('id must be a positive number') 
})

const validateProjectInsertion = async (req, res, next) => {
  try {
    req.body = await validateProjectInsertSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log(req.body);
    next();
  } catch (err) {
    res
      .status(400)
      .json({ Message: "Required Fields are missing", error: err.errors });
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

module.exports = { validateProjectInsertion,validateId };
