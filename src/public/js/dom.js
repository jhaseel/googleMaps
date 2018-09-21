
var municipiosTags = [];
for (const id in data) {
    if (data.hasOwnProperty(id)) {
        const element = data[id];
        municipiosTags.push(element.INMUEBLE_C_NOM_MUN);
    }
}

$(function () {
    municipiosTags
    $("#municipios").autocomplete({
        source: municipiosTags
    });
});




function callLocalidades() {
    var options = document.getElementById("octane");

    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    var x = document.getElementById("municipios");
    var li = document.createElement("option");
    options.appendChild(li);
    (async function () {
        const response = await fetch(`/localidades?municipio=${x.value}`);
        const data = await response.json()
        data.map(r => {
            var li = document.createElement("option");
            li.setAttribute("class", "mdl-menu__item");
            li.setAttribute("value", r.INMUEBLE_C_NOM_LOC);
            li.appendChild(document.createTextNode(r.INMUEBLE_C_NOM_LOC));
            options.appendChild(li);
        })
        //    document.getElementById('inputLocalidad').disabled=false;
    })();
}


$(document).ready(function () {
    $('option').click(function (e) {
        console.log(e);
        var valor = e.toElement.textContent;
        console.log(e.toElement.textContent);
    });
});


//tipo
var type= document.getElementById("octane1");

(async function () {
    const response = await fetch(`/tipo`);
    const data = await response.json()
    var li = document.createElement("option");
    type.appendChild(li);

    data.map(r => {
        var li = document.createElement("option");
        li.setAttribute("class", "mdl-menu__item");
        li.setAttribute("value", r.C_TIPO);
        li.appendChild(document.createTextNode(r.C_TIPO));
        type.appendChild(li);
    })
})();

function busqueda(){
    let municipio = document.getElementById("municipios").value;
    let localidad = document.getElementById("octane").value;
    let tipo = document.getElementById("octane1").value;
    if(municipio!="" & localidad != "" & tipo != ""){
        console.log("entro");
        (async function () {
            const response = await fetch(`/coordenadas?municipio=${municipio}&localidad=${localidad}&tipo=${tipo}`);
            const data = await response.json()
            neighborhoods = [];        
            data.map(r => {
                if(r.lat != 0 & r.log != 0){
                    neighborhoods.push(  { lat: r.lat, lng: r.log });
                    console.log(r);
                }

            })
            toast(data.length);
            drop();
        })();

    }else{
        console.log("faltan campos");
    }
}


//toast


    var snackbarContainer = document.querySelector('#demo-toast-example');
    function toast(element){
        'use strict';
        var data = {message: 'lugares encontrados # ' + element};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
