document.addEventListener("DOMContentLoaded", function () {
    window.openAddBookModal = function () {
        fetch('/Book/Add')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error loading add book form.');
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('addBookModalContent').innerHTML = html;
                let modal = new bootstrap.Modal(document.getElementById('addBookModal'));
                modal.show();
                bindAddBookForm();
            })
            .catch(error => {
                alert(error.message);
                console.error(error);
            });
    };

    window.openEditModal = function (bookId) {
        fetch(`/Book/EditModal?id=${encodeURIComponent(bookId)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error loading edit form.');
                }
                return response.text();
            })
            .then(html => {
                document.querySelector('#exampleModal .modal-content').innerHTML = html;
                let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();
                bindEditBookForm();
            })
            .catch(error => {
                alert(error.message);
                console.error(error);
            });
    };

    function bindAddBookForm() {
        const form = document.getElementById('addBookForm');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                fetch(form.action, {
                    method: form.method,
                    body: new URLSearchParams(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(html => {
                            document.getElementById('addBookModalContent').innerHTML = html;
                            bindAddBookForm();
                            throw new Error('Validation failed');
                        });
                    }
                    location.reload();
                })
                .catch(error => {
                    if (error.message !== 'Validation failed') {
                        alert('Error adding book: ' + error.message);
                    }
                });
            });
        }
    }

    function bindEditBookForm() {
        const form = document.getElementById('editBookForm');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(form);
                fetch(form.action, {
                    method: form.method,
                    body: new URLSearchParams(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(html => {
                            document.querySelector('#exampleModal .modal-content').innerHTML = html;
                            bindEditBookForm();
                            throw new Error('Validation failed');
                        });
                    }
                    location.reload();
                })
                .catch(error => {
                    if (error.message !== 'Validation failed') {
                        alert('Error saving changes: ' + error.message);
                    }
                });
            });
        }
    }
});
