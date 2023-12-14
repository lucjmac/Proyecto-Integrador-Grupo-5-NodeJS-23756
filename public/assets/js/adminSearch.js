document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".list_item");

    container.setAttribute("original-html", container.innerHTML);

    const searchInput = document.getElementById("search_input");

    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();

        filterProducts(searchValue);
    });
});

function filterProducts(searchValue) {
    const container = document.querySelector(".list_item");

    const originalHTML = container.getAttribute("original-html");

    if (!searchValue || searchValue.trim() === "") {
        container.innerHTML = originalHTML;
        return;
    }

    const productList = document.querySelectorAll(".list-item_content");

    const filteredProducts = Array.from(productList).filter((product) => {
        const sku = product
            .querySelector(".list-item_text:nth-child(2)")
            .textContent.toLowerCase();
        const name = product
            .querySelector(".list-item_text:nth-child(3)")
            .textContent.toLowerCase();
        const licence = product
            .querySelector(".list-item_text:nth-child(4)")
            .textContent.toLowerCase();

        return (
            sku.includes(searchValue) ||
            name.includes(searchValue) ||
            licence.includes(searchValue)
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
    const noResultsMessage = document.querySelector(".no-results");
    if (visibleProducts.length === 0 && searchValue.length > 0) {
        if (!noResultsMessage) {
            const newNoResultsMessage = document.createElement("div");
            newNoResultsMessage.classList.add("no-results");
            newNoResultsMessage.textContent = "No se encontraron resultados";
            container.appendChild(newNoResultsMessage);
        }
    } else {
        if (noResultsMessage) {
            container.removeChild(noResultsMessage);
        }
    }
}