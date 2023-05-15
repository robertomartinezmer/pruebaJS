//Variables de tipo DOM 
const d = document,
    //tabla para ubicar cada clase creada e ir más rápido directamente
    $form = d.querySelector(".crud-form");

//POST (Update o Create)
export const mpost = async () => {
    try {
        let options = {
            method: "POST",
            //se deben establecer los headers de las cabeceras de los tipos de contenidos para estas peticiones
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
            //se debe establecer tambien el cuerpo o body de la petición (o sea la forma en como se esta guardando en el JSON - el formato de la base de datos (JSON))
            body: JSON.stringify({
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value,
            }),
        },
            res = await fetch("http://localhost:5555/santos", options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }; //misma manipulación del error que la del GETall

        location.reload();  //para que se actualice la db

    } catch (error) {
        let message = err.statusText || "Ocurrió un error";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`)
    }
};