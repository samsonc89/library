"use strict";

let myLibrary = [
  {
    title: "Harry Potter & The Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
    "date added": "08-30-2022",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 197,
    "date added": "08-30-2022",
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
  this.status = function () {
    // const checkbox = this checkbox
    // if (this checkbox is checked);
    // {
    //   console.log("this");
    // }
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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  book["date added"] = today = mm + "-" + dd + "-" + yyyy;
  const html = `<div class="card">
  <h3 class="book-title">${book.title}</h3>
  <p class="book-author">${book.author}</p>
  <p class="pages">${book.pages} pages</p>
  <p class="date-added">Added: ${book["date added"]}</p>
  <div class="card-btns">
  <div class='read-switch'>
  <label class="switch">
  <input type="checkbox" name='read'>
  <span class="slider round"></span>
  </label> Read
  </div> |
  <button class="delete">Delete</button>
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
    <p class="date-added">Added: ${book["date added"]}</p>
    <div class="card-btns">
    <div class='read-switch'>
    <label class="switch">
    <input type="checkbox" name='read'>
    <span class="slider round"></span> 
    </label> Read
    </div> |
    <button class="delete">Delete</button>
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
