
import './index.css'; 
import {initLogicaMenu} from "./logica"

export function initPageMenu(params) 
{
    const contenedorMenu = document.createElement("div");
    contenedorMenu.className = "contenedorMenu";

    const headerMenu = document.createElement("header");
    headerMenu.className = "headerClose";
    headerMenu.innerHTML = `
        <div class="buttonClose">❌</div>
    `;

    const bodyMenu = document.createElement("body");
    bodyMenu.className = "contenedorOpcionesMenu"; 
    bodyMenu.innerHTML = `
        <a class="opcionMenu opcionInicio">Inicio</a> 
        <a class="opcionMenu opcionSobreMi">Sobre mí</a>
        <a class="opcionMenu opcionTarot">Tarot</a>
    `;

    contenedorMenu.appendChild(headerMenu)
    contenedorMenu.appendChild(bodyMenu)

    initLogicaMenu(params)

    return contenedorMenu;
}