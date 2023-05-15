//Variables de tipo DOM 

const d = document,
    //tabla para ubicar cada clase creada e ir más rápido directamente
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content, //se ubica el contenido de cada clase del template
    $fragment = d.createDocumentFragment();               //fragment para enviar todo a la vez al final

//Lecturas

//Realizando una petición por el método GET   (solicitar-read)
//se cargan con el GET todos los santos del json
const getAll = async () => {
    try {
        let res = await fetch("http://localhost:5555/santos"),
            json = await res.json();                            //crea el archivo respuesta .json

        if (!res.ok) throw { status: res.status, statusText: res.statusText }; //si la respuesta no es ok, bota error y el mensaje que está abajo

        console.log(json);

        //programación que afecta directo al dom:
        json.forEach(el => {
            //se ubica en el template (cada clase)
            $template.querySelector(".name").textContent = el.nombre;
            $template.querySelector(".constellation").textContent = el.constelacion;
            //para los botones de editar y delete
            $template.querySelector(".edit").dataset.id = el.id;
            $template.querySelector(".edit").dataset.name = el.nombre;
            $template.querySelector(".edit").dataset.constellation = el.constelacion;
            $template.querySelector(".delete").dataset.id = el.id;

            //se crea una variable clon para importar estos datos anteriores(name y constellation)
            //y se ubican con appendChild en el fragment creado cada uno
            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        })

        //luego del forEach, se envía a la tabla en la parte del tbody el fragmento creado
        $table.querySelector("tbody").appendChild($fragment);

    } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        $table.insertAdjacentHTML("afterend", `<p><b>Error ${err.status}:${message}</b></p>`)  //se inserta el mensaje de error al final de la tabla
    }
}

d.addEventListener("DOMContentLoaded", getAll);


//Realizando una nueva petición: PUT o POST (Update o Create)

//El evento se ejecutará cuando la variable del objeto que origina el evento es igual a lo que está en el formulario.(if)

d.addEventListener("submit", async e => {
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
});

//accionando el submit con un click para poder editar (realizar las actualizaciones por los botones)
d.addEventListener("click", async (e) => {
    //se acciona el editar y se van actualizando
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name;
        $form.constelacion.value = e.target.dataset.constellation;
        $form.id.value = e.target.dataset.id;
      }

    if (e.target.matches(".delete")) {
        let isDelete = confirm(
            `¿Estás seguro de borrar el id ${e.target.dataset.id}?`
        );

        if (isDelete) {
            //Delete - DELETE
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8",
                    },
                },
                    res = await fetch(
                        `http://localhost:5555/santos/${e.target.dataset.id}`,
                        options
                    ),
                    json = await res.json();

                if (!res.ok)
                    throw { status: res.status, statusText: res.statusText };

                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrió un error";
                alert(`Error ${err.status}: ${message}`);
            }
        }
    }
});