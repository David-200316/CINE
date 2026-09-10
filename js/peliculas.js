$(document).ready(function () {

    let peliculas = [
        { titulo: "Your Name", genero: "Romance", anio: 2016, imagen: "img/Your Name.jpg", favorito: false },
        { titulo: "A Silent Voice", genero: "Drama", anio: 2016, imagen: "img/A Silent Voice.jpg", favorito: false },
        { titulo: "Weathering with You", genero: "Romance", anio: 2019, imagen: "img/Weathering with You.jpg", favorito: false },
        { titulo: "Suzume", genero: "Fantasía", anio: 2022, imagen: "img/suzume.jpg", favorito: false },
        { titulo: "I Want to Eat Your Pancreas", genero: "Drama", anio: 2018, imagen: "img/I Want to Eat Your Pancreas.jpg", favorito: false },
        { titulo: "The Garden of Words", genero: "Romance", anio: 2013, imagen: "img/The Garden of Words.jpg", favorito: false },
        { titulo: "5 Centimeters Per Second", genero: "Romance", anio: 2007, imagen: "img/5 Centimeters Per Second.jpg", favorito: false },
        { titulo: "The Girl Who Leapt Through Time", genero: "Ciencia Ficción", anio: 2006, imagen: "img/The Girl Who Leapt Through Time.jpg", favorito: false }
    ];

    let mostrandoSoloFavoritos = false;

    function renderizarTabla(lista) {
        $("#listaPeliculas").empty();

        if (lista.length === 0) {
            $("#listaPeliculas").append("<tr><td colspan='5' style='text-align: center;'>No se encontraron películas</td></tr>");
            $("#contador").text("Mostrando 0 películas");
            return;
        }

        $.each(lista, function (index, p) {
            let indexReal = peliculas.findIndex(item => item.titulo === p.titulo);
            let textoBtnFav = p.favorito ? "❤️ Guardada" : "⭐ Favorito";
            let claseFav = p.favorito ? "btn-fav activo" : "btn-fav";

            let fila =
                "<tr>" +
                    "<td><img src='" + p.imagen + "' alt='poster' class='img-poster'></td>" +
                    "<td><strong>" + p.titulo + "</strong></td>" +
                    "<td><span class='badge-genero'>" + p.genero + "</span></td>" +
                    "<td>" + p.anio + "</td>" +
                    "<td><button class='" + claseFav + "' data-index='" + indexReal + "'>" + textoBtnFav + "</button></td>" +
                "</tr>";

            $("#listaPeliculas").append(fila);
        });

        $("#contador").text("Mostrando " + lista.length + " película(s)");
        actualizarContadorFavoritos();
    }

    function actualizarContadorFavoritos() {
        let totalFavs = peliculas.filter(p => p.favorito).length;
        $("#contadorFavs").text(totalFavs);
    }

    $("#btnCargar").on("click", function () {
        mostrandoSoloFavoritos = false;
        $("#btnVerFavoritos").removeClass("filtro-activo");
        renderizarTabla(peliculas);
        $("#tablaPeliculas").fadeIn(600);
    });

    function aplicarFiltros() {
        let textoBusqueda = $("#buscar").val().toLowerCase();
        let generoSeleccionado = $("#filtroGenero").val();

        let filtradas = peliculas.filter(function (p) {
            let coincideTexto = p.titulo.toLowerCase().includes(textoBusqueda);
            let coincideGenero = (generoSeleccionado === "" || p.genero === generoSeleccionado);
            let coincideFav = mostrandoSoloFavoritos ? p.favorito : true;
            
            return coincideTexto && coincideGenero && coincideFav;
        });

        renderizarTabla(filtradas);
    }

    $("#buscar").on("keyup", aplicarFiltros);
    $("#filtroGenero").on("change", aplicarFiltros);

    $("#btnVerFavoritos").on("click", function () {
        mostrandoSoloFavoritos = !mostrandoSoloFavoritos;
        $(this).toggleClass("filtro-activo", mostrandoSoloFavoritos);
        aplicarFiltros();
        $("#tablaPeliculas").fadeIn(400);
    });

    $(document).on("click", ".btn-fav", function () {
        let idx = $(this).data("index");
        peliculas[idx].favorito = !peliculas[idx].favorito;
        aplicarFiltros();
    });

    $("#tablaPeliculas").hide();
});