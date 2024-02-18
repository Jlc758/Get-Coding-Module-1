// ---------- Global Arrays ---------- //
let medicationsArray = [];
let exercisesArray = [];
let habitsArray = [];

// ---------- Daily Entry Form Object ---------- //
const dailyEntryObj = {
  date: new Date().toISOString().slice(0, 10),
  weather: "",
  journal: "",
  isFlagged: false,
  emotionTracker: "",
  waterTracker: "",
  medications: medicationsArray,
  exercises: exercisesArray,
  habits: habitsArray,
};

// check if there's data in local storage
if (localStorage.getItem("typeArray")) {
  // load the data into the global array
}

// DOM Variables
const form = document.getElementById("dailyEntry");
const accordionItems = document.querySelectorAll(".accordion-item");

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

//     accordionItems.forEach((otherItem) => {
//       if (otherItem !== item) {
//         let content = otherItem.querySelector(".accordion-content");
//         if (content.style.display !== "none") {
//           content.style.display = "none";
//         }
//       }
//     });
//   });
// });

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

// ---------- Date Picker ---------- //

$("#date").datePicker();

// ---------- Journal Entry ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");

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

// ---------- Medication Tracker ---------- //
const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const medInput = document.getElementById("newMedication");
const countInput = document.getElementById("medCount");

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

// ---------- Exercise & Habit Trackers ---------- //

const newExerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");

const newHabitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

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

    // if (checkbox === true) {
    //   let yesChecked = localStorage.setItem("checked", "yes");
    //   console.log(yesChecked);
    // } else {
    //   let notChecked = localStorage.setItem("checked", "no");
    //   console.log(notChecked);
    // }
  });
  listElement.appendChild(fragment);
};

// --------- Function Execution, Event Handling, & Form Submission --------- //

// Calling function for adding items to medication section
addMedItem(medicationsArray, medInput, countInput, addMedBtn, medList);

// Calling function for adding items to exercise section
addItem(exercisesArray, newExerciseInput, addExerciseBtn, exerciseList);

// Calling function for adding items to habit section
addItem(habitsArray, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
flagClick(flag);

// ---------- Local Storage ---------- //

// Saving to local storage
const saveData = (dailyEntryObj) => {
  // Check if any data already exists in local storage
  const existingData = localStorage.getItem("dailyEntries");
  let dataToStore = existingData ? JSON.parse(existingData) : [];

  // Add new data object to the existing data array
  dataToStore.push(dailyEntryObj);
  localStorage.setItem("dailyEntries", JSON.stringify(dataToStore));
};

// Retrieving from local storage
const loadData = () => {
  let storedData = localStorage.getItem("dailyEntries");
  return storedData ? JSON.parse(storedData) : [];
};

const loadedData = loadData();
console.log(loadedData);

// Listening for form submit

form.addEventListener(
  "submit",
  (event, sectionArray, listElement, medArray, medList) => {
    event.preventDefault();
    updateJournalEntry(journalInput);
    dailyEntryObj.emotionTracker = radioValue("emotionTracker");
    dailyEntryObj.waterTracker = radioValue("waterTracker");
    dailyEntryObj.medications = updateMedList(medArray, medList);
    dailyEntryObj.exercises = updateList(sectionArray, listElement);
    dailyEntryObj.habits = updateList(sectionArray, listElement);

    function addNewEntryToAll() {
      const allEntriesInput = dailyEntryObj;
      const allEntriesList = document.getElementById("allEntriesList");

      allEntriesInput.forEach();
    }

    // ! Here

    console.log("Form Submitted: ", dailyEntryObj);
    saveData(dailyEntryObj);
  }
);

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
  // Question:  why does this function need to be called here if the results are to be used in the async function?

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

    // Update DOM with City from API key-value pairs
    const dataCityElement = document.getElementById("locationResults");
    dataCityElement.textContent = dataCity;

    const dataWeatherResults = `Temperature: ${dataTemp}  Feels Like: ${dataFeelsLike}  Description:  ${dataDescription}`;
    dailyEntryObj.weather = dataWeatherResults;

    const dataWeatherResultsSection = document.getElementById("weatherResults");
    dataWeatherResultsSection.textContent = dataWeatherResults;

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
