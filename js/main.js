$(document).ready(function () {
    $("#mi-boton").on("click", function () {
        var pokemonName = $("#txt-buscar").val().toLowerCase();
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                // Actualizar imagen
                $("#pokemon-image").html(`<img src="${data.sprites.other.home.front_default}" id="poke-img">`);

                // Actualizar otros datos
                $("#pokemon-name").text(data.name.toUpperCase());
                $("#pokemon-type").text(data.types.map(type => type.type.name).join(', '));
                $("#pokemon-height").text(`${data.height / 10} m`);
                $("#pokemon-weight").text(`${data.weight / 10} kg`);
                $("#pokemon-abilities").text(data.abilities.map(ability => ability.ability.name).join(', '));
            }
        });
    });
});