"use strict";

let myLibrary = [
  {
    title: "Harry Potter & Your Mom",
    author: "J.K. Doctor",
    pages: 243,
  },
];

const modal = document.querySelector("#bookModal");
const newBook = document.querySelector("#new-book-btn");
const span = document.querySelector(".close");
const addBtn = document.querySelector("#add-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const cardContainer = document.querySelector("#card-container");

document.querySelector(".new-book-form").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;
  addBtn.click();
  event.preventDefault();
});

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.status = status;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  };
}

function addBookToLibrary() {
  let book = new Book(titleInput.value, authorInput.value, pagesInput.value);
  myLibrary.push(book);
  addElem();
  modal.style.display = "none";
  titleInput.value = authorInput.value = pagesInput.value = "";
  console.log(myLibrary);
}

function addElem() {
  const html = `<div class="card">
  <h3 class="book-title">${titleInput.value}</h3>
  <p class="book-author">${authorInput.value}</p>
  <p class="pages">${pagesInput.value} pages</p>
  <div class="card-btns">
  <button class="delete">Delete</button>
  <button class="complete">Complete</button>
  </div>`;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

//Display all books
function displayBooks() {
  myLibrary.forEach((book) => {
    const html = `<div class="card">
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="pages">${book.pages} pages</p>
    <div class="card-btns">
    <button class="delete">Delete</button>
    <button class="complete">Complete</button>
    </div>`;

    cardContainer.insertAdjacentHTML("beforeend", html);
  });
}

displayBooks();
//Buttons/ Click events
addBtn.addEventListener("click", addBookToLibrary);

newBook.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
  titleInput.value = authorInput.value = pagesInput.value = "";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    titleInput.value = authorInput.value = pagesInput.value = "";
  }
};
