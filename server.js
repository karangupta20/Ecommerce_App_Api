const express=require('express');
const bodyParser=require('body-parser');
const configs=require('./config/serverconfig');
//console.log(configs);
const categoryRoutes=require('./routes/category.routes');
const productRoutes= require('./routes/product.routes');
const authRoutes=require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');

const app=express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

const Product=require('./models/index').Product;
const Categories=require('./models/index').Categories;
const db = require('./models/index');
categoryRoutes(app);
productRoutes(app);
authRoutes(app);
cartRoutes(app);

app.get('/home',async function (req,res){
    const getCategoires=await Categories.findAll({include: Product});
    res.json(getCategoires);
});
app.get('/', (req, res) => {
    res.send('new home');
})


app.listen(configs.PORT,async ()=>{
    console.log('server started on port ',configs.PORT);
    /*const newProduct = await Product.create({
        name: 'Ipad',
        cost: 100000,
       description: 'apple ipad',
       categoryId: 1
    });*/
        // console.log("product created successfully");
  if(process.env.SYNC){

    await db.sequelize.sync({ force: true });
  }      

})