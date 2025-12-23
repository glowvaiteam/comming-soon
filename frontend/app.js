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





document.getElementById("subscribeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userEmail = document.getElementById("email").value.trim();
  const messageBox = document.getElementById("message");

  if (!userEmail) {
    messageBox.textContent = "Please enter a valid email address.";
    return;
  }

  const companyEmail = "glowvai.official@gmail.com";
  const subject = "Early Access Request – GLOWVAI";

  const body = `Hello GLOWVAI Team,

I would like to request early access to GLOWVAI.

Your Email:
${userEmail}

Thank you`;

  const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

});
