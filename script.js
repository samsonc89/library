"use strict";

let myLibrary = [];

const modal = document.querySelector("#bookModal");
const newBook = document.querySelector("#new-book-btn");
const span = document.querySelector(".close");
const loginContent = document.querySelector(".login-content");

//button selectors
const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const dropDown = document.querySelectorAll(".dropdown-content");

//inputs selectors
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");
const cardContainer = document.querySelector("#card-container");
const deleteSVG = `<svg class='delete-svg' style="width:22px;height:22px" viewBox="0 0 24 24">
<path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
</svg>`;

function generateBooks() {
  myLibrary.push(
    {
      title: "Harry Potter & The Sorcerer's Stone",
      author: "J.K. Rowling",
      pages: 309,
      "date added": "06-01-2022",
      id: 123456,
      status: true,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      pages: 197,
      "date added": "06-30-2022",
      id: 234567,
      status: false,
    },
    {
      title: "Outliers",
      author: "Malcolm Gladwell",
      pages: 304,
      "date added": "07-30-2022",
      id: 234566,
      status: true,
    },
    {
      title: "In Defense of Food",
      author: "Michael Pollan",
      pages: 256,
      "date added": "07-17-2022",
      id: 345678,
      status: false,
    }
  );
  displayBooks(myLibrary);
}

function clearModal() {
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

//Display all books
function displayBooks(myLibrary) {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const html = `<div class="card" id='${book.id}'>
    <h3 class="book-title">${book.title}</h3>
    <p class="book-author">${book.author}</p>
    <p class="pages">${book.pages} pages</p>
    <p class="date-added">Added: ${book["date added"]}</p>
    <div class="card-btns">
    <div class='read-switch'>
    <p class='label-status '>${book.status == true ? "Read" : "Not Read"}</p>
    <label class="switch">
    <input type="checkbox" name='read' ${book.status == true ? "checked" : ""}>
    <span class="slider round"></span> 
    </label> 
    </div> |
    <button class="card-btn delete-btn" >
    ${deleteSVG}
    </button>
    </div>`;

    cardContainer.insertAdjacentHTML("beforeend", html);
  });
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
  modal.style.display = "none";
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

  displayBooks(myLibrary);
}

displayBooks(myLibrary);

function deleteCard(event) {
  let objID = event.target.closest(".card").id;
  let testingObj = myLibrary.find((book) => book.id == objID);
  myLibrary.splice(myLibrary.indexOf(testingObj), 1);
  event.target.closest(".card").remove();
}

function statusChange(event) {
  let objID = event.target.closest(".card").id;
  let testingObj = myLibrary.find((book) => book.id == objID);
  let uncleElem = event.target.closest("label").previousElementSibling;
  testingObj.status = !testingObj.status;
  uncleElem.textContent = `${testingObj.status == true ? "Read" : "Not Read"}`;
}

function sortBooks() {
  let parameter = event.target.textContent.toLowerCase();
  if (parameter === "read") {
    parameter = "status";
  }
  let sortedBooks = myLibrary.slice().sort(function (x, y) {
    let a = x[`${parameter}`],
      b = y[`${parameter}`];
    return a == b ? 0 : a > b ? 1 : -1;
  });
  console.log(parameter);
  displayBooks(sortedBooks);
}

//Buttons/ Click events
addBtn.addEventListener("click", addBookToLibrary);

newBook.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
  clearModal();
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    clearModal();
  }

  if (event.target !== document.querySelector("#login")) {
    if (loginContent.classList.contains("show")) {
      loginContent.classList.remove("show");
    }
  }
};

clearBtn.onclick = function () {
  clearModal();
};

//stop page from refreshing when pushing enter
document.querySelector(".new-book-form").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;
  addBtn.click();
  event.preventDefault();
});

cardContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("slider")) {
    statusChange(event);
  } else if (event.target && event.target.closest(".delete-btn")) {
    deleteCard(event);
  }
});

document
  .querySelectorAll(".sort-dropdown")
  .forEach((button) => button.addEventListener("click", sortBooks));

document.querySelector(".login-dropdown").addEventListener("click", () => {
  loginContent.classList.add("show");
});
