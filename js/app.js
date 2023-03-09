function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);
    const resultado = document.querySelector('#resultado');

    obtenerCategorias();

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarCategoria(resultado.categories))
    }

    function mostrarCategoria(categorias = []){
        categorias.forEach(categoria => {
            const {strCategory} = categoria;
            const option = document.createElement('option');
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option)
        })
    }

    function seleccionarCategoria(e){
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals))
    }

    function mostrarRecetas(recetas = []){
        recetas.forEach(receta => {
            const {idMeal, strMeal, strMealThumb} = receta;
            const recetaContenedor = document.createElement('div');
            recetaContenedor.classList.add('col-md-4')

            const recetaCard = document.createElement('div');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImg = document.createElement('img');
            recetaImg.classList.add('card-img-top');
            recetaImg.alt = `Imagen de la receta ${strMeal}`;
            recetaImg.src = strMealThumb;

            const recetaCardBody = document.createElement('div');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('h3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaBtn = document.createElement('button');
            recetaBtn.classList.add('btn', 'btn-danger', 'w-100');
            recetaBtn.textContent = 'Ver receta';

            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaBtn);
            recetaCard.appendChild(recetaImg);
            recetaCard.appendChild(recetaCardBody);
            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
        })
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);