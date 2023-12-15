const deleteButton = document.querySelectorAll('.delete_button');

deleteButton.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.product_id;

        const confirmDelete = confirm("¿Seguro que deseas eliminar el producto?");
        if (!confirmDelete) {
            return; 
        }

        fetch(`/admin/delete/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Producto eliminado exitosamente');

                window.location.href = "/admin";
            } else {
                console.error('Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud DELETE:', error);
        });
    });
});