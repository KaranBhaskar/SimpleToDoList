// selecting elements
const inputText = document.querySelector(".form__input");
const form = document.querySelector(".form");
const submitBtn = document.querySelector(".form__btn"); // didn't get used
const list = document.querySelector(".list");

// to watch for event on form for submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // creating new element
  const string = document.createElement("div");
  // addding class to new element
  string.classList.add("list__item");
  // setting the innerText to input value
  string.innerText = inputText.value;
  // adding it to list
  list.appendChild(string);
  // setting back input value empty
  inputText.value = "";

  // setup for event listener to delete string on click
  string.addEventListener("click", () => {
    list.removeChild(string);
  });
});
