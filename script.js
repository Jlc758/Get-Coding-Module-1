const exercises = [];
const habits = [];

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

const updateHabitList = (habitArray) => {
  const habitList = document.getElementById("habitList") || createHabitList();
  habitList.innerHTML = "";
  habitArray.forEach((habits) => {
    const newHabit = document.createElement("li");
    newHabit.textContent = habits;
    habitList.appendChild(newHabit);
  });
};

const addHabit = () => {
  const newHabitInput = document.getElementById("newHabit");
  const newHabitText = newHabitInput.value.trim();

  if (newHabitText) {
    habits.push(newHabitText);
    updateHabitList(habits);
    newHabitInput.value = "";
    console.log(habits);
  }
};

let addHabitBtn = document.querySelector("#addHabitForm");

addHabitBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  addHabit();
});
