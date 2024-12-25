function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const apiKey = 'AIzaSyAIUdeIovIO5xVmuMC7r4gDDldZ38HX8MY'; // Ваш API ключ
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const books = data.items;
            const booksContainer = document.querySelector('.books');
            booksContainer.innerHTML = ''; // Очистка контейнера

            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');
                bookElement.setAttribute('data-book-id', book.id);

                bookElement.innerHTML = `
                    <img src="${book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}" alt="${book.volumeInfo.title}">
                    <h3>${book.volumeInfo.title}</h3>
                    <p>${book.volumeInfo.authors?.join(', ') || 'Автор не указан'}</p>
                    <button class="details-btn">Подробнее</button>
                `;

                // Добавляем обработчик нажатия для кнопки "Подробнее"
                bookElement.querySelector('.details-btn').addEventListener('click', () => {
                    openBookDetails(book.id, apiKey);
                });

                booksContainer.appendChild(bookElement);
            });
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function openBookDetails(bookId, apiKey) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(book => {
            // Заполняем модальное окно данными книги
            const modal = document.getElementById('book-details-modal');
            document.getElementById('book-title').textContent = book.volumeInfo.title || 'Название недоступно';
            document.getElementById('book-author').textContent = `Автор: ${book.volumeInfo.authors?.join(', ') || 'Неизвестный автор'}`;
            document.getElementById('book-description').textContent = book.volumeInfo.description || 'Описание отсутствует';
            document.getElementById('book-image').src = book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg';

            // Открываем модальное окно
            modal.style.display = 'flex';
        })
        .catch(error => console.error('Ошибка при загрузке деталей книги:', error));
}

// Закрытие модального окна
// Закрытие модального окна при нажатии кнопки "Назад"
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('book-details-modal').style.display = 'none';
});

// Закрытие модального окна при нажатии на "×"
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('book-details-modal').style.display = 'none';
});

// Закрытие модального окна по клику вне его области
window.addEventListener('click', (event) => {
    const modal = document.getElementById('book-details-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// Закрытие модального окна по клику вне его области
window.addEventListener('click', (event) => {
    const modal = document.getElementById('book-details-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
