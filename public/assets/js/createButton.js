const HOST = window.location.origin;
const addButton = document.getElementById("agregar_producto");

addButton.addEventListener("click", async () => {
    try {
        const productCategory = document.querySelector(".category_name").value;
        const productlicence = document.querySelector(".licence_name").value;
        const productName = document.querySelector(".product_name").value;
        const productDescription = document.querySelector(".product_description").value;
        const productSku = document.querySelector(".sku").value;
        const productPrice = document.querySelector(".price").value;
        const productStock = document.querySelector(".stock").value;
        const productDiscount = document.querySelector(".discount").value;
        const productDues = document.querySelector(".dues").value;
        const productImgFront = document.querySelector('input[type="file"].image_Front');
        const productImgBack = document.querySelector('input[type="file"].image_Back');

        const updatedProduct = {
            category_name: productCategory,
            licence_name: productlicence,
            product_name: productName,
            product_description: productDescription,
            sku: productSku,
            price: productPrice,
            stock: productStock,
            discount: productDiscount,
            dues: productDues,
            image_Front: productImgFront,
            image_Back: productImgBack,
        };

        fetch(`${HOST}/admin/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",},
            body: JSON.stringify(updatedProduct),
            })
            .then((response) => {
        if (response.ok) {
            console.log("Producto creado exitosamente");

            const goToAdmin = confirm(
                "Producto creado exitosamente. ¿Desea ir a la lista de productos?"
            );

            if (goToAdmin) {
                window.location.href = "/admin";
            }
        } else {
            console.error("Error al crear el producto");
        }
    })
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
    }
});
