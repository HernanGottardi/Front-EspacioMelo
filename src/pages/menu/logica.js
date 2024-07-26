
export function initLogicaMenu (params)
{
    setTimeout(() => 
    {

        const buttonClose = document.querySelector(".buttonClose");
        if (buttonClose)
        {
            buttonClose.addEventListener("click", (e) => 
            {
                e.preventDefault();
                params.goTo("/inicio");
            });
        }

        const buttonSobreMi = document.querySelector(".opcionSobreMi");
        if (buttonSobreMi)
        {
            buttonSobreMi.addEventListener("click", (e)=>{
                e.preventDefault();
                params.goTo("/sobreMi")
            });
        }

        const buttonTarot = document.querySelector(".opcionTarot");
        if (buttonTarot)
        {
            buttonTarot.addEventListener("click", (e)=>{
                e.preventDefault();
                params.goTo("/tarot")
            });
        }

        const buttonInicio = document.querySelector(".opcionInicio");
        if (buttonInicio)
        {
            buttonInicio.addEventListener("click", (e)=>{
                e.preventDefault();
                params.goTo("/inicio")
            });
        }
        
    }, 0);
    
}