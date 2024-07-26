import "./index.css"
import rutaImgMama from "/src/assets/img/nora.png"
export function initPageSobreMi (params)
{
    const div = document.createElement("div");
    div.className = "contenedorContacto"
    div.innerHTML = `
        <header-component buscador="False"></header-component>
        <div class="contenedor-sobreMi" style="display: block;">
            <div class="contenedorTituloSobreMi">
                <h3 class="tituloSobreMi">Sobre mí</h3>
            </div>
            <div class="contenedorImgSobreMi">
                <img src= ${rutaImgMama} class="imgMama" alt="Nora Canciani">
            </div>

            <div class="contenedorSubtituloSobreMi">
                <h3 class="subtituloSobreMi">Quien Soy</h3>
            </div>
            <div class="contenedorTextoSobreMi">
                <p>¡Hola! Soy Nora, una mujer nacida y criada en la hermosa provincia de Córdoba, Argentina. Desde muy joven, sentí una profunda conexión con el mundo espiritual, una guía interna que me ha acompañado a lo largo de toda mi vida.</p>
            </div>

            <div class="contenedorSubtituloSobreMi">
                <h3 class="subtituloSobreMi">Espacio Melo</h3>
            </div>
            <div class="contenedorTextoSobreMi">
                <p>Mi negocio está centrado en ofrecer lecturas de tarot, asesorías espirituales, y una variedad de servicios holísticos diseñados para alinear el cuerpo, la mente y el espíritu. Cada sesión es una oportunidad para conectar con el ser interior, desentrañar los misterios del alma y encontrar respuestas que conduzcan a una vida más plena y armoniosa.</p>
            </div>

            <div class="contenedorSubtituloSobreMi">
                <h3 class="subtituloSobreMi">Mi Trayectoria</h3>
            </div>
            <div class="contenedorTextoSobreMi">
                <p>Mi camino hacia lo espiritual comenzó desde temprana edad, cuando descubrí el poder del tarot y las prácticas holísticas. Con el tiempo, esta pasión se transformó en una vocación, llevando a la creación de mi propio negocio dedicado a ayudar a las personas a encontrar paz, equilibrio y guía a través de métodos ancestrales y sabiduría espiritual.</p>
            </div>
            
            <div class="contenedorSubtituloSobreMi">
                <h3 class="subtituloSobreMi">Invitación</h3>
            </div>
            <div class="contenedorTextoSobreMi">
                <p>Te invito a explorar este espacio sagrado, donde cada consulta es una puerta hacia el autoconocimiento y la transformación. Juntos, podemos desentrañar los misterios del universo y encontrar el camino hacia tu verdadera esencia.</p>
            </div>
            
        </div>
    `;

    // Acceder al componente y asignarle directamente params
    const headerComponent = div.querySelector("header-component");
    headerComponent.params = params;

    return div;
}