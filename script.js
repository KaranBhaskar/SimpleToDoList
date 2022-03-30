const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const template = document.querySelector(".template");
const list = document.querySelector(".list");

const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO";
const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-KEY`;
let todos = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_KEY}`)) || [];
console.log(todos);
loadtodos(todos);
// add item to list for display
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    name: input.value,
    checked: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(obj);
  rendertodos(obj);
  savetodos();
  input.value = "";
});

function rendertodos(todo) {
  const templateClone = template.content.cloneNode(true);
  const text = templateClone.querySelector("[data-list__item-text]");
  const checkbox = templateClone.querySelector("[data-list__item-checkbox]");
  const listItem = templateClone.querySelector(".list__item");
  text.innerText = todo.name;
  listItem.dataset.id = todo.id;
  checkbox.checked = todo.checked;
  list.appendChild(templateClone);
}
// save data for load
function savetodos() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

// forload
function loadtodos(todo) {
  todo.forEach((todos) => {
    rendertodos(todos);
  });
}
// checkbox
// stores
list.addEventListener("change", (e) => {
  if (!e.target.matches(".template__input")) return;
  // const input = e.target;
  // const element = e.target.parentNode;
  // const todo = Array.from(list.children).find((e) => e.contains(element));
  const parent = e.target.closest(".list__item");
  const todoId = parent.dataset.id;
  const todo = todos.find((todo) => todo.id === todoId);
  todo.checked = e.target.checked;
  savetodos();
});
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-list__item-delete]")) return;
  const parent = e.target.closest(".list__item");

  const todoId = parent.dataset.id;
  parent.remove();
  todos = todos.filter((todo) => todo.id !== todoId);
  savetodos();
});
// be able to delete when click delete buttn
// edit/delete data
