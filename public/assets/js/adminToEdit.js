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
                categoryElement.value = selectedProduct.category_name;
                licenceElement.value = selectedProduct.licence_name;
                nameElement.value = selectedProduct.product_name;
                descriptionElement.value = selectedProduct.product_description;
                priceElement.value = selectedProduct.price;
                stockElement.value = selectedProduct.stock;
                discountElement.value = selectedProduct.discount;
                duesElement.value = selectedProduct.dues;
                imgfrontElement.value = selectedProduct.image_Front;
                imgbackElement.value = selectedProduct.image_Back;
            }
        }
    }
} else {
    console.error("product.id no está definido o no tiene un valor válido");
}

function loadImage(input, previewId) {
    if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const preview = document.getElementById(previewId);
        preview.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
    }
}