
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


