document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".list_item");
    container.setAttribute("data-original-html", container.innerHTML);

    const searchInput = document.getElementById("search_input");
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase(); 
        filterProducts(searchValue);
    });
});

function filterProducts(searchValue) {
    const container = document.querySelector(".list_item");
    const originalHTML = container.getAttribute("data-original-html");

    if (!searchValue || searchValue.trim() === "") {
        container.innerHTML = originalHTML;
        return;
    }

    const productList = document.querySelectorAll(".list-item_content");
    const filteredProducts = Array.from(productList).filter((product) => {
        const code = product.querySelector(".list-item_text:nth-child(2)").textContent.toLowerCase(); 
        const name = product.querySelector(".list-item_text:nth-child(3)").textContent.toLowerCase(); 
        const collection = product.querySelector(".list-item_text:nth-child(4)").textContent.toLowerCase(); 

        return (
            code.includes(searchValue) ||
            name.includes(searchValue) ||
            collection.includes(searchValue)
        );
    });

    const filteredHTML = filteredProducts
        .map((product) => product.outerHTML)
        .join("");

    container.innerHTML = filteredHTML;

    const noResults = document.querySelector(".no-results");
    if (noResults) {
        container.removeChild(noResults);
    }

    const visibleProducts = document.querySelectorAll(".list-item_content");
    if (visibleProducts.length === 0) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add("no-results");
        noResultsMessage.textContent = "No se encontraron resultados";
        container.appendChild(noResultsMessage);
    }
}