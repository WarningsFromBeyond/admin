const login = document.querySelector("#login");
const panel = document.querySelector("#panel");
const signOut = document.querySelector("#sign-out");

function openPanel() {
  login.hidden = true;
  panel.hidden = false;
  signOut.hidden = false;
  sessionStorage.setItem("wfb-admin-open", "yes");
}

function closePanel() {
  sessionStorage.removeItem("wfb-admin-open");
  panel.hidden = true;
  signOut.hidden = true;
  login.hidden = false;
}

document.querySelector("#sign-in").addEventListener("click", openPanel);
signOut.addEventListener("click", closePanel);

document.querySelectorAll(".tabs button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button, .tab").forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  document.querySelector(`#${button.dataset.tab}`).classList.add("active");
}));

if (sessionStorage.getItem("wfb-admin-open") === "yes") openPanel();
