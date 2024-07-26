// import "./index.css"
import { state } from "../../state";

export function initListaCarritoComponent() {
    class ListaCarritoComponent extends HTMLElement {
        
        shadow = this.attachShadow({ mode: "open" });

        constructor() {
            super();
        }

        connectedCallback() {
            state.subscribe(() => {
                this.render();
            });

            this.render();
        }

        generateCartDescription() {
            const cs = state.getState().list;
            return cs.map(product => `${product.nombre}`).join(', ');
        }

        generateCartFechaHorario() {
            const cs = state.getState().list;
            const listaFechasHoras = [];

            console.log(cs)

            for (let i = 0; i < cs.length; i++) {
                const producto = cs[i];
                const fechaCruda = producto.fecha.split("/");
                const fechaGuion = fechaCruda.map(fecha => `${fecha}`).join('-');
                listaFechasHoras.push(`${fechaGuion}-${cs[i].horario}`);    
            }
            const lista = listaFechasHoras.map( e => `${e}`).join('.')

            return lista;
        }

        createCheckoutButton(preferenceId) {
            // Crear el contenedor si no existe
            let walletContainer = this.shadow.querySelector('#wallet_container');
            if (!walletContainer) {
                walletContainer = document.createElement('div');
                walletContainer.id = 'wallet_container';
                this.shadow.appendChild(walletContainer);
            }

            const mp = new MercadoPago('APP_USR-38e265f7-7184-46ce-a88d-f9f21c60ac96', {
                locale: 'es-AR'
            });

            mp.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '#wallet_container',
                    label: 'Pagar',
                }
            });
        };

        async render() {
            this.shadow.innerHTML = '';

            // Cargar el archivo CSS externo
            const style = document.createElement("style");
            const cssUrl = new URL('./index.css', import.meta.url).href;
            const response = await fetch(cssUrl);
            const cssText = await response.text();
            style.textContent = cssText;

            const list = state.getState().list;

            const contenedorLista = document.createElement("div");
            contenedorLista.className = "encabezado";
            
            if (list.length !== 0) {
                let totalCompra = 0;

                list.forEach(item => {
                    totalCompra += parseFloat(item.precio);
                });

                const ul = document.createElement("ul");
                ul.className = "lista";
                list.forEach(item => {
                    const productoComponent = document.createElement("producto-carrito-component");
                    productoComponent.setAttribute('nombre', item.nombre);
                    productoComponent.setAttribute('precio', item.precio);
                    productoComponent.setAttribute('img', item.img);
                    productoComponent.setAttribute('fecha', item.fecha);
                    productoComponent.setAttribute('horario', item.horario);
                    ul.appendChild(productoComponent);
                });

                contenedorLista.appendChild(ul);

                const contenedorTotal = document.createElement("div");
                contenedorTotal.className = "contenedorTotal";
                contenedorTotal.innerHTML = `<p class="total">Total: $${totalCompra}</p>`;
                contenedorLista.appendChild(contenedorTotal);

                const boton = document.createElement("div");
                boton.className = "contenedorBotonComprar";
                boton.innerHTML = `
                    <button class="btn-primary buttonConfirmarCompra" id="checkout-btn">Ir a Pagar</button>
                `;
                
                contenedorLista.appendChild(boton);
            } else {
                const mensaje = document.createElement("div");
                mensaje.className = "sinCompras";
                mensaje.innerHTML = `
                    <p> Todavia no se agrego ningun producto... 👀<p>
                `;
                contenedorLista.appendChild(mensaje);
            }

            this.shadow.appendChild(style);
            this.shadow.appendChild(contenedorLista);

            const checkoutBtn = this.shadow.querySelector("#checkout-btn");

            if (checkoutBtn) {
                checkoutBtn.addEventListener("click", async () => {
                    const total = this.shadow.querySelector(".total").textContent;
                    const totalSinSigno = total.split("$")[1];
                    try {
                        const orderData = {
                            title: `${this.generateCartDescription()}`,
                            quantity: 1,
                            price: totalSinSigno,
                            fechas: `${this.generateCartFechaHorario()}`,
                        };

                        const response = await fetch("http://localhost:3000/create_preference", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(orderData)
                        });

                        const preference = await response.json();
                        this.createCheckoutButton(preference.id);
                    } catch (error) {
                        console.log(error);
                        alert("Error al procesar el pago 😕");
                    }
                });
            }
        }
    }

    customElements.define("lista-carrito-component", ListaCarritoComponent);
}
