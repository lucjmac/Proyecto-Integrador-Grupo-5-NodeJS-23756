// Verificar si product.code está definido antes de asignar el valor a productCode
if (typeof product !== 'undefined' && typeof product.code !== 'undefined') {
    // Asignar el valor de product.code a productCode
    var productCode = product.code;

    // Obtener el elemento del select
    var selectElement = document.getElementById("categoria");

    // Recorrer todas las opciones del select
    for (var i = 0; i < selectElement.options.length; i++) {
        var optionElement = selectElement.options[i];

        // Comparar el valor de productCode con el valor de la opción
        if (optionElement.value === productCode) {
            // Establecer la opción como seleccionada
            optionElement.selected = true;
        }
    }
} else {
    // Manejar el caso en el que product.code no está definido o no tiene un valor válido
    console.error("product.code no está definido o no tiene un valor válido");
    // Aquí puedes agregar el código para manejar este caso según tus necesidades
}