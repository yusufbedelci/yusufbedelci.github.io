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

document.addEventListener("DOMContentLoaded", async () => {
  const dateString = await getDateString();
  const updatedDateEl = document.getElementById("updated-date");

  if (dateString) {
    updatedDateEl.style.display = "block";
    updatedDateEl.innerHTML = dateString;
  }
});
