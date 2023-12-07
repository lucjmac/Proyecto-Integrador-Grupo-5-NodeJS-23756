if (typeof product !== "undefined" && typeof product.code !== "undefined") {
    var productCode = product.code;

    var selectElement = document.getElementById("code");

    for (var i = 0; i < selectElement.options.length; i++) {
        var optionElement = selectElement.options[i];

        if (optionElement.value === productCode) {
            optionElement.selected = true;

            var selectedProduct = productList.find(function (product) {
                return product.code === productCode;
            });

            if (typeof selectedProduct !== "undefined") {
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

                collectionElement.value = selectedProduct.collection;
                nameElement.value = selectedProduct.name;
            }
        }
    }
} else {
    console.error("product.code no está definido o no tiene un valor válido");
}
