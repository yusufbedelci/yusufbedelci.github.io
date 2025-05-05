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
    const response = await fetch(
      "https://api.github.com/repos/yusufbedelci/yusufbedelci.github.io/branches/main"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const date = new Date(data.commit.commit.author.date);

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
