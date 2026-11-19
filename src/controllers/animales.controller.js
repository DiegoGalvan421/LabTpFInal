const service = require('../services/animales.service');

function crearAnimal(req, res) {
    let nuevoAnimal = req.body;
    //se deberan agregar validaciones extra a futuro, pero por ahora con estas estamos bien
    const validez = (nuevoAnimal !== null && typeof nuevoAnimal === 'object' && typeof nuevoAnimal.id === 'string' && typeof nuevoAnimal.nombre === 'string' && typeof nuevoAnimal.categoria === 'string' && ["aereos", "terrestres", "acuaticos"].includes(nuevoAnimal.categoria)); 

    if(!validez){
        res.status(400).json({mensaje:"Los campos obligatorios del animal(id,nombre,categoria) son invalidos)"});
    }else{
        const animalACargar = { id: nuevoAnimal.id.toLowerCase(), nombre: nuevoAnimal.nombre, categoria: nuevoAnimal.categoria };
        
        const resultado = service.agregarAnimal(animalACargar);
        if(!resultado.logrado){
            res.status(409).json({mensaje:resultado.mensaje});
        }else{
            res.status(201).json({mensaje:"Animal creado con exito",animal:resultado.animal});
        }
    }
    
}

function actualizarAnimal(req, res) {
    const id = req.params.id.toLowerCase();
    const datosActualizados = req.body;

    const validez = (datosActualizados !== null && typeof datosActualizados === 'object' && typeof datosActualizados.nombre === 'string' && typeof datosActualizados.categoria === 'string' && ["aereos", "terrestres", "acuaticos"].includes(datosActualizados.categoria) && datosActualizados.id === undefined || datosActualizados.id === id);

    if(!validez){
        res.status(400).json({mensaje:"Los campos obligatorios del animal(nombre,categoria) son invalidos o se intento modificar el ID)"});
    }else{
        const datosAActualizar = { id: id, nombre: datosActualizados.nombre, categoria: datosActualizados.categoria };


        const resultado = service.actualizarAnimal(datosAActualizar, id);

        if(!resultado.logrado){
            res.status(404).json({mensaje:resultado.mensaje});
        }else{
            res.status(200).json({mensaje:"Animal actualizado con exito",animal:resultado.animal});
        }
    }
}

module.exports = {crearAnimal, actualizarAnimal};