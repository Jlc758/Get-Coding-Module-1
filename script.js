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

// Exercise Accordion Section
const createExerciseList = () => {
  const exerciseList = document.createElement("ul");
  exerciseList.id = "exerciseList";
  document.querySelector(".exerciseListContainer").appendChild(exerciseList);
  return exerciseList;
};

const updateExerciseList = (exerciseArray) => {
  const exerciseList =
    document.getElementById("exerciseList") || createExerciseList();
  exerciseList.innerHTML = "";
  exerciseArray.forEach((exercise) => {
    const newExercise = document.createElement("li");
    newExercise.textContent = exercise;
    exerciseList.appendChild(newExercise);

    const weightsIcon = document.createElement("img");
    weightsIcon.srcset = "./icons_images/dumbbell50.png";
    weightsIcon.alt = "dumbbell";

    newExercise.append(weightsIcon);

    const exerciseCheckbox = document.createElement("input");
    exerciseCheckbox.type = "checkbox";
    exerciseCheckbox.id = "exerciseCheckbox";

    newExercise.append(exerciseCheckbox);
  });
};

const addExercise = () => {
  const newExerciseInput = document.getElementById("newExercise");
  const newExerciseText = newExerciseInput.value.trim();

  if (newExerciseText) {
    exercises.push(newExerciseText);
    updateExerciseList(exercises);
    newExerciseInput.value = "";
    console.log(exercises);
  }
  // newExerciseInput.value = "";
};

let addExBtn = document.querySelector("#addExerciseForm");

addExBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  addExercise();
});

// Habit Accordion Section

const createHabitList = () => {
  const habitList = document.createElement("ul");
  habitList.id = "habitList";
  document.querySelector(".habitListContainer").appendChild(habitList);
  return habitList;
};

const updateHabitList = (habitsArray) => {
  const habitList = document.getElementById("habitList") || createHabitList();
  habitList.innerHTML = "";
  habitsArray.forEach((habits) => {
    let newHabit = document.createElement("li");
    newHabit.textContent = habits;
    habitList.appendChild(newHabit);
  });

  const addHabit = () => {
    let newHabitInput = document.getElementById("newHabit");
    let newHabitText = newHabitInput.value.trim();
  };

  let addHabitButton = document.querySelector(".addItem");

  addHabitButton.addEventListener("submit", (event) => {
    event.preventDefault();
    addHabit();
  });
};

// const createNewList = () => {
//   let medList = document.getElementById("medList");
//   let habitList = document.getElementById("habitList");

//   if ((document.parentElement.className = ".medListContainer")) {
//     if (!medList) {
//       medList = document.createElement("ul");
//       medList.id = "medList";
//       document.querySelector(".medListContainer").appendChild(medList);
//       console.log("created new medListContainer");
//     } else {
//       document.querySelector(".medListContainer").appendChild(medList);
//       console.log("appended child to already-created medListContainer");
//     }
//     if ((document.parentElement.className = ".habitListContainer")) {
//       if (!habitList) {
//         habitList = document.createElement("ul");
//         habitList.id = "habitList";
//         document.querySelector(".habitListContainer").appendChild(habitList);
//         console.log("created new habitListContainer");
//       } else {
//         document.querySelector(".habitListContainer").appendChild(habitList);
//         console.log("appended child to already-created habitListContainer");
//       }
//     }
//   }
// };

// const createNewList = () => {
//   if (Element.parentElement === ".habitListContainer") {
//     let habitListContainer =
//       document.getElementsByClassName("habitListContainer");
//     let habitList = document.createElement("ul");
//     habitList.id = "habitList";
//     document.querySelector(".habitListContainer").append("habitList");
//     console.log("is this working");
//     return habitList;
//   } else if {
//   }
// };

// const createHabitList = () => {
//   const habitList = document.createElement("ul");
//   habitList.id = "habitList";
//   document.querySelector(".habitListContainer").appendChild(habitList);
//   return habitList;
// };

// const updateHabitList = (habitArray) => {
//   const habitList = document.getElementById("habitList") || createNewList();
//   habitArray.forEach((habits) => {
//     let habitList = document.getElementById("habitList");
//     const newHabit = document.createElement("li");
//     let newHabitInput = document.getElementById("newHabit");
//     newHabitInput.value = habits;
//     newHabitInput.append(habitList);
//   });
// };

// const addHabit = () => {
//   const newHabitInput = document.getElementById("newHabit");
//   const newHabitText = newHabitInput.value.trim();

//   if (newHabitText) {
//     habits.push(newHabitText);
//     updateHabitList(habits);
//     newHabitInput.value = "";
//     console.log(habits);
//   }
// };

// let addHabitBtn = document.querySelector("#addHabitForm");

// addHabitBtn.addEventListener("submit", (event) => {
//   event.preventDefault();
//   addHabit();
// });
