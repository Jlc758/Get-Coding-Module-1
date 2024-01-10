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
    document.createTextNode(`${newMedText} - Count: ${medCountNumber}`)
  );

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
  });
}

//! make the inputID a paramter so it can be used for multiple inputs, no return necessary here unless you want to use it for something else
// function addItemToArray(sectionArray, containerID, listID) {
//   let newItemInput = document.getElementById("newItem");
//   let newItemText = newItemInput.value.trim();

//   if (newItemText) {
//     sectionArray.push(newItemText);
//     updateList(sectionArray, containerID, listID);
//     newItemInput.value = "";
//     return newItemInput;
//   }
// }

//!Updated function
function addItemToArray(sectionArray, inputID, containerID, listID) {
  let newItemInput = document.getElementById(inputID);
  let newItemText = newItemInput.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, containerID, listID);
    newItemInput.value = "";
  }
}

//! Should be selecting the form not the button, and that should be a parameter so it can be used for multiple forms
// function addItem(sectionArray, containerID, listID) {
//   let addItemButton = document.querySelector(".addItem");

//   addItemButton.addEventListener("submit", (event) => {
//     event.preventDefault();
//     addItemToArray(sectionArray, containerID, listID);
//   });
// }

//!Updated function

// Exercise section using general functions
// For the Exercise section
addItem(
  exercises,
  "newExercise",
  "addExerciseForm",
  "exerciseListContainer",
  "exerciseList"
);

// For the Habit section
addItem(habits, "newHabit", "addHabitForm", "habitListContainer", "habitList");

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

// addItem(exercises, "#exerciseListContainer", "#exerciseList");

// if (addItem()) {
//   console.log("actioned exercise");
// }

// function actionExercise() {
//   updateList(exercises, "#exerciseListContainer", "#exerciseList");
//   console.log("Exercise list populated");

//   addItem(exercises, "#exerciseListContainer", "#exerciseList");
//   console.log("Added item");
// };

// Exercise Accordion Section

// const createList = (containerID, listID) => {
//   const list = document.createElement("ul");
//   list.id = listID;
//   document.querySelector(containerID).appendChild(list);
//   return list;
// };

// const updateExerciseList = (exerciseArray, containerID, listID, isExercise) => {
//   const exerciseList =
//     document.getElementById(listID) || createList(containerID, listID);
//   exerciseList.innerHTML = "";
//   exerciseArray.forEach((exercise) => {
//     const newExercise = document.createElement("li");
//     newExercise.textContent = exercise;
//     exerciseList.appendChild(newExercise);

//     if (isExercise) {
//       const weightsIcon = document.createElement("img");
//       weightsIcon.srcset = "./icons_images/dumbbell50.png";
//       weightsIcon.alt = "dumbbell";

//       newExercise.append(weightsIcon);
//     }

//     const exerciseCheckbox = document.createElement("input");
//     exerciseCheckbox.type = "checkbox";
//     exerciseCheckbox.id = "exerciseCheckbox";

//     newExercise.append(exerciseCheckbox);
//   });
// };

// const addExercise = () => {
//   const newExerciseInput = document.getElementById("newExercise");
//   const newExerciseText = newExerciseInput.value.trim();

//   if (newExerciseText) {
//     exercises.push(newExerciseText);
//     updateExerciseList(exercises, ".exerciseListContainer", "exerciseList", true);
//     newExerciseInput.value = "";
//     console.log(exercises);
//   }
//   // newExerciseInput.value = "";
// };

// let addExBtn = document.querySelector("#addExerciseForm");

// addExBtn.addEventListener("submit", (event) => {
//   event.preventDefault();
//   addExercise();
// });

// Habit Accordion Section

// const createHabitList = () => {
//   const habitList = document.createElement("ul");
//   habitList.id = "habitList";
//   document.querySelector(".habitListContainer").appendChild(habitList);
//   return habitList;
// };

// const updateHabitList = (habitsArray) => {
//   const habitList = document.getElementById("habitList") || createHabitList();
//   habitList.innerHTML = "";
//   habitsArray.forEach((habits) => {
//     let newHabit = document.createElement("li");
//     newHabit.textContent = habits;
//     habitList.appendChild(newHabit);
//   });

//   const addHabit = () => {
//     let newHabitInput = document.getElementById("newHabit");
//     let newHabitText = newHabitInput.value.trim();
//   };

//   let addHabitButton = document.querySelector(".addItem");

//   addHabitButton.addEventListener("submit", (event) => {
//     event.preventDefault();
//     addHabit();
//   });
// };
