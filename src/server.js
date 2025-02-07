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
import exportType from "./schema/exportType.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import limiter from "./middleware/rateLimiter.js";
import upload from "./middleware/multer.js";
import csrf from "./middleware/csrfToken.js";  // Import CSRF middleware
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const app = express();







// Enable CORS with proper settings
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-TOKEN'],
    credentials: true, // Allow cookies to be sent
}));

app.use(morgan('dev'));
app.use(cookieParser()); // Cookie parser to read cookies

// Rate limiter
app.use(limiter);



// Serve the CSRF token route
app.get('/csrf-token', csrf.setCsrfToken); // This will set the CSRF token for the frontend


//app.use(csrf.csrfMiddleware);  // Apply CSRF protection middleware to all requests

const typeDefs = [
    userType,
    productType,
    purchaseType,
    categoryType,
    rolesPermissionType,
    authenticationType,
    exportType,
];

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Expecting 'Bearer <token>'

        if (!token) {
            return {}; // No token, return an empty context (useful for public access)
        }

        try {
            const user = await authenticateToken(token);  // Your JWT authentication logic
            return { user, res }; // Return user in context
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
});

// Handling file uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    // Construct the relative path for the uploaded image
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).send({ filePath }); // Return only the relative file path
});

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Start the Apollo Server
const startServer = async () => {
    await server.start();  // Start Apollo server

    // Apply Apollo middleware after CSRF middleware
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the Express server
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

// Call startServer function
startServer().catch(err => {
    console.error('Error starting the server:', err);
});

export default app;
