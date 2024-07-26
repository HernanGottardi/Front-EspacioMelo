import imgMenu from '/src/assets/img/Menu.png';
import imgLogo from '/src/assets/img/logoEspacioMelo.png';
import imgWpp from '/src/assets/img/WhatsApp.png';
import "./index.css"

export function initWppComponent () 
{
    class WppComponent extends HTMLElement {
        
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

            const iconoWpp = document.createElement("a")
            iconoWpp.className = "wpp-enlace";
            iconoWpp.href = "https://wa.me/message/JF5BCO7TZVLVG1";
            iconoWpp.target = "_blank"
            iconoWpp.rel = "noopener noreferrer";
            iconoWpp.innerHTML = `
                <img src=${imgWpp} class="wpp-btn" id="wpp-btn">
            `;

            shadow.appendChild(style);
            shadow.appendChild(iconoWpp);

        }
    }
    customElements.define("wpp-component", WppComponent)
}