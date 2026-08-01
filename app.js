const SUPABASE_URL = "https://ngrdyxbwdamzwficlten.supabase.co";
const SUPABASE_KEY = "sb_publishable_hUuNRZ9iukgPhtYbePXP9w_0tEYfuYP";
const APPROVED_USERS = new Set(["Ron-ace", "jsulkowski"]);
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const login = document.querySelector("#login");
const panel = document.querySelector("#panel");
const status = document.querySelector("#auth-status");
const signOut = document.querySelector("#sign-out");

function githubLogin(user) {
  return user?.user_metadata?.user_name || user?.user_metadata?.preferred_username || "";
}

function showSession(session) {
  const loginName = githubLogin(session?.user);
  const approved = APPROVED_USERS.has(loginName);
  login.hidden = approved;
  panel.hidden = !approved;
  signOut.hidden = !session;
  if (session && !approved) status.textContent = `GitHub user ${loginName || "unknown"} is not approved.`;
}

document.querySelector("#sign-in").addEventListener("click", async () => {
  status.textContent = "Opening GitHub…";
  const { error } = await client.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${location.origin}${location.pathname}` }
  });
  if (error) status.textContent = error.message;
});

signOut.addEventListener("click", async () => {
  await client.auth.signOut();
  location.replace(location.origin + location.pathname);
});

document.querySelectorAll(".tabs button").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tabs button, .tab").forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  document.querySelector(`#${button.dataset.tab}`).classList.add("active");
}));

client.auth.getSession().then(({ data }) => showSession(data.session));
client.auth.onAuthStateChange((_event, session) => showSession(session));
