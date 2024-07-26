import {initRouter} from "./router"
import {initHeaderComponent} from "./components/header"
import {initProductoComponent} from "./components/producto"
import {initListaProductosComponent} from "./components/listaProductos"
import {initWppComponent} from "./components/wpp"
import {initListaCarritoComponent} from "./components/listaCarrito"
import {initProductoCarritoComponent} from "./components/productoCarrito"


(function()
{
    initHeaderComponent();
    initProductoComponent();
    initListaProductosComponent();
    initWppComponent();
    initListaCarritoComponent();
    initProductoCarritoComponent();

    const root = document.querySelector(".root")
    initRouter(root);
})()