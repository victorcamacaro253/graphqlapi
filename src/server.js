// src/server.js
import { ApolloServer } from "apollo-server-express";
import express from "express";
import userType from './schema/userType.js';
import resolvers from './resolvers/userResolver.js';

const app = express();

const server = new ApolloServer({
    typeDefs: userType,
    resolvers,
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
        console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
};

// Llama a la función para iniciar el servidor
startServer().catch(err => {
    console.error('Error al iniciar el servidor:', err);
});

export default app;