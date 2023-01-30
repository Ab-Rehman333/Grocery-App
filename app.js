// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// // display items onload
window.addEventListener("DOMContentLoaded", setupItems);

// ****** functions **********
function addItem(e) {
    e.preventDefault();
    const userValue = grocery.value;
    const id = Date.now().toString();
    if (userValue && !editFlag) {
        creatListItems(id, userValue)
        displayAlert("sucessfully added", "alert-success");
        container.classList.add("show-container");
        // add to localStorage
        addToLocalStorage(id, userValue);
        // set back to default
        setBacktoDefault();
    } else if (userValue && editFlag) {
        editElement.innerHTML = userValue;
        displayAlert("sucessfully added", "alert-success")
        editFromLocalStroge(editID, userValue)
        setBacktoDefault()

    } else {
        displayAlert("empty value", "alert-danger");
    }
}
// displaying alerts
function displayAlert(text, classList) {
    alert.textContent = text;
    alert.classList.add(classList);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(classList);
    }, 2000);
}

// delete single items
function deleteBtnFunc(e) {
    const deleteParent = e.currentTarget.parentElement.parentElement;
    const id = deleteParent.dataset.id;
    list.removeChild(deleteParent);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("deleted sucessfully", "alert-danger");
    setBacktoDefault();
    removeFromLocalStorage(id)
}
// edit single items
function editBtnFunc(e) {
    let editParent = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editID = editParent.dataset.id;
    editFlag = true;
    submitBtn.textContent = "Edit";

}
// clearning the items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach((clear) => {
            list.removeChild(clear);
        });
        container.classList.remove("show-container");
        displayAlert("Cleard All items", "alert-danger");
        localStorage.removeItem("list");
        setBacktoDefault();
    }
}
// set back to default
function setBacktoDefault() {
    grocery.value = "";
    submitBtn.textContent = "Submit";
    editID = "";
    editFlag = false;
}

// add to localStorage
function addToLocalStorage(id, value) {
    const grocery = { id, value }
    let items = checkingLocal();
    items.push(grocery)
    localStorage.setItem("list", JSON.stringify(items))
}

function checkingLocal() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
function removeFromLocalStorage(id) {
    let items = checkingLocal();
    items = items.filter(item => {
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function editFromLocalStroge(id, value) {
    let items = checkingLocal();
    items.map(item => {
        if (item.id === id) {
            item.value = value;
        }
        return item
    })
    localStorage.setItem("list", JSON.stringify(items))


}
function setupItems() {
    let items = checkingLocal();
    if (items.length > 0) {
        items.forEach(item => {
            creatListItems(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}
function creatListItems(id, userValue) {
    const articale = document.createElement("article");
    const data_att = document.createAttribute("data-id");
    data_att.value = id;
    articale.setAttributeNode(data_att);
    articale.classList.add("grocery-item");
    articale.innerHTML = `
<p class="title">${userValue}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
`;
    const deletBtn = articale.querySelector(".delete-btn");
    const editBtn = articale.querySelector(".edit-btn");
    deletBtn.addEventListener("click", deleteBtnFunc);
    editBtn.addEventListener("click", editBtnFunc);
    list.appendChild(articale);
}


// setItems
// getItems
// removeItems
// save as string

