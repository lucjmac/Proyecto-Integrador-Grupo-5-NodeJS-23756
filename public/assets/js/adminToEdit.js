if (typeof product !== "undefined" && typeof product.product_id !== "undefined") {
    const productId = product.product_id;

    const selectElement = document.getElementById("code");

    for (var i = 0; i < selectElement.options.length; i++) {
        var optionElement = selectElement.options[i];

        if (optionElement.value === productId) {
            optionElement.selected = true;

            var selectedProduct = productList.find(function (product) {
                return product.product_id === productId;
            });

            if (typeof selectedProduct !== "undefined") {
                var skuElement = document.getElementById("sku");
                var categoryElement = document.getElementById("category");
                var licenceElement = document.getElementById("licence");
                var nameElement = document.getElementById("name");
                var descriptionElement = document.getElementById("description");
                var priceElement = document.getElementById("price");
                var stockElement = document.getElementById("stock");
                var discountElement = document.getElementById("discount");
                var duesElement = document.getElementById("dues");
                var imgfrontElement = document.getElementById("imgfront");
                var imgbackElement = document.getElementById("imgback");

                skuElement.value = selectedProduct.sku;
                categoryElement.value = selectedProduct.category;
                licenceElement.value = selectedProduct.licence;
                nameElement.value = selectedProduct.name;
                descriptionElement.value = selectedProduct.description;
                priceElement.value = selectedProduct.price;
                stockElement.value = selectedProduct.stock;
                discountElement.value = selectedProduct.discount;
                duesElement.value = selectedProduct.dues;
                imgfrontElement.value = selectedProduct.imgfront;
                imgbackElement.value = selectedProduct.imgback;

            }
        }
    }
} else {
    console.error("product.id no está definido o no tiene un valor válido");
}
