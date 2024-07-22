import ProductManager from '../dao/ManagerFS/Product-Manager.js';
import ProductsService from '../dao/Db/products.service.js';
import { Router } from "express"
import {getProducts} from '../controllers/product.Controller.js';
import errorHandler from '../service/errors/middlewares/index.js';
import uploader from '../test/utils/uploader.js';

let productManager = new ProductManager();

let productService = new ProductsService();


const router = Router();

import {getDatosControllers, postDatosControllers, deleteDatosControllers, postDatosWithImage} from "../controllers/product.Controller.js"


//GET
router.get('/mockingproducts', getProducts);
router.get('/productController', getDatosControllers)

//POST
router.post('/', postDatosControllers)
router.post('/withimage', uploader.single('thumbnails'), postDatosWithImage)

//PUT
router.put('/update/:id', async (req, res) => {
    try {
        let updateUser = req.body;
        let user = await productService.updateProduct({_id: req.params.id}, updateUser);
        res.send({ result: "success", payload: user })
    } catch (error) {
        console.log("No se pudo actualizar ususarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo actualizar usuarios con moongose", message: error });
    }
})

//DELETE
router.delete('/:id', deleteDatosControllers)


router.use(errorHandler)








router.get('/', async (req, res) => {
    const socket = req.io;
    let todosLosProductos = await productService.getAll();

    let limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        let productosLimitados = todosLosProductos.slice(0, limit);
        res.send(productosLimitados);
        res.render("products")
    } else {
        res.json(todosLosProductos);
        res.render("products")
        socket.emit('products', todosLosProductos);
    }
})

router.get('/:pid', async (req, res) => {
    try {
        // const productId = req.params.pid;
        const product = await productService.getProductById(req.params.pid);

        if (!product) {
            return res.status(404).send({ status: "error", msg: "Producto no encontrado" });
        }
        res.render("cards", {
            result: product,
            style:"products.css",
        });
    } catch (error) {
        console.error(`Error al obtener el producto: ${error.message}`);
        res.status(400).send({ status: "error", error: error.message });
    }
});



router.post('/', async (req, res) => {
    const socket = req.io;
    try {
        const product = req.body;
     

        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category || !product.thumbnails) {
            return res.status(400).send({ status: 'error', error: 'Valores incompletos, revisar datos' });
        }
        await productManager.addProduct(product.title, product.description, product.price, product.thumbnails, product.code, product.stock)
        await productService.save({title: product.title,description: product.description, price: product.price, category: product.category, thumbnails: product.thumbnails, code: product.code, stock: product.stock});
        socket.emit('newProduct', product);
        res.send({ status: 'success', msg: `Producto creado` });
    

    } catch (error) {
        console.error(`Error al agregar un nuevo producto: ${error}`);
        res.status(500).send({ status: 'error', error: 'Error al agregar un nuevo producto' });
    }
});



router.delete('/delete/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const products = await productService.getAll();

        const productPosition = products.findIndex((p) => p._id === productId);

   

        
        products.splice(productPosition, 1);

        await productService.deleteProduct(productId);

        res.send({ status: "success", msg: "Producto eliminado" });
    } catch (error) {
        console.error(`Error al eliminar producto: ${error}`);
        res.status(500).send({ status: "error", error: "Error al eliminar el producto" });
    }
});



export default router;