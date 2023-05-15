//Importando todo lo necesario de los demás scripts.
import * as A1 from './metodoget.js';
import * as A2 from './metodopost.js';

import * as A4 from './metododelete.js';

//Variables de tipo DOM 
const d = document,
    //tabla para ubicar cada clase creada e ir más rápido directamente
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title")

//GET
d.addEventListener("DOMContentLoaded", A1.getAll);

//POST and PUT
d.addEventListener("submit", A2.Postput);

//DELETE
d.addEventListener("click", A4.mdelete);