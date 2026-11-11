const ImagenesCategoria = {
    imagenAereos: ["../imagenes/Vanellus_chilensis_map.svg.webp", "../imagenes/loro2.webp"],

}

let temporizador;

const tarjetas = document.querySelectorAll('contenedorCat');

tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', () => {
        console.log('El usuario puso el mouse sobre la tarjeta');

        const idCategoria = tarjeta.id;

        iniciarAnimacionFondo(idCategoria, idCategoria);  
    })

    tarjeta.addEventListener('mouseleave', () => {
        console.log('El usuario puso el mouse sobre la tarjeta');
        terminarAnimacionFondo();
    })

});


function iniciarAnimacionFondo(tarjeta, categoria) {
    let i=0;
    let imagen;

    const listaImagenes = ImagenesCategoria[categoria];

    temporizador = setInterval(() => {
        
        const etiquetaImagen = tarjeta.querySelector('img');
        
        if(i<listaImagenes.length){
            imagen = listaImagenes[i];
            i++;
        }else{
            i=0;
            imagen = listaImagenes[i];
        }

        etiquetaImagen.src = imagen;
    },1000);
}

function terminarAnimacionFondo(){
    clearInterval(temporizador);
}
