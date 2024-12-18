    import app from './server.js';

    // Iniciar el servidor Express
app.listen({ port: 4000 }, () =>
    console.log('Servidor corriendo en http://localhost:4000/graphql')
  );