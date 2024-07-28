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

export function initProductoComponent() {
    class ProductoComponent extends HTMLElement {
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
                <div class="content">
                    <h3 class="nombreProducto">${this.getAttribute("nombre")}</h3>
                    <img src="${getRuta(this.getAttribute("img"))}">
                    <p class="precio">$${this.getAttribute("precio")}</p>
                    <a class="MasInformacion" href="#">Más Información</a>
                    <button class="botonComprar">Agregar al 🛒</button>
                </div>
            `;

            this.shadowRoot.appendChild(style)
            
            // Se agrega un elemento.
            this.shadowRoot.querySelector(".botonComprar").addEventListener("click", (e)=>
            {
                e.preventDefault();

                const productoSeleccionado = {
                    nombre: this.getAttribute("nombre"),
                    precio: this.getAttribute("precio"),
                    img: this.getAttribute("img"),
                    fecha: "",
                    horario: ""
                }

                state.addItem(productoSeleccionado)
                const params = this.params;

                params.goTo("/calendario")

            });
            // Ver mas informacion del producto
            this.shadowRoot.querySelector(".MasInformacion").addEventListener("click", (e)=>
            {
                e.preventDefault();

                const productoSeleccionado = {
                    nombre: this.getAttribute("nombre"),
                    precio: this.getAttribute("precio"),
                    img: this.getAttribute("img"), 
                    descripcion: this.getAttribute("descripcion"), 
                    duracion: this.getAttribute("duracion"), 
                };

                const estado = state.getState();
                estado.masInformacion = productoSeleccionado;
                state.setState(estado);

                const params = this.params;
                params.goTo("/informacionProducto")
            });
        }

        static get observedAttributes() {
            return ['nombre', 'img', 'precio'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.render();
            }
        }
    }

    customElements.define("producto-component", ProductoComponent);
}
