
export function initListaProductosComponent() {
    class ListaProductosComponent extends HTMLElement {

        constructor() 
        {
            super();
            this.attachShadow({ mode: "open" });
        }

        static get observedAttributes() 
        {
            return ['productos'];
        }

        attributeChangedCallback(name, oldValue, newValue) 
        {
            if (name === 'productos' && oldValue !== newValue) 
            {
                this.render();
            }
        }

        async render() 
        {
            // llamamos al shadow que creamos en el constructor.
            const shadow = this.shadowRoot;

            // Limpiar el contenido del shadowRoot antes de renderizar
            while (shadow.firstChild) 
            {
                shadow.removeChild(shadow.firstChild);
            }

            // Cargar el archivo CSS externo
            const style = document.createElement("style");
            const cssUrl = new URL('./index.css', import.meta.url).href;
            const response = await fetch(cssUrl);
            const cssText = await response.text();
            style.textContent = cssText;

            const contenedorLista = document.createElement("div");
            contenedorLista.className = "card-products";
            contenedorLista.id = "shopContent";

            if (this.hasAttribute('productos')) {
                try 
                {
                    const productos = JSON.parse(this.getAttribute('productos'));
                    productos.forEach(objProducto => {
                        const productoComponent = document.createElement("producto-component");
                        productoComponent.params = this.params;
                        productoComponent.setAttribute('nombre', objProducto.name);
                        productoComponent.setAttribute('precio', objProducto.price);
                        productoComponent.setAttribute('img', objProducto.img);
                        productoComponent.setAttribute('descripcion', objProducto.description);
                        productoComponent.setAttribute('duracion', objProducto.duration);
                        contenedorLista.appendChild(productoComponent);
                    });
        
                    shadow.appendChild(style);
                    shadow.appendChild(contenedorLista);
                } catch (e) {
                    console.error("Error parsing productos attribute", e);
                }
            }
        }
    }

    customElements.define("lista-productos-component", ListaProductosComponent);
}
