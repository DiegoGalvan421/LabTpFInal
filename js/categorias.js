const ImagenesCategoria = {
    imagenAereos: ["../imagenes/Vanellus_chilensis_map.svg.webp", "../imagenes/loro2.webp"],

}

const tarjetas = document.querySelectorAll('contenedorCat');

tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', () => {
        console.log('El usuario puso el mouse sobre la tarjeta');

        const idCategoria = tarjeta.id;

        iniciarAnimacionFondo(idCategoria, idCategoria);  
    })

    tarjeta.addEventListener('mouseleave', () => {
        console.log('El usuario puso el mouse sobre la tarjeta');

    })

});


function iniciarAnimacionFondo(tarjeta, categoria) {
    
    const listaImagenes = ImagenesCategoria[categoria];
    
    listaImagenes.forEach(imagen => {
        const imagen = tarjeta.querySelector('img');

        imagen.src = imagen;
    });
}
