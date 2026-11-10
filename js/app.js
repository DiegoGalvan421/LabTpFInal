function cargarHeader() {
    const encabezado = document.getElementById('encabezado-dinamico');

    const contenidoHeader = `
        <nav class="Navegacion">
            <div class="Logo">
                <img class="Logo-Header" src="../imagenes/parque_nacional_comahue_logo_transparent.png" alt="Logo" />
            </div>
            <ul class="LinksNav">
                <li><a href="index.html"><strong>PARQUE NACIONAL DEL COMAHUE</strong></a></li>
                <li><a href="index.html">Sobre el Parque</a></li>
                <li><a href="Categorias.html">Fauna</a></li>
                <li><a href="entradas.html">Entradas</a></li>
            </ul>
        </nav>`;

    encabezado.innerHTML = contenidoHeader;
}

function cargarFooter() {
    const piePagina = document.getElementById('pie-pagina-dinamico');

    const contenidoFooter = `
    <section class="Info-General">
        <p>Parque Nacional del Comahue — Protegiendo el patrimonio natural y cultural del Valle del Comahue, Río Negro</p>
        <p>Ruta Nacional 22, Km 1200 — Valle del Comahue, Río Negro</p>
        <p>Horarios: Martes a Domingos de 10:00 a 18:00 hs.</p>

        <ul class="LinksNav">
            <li><a href="mailto:info@parquenacionalcomahue.org.ar">Mail: info@parquenacionalcomahue.org.ar</a></li>
            <li><a href="tel:+543504882300">Teléfono: +54 (350) 488-2300</a></li>
        </ul>
        <p>Copyright © 2026 Parque Nacional Del Comahue</p>
    </section>

    <section class="Logo">
      <img class="Logo-Footer" src="../imagenes/parque_nacional_comahue_logo_transparent.png" alt="Logo" /></img>
    </section>`;

    

    piePagina.innerHTML = contenidoFooter;
}

cargarHeader();
cargarFooter();