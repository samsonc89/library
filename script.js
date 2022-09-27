"use strict";

let myLibrary = [
  {
    title: "Harry Potter & The Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 197,
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
  this.title = title
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  this.author = author
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  this.pages = pages;
  // this.status = status;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  };
}

function addBookToLibrary() {
  let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);
  myLibrary.push(newBook);
  console.log(newBook);
  addElem(newBook);
  modal.style.display = "none";
  titleInput.value = authorInput.value = pagesInput.value = "";
  console.log(myLibrary);
  // displayBooks();
}

function addElem(book) {
  const html = `<div class="card">
  <h3 class="book-title">${book.title}</h3>
  <p class="book-author">${book.author}</p>
  <p class="pages">${book.pages} pages</p>
  <div class="card-btns">
  <button class="delete">Delete</button>
  <label class="switch">Read
  <input type="checkbox">
  <span class="slider round"></span>
</label>
  </div>`;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

//Display all books
function displayBooks() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const html = `<div class="card">
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="pages">${book.pages} pages</p>
    <div class="card-btns">
    <button class="delete">Delete</button>
    <label class="switch">Read
  <input type="checkbox">
  <span class="slider round"></span>
</label>
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
