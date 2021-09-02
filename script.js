class Book {
    constructor(title, author, pages, read) {
        this.Title = title;
        this.Author = author;
        this.NumberOfPages = pages;
        this.PreviouslyRead = read;
    }
}

function addBookToLibrary (e) {
    let addedBook = new Book();
    let data = e.formData;
    for (let pair of data.entries()) {
        addedBook[pair[0]] = pair[1];
    }
    if (!addedBook.hasOwnProperty('PreviouslyRead')) {
        addedBook.PreviouslyRead = 'No';
    } else {
        addedBook.PreviouslyRead = 'Yes';
    }
    addedBook.Index = bookNum;
    library.push(addedBook);
    displayBook(addedBook);
    bookNum++;
}

function displayBook(addedBook) {
    let bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');
    bookContainer.setAttribute('id', `b${ addedBook.Index }`);
    container.appendChild(bookContainer)

    for (let key in addedBook) {
        let bookInfo = document.createElement('div');
        if (key === 'Index') {
            continue;
        } else if (key === 'PreviouslyRead') {
            bookInfo.setAttribute('id', `p${ addedBook.Index }`)
        }
        bookInfo.setAttribute('class', 'bookInfo')
        bookInfo.textContent += key + ': ' + addedBook[key];
        bookContainer.appendChild(bookInfo);
    }
    createDeleteButton(addedBook, bookContainer);
    createReadToggle(addedBook, bookContainer);
}

    function createDeleteButton(addedBook, bookContainer) {
        let deleteBook = document.createElement('button')
        deleteBook.setAttribute('id', `d${ addedBook.Index}`);
        deleteBook.setAttribute('type', 'button');
        deleteBook.textContent = 'Delete';
        bookContainer.appendChild(deleteBook);

        let deleteBookButton = document.querySelector(`#d${ addedBook.Index}`)
        deleteBookButton.addEventListener('click', (e) => {
            let deletedBookDiv = document.getElementById(`b${ addedBook.Index }`)
            container.removeChild(deletedBookDiv);
        });
    }

    function createReadToggle(addedBook, bookContainer) {
        let toggleRead = document.createElement('button')
        toggleRead.setAttribute('type', 'button');
        toggleRead.setAttribute('id', `t${ addedBook.Index}`);
        toggleRead.textContent = 'Change Read Status';
        bookContainer.appendChild(toggleRead);
        let ToggleReadButton = document.querySelector(`#t${ addedBook.Index}`)

        ToggleReadButton.addEventListener('click', (e) => {
            let previouslyReadInfo = document.querySelector(`#p${ addedBook.Index}`);
            if (addedBook.PreviouslyRead === 'Yes') {
                addedBook.PreviouslyRead = 'No';
                previouslyReadInfo.textContent = 'PreviouslyRead: No';
            } else if (addedBook.PreviouslyRead === 'No') {
                addedBook.PreviouslyRead = 'Yes';
                previouslyReadInfo.textContent = 'PreviouslyRead: Yes';
            }
        });
    }

let library = [];

const toggleFormButton = document.querySelector('#showFormButton');
toggleFormButton.addEventListener('click' , (e) => {
    let toggleForm = document.querySelector('.inputFields');
    if (toggleForm.style.display === 'none') {
        toggleForm.style.display = 'block';
    } else if (toggleForm.style.display === 'block') {
        toggleForm.style.display = 'none';
    }
});

const container = document.getElementById('container');
let bookNum = 0;

const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(formElem);
});

formElem.addEventListener('formdata', addBookToLibrary);
