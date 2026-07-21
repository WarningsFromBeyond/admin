const approved = new Set(["Ron-ace", "jsulkowski"]);
const session = document.querySelector("#session");
const login = document.querySelector("#login");
const panel = document.querySelector("#panel");

// This is intentionally read-only until the server-side GitHub App is installed.
// A browser must never receive a PAT, GitHub App private key, or write credential.
async function boot() {
  try {
    const response = await fetch("/api/session", { credentials: "include" });
    if (!response.ok) throw new Error("unauthenticated");
    const user = await response.json();
    if (!approved.has(user.login)) throw new Error("not approved");
    session.textContent = `Signed in as ${user.login}`;
    panel.hidden = false;
  } catch {
    session.textContent = "GitHub sign-in required";
    login.hidden = false;
  }
}
document.querySelectorAll(".tabs button").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button, .tab").forEach(node => node.classList.remove("active"));
  button.classList.add("active"); document.querySelector(`#${button.dataset.tab}`).classList.add("active");
}));
boot();
