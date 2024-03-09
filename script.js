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
  try {
    // console.log("Onload");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

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

dateElement.addEventListener("change", () => {
  try {
    populateForm();
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

const deleteButton = (sectionArray, index, listElement, key) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => {
    sectionArray.splice(index, 1); //delete using index
    console.log("section array spliced:", sectionArray);

    localStorage.setItem(key, JSON.stringify(sectionArray));

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

const reverseRadioValue = (name, value) => {
  const radios = document.getElementsByName(name);

  for (let radio of radios) {
    if (radio.value === value) {
      radio.checked = true;
    }
  }
};

// ---------- Medications ---------- //

function addMedItem(medArray, medInput, countInput, addMedBtn, medList, key) {
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
      localStorage.setItem(key, JSON.stringify(medArray));

      updateMedList(medArray, medList, key);
      medInput.value = "";
      countInput.value = "";
    }
  });
}

const updateMedList = (medArray, medList, key) => {
  // console.log("This is the med list");
  medList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;
    let deleteBtn = deleteButton(medArray, index, medList, key); //pass index here
    newItem.append(deleteBtn);
    fragment.appendChild(newItem);
  });
  medList.appendChild(fragment);
};

// ---------- Exercises & Habits ---------- //

const addItem = (sectionArray, input, addBtn, listElement, key) => {
  addBtn.addEventListener("click", () => {
    addItemToArray(sectionArray, input, listElement, key);
    console.log("New item added to section!");
  });
};

const addItemToArray = (sectionArray, input, listElement, key) => {
  let newItemText = input.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);

    localStorage.setItem(key, JSON.stringify(sectionArray));
    updateList(sectionArray, listElement, key);
    input.value = "";
  }
};

const updateList = (sectionArray, listElement, key) => {
  listElement.textContent = "";
  const fragment = document.createDocumentFragment();
  // save local storage
  if (Array.isArray(sectionArray)) {
    sectionArray.forEach((updatedItem, index) => {
      let newItem = document.createElement("li");
      newItem.textContent = updatedItem;
      let deleteBtn = deleteButton(sectionArray, index, listElement, key); //pass index here

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${
        sectionArray === exercisesArray ? "exercises" : "habits"
      }Checkbox${index}`;

      console.log(checkbox);

      newItem.append(checkbox, deleteBtn); // append the delete button to the new item

      listElement.appendChild(fragment);
      fragment.appendChild(newItem); // append the new item to the fragment
    });
  } else {
    console.error("Section is not an array", sectionArray);
  }
};

// ---------- Weather ---------- //

let currentLat;
let currentLon;
let dataWeatherResultsSection;

// Weather API
// window.onload = function currentLocation() {
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(showPosition);
// } else {
//   console.log("Geolocation is not supported by this browser.");
// }
// };

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
    // console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

// --------- Function Execution, Event Handling, & Form Submission --------- //

function populateForm() {
  // This is the date to look for in dailyEntryObj objects within entriesArray
  let targetDate = currentDate.value;
  console.log("date: ", targetDate);

  // console.log("Entries Array", entriesArray);

  // Find the entry with the target date
  let foundEntry = entriesArray.find((entry) => entry.date === targetDate);

  console.log("Found Entry", foundEntry);

  if (foundEntry) {
    let savedDate = foundEntry.date;
    let savedWeather = foundEntry.weather;
    console.log(savedWeather);
    let savedJournal = foundEntry.journal;
    let savedFlag = foundEntry.isFlagged;
    console.log(savedFlag);
    let savedEmotion = foundEntry.emotionTracker;
    let savedWater = foundEntry.waterTracker;
    let savedMedObj = foundEntry.medications;
    let savedExercises = foundEntry.exercises;
    let savedHabits = foundEntry.habits;

    currentDate.value = savedDate;
    journalInput.value = savedJournal;
    reverseRadioValue("emotionTracker", savedEmotion);
    reverseRadioValue("waterTracker", savedWater);
    updateMedList(savedMedObj, medList, medKey);
    updateList(savedExercises, exerciseList, exKey);
    updateList(savedHabits, habitList, habKey);
  } else {
    form.reset();
    updateMedList(medicationsArray, medList, medKey);
    updateList(exercisesArray, exerciseList, exKey);
    updateList(habitsArray, habitList, habKey);
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

// ---------- Call Functions ---------- //

fetchData(currentLat, currentLon);

populateForm();

addMedItem(medicationsArray, medInput, countInput, addMedBtn, medList, medKey);

// Calling function for adding items to exercise section
addItem(exercisesArray, newExerciseInput, addExerciseBtn, exerciseList, exKey);

// Calling function for adding items to habit section
addItem(habitsArray, newHabitInput, addHabitBtn, habitList, habKey);

// Listening for flag click
flagClick(flag);

// ---------- Submit Daily Entry ---------- //

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let selectedExercises = Array.from(exerciseList).map(
    (checkbox) => checkbox.value
  );

  let dailyEntryObj = {
    date: currentDate.value,
    weather: "",
    journal: journalInput.value,
    isFlagged: "",
    emotionTracker: radioValue("emotionTracker"),
    waterTracker: radioValue("waterTracker"),
    // medications: selectedMedications,
    exercises: selectedExercises,
    // habits: selectedHabits,
  };

  console.log(dailyEntryObj.exercises);

  // ^ this converts the values to strings before storing.

  entriesArray.push(dailyEntryObj);
  localStorage.setItem(entriesKey, JSON.stringify(entriesArray));

  console.log("Form Submitted: ", dailyEntryObj);
  console.log(entriesArray, medicationsArray, exercisesArray, habitsArray);
});

// ------------- All Entries Page -------------- //
// let allEntriesList = document.getElementById("allEntriesList");
// function addToAllEntriesList() {
//   allEntriesList = dailyEntryObj;
// }
