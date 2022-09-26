"use strict";

let myLibrary = [
  {
    title: "Harry Potter & Your Mom",
    author: "J.K. Doctor",
    pagesL 243
  },
];

const modal = document.querySelector("#bookModal");
const newBook = document.querySelector("#new-book-btn");
const span = document.querySelector(".close");
const addBtn = document.querySelector("#add-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");

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
  modal.style.display = "none";
  titleInput.value = authorInput.value = pagesInput.value = "";
  console.log(myLibrary);
}

addBtn.addEventListener("click", addBookToLibrary);

