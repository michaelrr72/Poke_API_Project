$(document).ready(function () {
    $("#mi-boton").on("click", function () {
        var pokemonName = $("#txt-buscar").val().toLowerCase();
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                //console.log(data.sprites.other.home.front_default) // Imagen grande
                //console.log(data.sprites.other.showdown.front_default) // Gif
                // Crea un nuevo elemento de imagen
                var imgElement = $('<img>', {
                    src: data.sprites.other.showdown.front_default, // Ruta de la imagen
                    width: '150px' // Tamaño de la imagen
                });
                // Limpia el contenido anterior y añade el nuevo elemento de imagen al div
                //$("#pokemon-image").empty().append(imgElement);
                //$("#pokemon-image").html(`<img src="${data.sprites.other.showdown.front_default}" width= '150px'>`)
                $("#pokemon-image").html(imgElement)
            }
        })
    })
})