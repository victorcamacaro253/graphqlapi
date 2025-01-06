// src/server.js
import { ApolloServer } from "apollo-server-express";
import express from "express";
import userType from './schema/userType.js';
import productType from "./schema/productType.js";
import purchaseType from "./schema/purchaseType.js";
import resolvers from './resolvers/index.js';
import authenticateToken from "./middleware/authenticationToken.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors())

app.use(morgan('dev'))

const typeDefs=[
    userType,
    productType,
    purchaseType
]

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers['authorization']?.split(' ')[1]; // El token debe ser 'Bearer <token>'

        if (!token) {
            return {};  // No hay token, devolvemos un contexto vacío (puede ser útil para acceso público)
        }

        try {
            const user = await authenticateToken(token);
            return { user }; // Devuelve el usuario decodificado en el contexto
        } catch (error) {
            throw new Error('Token no válido');
        }
    }
    
});

// Función asíncrona para iniciar el servidor
const startServer = async () => {
    // Inicia el servidor Apollo
    await server.start();

    // Aplica middleware de Apollo a la aplicación Express
    server.applyMiddleware({ app, path: '/graphql' });

    // Inicia el servidor Express
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`🚀Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
};

// Llama a la función para iniciar el servidor
startServer().catch(err => {
    console.error('Error al iniciar el servidor:', err);
});

export default app;