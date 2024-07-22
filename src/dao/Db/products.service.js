import mongoose from "mongoose";
import { productModel } from "../models/products.models.js";

const ObjectId = mongoose.Types.ObjectId;

export default class ProductsService {

    getAll = async () => {
        try {

            let products = await productModel.find();

            return products;
        } catch (error) {
            throw error;
        }
    };

    save = async (product) => {
        let newProduct = await productModel.create(product);
        return newProduct
    }

    async getProductById(productId) {
        if (!ObjectId.isValid(productId)) {
            throw new Error("El ID del producto no es válido");
        }
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }
    getProductByCode = async () => {
        try {
            let product = await productModel.findOne({ code: code });
            return product ? product.toObject() : null;
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(productId, updateFields) {
        try {
            const product = await productModel.findByIdAndUpdate(productId, updateFields, { new: true });
            return product;
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (id) => {
        console.log("Eliminando producto con ID:", id);
        try {
            let productDelete = await productModel.deleteOne({ _id: id });
            return productDelete;
        } catch (error) {
            throw error;
        }
    };

}