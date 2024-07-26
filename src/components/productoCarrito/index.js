import pendulo from '/src/assets/img/pendulo.png';
import tarot from '/src/assets/img/tarot.png';
import registrosakashicos from '/src/assets/img/registrosakashicos.png';
import reiki from '/src/assets/img/reiki.png';
import tarotFULL from '/src/assets/img/tarotFULL.png';

import {state} from "../../state"

function getRuta (nombre) 
{
    switch (nombre) {
        case "pendulo":
            return pendulo;
        case "tarot":
            return tarot;
        case "registrosakashicos":
            return registrosakashicos;
        case "reiki":
            return reiki;
        case "tarotFULL":
            return tarotFULL;
        default:
            return reiki;
    }
}

export function initProductoCarritoComponent() 
{

    class ProductoCarritoComponent extends HTMLElement 
    {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            this.render();
        }

        async render() {
            // Cargar el archivo CSS externo
            const style = document.createElement("style");
            const cssUrl = new URL('./index.css', import.meta.url).href;
            const response = await fetch(cssUrl);
            const cssText = await response.text();
            style.textContent = cssText;

            this.shadowRoot.innerHTML = `
                <div class="contenedorFechaHora">
                    <p>Fecha: ${this.getAttribute("fecha")}</p>
                    <p>Horario: ${this.getAttribute("horario")}hs</p>
                </div>
                <div class="content">
                    <img class="imagenProductoCarrito" src="${getRuta(this.getAttribute("img"))}">
                    <h3 class="nombre">${this.getAttribute("nombre")}</h3>
                    <p class="precio">$${this.getAttribute("precio")}</p>
                    <div class="botonQuitar">⛔</div>
                </div>
            `;

            this.shadowRoot.appendChild(style)

            // {2024-07-11-11:00: true, 2024-07-16-17:00: true, 2024-07-28-17:00: true, 2024-07-30-17:00: true}

            this.shadowRoot.querySelector(".botonQuitar").addEventListener("click", (e)=>
            {
                e.preventDefault();

                const fecha = this.getAttribute("fecha")
                const horario = this.getAttribute("horario")

                const producto = {
                    nombre: this.getAttribute("nombre"),
                    precio: this.getAttribute("precio"),
                    img: this.getAttribute("img"),
                    fecha: fecha,
                    horario: horario
                };

                // 17/07/2024-10:00
                const partes = fecha.split("/")
                const fechaFormateada = partes[2] + "-" + partes[1] + "-" + partes[0]  + "-" + horario

                state.deleteItem(producto);
                state.deleteReservedDate(fechaFormateada.toString())
                state.lesCarrito();
            });
        }
    }

    customElements.define("producto-carrito-component", ProductoCarritoComponent);
}
