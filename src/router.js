import {initPageInicio} from "./pages/inicio"
import {initPageSobreMi} from "./pages/sobreMi"
import {initPageTarot} from "./pages/tarot"
import {initPageMenu} from "./pages/menu"
import {initPageCarrito} from "./pages/carrito"
import {initPageCalendario} from "./pages/calendario"

// Configuracion de rutas.
const routes = [
    {
        path: /\//,
        component: initPageInicio,
    },
    {
        path: /\/inicio/,
        component: initPageInicio
    },
    {
        path: /\/menu/,
        component: initPageMenu,
    },
    {
        path: /\/sobreMi/,
        component: initPageSobreMi
    },
    {
        path: /\/tarot/,
        component: initPageTarot
    },
    {
        path: /\/carrito/,
        component: initPageCarrito
    },
    {
        path: /\/calendario/,
        component: initPageCalendario
    }
];

export function initRouter(container)
{

    function goTo (path)
    {
        history.pushState({}, "", path);
        handleRoute(path);
    }

    async function  handleRoute(route)
    {
        for (const r of routes)
        {
            if (r.path.test(route))
            {

                const el = await r.component({goTo: goTo});
                
                if (container.firstChild)
                {
                    container.firstChild.remove();
                }

                container.appendChild(el);
            }
        }
    }

    handleRoute(location.pathname)
}