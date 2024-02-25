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

// ---------- Global Arrays ---------- //
let localMedicationsArray =
  JSON.parse(localStorage.getItem("medicationsArray")) || [];
let localExercisesArray =
  JSON.parse(localStorage.getItem("exercisesArray")) || [];
let localHabitsArray = JSON.parse(localStorage.getItem("habitsArray")) || [];
console.log(localMedicationsArray);

// ---------- Local Storage ---------- //

// Saving to local storage
const saveData = (dailyEntryObj) => {
  // Check if any data already exists in local storage
  try {
    const existingData = localStorage.getItem("dailyEntries");
    let dataToStore = existingData ? JSON.parse(existingData) : [];
    dataToStore.push(dailyEntryObj);

    // Add new data object to the existing data array for the selected date
    localStorage.setItem("dailyEntries", JSON.stringify(dataToStore));
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
};

// Retrieving from local storage
const loadEntries = () => {
  try {
    let storedData = localStorage.getItem("dailyEntries");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error loading data from localStorage", error);
  }
};

const dailyEntries = loadEntries();
console.log(dailyEntries);

const foundEntry = dailyEntries.find(
  (entry) => entry.date === currentDate.value
);

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

document.addEventListener("DOMContentLoaded", () => {
  dailyEntryObj;

  populateForm();

  // Save the modified data back to the localStorage
  saveData(foundEntry ? foundEntry : dailyEntryObj);
});

// ---------- Daily Entry Form Object ---------- //

// const dailyEntryObj = foundEntry
//   ? foundEntry
//   : {
//       date: currentDate.value,
//       weather: "",
//       journal: "",
//       isFlagged: false,
//       emotionTracker: "",
//       waterTracker: "",
//       medications: [],
//       exercises: [],
//       habits: [],
//     };

// ------- Date Picker & dailyEntryObj Manipulation ------- //

currentDate.addEventListener("change", () => {
  try {
    populateForm();
  } catch (error) {
    console.error(error);
  }

  // Save the modified data back to the localStorage
  saveData(foundEntry ? foundEntry : dailyEntryObj);
});

// // DOM Variables
// const form = document.getElementById("dailyEntry");
// const accordionItems = document.querySelectorAll(".accordion-item");

// ---------- Date Picker ---------- //
// let currentDate = document.getElementById("date");
// currentDate.addEventListener("change", (event) => {
//   if (currentDate.innerHTML === currentDate)
// });

// dailyEntryObj.date = selectedDate;

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
      console.log("Header clicked");
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

// ---------- Medication Tracker ---------- //
// const addMedBtn = document.getElementById("addMedicationBtn");
// const medList = document.getElementById("medList");
// const medInput = document.getElementById("newMedication");
// const countInput = document.getElementById("medCount");

function addMedItem(
  medArray,
  medInput,
  countInput,
  addMedBtn,
  medList,
  localStorageArray
) {
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
      localStorage.setItem(localStorageArray, JSON.stringify(medArray));

      updateMedList(medArray, medList);
      medInput.value = "";
      countInput.value = "";
    }
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

updateMedList(localMedicationsArray, medList);

// ---------- Exercise & Habit Trackers ---------- //

// const newExerciseInput = document.getElementById("newExercise");
// const addExerciseBtn = document.getElementById("addExerciseBtn");
// const exerciseList = document.getElementById("exerciseList");

// const newHabitInput = document.getElementById("newHabit");
// const addHabitBtn = document.getElementById("addHabitBtn");
// const habitList = document.getElementById("habitList");

const addItem = (sectionArray, input, addBtn, listElement) => {
  addBtn.addEventListener("click", () => {
    addItemToArray(sectionArray, input, listElement);
    console.log("New item added to section!");
    console.log(dailyEntryObj.exercises);
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
};

// --------- Function Execution, Event Handling, & Form Submission --------- //

function populateForm() {
  const dailyEntryObj = foundEntry
    ? foundEntry
    : {
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
  if (foundEntry) {
    currentDate.value = dailyEntryObj.date;
    // weather
    journalInput.value = dailyEntryObj.journal;
    foundEntry.isFlagged = dailyEntryObj.isFlagged;
    reverseRadioValue(emotionTracker);
    reverseRadioValue(waterTracker);
    medList.textContent = dailyEntryObj.medications
      .map((med) => `<li>${med}</li>`)
      .join("");
    exerciseList.textContent = dailyEntryObj.exercises
      .map((ex) => `<li>${ex}</li>`)
      .join("");
    habitList.textContent = dailyEntryObj.habits
      .map((hab) => `<li>${hab}</li>`)
      .join("");

    if (dailyEntryObj.isFlagged) {
      flag.classList.add("flagged");
    } else {
      flag.classList.remove("flagged");
    }
  }
}

// Calling function for adding items to medication section
addMedItem(
  localMedicationsArray,
  medInput,
  countInput,
  addMedBtn,
  medList,
  "medicationsArray"
);

// Calling function for adding items to exercise section
addItem(localExercisesArray, newExerciseInput, addExerciseBtn, exerciseList);

// Calling function for adding items to habit section
addItem(localHabitsArray, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
flagClick(flag);

// ---------- Submit Daily Entry ---------- //

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateJournalEntry(journalInput);

  dailyEntryObj.date = currentDate.value;
  dailyEntryObj.emotionTracker = radioValue("emotionTracker");
  dailyEntryObj.waterTracker = radioValue("waterTracker");
  dailyEntryObj.medications = medList.innerText;
  dailyEntryObj.exercises = exerciseList.innerText;
  dailyEntryObj.habits = habitList.innerText;

  console.log("Form Submitted: ", dailyEntryObj);
  console.log(localMedicationsArray, localExercisesArray, localHabitsArray);
  saveData(dailyEntryObj);
});

// ---------- Weather ---------- //

// Weather API
window.onload = function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

const showPosition = (position) => {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  fetchData(currentLat, currentLon);

  const refreshLocationBtn = document.getElementById("refreshLocationBtn");
  refreshLocationBtn.addEventListener("click", () => {
    fetchData(currentLat, currentLon);
    console.log("Refreshed location");
  });
};

async function fetchData(currentLat, currentLon) {
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

    // Create img element for the weather icon
    const weatherIconElement = document.createElement("img");
    weatherIconElement.src = dataWeatherUrl;

    // Update DOM with City from API key-value pairs
    const dataCityElement = document.getElementById("locationResults");
    dataCityElement.textContent = dataCity;

    const dataWeatherResults = `Temperature: ${dataTemp}  Feels Like: ${dataFeelsLike}  Description:  ${dataDescription}`;

    const dataWeatherResultsSection = document.getElementById("weatherResults");
    dataWeatherResultsSection.textContent = dataWeatherResults;

    // Append icon img to weather results
    dataWeatherResultsSection.appendChild(weatherIconElement);

    // dailyEntryObj.weather = dataWeatherResults;

    // Handle the retrieved data
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

// ------------- All Entries Page -------------- //
// let allEntriesList = document.getElementById("allEntriesList");
// function addToAllEntriesList() {
//   allEntriesList = dailyEntryObj;
// }
