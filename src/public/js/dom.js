var colors = [
    "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    "http://maps.google.com/mapfiles/ms/micons/pink-dot.png",
    "http://maps.google.com/mapfiles/ms/micons/orange-dot.png",
    "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png",
    "http://maps.google.com/mapfiles/ms/micons/yellow.png",
    "http://maps.google.com/mapfiles/ms/micons/blue.png",
    "http://maps.google.com/mapfiles/ms/micons/green.png",
    "http://maps.google.com/mapfiles/ms/micons/lightblue.png",
    "http://maps.google.com/mapfiles/ms/micons/orange.png",
    "http://maps.google.com/mapfiles/ms/micons/pink.png",
    "http://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png",
    "http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png",
    "http://maps.google.com/mapfiles/ms/micons/grn-pushpin.png",
    "http://maps.google.com/mapfiles/ms/micons/ltblu-pushpin.png"
]

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
        var valor = e.toElement.textContent;
    });
});

//tipo
var type= document.getElementById("octane1");

(async function () {
    const response = await fetch(`/tipo`);
    const data = await response.json()
    
    var li = document.createElement("option");
    type.appendChild(li);
    
    var li = document.createElement("option");
    li.setAttribute("class", "mdl-menu__item");
    li.setAttribute("value", 'TODOS');
    li.appendChild(document.createTextNode('TODOS'));
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
        (async function () {
            var  response  = ( tipo == "TODOS") ? await fetch(`/coordenadas_todo?municipio=${municipio}&localidad=${localidad}`):
            await fetch(`/coordenadas?municipio=${municipio}&localidad=${localidad}&tipo=${tipo}`) ;

            const data = await response.json()
            neighborhoods = [];
            if (data.length>0) var r_tipo = data[0].tipo;
            var id_color = 0;
            data.map(r => {
                if(r.lat != 0 & r.log != 0){
                    if(r.tipo != r_tipo){
                        r_tipo =r.tipo;
                        id_color ++;
                        console.log(`id tipo cambio ${id_color}`);
                    }
                    neighborhoods.push(  { lat: r.lat, lng: r.log , color : colors[id_color],
                         nombre : r.nombre , estatus : r.estatus , calle : r.calle, cp : r.cp});
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
