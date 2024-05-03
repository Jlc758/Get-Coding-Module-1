let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);

const entriesKey = "entriesArray";
const entriesArray = JSON.parse(localStorage.getItem(entriesKey)) || [];

function createEmotionElement(emotionTracker) {
  const selectedEmotion = document.createElement("div");
  let emotionImg = document.createElement("img");

  const emotionMap = {
    one: "./icons_images/icons8-disgusting-100.png",
    two: "./icons_images/icons8-nauseated-face-100.png",
    three: "./icons_images/icons8-pouting-face-100.png",
    four: "./icons_images/icons8-blushing-100.png",
    five: "./icons_images/icons8-grinning-face-with-smiling-eyes-100.png",
  };

  const imgSrc = emotionMap[emotionTracker];

  if (imgSrc) {
    emotionImg.src = imgSrc;
    selectedEmotion.appendChild(emotionImg);
  } else {
    selectedEmotion.textContent = "No emotion selected.";
  }
  return selectedEmotion;
}

function createWaterElement(waterTracker) {
  const selectedWater = document.createElement("div");
  let waterImg = document.createElement("img");

  const waterMap = {
    one: "./icons_images/icons8-water-0.png",
    two: "./icons_images/icons8-water-8.png",
    three: "./icons_images/icons8-water-16.png",
    four: "./icons_images/icons8-water-24.png",
    five: "./icons_images/icons8-water-32.png",
  };

  const imgSrc = waterMap[waterTracker];

  if (imgSrc) {
    waterImg.src = imgSrc;
    selectedWater.appendChild(waterImg);
  } else {
    selectedWater.textContent = "Water intake not tracked.";
  }
  return selectedWater;
}

function createMedicationsElement(medications) {
  const takenMedsColumn = document.createElement("div");
  takenMedsColumn.className = "column";
  takenMedsColumn.className = "record-columns";
  takenMedsColumn.innerHTML = "<h6>Taken</h6>";

  const notTakenMedsColumn = document.createElement("div");
  notTakenMedsColumn.className = "column";
  notTakenMedsColumn.className = "record-columns";
  notTakenMedsColumn.innerHTML = "<h6>Skipped/Missed</h6>";

  medications.forEach((medication) => {
    const medicationElement = document.createElement("div");
    medicationElement.textContent = `${medication.MedText}, Count: ${medication.MedCount}`;

    if (medication.IsChecked) {
      takenMedsColumn.appendChild(medicationElement);
    } else {
      notTakenMedsColumn.appendChild(medicationElement);
    }
  });

  const medicationWrapper = document.createElement("div");
  medicationWrapper.className = "medication-wrapper";
  medicationWrapper.appendChild(takenMedsColumn);
  medicationWrapper.appendChild(notTakenMedsColumn);

  return medicationWrapper;
}

function createExercisesElement(exercises) {
  const completedColumn = document.createElement("div");
  completedColumn.className = "record-columns";
  completedColumn.innerHTML = "<h6>Completed</h6>";

  const notCompletedColumn = document.createElement("div");
  notCompletedColumn.className = "record-columns";
  notCompletedColumn.innerHTML = "<h6>Skipped/Missed</h6>";

  exercises.forEach((exercise) => {
    const exerciseElement = document.createElement("div");
    exerciseElement.textContent = `${exercise.Exercise}, Reps: ${exercise.RepCount}`;

    if (exercise.IsChecked) {
      completedColumn.appendChild(exerciseElement);
    } else {
      notCompletedColumn.appendChild(exerciseElement);
    }
  });

  const exerciseWrapper = document.createElement("div");
  exerciseWrapper.className = "exercise-wrapper";
  exerciseWrapper.appendChild(completedColumn);
  exerciseWrapper.appendChild(notCompletedColumn);

  return exerciseWrapper;
}

function createHabitsElement(habits) {
  const completedColumn = document.createElement("div");
  completedColumn.className = "column";
  completedColumn.className = "record-columns";
  completedColumn.innerHTML = "<h6>Completed</h6>";

  const notCompletedColumn = document.createElement("div");
  notCompletedColumn.className = "column";
  notCompletedColumn.className = "record-columns";
  notCompletedColumn.innerHTML = "<h6>Skipped/Missed</h6>";

  habits.forEach((habit) => {
    const habitElement = document.createElement("div");
    habitElement.textContent = `${habit.Habit}`;

    if (habit.IsChecked) {
      completedColumn.appendChild(habitElement);
    } else {
      notCompletedColumn.appendChild(habitElement);
    }
  });

  const habitWrapper = document.createElement("div");
  habitWrapper.className = "habit-wrapper";
  habitWrapper.appendChild(completedColumn);
  habitWrapper.appendChild(notCompletedColumn);

  return habitWrapper;
}

function displayCards() {
  const cardsContainer = document.getElementById("allItemsContainer");
  cardsContainer.innerHTML = "";
  cardsContainer.className = "row";

  const sortedEntries = entriesArray.slice().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  sortedEntries.forEach((entry) => {
    const weather = entry.weather;
    let emotionTracker = entry.emotionTracker;
    let waterTracker = entry.waterTracker;
    let medications = entry.medications;
    let exercises = entry.exercises;
    let habits = entry.habits;

    let selectedEmotion = createEmotionElement(emotionTracker);
    let selectedWater = createWaterElement(waterTracker);

    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weather-div");
    weatherDiv.innerHTML = weather;
    weatherDiv.style.paddingTop = "10px";

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons-div");
    iconsDiv.innerHTML = selectedWater.outerHTML + selectedEmotion.outerHTML;

    const card = document.createElement("div");
    card.classList.add("card");

    const cardJournal = document.createElement("p");
    cardJournal.classList.add("card-journal");
    cardJournal.textContent = entry.journal;

    const cardAccordion = document.createElement("div");
    cardAccordion.classList.add("card-accordion");

    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content");
    cardContentDiv.style.display = "none";

    const cardBodyTitle = document.createElement("div");
    cardBodyTitle.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = entry.date;

    cardTitle.addEventListener("click", () => {
      cardContentDiv.style.display =
        cardContentDiv.style.display === "block" ? "none" : "block";
    });

    cardAccordion.appendChild(cardContentDiv);
    cardBodyTitle.appendChild(cardTitle);
    cardContentDiv.appendChild(iconsDiv);
    cardContentDiv.appendChild(createMedicationsElement(medications));
    cardContentDiv.appendChild(createExercisesElement(exercises));
    cardContentDiv.append(createHabitsElement(habits));
    cardContentDiv.append(weatherDiv);

    card.appendChild(cardJournal);
    card.appendChild(cardAccordion);
    card.appendChild(cardBodyTitle);

    cardsContainer.appendChild(card);
  });
}

displayCards();

let expandCollapseButton = document.getElementById("expandCollapse");

expandCollapseButton.addEventListener("click", () => {
  const cardsContainer = document.getElementById("allItemsContainer");
  const cardContents = cardsContainer.querySelectorAll(".card-content");

  cardContents.forEach((content) => {
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
});
