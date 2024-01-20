const exercises = [];
const habits = [];
const medications = [];

// DOM Variables
const form = document.getElementById("dailyEntry");
const newMedInput = document.getElementById("newMedication");
const medCountInput = document.getElementById("medCount");
let addMedForm = document.querySelector("#addMedicationForm");
let accordionItems = document.querySelectorAll(".accordion-item");

const flags = document.querySelectorAll(".flag");

// Event Listeners
// addMedForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   addMedication();
// });

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  //! Added this as clicking anywhere inside the content was toggling the accordion. This way it only toggles when clicking the header
  let header = item.querySelector(".accordion-header");
  console.log("content", content);

  content.style.display = "none";

  //! switch to header here
  header.addEventListener("click", (event) => {
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

const deleteButton = (sectionArray, newItem, listID) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", () => {
    let removeItem = sectionArray.indexOf(newItem);
    if (removeItem !== -1) {
      console.log("delete " + sectionArray[removeItem]);
      sectionArray.splice(removeItem, 1);

      //! Need to update the DOM again after you splice from the array
      updateList(sectionArray, listID);
    }
  });

  return deleteButton;
};

// // Breaking down the medication functions
// const medObject = {
//   MedText: newMedInput.value,
//   MedCount: medCountInput.value,
// };

// medications.push(medObject);

// medications.forEach((medication) => {
//   const newMed = document.createElement("li");
//   newMed.appendChild(
//     document.createTextNode(
//       `${medication.MedText} - Count: ${medication.MedCount}`
//     )
//   );
//   // medList.appendChild(newMed);
//   // newMed.append(deleteButton);
//   console.log("medication added successfully");
// });

// // Clear the input field
// newMedInput.value = "";
// medCount.value = "";

// A function to add a Medication to the MedList
// const addMedication = () => {
//   // Get the input value
//   const medObject = {
//     MedText: newMedInput.value,
//     MedCount: medCountInput.value,
//   };

//   medications.push(medObject);

//   let medList = document.getElementById("medList");

//   if (!medList) {
//     medList = document.createElement("ul");
//     medList.id = "medList";
//     document.querySelector(".medListContainer").appendChild(medList);
//   }

//   medList.textContent = "";

//   medications.forEach((medication) => {
//     // Create a new list item
//     const newMed = document.createElement("li");
//     newMed.appendChild(
//       document.createTextNode(
//         `${medication.MedText} - Count: ${medication.MedCount}`
//       )
//     );
//     medList.appendChild(newMed);
//   });

// // Create a new list item
// const newMed = document.createElement("li");
// newMed.appendChild(
//   document.createTextNode(
//     `${newMedText} - Count: ${medCountNumber} - Remove? ${deleteButton()}`
//   )
// );
// Instead of appending the delete button, it appends "[object HTMLButtonElement]" and I can't figure out why

// medList.appendChild(newMed);

// Clear the input field
//   newMedInput.value = "";
//   medCount.value = "";
// };

// General functions

function addMedItem(medArray, medInput, countInput, medBtnID, medListID) {
  let addForm = document.getElementById(medBtnID);
  let date = new Date();

  addForm.addEventListener("click", (event) => {
    const newMedItemInput = document.getElementById(medInput);
    const newMedItemValue = newMedItemInput.value.trim();
    const newMedCountInput = document.getElementById(countInput);
    const newMedCountValue = newMedCountInput.value;

    if (newMedItemValue && newMedCountValue > 0) {
      const medObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
      };

      medArray.push(medObject);
      updateMedList(medArray, medListID);
      newMedItemInput.value = "";
      newMedCountValue.value = "";
    }
  });
}

const updateMedList = (medArray, listID) => {
  // let updatingList = createList(containerID, listID);
  let updatingList = document.getElementById(listID);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;
    let deleteBtn = deleteButton(medArray, updatedItem, listID);
    newItem.append(deleteBtn); // Look into this
    fragment.appendChild(newItem);
  });
  updatingList.appendChild(fragment);
  console.log("Updated list");
  console.log("Exercises: " + exercises, "Habits: " + habits);
};

function addItem(sectionArray, inputID, btnID, listID) {
  let addForm = document.getElementById(btnID);
  let date = new Date();
  console.log(date);
  addForm.addEventListener("click", (event) => {
    addItemToArray(sectionArray, inputID, listID);
    console.log("New item added to section!");
  });
}

function addItemToArray(sectionArray, inputID, listID) {
  let newItemInput = document.getElementById(inputID);
  let newItemText = newItemInput.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listID);
    newItemInput.value = "";
  }
}

// function createList(containerID, listID) {
//   let existingList = document.getElementById(listID);
//   if (!existingList) {
//     let list = document.createElement("ul");
//     list.id = listID;
//     document.getElementById(containerID).appendChild(list);
//     return list;
//   }
//   return existingList;
// }

const updateList = (sectionArray, listID) => {
  // let updatingList = createList(containerID, listID);
  let updatingList = document.getElementById(listID);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, updatedItem, listID);
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  updatingList.appendChild(fragment);
  console.log("Updated list");
  console.log("Exercises: " + exercises, "Habits: " + habits);
};

// Calling function for adding items to exercise section
addItem(exercises, "newExercise", "addExerciseBtn", "exerciseList");
// Calling function for adding items to habit section
addItem(habits, "newHabit", "addHabitBtn", "habitList");

addMedItem(
  medications,
  "newMedication",
  "medCount",
  "addMedicationBtn",
  "medList"
);

dailyEntryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newObj = {
    Date: new Date().toISOString(),
    Journal: "Test",
    FlaggedEntry: true,
    EmotionTracker: 1,
    WaterTracker: 1,
    MedicationTracker: medications,
    ExerciseTracker: exercises,
    HabitTracker: habits,
  };

  console.log(newObj);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    exercise: exercises,
    habits: habits,
    medications: medications,
  };
  console.log("Form submitted: ", formData);
});
