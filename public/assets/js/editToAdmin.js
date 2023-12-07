if (typeof product !== "undefined" && typeof product.code !== "undefined") {
    // si estan definidos producto y su código 
    
    // obtiene el código del producto
    var productCode = product.code;
    
    // obtiene el elemento select con el id "code"
    var selectElement = document.getElementById("code");
    
    // recorre las opciones del select
    for (var i = 0; i < selectElement.options.length; i++) {
        var optionElement = selectElement.options[i];
        
        // si el valor de la opción coincide con el código del producto
        if (optionElement.value === productCode) {
            // marca la opción como seleccionada
            optionElement.selected = true;
            
            // busca el producto en la lista de productos
            var selectedProduct = productList.find(function (product) {
                return product.code === productCode;
            });
            
            // si se encuentra el producto correspondiente
            if (typeof selectedProduct !== "undefined") {
                // obtiene los elementos correspondientes a los campos del formulario
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
                
                // actualiza los valores de los campos del formulario con la información del producto en edit.ejs
                collectionElement.value = selectedProduct.collection;
                nameElement.value = selectedProduct.name;
            }
        }
    }
} else {
    // pero si el product.code no está definido
    console.error("product.code no está definido o no tiene un valor válido");
}
