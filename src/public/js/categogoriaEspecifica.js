const tarjetasCategorias = {
    aereos: {
        tituloCategoria: "Animales Aereos",
        descripcion: "En tu visita encontrarás muchas de las aves que habitan nuestra región",
        ubicacion: "-Sector Aviario Central-",
        horario: "Charla educativa: 14:00 hs",
        consejo: "Mantén silencio cerca de los recintos abiertos y evita el uso de flash para no desorientar a las aves."
    }

};



const parametros = new URLSearchParams(window.location.search);
const idCategoria = parametros.get('id');

const cantidad = 1;
let desde = 0;

// Construir las tarjetas con los animales recibidos
function armarListaAnimales(animales) {
    const contenedor = document.getElementById(
        'contenedorTarjetasAnimales'
    );

    contenedor.replaceChildren();

    animales.forEach(animal => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjetaAnimal';

        const titulo = document.createElement('h3');
        titulo.className = 'nombreAnimal';
        titulo.textContent = animal.nombre;

        const enlace = document.createElement('a');
        enlace.href = `AnimalesDetallados.html?id=${encodeURIComponent(animal.id)}`;

        const imagen = document.createElement('img');
        imagen.className = 'animales';
        imagen.src = animal.foto;
        imagen.alt = animal.nombre;

        enlace.append(imagen);
        tarjeta.append(titulo, enlace);
        contenedor.append(tarjeta);
    });
}

// Solicitar animales al servidor
async function cargarAnimales() {
    try {
        const url = `/api/animales?cantidad=${cantidad}&from=${desde}&categoria=${encodeURIComponent(idCategoria)}`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al consultar los animales");
        }

        const resultado = await respuesta.json();

        armarListaAnimales(resultado.datos);

        document.getElementById('contador').textContent =
            `Mostrando ${resultado.datos.length} de ${resultado.total}`;

        document.getElementById('anterior').disabled =
            desde === 0;

        document.getElementById('siguiente').disabled =
            desde + cantidad >= resultado.total;

    } catch (error) {
        console.error(error.message);

        document.getElementById(
            'contenedorTarjetasAnimales'
        ).textContent = "No se pudieron cargar los animales";
    }
}

// Cargar la información de la categoría
function cargarCategoria() {
    const info = tarjetasCategorias[idCategoria];

    const titulos = {
        aereos: "Animales Aéreos",
        acuaticos: "Animales Acuáticos",
        terrestres: "Animales Terrestres"
    };

    document.getElementById('tituloCategoria').textContent =
        info?.tituloCategoria ?? titulos[idCategoria] ?? "Categoría desconocida";

    document.getElementById('descripcion').textContent =
        info?.descripcion ?? "";

    document.getElementById('ubicacion').textContent =
        info?.ubicacion ?? "";

    document.getElementById('horario').textContent =
        info?.horario ?? "";

    document.getElementById('consejo').textContent =
        info?.consejo ?? "";

    document.getElementById('anterior').addEventListener('click', () => {
        desde = Math.max(0, desde - cantidad);
        cargarAnimales();
    });

    document.getElementById('siguiente').addEventListener('click', () => {
        desde += cantidad;
        cargarAnimales();
    });

    cargarAnimales();
}

cargarCategoria();
