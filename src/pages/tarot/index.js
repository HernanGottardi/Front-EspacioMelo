
import {productos} from "../../productos"

function obtenerProductosTarot ()
{
    const listaTarot = []

    for (let i = 0; i < productos.length; i++) 
    {
        if (productos[i].name.includes("Tarot"))
        {
            listaTarot.push(productos[i])
        }
    }

    return JSON.stringify(listaTarot);
}

export function initPageTarot(params) {
    const div = document.createElement("div");
    div.className = "contenedorInicio";

    // Escapar la cadena JSON para usarla en un atributo HTML
    const productosJSON = obtenerProductosTarot().replace(/"/g, '&quot;');

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

    return div;
}
