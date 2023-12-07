// hasta que el HTML se cargue
document.addEventListener("DOMContentLoaded", () => {
    // obtiene el contenedor sobre el que va a iterar y trae los elementos
    const container = document.querySelector(".list_item");
    
    // guarda el contenido original para usarlo después
    container.setAttribute("original-html", container.innerHTML);
    
    // obtiene el elemento del input
    const searchInput = document.getElementById("search_input");
    
    // escucha el evento de entrada en el input
    searchInput.addEventListener("input", () => {
        // pasa a minusculas el valor que se ingresa en el input
        const searchValue = searchInput.value.toLowerCase();
        
        // filtra el valor segun lo que se ingresa
        filterProducts(searchValue);
    });
});

function filterProducts(searchValue) {
    // obtiene el contenedor de la lista de elementos pero para modificarlos
    const container = document.querySelector(".list_item");

    // obtiene el contenido HTML original que se había guardado
    const originalHTML = container.getAttribute("original-html");
    
    // si no hay un valor de búsqueda
    if (!searchValue || searchValue.trim() === "") {
        // entonces devuelve el contenido HTML original en el contenedor
        container.innerHTML = originalHTML;
        return;
    }
    
    // obtiene todos los elementos de la lista
    const productList = document.querySelectorAll(".list-item_content");
    
    // los filtra según el valor de búsqueda
    const filteredProducts = Array.from(productList).filter((product) => {
        const code = product
            .querySelector(".list-item_text:nth-child(2)")
            .textContent.toLowerCase();
        const name = product
            .querySelector(".list-item_text:nth-child(3)")
            .textContent.toLowerCase();
        const collection = product
            .querySelector(".list-item_text:nth-child(4)")
            .textContent.toLowerCase();
        // para determinar si los valores se incluyen o no en lo que devuelve
        return (
            code.includes(searchValue) ||
            name.includes(searchValue) ||
            collection.includes(searchValue)
        );
    });
    
    // crea una cadena de HTML ya filtrado con los productos que encontró
    const filteredHTML = filteredProducts
        .map((product) => product.outerHTML)
        .join("");
    
    // actualiza el contenido del contenedor
    container.innerHTML = filteredHTML;
    
    // elimina el mensaje "no se encontraron resultados" si se encontró un resultado
    const noResults = document.querySelector(".no-results");
    if (noResults) {
        container.removeChild(noResults);
    }
    
    // pero si no hay resultados, después del filtrado
    const visibleProducts = document.querySelectorAll(".list-item_content");
    if (visibleProducts.length === 0) {
        // crear un mensaje de "no se encontraron resultados" y lo agrega al contenedor dentro de un div
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add("no-results");
        noResultsMessage.textContent = "No se encontraron resultados";
        container.appendChild(noResultsMessage);
    }
}
