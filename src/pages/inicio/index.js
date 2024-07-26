import './index.css';
import { productos } from '../../productos.js';

function getProductos (palabra)
{
    if (palabra == "")
    {
        return JSON.stringify(productos)
    }
    else
    {
        const productosMatch = [];

        for (let i = 0; i < productos.length; i++) 
        {
            if (productos[i].name.includes(palabra))
            {
                productosMatch.push(productos[i])
            }
        }

        if (productosMatch.length == 0)
        {
            return JSON.stringify(productos)
        }
        else
        {
            return JSON.stringify(productosMatch)
        }

    }
}

export function initPageInicio(params) 
{
    const div = document.createElement("div");
    div.className = "contenedorInicio";

    // Escapar la cadena JSON para usarla en un atributo HTML
    const productosJSON = JSON.stringify(productos).replace(/"/g, '&quot;');

    div.innerHTML = `
        <header-component buscador="True"></header-component>
        <div class="card-products-container">
            <lista-productos-component productos="${productosJSON}"></lista-productos-component>        
        </div>
        <wpp-component></wpp-component>
    `;

    // Acceder al componente y asignarle directamente params
    const headerComponent = div.querySelector("header-component");
    headerComponent.params = params;

    const listaProductos = div.querySelector("lista-productos-component");
    listaProductos.params = params;

    // Usar MutationObserver para detectar cuando el shadow DOM está listo
    const observer = new MutationObserver(() => {
        const buscador = headerComponent.shadowRoot.querySelector(".buscadorProductos");
        if (buscador) {
            buscador.addEventListener("input", (e) => {
                e.preventDefault();

                const resultados = getProductos(e.srcElement.value)  
                listaProductos.setAttribute("productos", resultados)
                
            });
            observer.disconnect(); 
        }
    });

    observer.observe(headerComponent.shadowRoot, { childList: true, subtree: true });

    return div;
}

