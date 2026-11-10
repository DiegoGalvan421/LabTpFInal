const detalleAnimales = {
  "tero": {
    nombre: "TERO",
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
    descripcionHabitat: `Es un ave sumamente adaptable que prefiere los ecosistemas abiertos y despejados para mantener un amplio rango
          de visión. Habita principalmente en pastizales, praderas, campos agrícolas, márgenes de lagunas, ríos y
          humedales. Debido a su cercanía con las actividades humanas, se ha integrado con éxito en entornos urbanos y
          suburbanos, siendo muy común encontrarlo en parques, jardines amplios, campos de golf y zonas rurales del
          valle.`,
    distribucionGeografica: ["Argentina", "Uruguay", "Bolivia", "Brasil", "Chile", "Colombia", "Venezuela", "Peru"],
    imagenHabitat: "../imagenes/Distribucion-en-Neuquen-Tero-comun.webp",
    pieImagen: "Distribución en Neuquén del tero común",
    estado: "Estado de conservación: No amenazada"
  },

  "loro": {
    nombre: "LORO",
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
    descripcionHabitat: `Es un ave sumamente adaptable que prefiere los ecosistemas abiertos y despejados para mantener un amplio rango
          de visión. Habita principalmente en pastizales, praderas, campos agrícolas, márgenes de lagunas, ríos y
          humedales. Debido a su cercanía con las actividades humanas, se ha integrado con éxito en entornos urbanos y
          suburbanos, siendo muy común encontrarlo en parques, jardines amplios, campos de golf y zonas rurales del
          valle.`,
    distribucionGeografica: ["Argentina", "Uruguay", "Bolivia", "Brasil", "Chile", "Colombia", "Venezuela", "Peru"],
    imagenHabitat: "../imagenes/Distribucion-en-Neuquen-Tero-comun.webp",
    pieImagen: "Distribución en Neuquén del tero común",
    estado: "Estado de conservación: No amenazada"
  }
}



function armarListaDistribucionGeo(listaPaises) {
  const contenedorPaises = document.getElementById('distribucionGeografica');

  // Limpiamos el contenido previo
  contenedorPaises.innerHTML = '';

  // Recorremos el arreglo e iteramos agregando cada <li>
  listaPaises.forEach(pais => {
    contenedorPaises.innerHTML += `<li>${pais}</li>`;
  });
}

function cargarDetalle() {
  const textoURL = window.location.search;
  const parametros = new URLSearchParams(textoURL);
  const idAnimal = parametros.get('id');

  const animal = detalleAnimales[idAnimal];

  if (!animal) {
    console.error("Animal no encontrado en la base de datos");
    return;
  } else {
    console.log(animal.nombre);

    armarListaDistribucionGeo(animal.distribucionGeografica);

    document.getElementById('nombre').textContent = animal.nombre;
    document.getElementById('frase').textContent = animal.frase;
    document.getElementById('nombreCientifico').textContent = animal.nombreCientifico;
    document.getElementById('familia').textContent = animal.familia;
    document.getElementById('descripcionGeneral').textContent = animal.descripcionGeneral;
    document.getElementById('foto').src = animal.foto;
    document.getElementById('descripcionHabitat').textContent = animal.descripcionHabitat;
    document.getElementById('imagenHabitat').src = animal.imagenHabitat;
    document.getElementById('pieImagen').textContent = animal.pieImagen;
    document.getElementById('estado').textContent = animal.estado;
  }
}

cargarDetalle();

