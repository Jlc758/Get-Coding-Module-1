// ---------- Daily Entry Form Object ---------- //
const dailyEntryObj = {
  date: new Date().toISOString().slice(0, 10),
  journal: "",
  isFlagged: false,
  emotionTracker: "",
  waterTracker: "",
  medications: [],
  exercises: [],
  habits: [],
};

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

// ---------- Journal Entry ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");

function updateJournalEntry(input) {
  const value = journalInput.value.trim();
  dailyEntryObj.journal = value;
}

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

function radioValue(name) {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "";
}

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

function addItem(sectionArray, input, addBtn, listElement) {
  addBtn.addEventListener("click", () => {
    addItemToArray(sectionArray, input, listElement);
    console.log("New item added to section!");
    console.log(dailyEntryObj.exercises);
  });
}

function addItemToArray(sectionArray, input, listElement) {
  let newItemText = input.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listElement);
    input.value = "";
  }
}

const updateList = (sectionArray, listElement) => {
  listElement.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, index, listElement); //pass index here
    newItem.append(deleteBtn); // append the delete button to the new item
    fragment.appendChild(newItem); // append the new item to the fragment
  });
  listElement.appendChild(fragment);
};

// --------- Function Execution, Event Handling, & Form Submission --------- //

// Calling function for adding items to medication section
addMedItem(dailyEntryObj.medications, medInput, countInput, addMedBtn, medList);

// Calling function for adding items to exercise section
addItem(
  dailyEntryObj.exercises,
  newExerciseInput,
  addExerciseBtn,
  exerciseList
);

// Calling function for adding items to habit section
addItem(dailyEntryObj.habits, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
flagClick(flag);

// Listening for form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateJournalEntry(journalInput);
  dailyEntryObj.emotionTracker = radioValue("emotionTracker");
  dailyEntryObj.waterTracker = radioValue("waterTracker");

  console.log("Form Submitted: ", dailyEntryObj);
});

// Saving to local storage
function saveData(dailyEntryObj) {
  // Check if any data already exists in local storage
  const existingData = localStorage.getItem("dailyEntries");
  let dataToStore = existingData ? JSON.parse(existingData) : [];

  // Add new data object to the existing data array
  dataToStore.push(dailyEntryObj);
  localStorage.setItem("dailyEntries", JSON.stringify(dataToStore));
}

// Retrieving from local storage
function loadData() {
  const storedData = localStorage.getItem("dailyEntries");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

// Attempting APIs (again)

// const weatherAPIBase = "http://api.openweathermap.org/geo/1.0/direct";

// let currentPosition = navigator.geolocation.getCurrentPosition;
// let locationButton = document.getElementById("confirmLocationBtn");

// console.log(currentPosition.response);

// function getCurrentPosition() {
//   locationButton.addEventListener("button", (click) => {
//     click.preventDefault();
//     console.log(currentPosition);
//   });
// }

// getCurrentPosition();

// window.addEventListener("load", console.log(currentPosition));
window.onload = function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

function showPosition(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;

  console.log(currentLat, currentLon);
  fetchData(currentLat, currentLon);
  // Question:  why does this function need to be called here if the results are to be used in the async function?

  const refreshLocationBtn = document.getElementById("refreshLocationBtn");
  refreshLocationBtn.addEventListener("click", () => {
    fetchData(currentLat, currentLon);
    console.log("Refreshed location");
  });
}

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

    console.log(dataWeatherResults);

    // Handle the retrieved data
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}

// function getLocation() {
//   let getCurrentLocation = onload.navigator.geolocation.getCurrentPosition;
//   let locationResult = getCurrentLocation.textContent;
//   console.log(locationResult);
// }

// function confirmLocation() {
//   confirmLocationBtn.addEventListener("click", () => {
//     console.log(weatherCityInput, weatherProvinceInput);
//   });
// }

// confirmLocation();
//
// Define the API URL

// const weatherAPIBase = "http://api.openweathermap.org/geo/1.0/direct";

// let cityName = document.getElementById("weatherCity").textContent;
// let provinceField = document.getElementById("weatherProvince").textContent;
// let countryCode = 124;
// let limit = 5;

// showPosition = () => {
//   const weatherCityField = document.getElementById("weatherCity");
//   const latitude = position.coords.latitude;
//   const logitude = position.coords.logitude;
// };

// async function fetchData() {
//   try {
//     const weatherResponse = await fetch(weatherAPI);
//     const weatherData = await weatherResponse.json();
//     console.log(weatherData);
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// }

// fetchData();
// console.log(fetchData.textContent);

// Define the weather API
// let apiKey = "f8c05dc88b6f863790f21354538cb343";
// let weatherCity = "St.John's";
// let weatherProvince = "NL";
// let weatherCountry = "124"
// let limit = 5;

// function userLocation() {
//   let currentLocation = navigator.geolocation.getCurrentPosition;
//   console.log(onload.currentLocation);
// }

// async function fetchData() {
//   try {
//     const response = await fetch(weatherAPIBase);

//     if (!response.ok) {
//       throw new Error("HTTP error! Status: ${response.status}");
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// function confirmLocation() {
//   let confButton = document.getElementById("confirmLocationBtn");
//   confButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log(currentLocation.textContent);
//   });
// }

// userLocation();
// confirmLocation();
