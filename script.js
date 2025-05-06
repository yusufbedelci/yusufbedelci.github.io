const months = {
  1: "january",
  2: "february",
  3: "march",
  4: "april",
  5: "may",
  6: "june",
  7: "july",
  8: "august",
  9: "september",
  10: "october",
  11: "november",
  12: "december",
};

async function getDateString() {
  try {
    const data = (await fetch("last-updated.txt").then((r) => r.text())).trim();
    const date = new Date(data);
    return `updated ${months[date.getMonth() + 1]}, ${date.getFullYear()}`;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function setTitle() {
  const final = "Yusuf 🌺";
  let scrambled = final.split("");
  let settled = 0;

  const chars =
    "!@#$%^&*()-_=+{}[]|;:',.<>?/\\abcdefghijklmnopqrstuvwxyz0123456789";

  const interval = setInterval(() => {
    scrambled = scrambled.map((char, i) => {
      if (i < settled) return final[i];
      return chars[Math.floor(Math.random() * chars.length)];
    });

    document.title = scrambled.join("");

    if (settled < final.length) {
      settled++;
    } else {
      clearInterval(interval);
      document.title = final;
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", async () => {
  const dateString = await getDateString();
  const updatedDateEl = document.getElementById("updated-date");

  if (dateString) {
    updatedDateEl.style.display = "block";
    updatedDateEl.innerHTML = dateString;
  }

  setTitle();
});
