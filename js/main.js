$(document).ready(function () {
    // Funcion de busqueda
    $("#mi-boton").on("click", function () {
        var pokemonName = $("#txt-buscar").val().toLowerCase();

        $("#error-message").hide();
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                //console.log(data.sprites.other.home.front_default) // Imagen grande
                //console.log(data.sprites.other.showdown.front_default) // Gif
                //console.log(data.name)
                // Actualizar imagen
                $("#poke-image").html(`<img src="${data.sprites.other.home.front_default}" id="poke-img">`);
                $("#poke-gif").html(`<img src="${data.sprites.other.showdown.front_default}" id="poke-anim">`);

                // Actualizar descripcion
                $("#poke-name").text(data.name.toUpperCase());
                $("#poke-id").text(data.id);
                $("#poke-type").text(data.types.map(type => type.type.name).join(', '));
                $("#poke-height").text(`${data.height / 10} m`);
                $("#poke-weight").text(`${data.weight / 10} kg`);
                $("#poke-abilities").text(data.abilities.map(ability => ability.ability.name).join(', '));

                // Actualizar estadísticas
                $("#poke-stats").empty();
                data.stats.forEach(stat => {
                    $("#poke-stats").append($("<tr>").append($("<td>").text(stat.stat.name.toUpperCase()), $("<td>").text(stat.base_stat)));
                });
                /*data.stats.forEach(stat => {
                    $("#poke-stats").append($("<li>").text(`${stat.stat.name}: ${stat.base_stat}`));
                });*/
            },
            error: function (xhr, status, error) {
                // Manejar error 404 (Pokémon no encontrado)
                if (xhr.status === 404) {
                    const errorMessage = `<strong>Error 404:</strong> El Pokémon "${pokemonName}" no fue encontrado.`;
                    $("#error-message").html(errorMessage).show();
                } else {
                    console.error("Error al obtener datos del Pokémon:", error);
                }
            }
        });
    });
    //Comandos de voz
    $("#activar-voz").on('click', function () {
        //artyom.say("sonido activado");
        console.log("sonido activado");
        // Comandos de voz
        var artyom = new Artyom();

        artyom.addCommands([
            {
                indexes: ['buscar *', 'Buscar *'],
                smart: true,
                action: (i, wildcard) => {
                    var pokemonName = wildcard.trim().toLowerCase();
                    $("#txt-buscar").val(pokemonName);
                    $("#mi-boton").trigger("click");
                }
            },
            {
                indexes: ['prueba'],
                action: (i) => {
                    var pokeRandom = Math.floor(Math.random() * 1025) + 1;
                    console.log("¡El comando de voz funcionó!, buscare al pokemon " + pokeRandom);
                    $("#txt-buscar").val(pokeRandom);
                    $("#mi-boton").trigger("click");
                }
            },
            {
                indexes: ['apagar', 'Apagar', 'turn off'],
                action: (i) => {
                    artyom.fatality();
                }
            }
        ]);

        // Start the commands !
        artyom.initialize({
            lang: "es-ES", // Español
            continuous: true, // Listen forever
            soundex: true,// Use the soundex algorithm to increase accuracy
            debug: true, // Show messages in the console
            listen: true // Start to listen commands !
        });


        artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
            if (isFinal) {
                console.log("Texto final reconocido: " + recognized);
            } else {
                console.log(recognized);
            }
        });
    });
});