var index = 0;

const listaImagenes = ["../imagenes/Aguila.png","../imagenes/aguilaMora.jpeg","../imagenes/almeja.jpeg","../imagenes/Avestruz.png","../imagenes/bagreOtuno.jpeg","../imagenes/choique.jpeg","../imagenes/Colibri.png","../imagenes/guanaco.webp","../imagenes/hornero.png"];

function iniciarAnimacionFondo(img1, img2, listaImagenes) {
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
            img2.classList.remove('activa');
            img1.classList.add('activa');
            numIntervalo++;
        }
        //console.log('intervalo número: ', numIntervalo);
        //console.log('número de iteración(i):', i);

    }, 1500);
}