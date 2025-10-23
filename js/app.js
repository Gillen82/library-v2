class Library {
    constructor(_library) {
        this.library = _library;
    }

    getBookDetails(e) {
        e.preventDefault();
        let inputTitle = document.querySelector('.input-title');
        let inputAuthor = document.querySelector('.input-author');
        let inputPages = document.querySelector('.input-pages');
        // check all fields entered
        if (inputTitle.value && inputAuthor.value && inputPages.value) {
            library.createBook(inputTitle.value, inputAuthor.value, inputPages.value);
            inputTitle.value = '';
            inputAuthor.value = '';
            inputPages.value = '';
        } else {
            messageEl.classList.remove('hidden');
            setTimeout(() => {
                messageEl.classList.add('hidden');
            }, 3000);
        }
    }

    createBook(title, author, pages) {
        const newBook = new Book(title, author, pages);
        this.library.push(newBook);
        this.displayBooks();
    }

    displayBooks() {
        // clear ui
        const libraryEl = document.querySelector('.books');
        libraryEl.innerHTML = '';
        this.library.forEach((book) => {
            // cretae elements
            const bookCardEl = document.createElement('div');
            const bookTitleEl = document.createElement('h2');
            const bookAuthorEl = document.createElement('p');
            const bookPagesEl = document.createElement('p');
            const bookControlsEl = document.createElement('div');
            const changeStatusBtn = document.createElement('button');
            const removeBookBtn = document.createElement('button');
            // data attributes
            bookCardEl.setAttribute('data-id', book.id);
            bookCardEl.setAttribute('data-read', book.beenRead);
            changeStatusBtn.setAttribute('type', 'button');
            removeBookBtn.setAttribute('type', 'button');
            // add book details
            bookTitleEl.innerHTML = book.title;
            bookAuthorEl.innerHTML = book.author;
            bookPagesEl.innerHTML = `${book.pages} pages`;
            changeStatusBtn.innerHTML = 'been Read?';
            removeBookBtn.innerHTML = 'Remove Book';
            // add classes
            book.beenRead ? bookCardEl.classList.add('been-read') : bookCardEl.classList.add('not-read');
            bookCardEl.classList.add('book-card');
            bookControlsEl.classList.add('book-controls');
            changeStatusBtn.classList.add('change-status');
            removeBookBtn.classList.add('remove-book');
            // append elements and display ui
            bookCardEl.appendChild(bookTitleEl);
            bookCardEl.appendChild(bookAuthorEl);
            bookCardEl.appendChild(bookPagesEl);
            bookControlsEl.appendChild(changeStatusBtn);
            bookControlsEl.appendChild(removeBookBtn);
            bookCardEl.appendChild(bookControlsEl);
            libraryEl.appendChild(bookCardEl);
            // button handlers
            changeStatusBtn.addEventListener('click', this.changeStatusHandler);
            removeBookBtn.addEventListener('click', this.removeBookHandler);
        });

        // this.changeStatusHandler();
    }

    changeStatusHandler(e) {
        const parElement = e.target.parentElement.parentElement;
        const bookId = parElement.getAttribute('data-id');
        // loop through each book until matched id
        library.library.forEach((book) => {
            if (book.id === bookId) {
                book.beenRead = !book.beenRead;
                library.displayBooks();
            }
        });
    }

    removeBookHandler(e) {
        const parElement = e.target.parentElement.parentElement;
        const bookId = parElement.getAttribute('data-id');
        // loop through each book until matched id
        library.library.forEach((book) => {
            library.library = library.library.filter((book) => book.id != bookId);
            library.displayBooks();
        });
    }
}

class Book {
    constructor(_title, _author, _pages) {
        this.id = crypto.randomUUID();
        this.title = _title;
        this.author = _author;
        this.pages = _pages;
        this.beenRead = false;
    }
}

const library = new Library([]);

const addBookBtn = document.querySelector('.add-book');
const messageEl = document.querySelector('.message-card');
addBookBtn.addEventListener('click', library.getBookDetails);
