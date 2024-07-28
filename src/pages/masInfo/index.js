import './index.css';
import {state} from "../../state"

import pendulo from '/src/assets/img/pendulo.png';
import tarot from '/src/assets/img/tarot.png';
import registrosakashicos from '/src/assets/img/registrosakashicos.png';
import reiki from '/src/assets/img/reiki.png';
import tarotFULL from '/src/assets/img/tarotFULL.png';

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

export function initPageMasInfo(params) 
{
    const div = document.createElement("div");
    div.className = "contenedorMasInfo";

    div.innerHTML = `
        <header-component buscador="True"></header-component>
        <div class="contenedorInformacion">
            
            <h1 class="tituloProducto">Informacion de Producto</h1>
            <div class="contenedorImgProducto">
                <img class="imgProducto" alt="Imagen Producto"></img>
            </div>
            <div class="contenedorDescripcion">
                <h4 class="tituloDescripcion">DESCRIPCIÓN</h4>
                <p class="descripcionProducto"></p>
            </div>
            <div class="contenedorCaracteristicas">
                <h4 class="tituloCaracteristicas">CARACTERISTICAS</h4>
                <p class="duracionProducto"></p>
                <p class="modalidad"> - Modalidad: Virtual.</p>
                <p class="precio"></p>
            </div>
            <div class="contenedorBoton">
                <button class="botonComprar">Agregar al 🛒</button>
            </div>

        </div>
        <wpp-component></wpp-component>
    `;

    // Acceder al componente y asignarle directamente params
    const headerComponent = div.querySelector("header-component");
    headerComponent.params = params;

    const estado = state.getState().masInformacion;

    const titulo = div.querySelector(".tituloProducto");
    titulo.textContent = estado.nombre;

    const imgProducto = div.querySelector(".imgProducto");
    imgProducto.setAttribute("src", getRuta(estado.img));

    const descripcionProducto = div.querySelector(".descripcionProducto");
    descripcionProducto.textContent = estado.descripcion;

    const duracionProducto = div.querySelector(".duracionProducto");
    duracionProducto.textContent = " - Duración: " + estado.duracion;

    const precio = div.querySelector(".precio");
    precio.textContent = " - Precio: $" + estado.precio + ".";

    div.querySelector(".botonComprar").addEventListener("click", (e)=>
    {
        e.preventDefault();

        const productoSeleccionado = {
            nombre: estado.nombre,
            precio: estado.precio,
            img: estado.img,
            fecha: "",
            horario: ""
        }

        state.addItem(productoSeleccionado)

        params.goTo("/calendario")

    });

    return div;
}

