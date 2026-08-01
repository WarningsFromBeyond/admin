const login = document.querySelector("#login");
const panel = document.querySelector("#panel");

function openPanel() {
  login.hidden = true;
  panel.hidden = false;
  sessionStorage.setItem("wfb-admin-open", "yes");
}

document.querySelector("#sign-in").addEventListener("click", openPanel);

document.querySelectorAll(".tabs button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button, .tab").forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  document.querySelector(`#${button.dataset.tab}`).classList.add("active");
}));

if (sessionStorage.getItem("wfb-admin-open") === "yes") openPanel();
