if (typeof product !== "undefined" && typeof product.id !== "undefined") {
    var productId = product.id;

    var selectElement = document.getElementById("code");

    for (var i = 0; i < selectElement.options.length; i++) {
        var optionElement = selectElement.options[i];

        if (optionElement.value === productId) {
            optionElement.selected = true;

            var selectedProduct = productList.find(function (product) {
                return product.id === productId;
            });

            if (typeof selectedProduct !== "undefined") {
                var codeElement = document.getElementById("code");
                var categoryElement = document.getElementById("category");
                var collectionElement = document.getElementById("collection");
                var nameElement = document.getElementById("name");
                var descriptionElement = document.getElementById("description");
                var priceElement = document.getElementById("price");
                var stockElement = document.getElementById("stock");
                var discountElement = document.getElementById("discount");
                var cuotasElement = document.getElementById("cuotas");
                var imgfrontElement = document.getElementById("imgfront");
                var imgbackElement = document.getElementById("imgback");

                codeElement.value = selectedProduct.code;
                collectionElement.value = selectedProduct.collection;
                nameElement.value = selectedProduct.name;
            }
        }
    }
} else {
    console.error("product.id no está definido o no tiene un valor válido");
}
