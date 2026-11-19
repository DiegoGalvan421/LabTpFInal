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

function obtenerAnimal(req, res) {
    const id = req.params.id.toLowerCase();

    const animal = service.buscarAnimal(id);

    if(animal === null) {
        res.status(404).json({mensaje:"No se encontro un animal con ese ID"});
    } else {
        res.status(200).json(animal);
    }
}

function listarAnimales(req, res) {
    //obtenemos los parametros de la url, si no vienen, se asigna un valor por defecto
    const cantidadT= req.query.cantidad ?? 5;
    const desdeT= req.query.from ?? 0;
    const categoriaT= req.query.categoria;
    //convertimos los valores a numeros
    const cantidad = Number(cantidadT);
    const desde = Number(desdeT);

    //validacion
    const validez = (cantidad>0 && desde>=0 && (categoriaT===undefined||["aereos", "terrestres", "acuaticos"].includes(categoriaT)));
    if(!validez){
        res.status(400).json({mensaje:"Los parametros de consulta son invalidos"});
    }else{
        const resultado= service.listarAnimales(cantidad,desde,categoriaT);

        res.status(200).json(resultado);
    }

}

module.exports = {crearAnimal, actualizarAnimal, obtenerAnimal, listarAnimales};