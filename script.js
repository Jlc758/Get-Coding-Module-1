const flags = document.querySelectorAll(".flag");

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

let accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");
  console.log("content", content);

  content.style.display = "none";

  item.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        let content = otherItem.querySelector(".accordion-content");
        if (content.style.display !== "none") {
          content.style.display = "none";
        }
      }
    });
  });
});

const addMedication = () => {
  // Get the input value

  const newMedInput = document.getElementById("newMedication");
  const newMedText = newMedInput.value;

  let medList = document.getElementById("medList");
  // let medCountForm = document.getElementById("medCount")

  if (!medList) {
    medList = document.createElement("ul");
    medList.id = "medList";
    document.querySelector(".medListContainer").appendChild(medList);
  }

  // Create a new list item
  const newMed = document.createElement("li");
  newMed.appendChild(
    document.createTextNode(`${newMedText} - Count: ${medCount}`)
  );

  medList.appendChild(newMed);

  // Clear the input field
  newMedInput.value = "";
};

const counterContainer = () => {
  function addMedCounter() {
    let medCountForm = document.createElement("form");
    medCountForm.textContent = "This is the counter";
    document.body.appendChild(newMed);
  }
};

let addMedbtn = document.querySelector("#addMedicationForm");

addMedbtn.addEventListener("submit", (event) => {
  event.preventDefault();
  addMedication();
});
