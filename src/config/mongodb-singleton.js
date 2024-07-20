import mongoose from 'mongoose';
import config from './config.js'; // Asegúrate de que config tenga la url correcta

export default class MongoSingleton {
    static #instance;

    constructor(){
        this.#connectMongoDB();
    }

    static getInstance(){
        if (this.#instance) {
            console.log("Ya se ha abierto una conexion a MongoDB");
        } else {
            this.#instance = new MongoSingleton();
        }

        return this.#instance;
    }

    async #connectMongoDB() {
        try {
            await mongoose.connect(config.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Conectado con exito a MongoDB usando mongoose");
        } catch (error) {
            console.error("No se puede conectar a la base de datos de Mongo: " + error.message);
            process.exit(1); // Asegúrate de usar 1 como código de salida para indicar error
        }
    }
}
