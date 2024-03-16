// localStorage.clear();
let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);
dateElement.value = formattedDate;
let entryDate;
let selectedDate;

// currentDate.value = new Date().toISOString().slice(0, 10);

//  ---------- Variables ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");
let newObjIsFlagged = false;

const medInput = document.getElementById("newMedication");
const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const countInput = document.getElementById("medCount");

const exerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");
const repCount = document.getElementById("repCount");

const habitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const habitCount = document.getElementById("habitCount");

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

document.addEventListener("DOMContentLoaded", () => {
  try {
    // console.log("Onload");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    populateForm();
    updateMedList(medicationsArray, medList, medKey);
    updateExerciseList(exercisesArray, exerciseList, exKey);
    updateHabitList(habitsArray, habitList, habKey);
    console.log(
      "Entries Array: ",
      entriesArray,
      "Checked Meds: ",
      checkedMedications
    );
  } catch (error) {
    console.log("DomContentLoaded not working");
  }
});

// ------- Date Picker & dailyEntryObj Manipulation ------- //
// let dateElement = document.getElementById("date");

dateElement.addEventListener("change", () => {
  try {
    // update formattedDate when the user changes the date
    let selectedDate = new Date(dateElement.value);
    let formattedDate = selectedDate.toISOString().slice(0, 10);
    entryDate = formattedDate;

    populateForm();

    console.log(formattedDate);
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
    } else if (listElement.id === "exerciseList") {
      // for other lists, call update list
      updateExerciseList(sectionArray, listElement);
    } else if (listElement.id === "habitList") {
      updateHabitList(habitsArray, habitList, habKey);
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
    // dailyEntryObj.isFlagged = !dailyEntryObj.isFlagged;
    if (!newObjIsFlagged) {
      flag.classList.add("flagged");
      newObjIsFlagged = true;
    } else {
      flag.classList.remove("flagged");
      newObjIsFlagged = false;
    }
  });
}

// ! Use filter for flagged entries

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

function addMedItem(
  medicationsArray,
  medInput,
  countInput,
  addMedBtn,
  medList,
  key
) {
  addMedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newMedItemValue = medInput.value.trim();
    const newMedCountValue = countInput.value;

    if (newMedItemValue && newMedCountValue > 0) {
      let medObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
        IsChecked: false,
      };
      localStorage.setItem(key, JSON.stringify(medicationsArray));

      medicationsArray.push(medObject);

      updateMedList(medicationsArray, medList, medKey);
      medInput.value = "";
      countInput.value = "";
    }
  });
}

const updateMedList = (medicationsArray, medList, medKey) => {
  medList.textContent = "";
  const fragment = document.createDocumentFragment();

  medicationsArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;
    let deleteBtn = deleteButton(medicationsArray, index, medList, medKey); //pass index here
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `medicationsCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.checked = updatedItem.IsChecked;
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      medicationsArray[itemIndex].IsChecked = event.target.checked;
    });

    // !Read up on dataset
    newItem.append(checkbox, deleteBtn);
    fragment.appendChild(newItem);
  });
  medList.appendChild(fragment);
};

// ---------- Exercises  ---------- //
// !Convert ex & hab to objs

function addExerciseItem(
  exercisesArray,
  exerciseInput,
  repCount,
  addExerciseBtn,
  exerciseList,
  key
) {
  addExerciseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newExerciseInput = exerciseInput.value.trim();
    const newRepCount = repCount.value;

    // console.log("ExInput: ", newExerciseInput);
    // console.log("RepCount: ", newRepCount);

    if (newExerciseInput && newRepCount > 0) {
      let exerciseObject = {
        Exercise: newExerciseInput,
        RepCount: newRepCount,
        IsChecked: false,
      };
      localStorage.setItem(key, JSON.stringify(exercisesArray));

      exercisesArray.push(exerciseObject);

      updateExerciseList(exercisesArray, exerciseList, exKey);
      exerciseInput.value = "";
      repCount.value = "";
    }
  });
}

const updateExerciseList = (exercisesArray, exerciseList, exKey) => {
  exerciseList.textContent = "";
  const fragment = document.createDocumentFragment();

  exercisesArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.Exercise} - Reps: ${updatedItem.RepCount}`;
    let deleteBtn = deleteButton(exercisesArray, index, exerciseList, exKey);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `exercisesCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.checked = updatedItem.IsChecked;
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      exercisesArray[itemIndex].IsChecked = event.target.checked;
    });

    newItem.append(checkbox, deleteBtn);
    fragment.appendChild(newItem);
  });
  exerciseList.appendChild(fragment);
};

// ---------- Habits ---------- //

function addHabitItem(habitsArray, habitInput, addHabitBtn, habitList, key) {
  addHabitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newHabitInput = habitInput.value.trim();

    if (newHabitInput) {
      let habitObject = {
        Habit: newHabitInput,
        IsChecked: false,
      };
      localStorage.setItem(key, JSON.stringify(habitsArray));

      habitsArray.push(habitObject);

      updateHabitList(habitsArray, habitList, key);
      habitInput.value = "";
    }
  });
}

const updateHabitList = (habitsArray, habitList, habKey) => {
  habitList.textContent = "";
  const fragment = document.createDocumentFragment();

  habitsArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.Habit}`;
    let deleteBtn = deleteButton(habitsArray, index, habitList, habKey);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `habitsCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.checked = updatedItem.IsChecked;
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      habitsArray[itemIndex].IsChecked = event.target.checked;
    });

    newItem.append(checkbox, deleteBtn);
    fragment.appendChild(newItem);
  });
  habitList.appendChild(fragment);
};

// ---------- Checkboxes ---------- //

function checkedItems(sectionArray) {
  return sectionArray.filter((updatedItem) => updatedItem.IsChecked === true);
}

// ! I think I need to make a new function and call checkedItems() for each array to get the relevant list, and then compile it into a list to be saved as the day-of entry

// const updateCheckedItems = () => {
//   for (let i = 0; i < checkboxes.length; i++) {
//     checkboxes[i].addEventListener("change", () => {
//       let id = checkboxes[i].id;
//       let itemText = checkboxes[i].parentElement.textContent.trim();

//       if (checkboxes[i].checked) {
//         if (id.startsWith("exercisesCheckbox")) {
//           checkedExercises.push(itemText);
//         } else if (id.startsWith("habitsCheckbox")) {
//           checkedHabits.push(itemText);
//         } else if (id.startsWith("medicationsCheckbox")) {
//           checkedMedications.push(itemText);
//         }
//       } else {
//         console.log("Error with checkboxes");
//       }
//     });
//   }
// };

// ---------- Weather ---------- //

let currentLat;
let currentLon;
let dataWeatherResultsSection;

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

    // const dataWeatherResults = `Temperature: ${dataTemp}  Feels Like: ${dataFeelsLike}  Description:  ${dataDescription}`;

    const dataWeatherResultsSection = document.getElementById("weatherResults");
    dataWeatherResultsSection.textContent = dailyEntryObj.weather;

    // Append icon img to weather results

    dataWeatherResultsSection.appendChild(weatherIconElement);

    // Handle the retrieved data
    // console.log(data);
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    throw error;
  }
}

// --------- Function Execution, Event Handling, & Form Submission --------- //
function populateForm() {
  // This is the date to look for in dailyEntryObj objects within entriesArray
  let targetDate = dateElement.value;
  console.log("type of date: ", typeof targetDate);
  console.log("date: ", targetDate);

  console.log("Entries Array", entriesArray);

  entriesArray.forEach((entry) => {
    console.log("Entry Date", typeof entry.date, entry.date);
  });

  // Find the entry with the target date
  let foundEntry = entriesArray.find((entry) => entry.date === targetDate);

  console.log("Found Entry", foundEntry);

  if (foundEntry) {
    const {
      date,
      weather,
      journal,
      isFlagged,
      emotionTracker,
      waterTracker,
      medications,
      exercises,
      habits,
    } = foundEntry;

    currentDate.value = date;
    journalInput.value = journal;

    if (isFlagged) {
      flagButton.classList.add("flagged");
      newObjIsFlagged = true;
    } else {
      flagButton.classList.remove("flagged");
      newObjIsFlagged = false;
      //! if this breaks, condition to leave as is
    }

    reverseRadioValue("emotionTracker", emotionTracker);
    reverseRadioValue("waterTracker", waterTracker);
    updateMedList(medications, medList, medKey);
    updateExerciseList(exercises, exerciseList, exKey);
    updateHabitList(habits, habitList, habKey);
  } else {
    form.reset();
    updateMedList(medicationsArray, medList, medKey);
    updateExerciseList(exercisesArray, exerciseList, exKey);
    updateHabitList(habitsArray, habitList, habKey);
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
addExerciseItem(
  exercisesArray,
  exerciseInput,
  repCount,
  addExerciseBtn,
  exerciseList,
  exKey
);

// Calling function for adding items to habit section
addHabitItem(habitsArray, habitInput, addHabitBtn, habitList, habKey);

// Listening for flag click
flagClick(flag);

// ---------- Submit Daily Entry ---------- //

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let dailyEntryObj = {
    date: entryDate,
    weather: weatherResults.textContent,
    journal: journalInput.value,
    isFlagged: newObjIsFlagged,
    emotionTracker: radioValue("emotionTracker"),
    waterTracker: radioValue("waterTracker"),
    medications: medicationsArray,
    exercises: exercisesArray,
    habits: habitsArray,
  };

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
