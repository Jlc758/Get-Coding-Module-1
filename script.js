const exercises = [];
const habits = [];
const medications = [];

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
    document.createTextNode(
      `${newMedText} - Count: ${medCountNumber} - Remove? ${deleteButton()}`
    )
  );
  // Instead of appending the delete button, it appends "[object HTMLButtonElement]" and I can't figure out why

  medList.appendChild(newMed);

  // Clear the input field
  newMedInput.value = "";
  medCount.value = "";
};

let addMedForm = document.querySelector("#addMedicationForm");

addMedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMedication();
});

// Attempting general functions

function createList(containerID, listID) {
  let existingList = document.getElementById(listID);
  if (!existingList) {
    let list = document.createElement("ul");
    list.id = listID;
    document.getElementById(containerID).appendChild(list);
    return list;
  }
  return existingList;
}

function updateList(sectionArray, containerID, listID) {
  let updatingList = createList(containerID, listID);
  updatingList.textContent = "";
  sectionArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    updatingList.appendChild(newItem);
    newItem.append(deleteButton(sectionArray, newItem));
    console.log(newItem);
  });
}

function addItemToArray(sectionArray, inputID, containerID, listID) {
  let newItemInput = document.getElementById(inputID);
  let newItemText = newItemInput.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, containerID, listID);
    newItemInput.value = "";
  }
}

// Exercise section using general functions
// For the Exercise section
addItem(
  exercises,
  "newExercise",
  "addExerciseForm",
  "exerciseListContainer",
  "exerciseList"
);

// When I add a new item to the exercise tracker or habit tracker, it adds "Item 1", and then "Item 1, Item 2", etc.  How do I stop this from happening?

function addItem(sectionArray, inputID, formID, containerID, listID) {
  let addForm = document.getElementById(formID);
  let date = new Date();
  console.log(date);
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addItemToArray(sectionArray, inputID, containerID, listID);
  });
  console.log("success");
}

// For the Habit section
addItem(habits, "newHabit", "addHabitForm", "habitListContainer", "habitList");

function deleteButton(sectionArray, newItem) {
  let deleteButton = document.createElement("button");
  deleteButton.style.height = "40px";
  deleteButton.style.width = "60px";
  deleteButton.style.backgroundColor = "black";
  deleteButton.style.color = "coral";
  deleteButton.style.marginLeft = "10px";
  deleteButton.innerText = "delete";

  deleteButton.addEventListener("click", () => {
    let removeItem = sectionArray.indexOf(newItem.textContent);
    if (removeItem !== -1) {
      sectionArray.splice(removeItem, 1);
      updateList(sectionArray);
    }
    console.log("delete " + sectionArray.splice(removeItem));
  });
  return deleteButton;
}
