



// Book Constructor
function Book(title, author,  isbn, price) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price =  price;
}

//UI Constructor
function UI()  { }





UI.prototype.addBookToList = function (book) {
    const bookList = document.getElementById('book-list')
    //create row
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
      <td class='td-first'>${book.title}</td>
      <td>${book.author}</td>   
      <td>${book.isbn}</td>
      <td>${book.price}</td>
      <td class='td'><a href="#" class="update icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
      <td class='td'><a href="#" class="delete icon"><i class=" fa fa-close" aria-hidden="true"></i></td>
    `;
    bookList.appendChild(row);


}

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function () {
        document
            .querySelector('.alert')
            .remove();
    }, 3000)
}

UI.prototype.deleteBook = function (target) {
    if (target.parentElement.classList.contains('delete')) {
        target
            .parentElement
            .parentElement
            .parentElement
            .remove();
    }
    const ui = new UI();
    ui.displayBookList();
}

UI.prototype.editBook = function (target) {
    document.getElementById('title').focus();
    const ui = new UI();
    ui.editModeOn();
    if (target.parentElement.classList.contains('update')) {
        let btnSubmit = document.querySelector('input[type=submit]');
        btnSubmit.value = "Update Book"
        btnSubmit.id = 'updateBook';
        target.parentElement.parentElement.parentElement.className = 'oldRow';
        let oldRow = target.parentElement.parentElement.parentElement;
        let childs = target.parentElement.parentElement.parentElement.children;
        document
            .getElementById('title')
            .value = childs[0].textContent;
        document
            .getElementById('author')
            .value = childs[1].textContent;
        document
            .getElementById('isbn')
            .value = childs[2].textContent;
        document
            .getElementById('price')
            .value = parseFloat(childs[3].textContent);
    }
}

UI.prototype.updateBook = function () {
    let btnSubmit = document.querySelector('input[type=submit]');
    let updatedRow = document.createElement('tr');

    let bookTitle = document.getElementById('title').value,
        bookAuthor = document.getElementById('author').value,
        bookIsbn = document.getElementById('isbn').value,
        bookPrice = document.getElementById('price').value;

    updatedRow.innerHTML = `
      <td class='td-first'>${bookTitle}</td>
      <td>${bookAuthor}</td>   
      <td>${bookIsbn}</td>
      <td>${bookPrice}</td>
      <td class='td'><a href="#" class="update icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
      <td class='td'><a href="#" class="delete icon"><i class=" fa fa-close" aria-hidden="true"></i></td>
    `;

    let oldRow = document.querySelector('.oldRow');
    bookList = document.getElementById('book-list');
    bookList.replaceChild(updatedRow, oldRow);
    btnSubmit.value = "Submit"
    btnSubmit.id = 'submitBook';
       oldRow
         .classList
        .remove('oldRow');  
    const ui = new UI();    
    ui.showAlert('Update Successfull', 'success');
    ui.clearFields();
    ui.editModeOff();     
}

UI.prototype.clearFields = function () {
    let val = document.querySelectorAll('input[type="text"],input[type="number"]');
    val.forEach(element => {
        element.value = '';
    });
    document.getElementById('title').focus();
}

UI.prototype.displayBookList = function () {
    let tblBookList = document.querySelector('table');
    let tblHeader = document.querySelector('table thead');
    let bookList = document.getElementById('book-list');
    if (!bookList.hasChildNodes()) {
        tblBookList.style.visibility = 'hidden';
    }
    else {
        tblBookList.style.visibility = 'visible'
    }
}
UI.prototype.editModeOn = function () {
    let inpts = document.querySelectorAll('input[type="text"],input[type="number"]');
    inpts.forEach(element => {
        element.classList.add('editing');
    });

    let aTags = document.querySelectorAll('.delete,.update');
    aTags.forEach(element => {
        element.classList.add('not-active');
    });
}

UI.prototype.editModeOff = function () {
    let inpts = document.querySelectorAll('input[type="text"],input[type="number"]')
    inpts.forEach(element => {
        element.classList.remove('editing');
    });

    let aTags = document.querySelectorAll('.delete,.update');
    aTags.forEach(element => {
        element.classList.remove('not-active');
    });
}

const ui = new UI();
ui.displayBookList();
document.getElementById('book-form').addEventListener('submit', function (e) {

    if (document.querySelector('input[type=submit]').id === 'submitBook') {
        // Get Form Values
        const title = document
            .getElementById('title')
            .value,
            author = document
                .getElementById('author')
                .value,
            isbn = document
                .getElementById('isbn')
                .value,
            price = parseFloat(document.getElementById('price').value);

        const book = new Book(title, author, isbn, price);
        const ui = new UI();

        //VALIDATE
        if (title === '' || author === '' || isbn === '' || price === '') {
            ui.showAlert('Please fill in all fields', 'error');
        } else {
            //Add Boom To List
            ui.addBookToList(book);
            ui.displayBookList();
            ui.clearFields();
            ui.showAlert('Book has been submitted', 'success');
        }

    } else {
        const ui = new UI();
        ui.updateBook();
        ui.displayBookList();
    }
    e.preventDefault();
});

document
    .getElementById("book-list")
    .addEventListener('click', function (e) {
        const ui = new UI();
        target = e.target;
        if (target.parentElement.classList.contains('delete')) {
            ui.deleteBook(target);
        } else if (target.parentElement.classList.contains('update')) {
            ui.editBook(target);
        }
        e.preventDefault();
    })