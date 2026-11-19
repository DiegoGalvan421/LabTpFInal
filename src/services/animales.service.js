// Guardamos la información de los animales en un arreglo de objetos para rellenar la página con estos datos e imágenes, dependiendo del animal 
// seleccionado por el usuario
const detalleAnimales = [ {
    id: "tero",
    nombre: "Tero",
    frase: '"El guardián territorial de las pampas y pastizales de América"',
    nombreCientifico: "Nombre científico: Vanellus chilensis",
    familia: "Familia: Charadriidae",
    categoria: "aereo",
    descripcionGeneral: `El tero (Vanellus chilensis) es una emblemática ave zancuda de la familia Charadriidae, muy reconocida en
          América del Sur por su elegancia y su comportamiento siempre alerta. Presenta un plumaje distintivo de tonos
          grises y pardos en el dorso, un pecho negro brillante, una fina cresta o copete en la cabeza y llamativos ojos
          y patas de color rojo. Cuenta con pequeños espolones rojizos bajo las alas que utiliza para proteger su nido.
          Es célebre por su fuerte vocalización estridente (de donde proviene su nombre popular "teru-teru"), la cual
          emite para dar la alarma ante la presencia de extraños o posibles amenazas, actuando como un verdadero
          guardián territorial.`,
    foto: "../imagenes/Tero2.webp",
    altFoto: "Imagen del tero",
    descripcionHabitat: `Es un ave sumamente adaptable que prefiere los ecosistemas abiertos y despejados para mantener un amplio rango
          de visión. Habita principalmente en pastizales, praderas, campos agrícolas, márgenes de lagunas, ríos y
          humedales. Debido a su cercanía con las actividades humanas, se ha integrado con éxito en entornos urbanos y
          suburbanos, siendo muy común encontrarlo en parques, jardines amplios, campos de golf y zonas rurales del
          valle.`,
    distribucionGeografica: ["Argentina", "Uruguay", "Bolivia", "Brasil", "Chile", "Colombia", "Venezuela", "Peru"],
    imagenHabitat: "../imagenes/Vanellus_chilensis_map.svg.webp",
    altImagenHabitat: "Mapa de lugares donde habita el tero",
    pieImagen: "Distribución geográfica del tero",
    estado: "Estado de conservación: Preocupación menor"
  },

    {
    id: "loro",
    nombre: "Loro Barranquero",
    frase: '"El emblemático habitante social de las bardas y acantilados patagónicos"',
    nombreCientifico: "Nombre científico: Cyanoliseus patagonus",
    familia: "Familia: Psitácidos",
    categoria: "aereo",
    descripcionGeneral: `El loro barranquero o loro tricahue (Cyanoliseus patagonus) es una especie de ave psitaciforme de la familia de los psitácidos que habita en la meseta patagónica y en las laderas de las montañas de la cordillera de los Andes en Argentina y Chile. 
      Es la única especie viviente del género Cyanoliseus. También se le conoce como tricagüe, tricau, loro patagón, loro minero, maracaná patagón y guacamayo patagónico. 
      La longitud promedio en las subespecies argentinas es de 42 cm, mientras que en la subespecie chilena es de 45 cm, con un rango, en esta última, de 43 a 47 cm.
      Su cabeza y lomo son de color verde oliva oscuro. Presenta un anillo ocular de color blanco. La parte superior del pecho es blancuzca (solo en la raza de Chile), mientras que la parte inferior es verde oliva. 
      Las plumas del abdomen, patas, lomo y supracaudales son de color desde amarillo hasta verde oliva (según la subespecie). La parte central del abdomen es rojo-anaranjada. Las subcaudales son de un tono amarillo oliváceo. 
      Las cobertoras alares son verdes oliváceas, mientras que las infracobertoras son verdes obscuro. Las rémiges o primarias son azules, con barba interna grisácea. La cola es gris olivácea. El pico es gris oscuro, ganchudo y corto. Las patas son de color rosa pálido.`,
    foto: "../imagenes/loro2.webp",
    altFoto: "Imagen del loro",
    descripcionHabitat: `Habita en ecosistemas áridos y semiáridos de la estepa patagónica, el monte de llanuras y mesetas, cañadones y valles fluviales.
      Requiere fundamentalmente de bardas y paredes verticales de arcilla o arenisca blanda para excavar sus túneles de nidificación, desplazándose diariamente a través de áreas de vegetación arbustiva y campos en busca de alimento.`,
    distribucionGeografica: ["Argentina", "Chile", "Uruguay", "Paraguay"],
    imagenHabitat: "../imagenes/Cyanoliseus_patagonus_range_map.png",
    altImagenHabitat: "Mapa de lugares donde habita el loro",
    pieImagen: "Distribución Geográfica del Loro Barranquero",
    estado: "Estado de conservación: Preocupación menor"
  }
];

// Buscar un animal por su ID
function buscarAnimal(id){
    id=id.toLowerCase();
    const animal=detalleAnimales.find(elemento=>elemento.id===id);
    //ojo con esto, que si de caulquier manera no encuentra el animal, devuelve null, y no un objeto vacío
    //devuelve null para que el controlador pueda diferenciarlo mejor
    return animal ?? null;
}

// Obtener una cantidad de animales desde una posición
function listarAnimales(cantidad, desde, categoria) {
    let filtrados = detalleAnimales;
    if (categoria !== undefined) {
        filtrados = detalleAnimales.filter(animal => animal.categoria === categoria);
    }
    //arreglo.slice devuelve una seccion del arreglo original, desde el indice "desde" hasta "desde + cantidad"
    const pagina = filtrados.slice(desde,desde + cantidad);
    const resultado = {total: filtrados.length,desde: desde,datos: pagina};
    return resultado;
}
// Crear un animal sin repetir su ID
function agregarAnimal(nuevoAnimal) {
    let resultado;
    const existente = buscarAnimal(nuevoAnimal.id);
    if (existente !== null) {
        resultado = {logrado: false,motivo: "DUPLICADO",mensaje: "Ya existe un animal con ese ID"};
    } else {
        //los 3 puntos, sirven para hacer una copia del objeto, y no una referencia al mismo. Esto es importante para que no se referencie el objeto original
        const animal = { ...nuevoAnimal };
        detalleAnimales.push(animal);
        resultado = {logrado: true,animal: animal};
    }
    return resultado;
}

// Reemplazar los datos de un animal existente
function actualizarAnimal(datosActualizados,id) {
    let resultado;
    const indice = detalleAnimales.findIndex(animal => animal.id === id);
    if (indice === -1) {
        resultado = {logrado: false,motivo: "No se encontro",mensaje: "El animal no existe"};
    } else if (datosActualizados.id !== undefined && datosActualizados.id !== id) {
        resultado = {logrado: false,motivo: "No se puede modificar el ID",mensaje: "No se permite cambiar el ID"};
    } else {
        const animalActualizado = {...datosActualizados,id: id};
        detalleAnimales[indice] = animalActualizado;
        resultado = {logrado: true,animal: animalActualizado};
    }
    return resultado;
}

module.exports = {buscarAnimal, listarAnimales, agregarAnimal, actualizarAnimal};