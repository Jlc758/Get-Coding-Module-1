let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);

let newObjIsFlagged = false;

let dailyEntryObj = {
  date: formattedDate,
  weather: "",
  journal: "",
  isFlagged: newObjIsFlagged,
  emotionTracker: "",
  waterTracker: "",
  medications: [],
  exercises: [],
  habits: [],
};

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

  const entryMedArray = entry.medications.map((medication) => {
    const medChecked = medication.IsChecked ? "Yes" : "No";
    return `Medication Name:  ${medication.MedText} Dosage:  ${medication.MedCount} Taken?:  ${medChecked}`;
  });

  const entryExArray = entry.exercises.map((exercise) => {
    const exChecked = exercise.IsChecked ? "Yes" : "No";
    return `Exercise:  ${exercise.Exercise} Reps:  ${exercise.RepCount} Completed?:  ${exChecked}`;
  });

  const entryHabArray = entry.habits.map((habit) => {
    const habChecked = habit.IsChecked ? "Yes" : "No";
    return `Habit:  ${habit.Habit} Completed?:  ${habChecked}`;
  });

  const savedMedString = entryMedArray.join("\n");
  const savedExString = entryExArray.join("\n");
  const savedHabString = entryHabArray.join("\n");

  flaggedOther.textContent = ` ${entry.weather}
    ${entry.emotionTracker}
    ${entry.waterTracker}
    ${savedMedString}
    ${savedExString}
    ${savedHabString}`;

  flaggedJournal.append(flaggedOther);
  container.appendChild(flaggedJournal);

  flaggedJournal.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      flaggedOther.style.display =
        flaggedOther.style.display === "block" ? "none" : "block";
    }
  });
});

// !Go into objects

// container.forEach((item) => {
//   let content = item.querySelectorAll("flagged-content");
//   let header = item.querySelectorAll("flagged-header");

//   content.style.display = "none";

//   header.addEventListener("click", (event) => {
//     if (!event.target.closest("button, a, input")) {
//       content.style.display =
//         content.style.display === "block" ? "none" : "block";
//     }
//     container.forEach((otherItem) => {
//       if (otherItem !== item) {
//         let content = otherItem.querySelector("flagged-content");
//         if (content.style.display !== "none") {
//           content.style.display = "none";
//         }
//       }
//     });
//   });
// });

console.log(flaggedEntries);
