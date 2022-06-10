const validateCategoryCreationRequest=(req,res,next) =>{
    if(!req.body.name){
        return res.json({
            success: false,
            code:400,
            message: 'Name of the category is not present'
        });
    }
    next();
}
const validateDeletionCategory=(req,res,next)=>{
    if(!req.param.id){
        return res.json({
            success: false,
            code:400,
            message: 'Category ID is not present'  
    });
    }
}
module.exports={
    validateCategoryCreationRequest,
    validateDeletionCategory
}