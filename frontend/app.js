// 🔹 Countdown target (IST)
const launchDate = new Date("2026-01-01T00:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = launchDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      "<h2>🚀 We Are Live!</h2>";
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent =
    Math.floor((diff / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 🔹 Email form → Backend
const form = document.getElementById("subscribeForm");
const message = document.getElementById("message");

// 🔴 CHANGE THIS AFTER DEPLOYMENT
const BACKEND_URL = "http://127.0.0.1:5000";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  message.textContent = "⏳ Sending...";
  message.style.color = "#f59e0b";

  try {
    const res = await fetch(`${BACKEND_URL}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    message.textContent = "✅ Thanks! We’ll notify you at launch.";
    message.style.color = "#16a34a";
    form.reset();

  } catch (err) {
    console.error(err);
    message.textContent = "❌ Failed. Try again later.";
    message.style.color = "#dc2626";
  }
});
