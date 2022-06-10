const productService= require('../services/product.service');

const getproducts=async (req,res) =>{
    const response= await productService.getproducts(req.query);
    return res.json({
        message: 'Successfully fetched all products',
        success: true,
        code:200,
        data: response
    });
}

const createProduct=async (req,res) =>{
    const response= await productService.createProduct(req.body);
    return res.json({
        message: 'Successfully created a products',
        success: true,
        code:200,
        data: response
    })
}

module.exports={
    getproducts,
    createProduct
}