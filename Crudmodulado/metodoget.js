//Variables de tipo DOM 
const d = document,
    //tabla para ubicar cada clase creada e ir más rápido directamente
    $table = d.querySelector(".crud-table"),
    $template = d.getElementById("crud-template").content,  //se ubica el contenido de cada clase del template
    $fragment = d.createDocumentFragment();                 //fragment para enviar todo a la vez al final

//Método GET   (solicitar-read)
export const getAll = async () => {
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
    }
}