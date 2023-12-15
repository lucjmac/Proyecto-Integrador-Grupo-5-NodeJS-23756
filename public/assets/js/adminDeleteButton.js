const deleteButtons = document.querySelectorAll('.delete_button');

    deleteButtons.forEach(button => {
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
                    
                    // Eliminar el elemento del DOM
                    const listItem = button.closest('.list-item_content');
                    listItem.parentNode.removeChild(listItem);
                } else {
                    console.error('Error al eliminar el producto');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
            });
        });
    });