"use strict";

let myLibrary = [
  {
    title: "Harry Potter & The Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
    "date added": "08-30-2022",
    id: 123456,
    status: false,
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pages: 197,
    "date added": "08-30-2022",
    id: 234567,
    status: false,
  },
];

const modal = document.querySelector("#bookModal");
const newBook = document.querySelector("#new-book-btn");
const span = document.querySelector(".close");

//button selectors
const addBtn = document.querySelector("#add-btn");
const deleteBtn = document.querySelectorAll("#delete-btn");

//inputs selectors
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");
const cardContainer = document.querySelector("#card-container");
const deleteSVG = `<svg class='delete-svg' style="width:22px;height:22px" viewBox="0 0 24 24">
<path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
</svg>`;

document.querySelector(".new-book-form").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;
  addBtn.click();
  event.preventDefault();
});

function clearModal() {
  modal.style.display = "none";
  titleInput.value = authorInput.value = pagesInput.value = "";
  statusInput.checked = false;
}

function Book(title, author, pages, status) {
  this.title = title
    .trim()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  this.author = author
    .trim()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
  this.pages = pages;
  this.status = status;
}

//Generate ID so it makes deleting the html element and object in array easier
function generateID() {
  //create random 6 digit "id"
  let randomID = Math.floor(100000 + Math.random() * 900000);
  console.log(randomID);

  //search myLibrary for object that has property value with same id
  while (myLibrary.some((obj) => obj.id === randomID)) {
    randomID = Math.floor(100000 + Math.random() * 900000);
    console.log(randomID);
  }
  return randomID;
}

function addBookToLibrary() {
  let newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.checked
  );

  newBook.id = generateID();
  myLibrary.push(newBook);
  console.log(newBook);
  addElem(newBook);
  clearModal();
  console.log(myLibrary);
  // displayBooks();
}

function addElem(book) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  book["date added"] = today = mm + "-" + dd + "-" + yyyy;
  const html = `<div class="card" id='${book.id}'>
  <h3 class="book-title">${book.title}</h3>
  <p class="book-author">${book.author}</p>
  <p class="pages">${book.pages} pages</p>
  <p class="date-added">Added: ${book["date added"]}</p>
  <div class="card-btns">
  <div class='read-switch'>
  <p class='label-unread'>Not Read</p>
  <label class="switch">
  <input type="checkbox" name='read' ${book.status == true ? "checked" : ""}>
  <span class="slider round"></span>
  </label> <p class='label-read'>Read</p>
  </div> |
  <button class="delete-btn" onclick='deleteCard(event)'>
  ${deleteSVG}
  </button>
  </div>`;

  cardContainer.insertAdjacentHTML("beforeend", html);
}

//Display all books
function displayBooks() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const html = `<div class="card" id='${book.id}'>
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="pages">${book.pages} pages</p>
    <p class="date-added">Added: ${book["date added"]}</p>
    <div class="card-btns">
    <div class='read-switch'>
    <p class='label-unread'>Not Read</p>
    <label class="switch">
    <input type="checkbox" name='read'>
    <span class="slider round"></span> 
    </label> <p class='label-read'>Read</p>
    </div> |
    <button class="delete-btn" onclick='deleteCard(event)'>
    ${deleteSVG}
    </button>
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
  clearModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    clearModal();
  }
};

function deleteCard(event) {
  let objID = event.currentTarget.parentNode.parentNode.id;
  let testingObj = myLibrary.find((book) => book.id == objID);
  myLibrary.splice(myLibrary.indexOf(testingObj), 1);
  event.currentTarget.parentNode.parentNode.remove();
}
function statusChange(event) {
  let objID = event.currentTarget.parentNode.parentNode.id;
  let testingObj = myLibrary.find((book) => book.id == objID);
}
/*
When you create a new book. Generate a new id on the object and on the button

WHen the check box is clicked. find the object with the matching id

set a new property for date completed
*/
