
// Guardamos la información de los animales en un arreglo de objetos para rellenar la página con estos datos e imágenes, dependiendo del animal 
// seleccionado por el usuario
const detalleAnimales = {
  "tero": {
    nombre: "Tero",
    frase: '"El guardián territorial de las pampas y pastizales de América"',
    nombreCientifico: "Nombre científico: Vanellus chilensis",
    familia: "Familia: Charadriidae",
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

  "loro": {
    nombre: "Loro Barranquero",
    frase: '"El emblemático habitante social de las bardas y acantilados patagónicos"',
    nombreCientifico: "Nombre científico: Cyanoliseus patagonus",
    familia: "Familia: Psitácidos",
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
}


// Esta función tranforma el arreglo de JS con los datos de los países en los que habita un animal en una lista no ordenada de HTML
function armarListaDistribucionGeo(listaPaises) {
  const contenedorPaises = document.getElementById('distribucionGeografica');

  // Limpiamos el contenido previo
  contenedorPaises.innerHTML = '';

  // Recorremos el arreglo e iteramos agregando cada <li>
  listaPaises.forEach(pais => {
    contenedorPaises.innerHTML += `<li>${pais}</li>`;
  });
}

// Esta función carga la información que tenemos guardada en la página de AnimalesDetallados dependiendo el animal

async function cargarDetalle() {
    const parametros = new URLSearchParams(window.location.search);
    const idAnimal = parametros.get('id');

    if (!idAnimal) {
        document.getElementById('nombre').textContent =
            "No se indicó ningún animal";
    } else {
        try {
            const respuesta = await fetch(
                `/api/animales/${encodeURIComponent(idAnimal)}`
            );

            if (respuesta.status === 404) {
                document.getElementById('nombre').textContent =
                    "Animal no encontrado";
            } else if (!respuesta.ok) {
                throw new Error("No se pudo obtener el animal");
            } else {
                const animal = await respuesta.json();

                document.getElementById('nombre').textContent = animal.nombre;
                document.getElementById('frase').textContent = animal.frase ?? "";
                document.getElementById('nombreCientifico').textContent = animal.nombreCientifico ?? "";
                document.getElementById('familia').textContent = animal.familia ?? "";
                document.getElementById('descripcionGeneral').textContent = animal.descripcionGeneral ?? "";

                const foto = document.getElementById('foto');
                if (animal.foto) {
                    foto.src = animal.foto;
                    foto.alt = animal.altFoto ?? animal.nombre;
                } else {
                    foto.hidden = true;
                }

                document.getElementById('descripcionHabitat').textContent =
                    animal.descripcionHabitat ?? "";

                armarListaDistribucionGeo(
                    animal.distribucionGeografica ?? []
                );

                const imagenHabitat = document.getElementById('imagenHabitat');
                if (animal.imagenHabitat) {
                    imagenHabitat.src = animal.imagenHabitat;
                    imagenHabitat.alt = animal.altImagenHabitat ?? "Hábitat";
                } else {
                    imagenHabitat.hidden = true;
                }

                document.getElementById('pieImagen').textContent =
                    animal.pieImagen ?? "";

                document.getElementById('estado').textContent =
                    animal.estado ?? "";
            }
        } catch (error) {
            console.error(error);
            document.getElementById('nombre').textContent =
                "Error al cargar la información del animal";
        }
    }
}

cargarDetalle();


