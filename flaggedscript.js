let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);

const entriesKey = "entriesArray";
const entriesArray = JSON.parse(localStorage.getItem(entriesKey));

const flaggedEntries = entriesArray.filter((entry) => entry.isFlagged);

const container = document.getElementById("flaggedItemsContainer");

flaggedEntries.forEach((entry) => {
  const flaggedJournal = document.createElement("div");
  flaggedJournal.classList = "flagged-header";
  flaggedJournal.textContent = `${entry.date} // ${entry.journal}`;

  const flaggedOther = document.createElement("div");
  flaggedOther.classList = "flagged-content";
  flaggedOther.style.display = "none";

  // Emotion Tracker Results
  let selectedEmotion;

  if (entry.emotionTracker === "one") {
    selectedEmotion = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-disgusting-100.png";
    selectedEmotion.appendChild(resultImg);
  } else if (entry.emotionTracker === "two") {
    selectedEmotion = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-nauseated-face-100.png";
    selectedEmotion.appendChild(resultImg);
  } else if (entry.emotionTracker === "three") {
    selectedEmotion = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-pouting-face-100.png";
    selectedEmotion.appendChild(resultImg);
  } else if (entry.emotionTracker === "four") {
    selectedEmotion = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-blushing-100.png";
    selectedEmotion.appendChild(resultImg);
  } else if (entry.emotionTracker === "five") {
    selectedEmotion = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src =
      "./icons_images/icons8-grinning-face-with-smiling-eyes-100.png";
    selectedEmotion.appendChild(resultImg);
  } else {
    selectedEmotion = document.createElement("div");
    selectedEmotion = "No emotion documented.";
  }

  // Water Tracker Results
  let selectedWater;

  if (entry.waterTracker === "one") {
    selectedWater = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-water-0.png";
    selectedWater.appendChild(resultImg);
  } else if (entry.waterTracker === "two") {
    selectedWater = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-water-8.png";
    selectedWater.appendChild(resultImg);
  } else if (entry.waterTracker === "three") {
    selectedWater = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-water-16.png";
    selectedWater.appendChild(resultImg);
  } else if (entry.waterTracker === "four") {
    selectedWater = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-water-24.png";
    selectedWater.appendChild(resultImg);
  } else if (entry.waterTracker === "five") {
    selectedWater = document.createElement("div");
    let resultImg = document.createElement("img");
    resultImg.src = "./icons_images/icons8-water-32.png";
    selectedWater.appendChild(resultImg);
  } else {
    selectedWater = document.createElement("div");
    selectedWater = "No water documented.";
  }

  // Medication Results
  const medications = entry.medications;
  const medDiv = document.createElement("div");
  medications.forEach((medication) => {
    const savedMedText = document.createElement("p");
    savedMedText.textContent = `Medication: ${medication.MedText}, Count: ${medication.MedCount}, Checked: ${medication.IsChecked}`;
    medDiv.appendChild(savedMedText);
  });

  // Exercises Results
  const exercises = entry.exercises;
  const exDiv = document.createElement("div");
  exercises.forEach((exercise) => {
    const savedExText = document.createElement("p");
    savedExText.textContent = `Exercise: ${exercise.newExerciseInput}, Reps: ${exercise.RepCount}, Checked: ${exercise.IsChecked}`;
    exDiv.appendChild(savedExText);
  });

  // Habits Results
  const habits = entry.habits;
  const habDiv = document.createElement("div");
  habits.forEach((habit) => {
    const savedHabText = document.createElement("p");
    savedHabText.textContent = `Habit: ${habit.Habit}, Checked: ${habit.IsChecked}`;
    habDiv.appendChild(savedHabText);
  });

  // Appending All Results to flaggedOther
  flaggedOther.append(selectedEmotion);
  flaggedOther.append(selectedWater);
  flaggedOther.append(medDiv);
  flaggedOther.append(exDiv);
  flaggedOther.append(habDiv);

  flaggedJournal.append(flaggedOther);
  container.appendChild(flaggedJournal);

  flaggedJournal.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      flaggedOther.style.display =
        flaggedOther.style.display === "block" ? "none" : "block";
    }
  });
});

console.log(flaggedEntries);
