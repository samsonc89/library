"use strict";

let myLibrary = [];

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
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

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
  console.log(myLibrary);
}

addBtn.addEventListener("click", addBookToLibrary);
