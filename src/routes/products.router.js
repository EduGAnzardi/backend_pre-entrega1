import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router();

// Ruta para obtener todos los productos
productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }

        return res.json(products);

    } catch (error) {
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS');
    }
});

// Ruta para obtener un producto por ID
productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductsById(pid);
        res.json(product)

    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
});

// Ruta para agregar un producto por ID
productsRouter.post('/', async (req, res) => {
    try {
        const {id, title, description, code, price, productStatus = true, stock, category, thumbnails} = req.body;
        const response = await productManager.addProduct({id, title, description, code, price, productStatus, stock, category, thumbnails})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR PRODUCTO`)
    }
})

// Ruta para editar un producto por ID
productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;

    try {
        const {id, title, description, code, price, productStatus, stock, category, thumbnails} = req.body;
        const response = await productManager.updateProduct(pid, { title, description, code, price, productStatus, stock, category, thumbnails})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR EDITAR PRODUCTO ${pid}`)
    }
})

// Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR ELIMINAR PRODUCTO ${pid}`)
    }
})


export { productsRouter };