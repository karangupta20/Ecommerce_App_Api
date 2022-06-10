const CategoryController = require('../controllers/category.controller');
const validator=require('../middlewares/requestValidator');
const routes= (app)=>{
    app.get('/ecomm/api/v1/categories',CategoryController.getAllCategories);
    app.post('/ecomm/api/v1/categories',validator.validateCategoryCreationRequest,CategoryController.createCategory);
    app.delete('/ecomm/api/v1/categories/:id',validator.validateDeletionCategory,CategoryController.deleteCategory);
    app.get('/ecomm/api/v1/categories/:id',CategoryController.getCategory);  
    app.get('/ecomm/api/v1/categoryByName',CategoryController.getCategoryByName);  
    app.put('/ecomm/api/v1/categories/:id',CategoryController.updateCategory);

}
module.exports=routes;