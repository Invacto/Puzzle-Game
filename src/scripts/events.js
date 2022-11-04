export const winEvent = new Event("win");

document.addEventListener("win", () => {
  window.location.href = "../winScreen.html";
});
