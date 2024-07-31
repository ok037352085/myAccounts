let listState = [];

const STATE_KEY = "account-list";

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", addAccount);

function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState != null) {
    return JSON.parse(listState);
  }
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function renderAccountList() {
  const accountList = document.getElementById("account-list");
  accountList.innerHTML = "";
  listState.forEach((account) => {
    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account");

    const accountHeader = document.createElement("h4");
    accountHeader.textContent = account.name;
    accountDiv.appendChild(accountHeader);

    const myaccount = document.createElement("div");
    myaccount.classList.add("myaccount");
    accountDiv.appendChild(myaccount);

    const accountoutside = document.createElement("div");
    accountoutside.textContent = "帳號:";
    myaccount.appendChild(accountoutside);

    const accountUsername = document.createElement("span");
    accountUsername.textContent = account.username;
    myaccount.appendChild(accountUsername);

    const passwordoutside = document.createElement("div");
    passwordoutside.textContent = "密碼:";
    myaccount.appendChild(passwordoutside);

    const accountPassword = document.createElement("span");
    accountPassword.textContent = account.password;
    myaccount.appendChild(accountPassword);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
      listState = listState.filter((acc) => acc !== account);
      saveState(listState);
      renderAccountList();
    };
    accountDiv.appendChild(deleteBtn);

    accountList.appendChild(accountDiv);
  });
}

function addAccount() {
  const name = document.getElementById("account-name").value;
  const username = document.getElementById("account-username").value;
  const password = document.getElementById("account-password").value;

  if (name && username && password) {
    const newAccount = { name, username, password };
    listState.push(newAccount);
    saveState(listState);
    renderAccountList();

    // Clear input fields after adding
    document.getElementById("account-name").value = "";
    document.getElementById("account-username").value = "";
    document.getElementById("account-password").value = "";
  } else {
    alert("請輸入完整訊息");
  }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  listState = loadState();
  renderAccountList();
});
