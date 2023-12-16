const button = document.getElementById('modificar');

    button.addEventListener('click', () => {
        const productId = button.dataset.product_id;

        const newProductCategory = document.querySelector('.category_name').value;
        const newProductlicence = document.querySelector('.licence_name').value;
        const newProductName = document.querySelector('.product_name').value; 
        const newProductDescription = document.querySelector('.product_description').value;
        const newProductSku = document.querySelector('.sku').value;
        const newProductPrice = document.querySelector('.price').value;
        const newProductStock = document.querySelector('.stock').value;
        const newProductDiscount = document.querySelector('.discount').value;
        const newProductDues = document.querySelector('.dues').value;
        const newProductImgFront = document.querySelector('.image_Front').value;
        const newProductImgBack = document.querySelector('.image_Back').value;

        const updatedProduct = {
            category_name: newProductCategory,
            licence_name: newProductlicence,
            product_name: newProductName,
            product_description: newProductDescription,
            sku: newProductSku,
            price: newProductPrice,
            stock: newProductStock,
            discount: newProductDiscount,
            dues: newProductDues,
            image_Front: newProductImgFront,
            image_Back: newProductImgBack
        };

        fetch(`/admin/edit/${productId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(response => {
            if (response.ok) {
                console.log('Producto actualizado exitosamente');
                
                window.location.href = '/admin';
            } else {
                console.error('Error al actualizar el producto');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud PUT:', error);
        });
    });
