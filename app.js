const tabs = [...document.querySelectorAll(".tab")];
const navItems = [...document.querySelectorAll("[data-tab]")];

function activate(name, updateHash = true) {
  const target = document.getElementById(name) || document.getElementById("project");
  tabs.forEach(tab => tab.classList.toggle("active", tab === target));
  navItems.forEach(item => item.classList.toggle("active", item.dataset.tab === target.id));
  if (updateHash && location.hash !== `#${target.id}`) history.replaceState(null, "", `#${target.id}`);
  document.title = `${target.querySelector("h1").textContent} — Warnings From Beyond Admin`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach(item => item.addEventListener("click", event => {
  event.preventDefault();
  activate(item.dataset.tab);
}));

document.querySelectorAll("[data-tab-link]").forEach(item => item.addEventListener("click", event => {
  event.preventDefault();
  activate(item.dataset.tabLink);
}));

window.addEventListener("hashchange", () => activate(location.hash.slice(1) || "project", false));
activate(location.hash.slice(1) || "project", false);
