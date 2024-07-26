import "./index.css"

export function initPageCarrito (params)
{
    const contenedorCarrito = document.createElement("div");
    contenedorCarrito.className = "contenedorCompras"
    contenedorCarrito.innerHTML = `
        <header class="headerClose">
            <div class="buttonClose">❌</div>
        </header>
        <h1 class="tituloCarrito">Tu carrito 🛒</h1>
        <div class="subrayado"></div>
        <lista-carrito-component></lista-carrito-component>
    `;
    contenedorCarrito.querySelector(".buttonClose").addEventListener("click", (e)=>{
        e.preventDefault();
        params.goTo("/inicio")
    })

    return contenedorCarrito;
}