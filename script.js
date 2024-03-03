const currentDate = document.getElementById("date");
currentDate.value = new Date().toISOString().slice(0, 10);

//  ---------- Variables ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");

const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const medInput = document.getElementById("newMedication");
const countInput = document.getElementById("medCount");

const newExerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");

const newHabitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

// ---------- DOM Variables ---------- //
const form = document.getElementById("dailyEntry");
const accordionItems = document.querySelectorAll(".accordion-item");

// ---------- Local Storage Arrays ---------- //

// Keys for local storage
const entriesKey = "entriesArray";
const medKey = "medicationsArray";
const exKey = "exercisesArray";
const habKey = "habitsArray";

// Check if there is already arrays in local storage
let entriesArray = JSON.parse(localStorage.getItem(entriesKey)) || [];
let medicationsArray = JSON.parse(localStorage.getItem(medKey)) || [];
let exercisesArray = JSON.parse(localStorage.getItem(exKey)) || [];
let habitsArray = JSON.parse(localStorage.getItem(habKey)) || [];

// Retrieving from local storage
// const loadEntries = () => {
//   try {
//     let storedData = localStorage.getItem("dailyEntries");
//     return storedData ? JSON.parse(storedData) : [];
//   } catch (error) {
//     console.error("Error loading data from localStorage", error);
//   }
// };

// const loadEntryData = () => {
//   const storedData = localStorage.getItem("dailyEntries");
//   if (storedData) {
//     const loadedEntries = JSON.parse(storedData);
//     const foundEntry = loadedEntries.find(
//       (entry) => entry.date === currentDate.value
//     );

//     return foundEntry;
//   }
// };

// const foundEntry = loadEntryData();

// console.log(foundEntry);

// const foundEntry = dailyEntries.find(
//   (entry) => entry.date === currentDate.value
// );

let dailyEntryObj = {
  date: currentDate.value,
  weather: "",
  journal: "",
  isFlagged: false,
  emotionTracker: "",
  waterTracker: "",
  medications: [],
  exercises: [],
  habits: [],
};

document.addEventListener(onload, () => {
  try {
    populateForm();
    updateMedList(medicationsArray, medList);
    updateList(exercisesArray, exerciseList);
    updateList(habitsArray, habitList);
  } catch (error) {
    console.error(error);
  }
});

// ------- Date Picker & dailyEntryObj Manipulation ------- //
let dateElement = document.getElementById("date");

dateElement.addEventListener("change", (selectedDate) => {
  try {
    let selectedDate = dateElement.value;
    populateForm(selectedDate);
  } catch (error) {
    console.error(error);
  }
});

// ---------- Accordion ---------- //
accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  let header = item.querySelector(".accordion-header");
  // console.log("content", content);

  content.style.display = "none";

  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }
  });
});

// ---------- General Functions ---------- //

const deleteButton = (sectionArray, index, listElement) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => {
    sectionArray.splice(index, 1); //delete using index
    if (listElement.id === "medList") {
      // if it's in the medication list, call updateMedList
      updateMedList(sectionArray, listElement);
    } else {
      // for other lists, call update list
      updateList(sectionArray, listElement);
    }
    console.log("Item Deleted");
  });

  return deleteButton;
};

// ---------- Journal Entry ---------- //

const updateJournalEntry = (input) => {
  const value = journalInput.value.trim();
  dailyEntryObj.journal = value;
};

function flagClick(flag) {
  flag.addEventListener("click", () => {
    dailyEntryObj.isFlagged = !dailyEntryObj.isFlagged;
    if (dailyEntryObj.isFlagged) {
      flag.classList.add("flagged");
    } else {
      flag.classList.remove("flagged");
    }
  });
}

// --=-------- Radio Trackers ---------- //

const radioValue = (name) => {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "";
};

const reverseRadioValue = (name) => {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    for (let i = 1; i <= 5; i++) {
      if (i === dailyEntryObj.radio.value) {
        radio.checked === true;
      }
    }
  }
};

// ---------- Medications ---------- //

function addMedItem(medArray, medInput, countInput, addMedBtn, medList) {
  addMedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newMedItemValue = medInput.value.trim();
    const newMedCountValue = countInput.value;

    if (newMedItemValue && newMedCountValue > 0) {
      let medObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
      };
      medArray.push(medObject);
      // localStorage.setItem(medArray.JSON.stringify(medObject));

      updateMedList(medArray, medList);
      medInput.value = "";
      countInput.value = "";
    }

    // console.log("Stored Medication Data:", medArray);
  });
}

const updateMedList = (medArray, medList) => {
  medList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;
    let deleteBtn = deleteButton(medArray, index, medList); //pass index here
    newItem.append(deleteBtn);
    fragment.appendChild(newItem);
  });
  medList.appendChild(fragment);
  console.log(medArray);
};

// updateMedList(medicationsArray, medList);

// ---------- Exercises & Habits ---------- //

const addItem = (sectionArray, input, addBtn, listElement) => {
  addBtn.addEventListener("click", () => {
    addItemToArray(sectionArray, input, listElement);
    console.log("New item added to section!");
  });
};

const addItemToArray = (sectionArray, input, listElement) => {
  let newItemText = input.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listElement);
    input.value = "";
  }
};

const updateList = (sectionArray, listElement) => {
  listElement.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, index, listElement); //pass index here
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "itemCheckbox";

    newItem.append(checkbox, deleteBtn); // append the delete button to the new item

    fragment.appendChild(newItem); // append the new item to the fragment
  });
  listElement.appendChild(fragment);
  console.log(sectionArray);
};

// ---------- Weather ---------- //

let currentLat;
let currentLon;

// Weather API
window.onload = function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

const showPosition = (position) => {
  currentLat = position.coords.latitude;
  currentLon = position.coords.longitude;
  fetchData(currentLat, currentLon);

  const refreshLocationBtn = document.getElementById("refreshLocationBtn");
  refreshLocationBtn.addEventListener("click", () => {
    fetchData(currentLat, currentLon);
    console.log("Refreshed location");
  });
};

async function fetchData(currentLat, currentLon) {
  // check if currentLat & currentLon are defined
  if (currentLat === undefined || currentLon === undefined) {
    // if not defined, wait fora  short period and then retry
    setTimeout(() => fetchData(currentLat, currentLon), 1000);
    return;
  }

  const weatherAPIKey = "f8c05dc88b6f863790f21354538cb343";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${weatherAPIKey}`;

  try {
    // Make a GET request using fetch and await the response
    const response = await fetch(weatherURL);

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Pull city from API key-value pairs
    const dataCity = data.name;
    const dataTemp = (data.main.temp - 273.15).toFixed(2);
    const dataFeelsLike = (data.main.feels_like - 273.15).toFixed(2);
    const dataDescription = data.weather[0].description;
    const dataWeatherIcon = data.weather[0].icon;
    const dataWeatherUrl = `https://openweathermap.org/img/wn/${dataWeatherIcon}.png`;

    // Handle the retrieved data
    dailyEntryObj.weather = `Temperature: ${dataTemp}  Feels Like: ${dataFeelsLike}  Description:  ${dataDescription}`;

    // Create img element for the weather icon
    const weatherIconElement = document.createElement("img");
    weatherIconElement.src = dataWeatherUrl;

    // Update DOM with City from API key-value pairs
    const dataCityElement = document.getElementById("locationResults");
    dataCityElement.textContent = dataCity;

    const dataWeatherResults = `Temperature: ${dataTemp}  Feels Like: ${dataFeelsLike}  Description:  ${dataDescription}`;

    const dataWeatherResultsSection = document.getElementById("weatherResults");
    dataWeatherResultsSection.textContent = dailyEntryObj.weather;

    // Append icon img to weather results

    dataWeatherResultsSection.appendChild(weatherIconElement);

    // Handle the retrieved data
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

// --------- Function Execution, Event Handling, & Form Submission --------- //

function populateForm() {
  // This is the date to look for in dailyEntryObj objects within entriesArray
  let targetDate = currentDate.value;

  // Find the entry with the target date
  let foundEntry = entriesArray.find(
    (entry) => entry.dailyEntryObj && entry.dailyEntryObj.date === targetDate
  );

  if (foundEntry) {
    let savedDate = foundEntry.dailyEntryObj.date;
    let savedWeather = foundEntry.dailyEntryObj.weather;
    let savedJournal = foundEntry.dailyEntryObj.journal;
    let savedFlag = foundEntry.dailyEntryObj.isFlagged;
    let savedEmotion = foundEntry.dailyEntryObj.emotionTracker;
    let savedWater = foundEntry.dailyEntryObj.waterTracker;
    let savedMedObj = foundEntry.dailyEntryObj.medications;
    let savedExercises = foundEntry.dailyEntryObj.exercises;
    let savedHabits = foundEntry.dailyEntryObj.habits;

    currentDate.value = savedDate;
    journalInput.value = savedJournal;

    console.log(
      savedDate,
      savedWeather,
      savedJournal,
      savedFlag,
      savedEmotion,
      savedWater,
      savedMedObj,
      savedExercises,
      savedHabits
    );
  } else {
    form.reset();
    fetchData(currentLat, currentLon);

    dailyEntryObj = {
      date: currentDate.value,
      weather: "",
      journal: "",
      isFlagged: false,
      emotionTracker: "",
      waterTracker: "",
      medications: [],
      exercises: [],
      habits: [],
    };
  }
}

// function populateForm() {
//   const dailyEntryObj = foundEntry
//     ? foundEntry
//     : {
//         date: currentDate.value,
//         weather: "",
//         journal: "",
//         isFlagged: false,
//         emotionTracker: "",
//         waterTracker: "",
//         medications: [],
//         exercises: [],
//         habits: [],
//       };
//   if (foundEntry) {
//     // currentDate.value = savedDate;
//     // weather
//     journalInput.textContent = dailyEntryObj.journal;
//     foundEntry.isFlagged = dailyEntryObj.isFlagged;
//     reverseRadioValue(emotionTracker);
//     reverseRadioValue(waterTracker);
//     medList.textContent = Array.isArray(dailyEntryObj.medications)
//       ? dailyEntryObj.medications.map((med) => `<li>${med}</li>`).join("")
//       : "";
//     exerciseList.textContent = Array.isArray(dailyEntryObj.exercises)
//       ? dailyEntryObj.exercises.map((ex) => `<li>${ex}</li>`).join("")
//       : "";
//     habitList.textContent = Array.isArray(dailyEntryObj.habits)
//       ? dailyEntryObj.habits.map((hab) => `<li>${hab}</li>`).join("")
//       : "";

//     if (dailyEntryObj.isFlagged) {
//       flag.classList.add("flagged");
//     } else {
//       flag.classList.remove("flagged");
//     }
//   }
// }

// Calling function for adding items to medication section

// loadEntryData();

populateForm();

addMedItem(medicationsArray, medInput, countInput, addMedBtn, medList);

// Calling function for adding items to exercise section
addItem(exercisesArray, newExerciseInput, addExerciseBtn, exerciseList);

// Calling function for adding items to habit section
addItem(habitsArray, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
flagClick(flag);

// ---------- Submit Daily Entry ---------- //

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let dailyEntryObj = {
    date: currentDate.value,
    journal: journalInput.value,
    emotionTracker: radioValue("emotionTracker"),
    waterTracker: radioValue("waterTracker"),
    medications: medicationsArray,
    exercises: exercisesArray,
    habits: habitsArray,
  };

  // ^ this converts the values to strings before storing.

  entriesArray.push(dailyEntryObj);
  localStorage.setItem("entriesArray", JSON.stringify(entriesArray));

  // Retrieve existing arrays from local storage
  medicationsArray = JSON.parse(localStorage.getItem(medKey)) || [];
  exercisesArray = JSON.parse(localStorage.getItem(exKey)) || [];
  habitsArray = JSON.parse(localStorage.getItem(habKey)) || [];

  // Concatenate the new data to the existing arrays
  medicationsArray = medicationsArray.concat(dailyEntryObj.medications);
  exercisesArray = exercisesArray.concat(dailyEntryObj.exercises);
  habitsArray = habitsArray.concat(dailyEntryObj.habits);

  // Save the updated arrays to local storage
  localStorage.setItem(medKey, JSON.stringify(medicationsArray));
  localStorage.setItem(exKey, JSON.stringify(exercisesArray));
  localStorage.setItem(habKey, JSON.stringify(habitsArray));

  console.log("Form Submitted: ", dailyEntryObj);
  console.log(entriesArray, medicationsArray, exercisesArray, habitsArray);
});

// ------------- All Entries Page -------------- //
// let allEntriesList = document.getElementById("allEntriesList");
// function addToAllEntriesList() {
//   allEntriesList = dailyEntryObj;
// }
