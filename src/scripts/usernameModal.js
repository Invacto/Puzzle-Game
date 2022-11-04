let container = document.querySelector(".username-modal-container");
let usernameButton = document.querySelector("#usernamesubmit");
let usernameInput = document.querySelector("#usernameinput");
let changeUserButton = document.querySelector("#changeuser");
let userGreeting = document.querySelector("#usergreeting");
let closeUserModalButton = document.querySelector("#closemodalbutton");

userGreeting.innerHTML = `Welcome ${sessionStorage.getItem("mainuser")}`;

if (sessionStorage.getItem("mainuser") === null) {
  userGreeting.innerHTML = `Welcome Guest`;
  window.setTimeout(() => {
    container.classList.toggle("is-toggled");
  }, 2000);
}

// key : user-level value : min_score

usernameButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.sessionStorage.setItem("mainuser", usernameInput.value);
  userGreeting.innerHTML = `Welcome ${sessionStorage.getItem("mainuser")}`;
  container.classList.toggle("is-toggled");
  userGreeting.innerHTML = `Welcome ${sessionStorage.getItem("mainuser")}`;
});

changeUserButton.addEventListener("click", () => {
  container.classList.toggle("is-toggled");
});

closeUserModalButton.addEventListener("click", () => {
  container.classList.toggle("is-toggled");
});
