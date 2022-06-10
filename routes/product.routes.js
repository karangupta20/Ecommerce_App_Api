const productController = require('../controllers/product.controller');
const AuthValidator = require('../middlewares/authValidator');

const routes =(app)=>{
    app.get('/ecom/api/v1/products', AuthValidator.isAuthenticated,productController.getproducts);
    app.post('/ecom/api/v1/products',productController.createProduct);
   
}
module.exports=routes;