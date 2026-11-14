const ImagenesCategoria = {
    aereos: ["../imagenes/Tero2.webp", "../imagenes/loro2.webp", "../imagenes/hornero.jpeg","../imagenes/aguilaMora.jpeg"],
    terrestres: ["../imagenes/guanaco.webp", "../imagenes/choique.jpeg","../imagenes/mara.webp", "../imagenes/zorroGris.jpg"],
    acuaticos: ["../imagenes/pejerrey2.jpeg","../imagenes/bagreOtuno.jpeg","../imagenes/pancoraDeRio.jpeg","../imagenes/almeja.jpeg"]
}


const tarjetas = document.querySelectorAll('.contenedorCat');
let temporizador;

tarjetas.forEach(tarjeta => {
    const imagenes = tarjeta.querySelectorAll('img');
    const tituloCategoria = tarjeta.querySelector('h3');
    const imagenPrincipal = imagenes[0]; //Guardamos la referencia a la primer etiqueta
    const imagenSecundaria = imagenes[1]; //Guardamos la referencia a la segunda etiqueta

    
    let imagenPorDefecto = imagenPrincipal;

    const idCategoria = tarjeta.id;
    const listaImagenes = ImagenesCategoria[idCategoria];


    tarjeta.addEventListener('mouseenter', () => {
    console.log('El usuario puso el mouse sobre la tarjeta');

        //console.log("Id de la tarjeta:", idCategoria);

        imagenPorDefecto = imagenPrincipal.src; //Guardamos la referencia a la imagen original por defecto para reestablecerla luego
        iniciarAnimacionFondo(imagenPrincipal, imagenSecundaria, listaImagenes, tituloCategoria);
    })

    tarjeta.addEventListener('mouseleave', () => {
        console.log('El usuario sacó el mouse sobre la tarjeta');

        terminarAnimacionFondo(temporizador, imagenPrincipal, imagenSecundaria, imagenPorDefecto, tituloCategoria);
    })

});

function iniciarAnimacionFondo(img1, img2, listaImagenes, titulo) {
    let numIntervalo = 1;
    let i = 0;
    clearInterval(temporizador);

    temporizador = setInterval(() => {
        if (numIntervalo % 2 !== 0) {
            if (i === listaImagenes.length - 1) {
                img2.src = listaImagenes[i];
                i = 0;
            } else {
                img2.src = listaImagenes[i];
                i++;
            }
            img2.src = listaImagenes[i];
            img1.classList.remove('activa');
            img2.classList.add('activa');
            numIntervalo++;
        } else {
            if (i === listaImagenes.length - 1) {
                img1.src = listaImagenes[i];
                i = 0;
            } else {
                img1.src = listaImagenes[i];
                i++;
            }

            //console.log('imagen:', listaImagenes[i]);
            img1.src = listaImagenes[i];
            img2.classList.remove('activa');
            img1.classList.add('activa');
            numIntervalo++;
        }
        titulo.classList.add('activa');
        //console.log('intervalo número: ', numIntervalo);
        //console.log('número de iteración(i):', i);

    }, 1500);
}

function terminarAnimacionFondo(temporizador, imagenPrincipal, imagenSecundaria, imagenPorDefecto, titulo) {
    clearInterval(temporizador);

    imagenPrincipal.src = imagenPorDefecto;

    imagenPrincipal.classList.add('activa');
    imagenSecundaria.classList.remove('activa');
    titulo.classList.remove('activa');
}


