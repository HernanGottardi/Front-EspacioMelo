import imgMenu from '/src/assets/img/Menu.png';
import imgLogo from '/src/assets/img/logoEspacioMelo.png';
import "./index.css"
import {state} from "../../state"

export function initHeaderComponent () 
{
    class HeaderComponent extends HTMLElement {
        
        constructor () 
        {
            super();
            this.render();
        }

        async render ()
        {
            const shadow = this.attachShadow({mode: "open"});

            // Cargar el archivo CSS externo
            const style = document.createElement("style");
            const cssUrl = new URL('./index.css', import.meta.url).href;
            const response = await fetch(cssUrl);
            const cssText = await response.text();
            style.textContent = cssText;

            const header = document.createElement("header");
            header.className = "encabezado"
            header.innerHTML = `
                <a class="centrarEnlace centrarMenu" href="./index.html">
                    <img class="menu" src=${imgMenu} alt="Menu">
                </a>

                <div class="centrarEnlace contenedorLogo">
                    <img class="logo" src=${imgLogo} alt="Espacio Melo">
                </div>
                
                <div class="contenedorCarrito centrarEnlace">
                    <div class="cart-btn" id="cart-btn"> 🛒 </div>
                    <div class="cart-counter" id="cart-counter"> ${state.getState().lenCarrito}</div>
                </div>
            `;

            if (this.getAttribute("buscador") == "True")
            {
                const contenedorBuscador = document.createElement("div");
                contenedorBuscador.className = "contenedorBuscador"
                contenedorBuscador.innerHTML = `
                    <input class="buscadorProductos" type="text" placeholder="¿Qué estas buscando?">
                `
                header.appendChild(contenedorBuscador);

            }

            shadow.appendChild(style);
            shadow.appendChild(header);


            shadow.querySelector(".menu").addEventListener("click", (e)=>
            {
                e.preventDefault();
                const params = this.params;
                params.goTo("/menu")
            })

            shadow.querySelector(".logo").addEventListener("click", (e)=>
            {
                e.preventDefault();
                const params = this.params; 
                params.goTo("/inicio")
            })

            shadow.querySelector(".contenedorCarrito").addEventListener("click", (e)=>{
                e.preventDefault();
                const params = this.params;
                params.goTo("/carrito")
            });

            
            
        }
    }

    customElements.define("header-component", HeaderComponent)
}

