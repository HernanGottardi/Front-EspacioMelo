
const state = 
{
    data: {
        list: [],
        reservedDates: {}, 
        lenCarrito: 0
    },
    listeners: [],
    getState(){
        return this.data;
    },

    setState(newState){
        this.data = newState;
        for (const cb of this.listeners)
        {
            cb();
        };
    },
    subscribe(callback){
        this.listeners.push(callback);
    },
    addItem(item){
        const cs = this.getState();
        cs.list.push(item);
        this.setState(cs);
    },
    deleteItem(item)
    {
        const cs = this.getState();
        let lista = cs.list;
        for (let i = 0; i < lista.length; i++) {
            

            if (JSON.stringify(lista[i]) === JSON.stringify(item))
            {
                lista.splice(i, 1);
                this.setState(cs)
                break;
            }
        };
    },
    addReservedDate(dateKey) {
        const cs = this.getState();
        cs.reservedDates[dateKey] = true;
        this.setState(cs);
    },
    deleteReservedDate(fechahora)
    {
        const cs = this.getState();

        if (cs.reservedDates.hasOwnProperty(fechahora))
        {
            console.log("Se borra la fecha reservada.")
            delete cs.reservedDates[fechahora];
            this.data = cs;
        }  
    },
    sumCarrito()
    {
        const cs = this.getState();
        const cantidadActual = cs.lenCarrito;
        this.data.lenCarrito = cantidadActual + 1;
        return this.data.lenCarrito;
    },
    lesCarrito(){
        const cs = this.getState();
        const cantidadActual = cs.lenCarrito;
        this.data.lenCarrito = cantidadActual - 1;
        return this.data.lenCarrito;
    }
};

export {state};