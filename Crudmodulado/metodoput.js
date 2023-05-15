//Variables de tipo DOM 
const d = document,
    $form = d.querySelector(".crud-form")

//PUT (Update)
export async function Postput(e) {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            //si no hay nada en el evento se crea un POST (CREATE)
            // En este try se crea un objeto de optiones (metodos) de la petición fetch
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
                    })
                },
                    res = await fetch("http://localhost:5555/santos", options),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText }; //misma manipulación del error que la del GETall

                location.reload();  //para que se actualice la db

            } catch (error) {
                let message = err.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`)
            }
        } else {
            //caso contrario se hará una actualización PUT (UPDATE)
            //se mantiene igual que en POST (solo cambia la url)
            try {
                let options = {
                    method: "PUT",
                    //se establecen los headers
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                    //se establece el cuerpo
                    body: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value,
                    }),
                },
                    res = await fetch(`http://localhost:5555/santos/${e.target.id.value}`, options),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText }; //misma manipulación del error que la del GETall

                location.reload();     //para que se actualice la db

            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`)
            }
        }
    }
};
