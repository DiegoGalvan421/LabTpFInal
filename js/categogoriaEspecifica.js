const tarjetasCategorias = {
    aereos: {
        tituloCategoria: "Animales Aereos",
        descripcion: "En tu visita encontrarás muchas de las aves que habitan nuestra región",
        ubicacion: "-Sector Aviario Central-",
        horario: "Charla educativa: 14:00 hs",
        consejo: "Mantén silencio cerca de los recintos abiertos y evita el uso de flash para no desorientar a las aves."
    }

};

const tarjetasAnimales = {
    aereos: [
        { nombre: "Tero", link: "AnimalesDetallados.html?id=tero", imagen: "../imagenes/Tero.png" },
        { nombre: "Loro", link: "AnimalesDetallados.html?id=loro", imagen: "../imagenes/loro.jpeg" },

    ],
    acuaticos: [
        { nombre: "", link: "", imagen: "" },
    ],
    terrestres: [
        { nombre: "", link: "", imagen: "" },
    ]
};

function armarListaAnimales(categoria) { //Idea para el futuro: filtro por características como alimentación.
    // También podríamos armar un carrusel que se maneje mediante flechas en lugar de mostrar todas las tarjetas
    const idContenedorAnimales = document.getElementById('contenedorTarjetasAnimales');

    idContenedorAnimales.innerHTML = '';

    tarjetasAnimales[categoria].forEach(animal => {
        idContenedorAnimales.innerHTML += `
        <div class="tarjetaAnimal">
            <p class="nombreAnimal">${animal.nombre}</p>
            <a href="${animal.link}" target="_self"><img class="animales" src="${animal.imagen}" alt="${animal.nombre}" /></a>
        </div>`
    })
};

function cargarCategoria() {
    const textoURL = window.location.search; //Captura como texto todo lo que aparece en la dirección web a partir del signo de interrogación. Ej: "?id=aereos"
    const parametros = new URLSearchParams(textoURL); //Toma la cadena previamente leía y la vuelve un objeto estructurado de js fácil de leer y manipular
    const idCategoria = parametros.get('id'); //Busca en el documento que coincida con el nombre del id

    const categoria = tarjetasCategorias[idCategoria];

    document.getElementById('tituloCategoria').textContent = categoria.tituloCategoria;
    document.getElementById('descripcion').textContent = categoria.descripcion;
    document.getElementById('ubicacion').textContent = categoria.ubicacion;
    document.getElementById('horario').textContent = categoria.horario;
    document.getElementById('consejo').textContent = categoria.consejo;

    armarListaAnimales(idCategoria);
}

cargarCategoria();