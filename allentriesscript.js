let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);

const entriesKey = "entriesArray";
const entriesArray = JSON.parse(localStorage.getItem(entriesKey)) || [];

const allEntries = entriesArray;

const cardAccordion = document.querySelectorAll(".card-accordion");

cardAccordion.forEach((card) => {
  let content = card.querySelector(".card-content");
  let header = card.querySelector(".card-title");

  content.style.display = "none";

  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }
  });
});

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
  const medDiv = document.createElement("div");

  medications.forEach((medication) => {
    const medicationElement = document.createElement("div");
    medicationElement.textContent = `Medication: ${medication.MedText}, Count: ${medication.MedCount}, Checked: ${medication.IsChecked}`;

    medDiv.append(medicationElement);
  });
  return medDiv;
}

function createExercisesElement(exercises) {
  const exDiv = document.createElement("div");

  exercises.forEach((exercise) => {
    const exerciseElement = document.createElement("div");
    exerciseElement.textContent = `Exercise: ${exercise.Exercise}, Reps: ${exercise.RepCount}, Checked: ${exercise.IsChecked}`;

    exDiv.append(exerciseElement);
  });
  return exDiv;
}

function createHabitsElement(habits) {
  const habDiv = document.createElement("div");

  habits.forEach((habit) => {
    const habitElement = document.createElement("div");
    habitElement.textContent = `Habit: ${habit.Habit}, Checked: ${habit.IsChecked}`;

    habDiv.append(habitElement);
  });
  return habDiv;
}

function displayCards() {
  const cardsContainer = document.getElementById("allItemsContainer");
  cardsContainer.innerHTML = "";

  allEntries.forEach((entry) => {
    const weather = entry.weather;
    let emotionTracker = entry.emotionTracker;
    let waterTracker = entry.waterTracker;
    let medications = entry.medications;
    let exercises = entry.exercises;
    let habits = entry.habits;

    let selectedEmotion = createEmotionElement(emotionTracker);
    let selectedWater = createWaterElement(waterTracker);
    let medicationList = createMedicationsElement(medications);
    let exerciseList = createExercisesElement(exercises);
    let habitsList = createHabitsElement(habits);

    let cardContent =
      weather +
      selectedEmotion.outerHTML +
      selectedWater.outerHTML +
      medicationList.outerHTML +
      exerciseList.outerHTML +
      habitsList.outerHTML;

    const card = document.createElement("div");
    card.classList.add("card", "w-50", "p-3");

    const cardJournal = document.createElement("p");
    cardJournal.classList.add("card-journal");
    cardJournal.textContent = entry.journal;

    const cardAccordion = document.createElement("div");
    cardAccordion.classList.add("card-accordion");

    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card-content");
    cardContentDiv.innerHTML = cardContent;

    const cardBodyTitle = document.createElement("div");
    cardBodyTitle.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = entry.date;

    cardAccordion.appendChild(cardContentDiv);
    cardBodyTitle.appendChild(cardTitle);

    card.appendChild(cardJournal);
    card.appendChild(cardAccordion);
    card.appendChild(cardBodyTitle);

    cardsContainer.appendChild(card);
  });
}

displayCards();
