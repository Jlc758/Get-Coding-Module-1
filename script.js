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

// Medication Accordion Section

// const deleteButton = (sectionArray, newItem) => {
//   let deleteButton = document.createElement("button");

//   //! This is fine but makes the script file a bit cluttered, let's move the styling to the CSS and apply it to deleteButton when it's created using add class ex: deleteButton.classList.add("delete-button")
//   deleteButton.style.height = "40px";
//   deleteButton.style.width = "60px";
//   deleteButton.style.backgroundColor = "black";
//   deleteButton.style.color = "coral";
//   deleteButton.style.marginLeft = "10px";
//   deleteButton.innerText = "delete";

//   deleteButton.addEventListener("click", () => {
//     let removeItem = sectionArray.indexOf(newItem);
//     if (removeItem !== -1) {
//       sectionArray.splice(removeItem, 1);
//     }
//   });
//   console.log(sectionArray);
//   return deleteButton;
// };

const deleteButton = (sectionArray, newItem, containerID, listID) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button"); //! Make this a class in CSS
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", () => {
    let removeItem = sectionArray.indexOf(newItem);
    if (removeItem !== -1) {
      sectionArray.splice(removeItem, 1);
      //! Need to update the DOM again after you splice from the array
      updateList(sectionArray, containerID, listID); // Update the list in the DOM
    }
  });

  return deleteButton;
};

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
    newItem.append(deleteButton(sectionArray, updatedItem, containerID, listID));
    console.log(sectionArray);
  });
}

  //! Something cool I found that helps with DOM performance when performing multiple DOM manipulations at once like adding several list items to a list is document.createDocumentFragment() which creates a virtual DOM that you can append all your elements to and then append the fragment to the actual DOM. This way you're only appending to the DOM once instead of several times. I'll leave it commented out below so you can see how it works. EX:
/* const updateList = (sectionArray, containerID, listID) => {
  let updatingList = createList(containerID, listID);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, updatedItem);
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  updatingList.appendChild(fragment); 
}; */

// function deleteItem() {
//   let deleteButton = document.createElement("button");
//   deleteButton.style.height = "40px";
//   deleteButton.style.width = "60px";
//   deleteButton.style.backgroundColor = "black";
//   deleteButton.style.color = "coral";
//   deleteButton.style.marginLeft = "10px";
//   deleteButton.innerText = "delete";

//   deleteButton.addEventListener("click", (sectionArray) => {
//     itemToRemove = sectionArray[newItem];
//   });
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
