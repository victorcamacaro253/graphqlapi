// src/server.js
import { ApolloServer } from "apollo-server-express";
import express from "express";
import userType from './schema/userType.js';
import productType from "./schema/productType.js";
import purchaseType from "./schema/purchaseType.js";
import resolvers from './resolvers/index.js';
import categoryType from "./schema/categoryType.js";
import rolesPermissionType from "./schema/rolesPermissionType.js";
import authenticationType from "./schema/authenticationType.js";
import authenticateToken from "./middleware/authenticationToken.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import limiter from "./middleware/rateLimiter.js";
import upload from "./middleware/multer.js";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const app = express();  

app.use(cors({
    origin: 'http://localhost:5173',  // El origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,  // Para permitir el manejo de cookies, si es necesario
  }));
  

app.use(morgan('dev'))

app.use(cookieParser()); 

app.use(limiter)

//app.use(graphqlUploadExpress());

const typeDefs=[
    userType,
    productType,
    purchaseType,
    categoryType,
    rolesPermissionType,
    authenticationType

]

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req,res }) => {
        const token = req.headers['authorization']?.split(' ')[1]; // El token debe ser 'Bearer <token>'

        if (!token) {
            return {};  // No hay token, devolvemos un contexto vacío (puede ser útil para acceso público)
        }

        try {
            const user = await authenticateToken(token);
            return { user,res }; // Devuelve el usuario decodificado en el contexto
        } catch (error) {
            throw new Error('Token no válido');
        }
    }
    
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
  
     // Construct the relative path for the uploaded image
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).send({ filePath });  // Return only the relative file path

  });

  // Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


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