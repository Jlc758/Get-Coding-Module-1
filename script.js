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

// Medication Accordion Section

const addMedication = () => {
  // Get the input value

  const newMedInput = document.getElementById("newMedication");
  const newMedText = newMedInput.value;

  //Create associated med count
  const medCount = document.getElementById("medCount");
  const medCountNumber = medCount.value;

  let medList = document.getElementById("medList");

  if (!medList) {
    medList = document.createElement("ul");
    medList.id = "medList";
    document.querySelector(".medListContainer").appendChild(medList);
  }

  // Create a new list item
  const newMed = document.createElement("li");
  newMed.appendChild(
    document.createTextNode(`${newMedText} - Count: ${medCountNumber}`)
  );

  medList.appendChild(newMed);

  // Clear the input field
  newMedInput.value = "";
  medCount.value = "";
};

let addMedbtn = document.querySelector("#addMedicationForm");

addMedbtn.addEventListener("submit", (event) => {
  event.preventDefault;
  addMedication();
});

// Exercise Accordion Section

const addExercise = () => {
  const newExerciseInput = document.getElementById("newExercise");
  const newExerciseText = newExerciseInput.value;

  let exList = document.getElementById("exList");

  if (!exList) {
    exList = document.createElement("ul");
    exList.id = "exList";
    document.querySelector(".exerciseListContainer").appendChild(exList);
  }

  //Create new list items
  const newEx = document.createElement("li");
  newEx.appendChild(document.createTextNode(`${newExerciseText}`));

  //Appending list item to list
  exList.appendChild(newEx);

  //Clear the input field
  newExerciseInput.value = "";
};

let addExBtn = document.querySelector("#addExerciseForm");

addExBtn.addEventListener("submit", (event) => {
  event.preventDefault;
  addExercise();
});
