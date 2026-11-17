// usa la biblioteca express para crear un servidor web
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// entender datos en formato JSON (necesario para POST y PUT)
app.use(express.json());

//Esto establece la direccion de la carpeta para servir los archivos del front
app.use(express.static(path.join(__dirname, 'src', 'public')));

//Esto establece la direccion de la pagina principal
app.get('/', (req, res) => {
    res.redirect('/html/index.html');
});

//Encender el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});