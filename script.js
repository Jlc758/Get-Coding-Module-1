// localStorage.clear();
let dateElement = document.getElementById("date");
let currentDate = new Date();

let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

let formattedDate = currentDate.toISOString().slice(0, 10);

let previousDate = new Date(currentDate);
previousDate.setDate(currentDate.getDate() - 3);
let twoDaysAgo = previousDate.toISOString().slice(0, 10);

let oneDayAhead = new Date(currentDate);
oneDayAhead.setDate(currentDate.getDate() + 1);

let twoDaysAhead = new Date(currentDate);
twoDaysAhead.setDate(currentDate.getDate() + 2);

let submitMessage = document.getElementById("submitMessage");

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

//  ---------- Variables ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");
let newObjIsFlagged = false;

const medInput = document.getElementById("newMedication");
const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const countInput = document.getElementById("medCount");
const dosageElement = document.getElementById("dosage");
const deleteAllMeds = document.getElementById("deleteAllMeds");

const exerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");
const repCount = document.getElementById("repCount");
const deleteAllExercises = document.getElementById("deleteAllExercises");

const habitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const deleteAllHabits = document.getElementById("deleteAllHabits");

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
    fetchLocationData();
    populateForm(formattedDate);
    console.log(
      "Exercises Array: ",
      exercisesArray,
      " Exercise List: ",
      exerciseList
    );
  } catch (error) {
    console.log("DomContentLoaded not working");
  }
});

// ---------- Location ---------- //

let locationDataLoaded = false;

const fetchLocationData = () => {
  if (!locationDataLoaded) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      ("Geolocation is not supported by this browser.");
    }
  }
};

const refreshLocationBtn = document.getElementById("refreshLocationBtn");
refreshLocationBtn.addEventListener("click", () => {
  fetchLocationData();
});

const showPosition = (position) => {
  currentLat = position.coords.latitude;
  currentLon = position.coords.longitude;

  locationDataLoaded = true;

  fetchData(currentLat, currentLon);
};

// ------- Date Picker & dailyEntryObj Manipulation ------- //

dateElement.addEventListener("change", () => {
  try {
    let selectedDate = new Date(dateElement.value);
    formattedDate = selectedDate.toISOString().slice(0, 10);
    let submit = document.getElementById("submitButton");
    let emotionTracker = document.getElementById("emotionTracker");
    let waterTracker = document.getElementById("waterTracker");
    let twodayMessage = document.getElementById("twoDayMessage");

    if (formattedDate <= twoDaysAgo) {
      journalInput.disabled = true;
      medInput.disabled = true;
      countInput.disabled = true;
      exerciseInput.disabled = true;
      repCount.disabled = true;
      habitInput.disabled = true;
      submit.disabled = true;
      flagButton.disabled = true;
      emotionTracker.disabled = true;
      waterTracker.disabled = true;
      twodayMessage.style.display = "block";
    } else {
      form.reset();
      journalInput.disabled = false;
      medInput.disabled = false;
      countInput.disabled = false;
      exerciseInput.disabled = false;
      repCount.disabled = false;
      habitInput.disabled = false;
      submit.disabled = false;
      flagButton.disabled = false;
      emotionTracker.disabled = false;
      waterTracker.disabled = false;
    }

    populateForm(formattedDate);
  } catch (error) {
    console.error(error);
  }
});

// ---------- Accordion ---------- //
accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  let header = item.querySelector(".accordion-header");

  content.style.display = "none";

  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }
  });
});

let expandCollapseButton = document.getElementById("expandCollapse");

expandCollapseButton.addEventListener("click", () => {
  accordionItems.forEach((item) => {
    let content = item.querySelector(".accordion-content");
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
});

// ---------- General Functions ---------- //

const deleteButton = (sectionArray, index, listElement, key) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";
  deleteButton.addEventListener("click", () => {
    sectionArray.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(sectionArray));

    if (listElement.id === "medList") {
      updateMedList(sectionArray, listElement, key);
    } else if (listElement.id === "exerciseList") {
      updateExerciseList(sectionArray, listElement, key);
    } else if (listElement.id === "habitList") {
      updateHabitList(sectionArray, listElement, key);
    }
  });

  return deleteButton;
};

const medCountInput = document.getElementById("medCount");
const repCountInput = document.getElementById("repCount");

if (medCountInput) {
  medCountInput.addEventListener("input", function () {
    let currentValue = parseFloat(this.value);

    if (currentValue > parseFloat(this.max)) {
      this.value = this.max;
    }
  });
}

if (repCountInput) {
  repCountInput.addEventListener("input", function () {
    let currentValue = parseFloat(this.value);

    if (currentValue > parseFloat(this.max)) {
      this.value = this.max;
    }
  });
}

// ---------- Journal Entry ---------- //

const updateJournalEntry = (input) => {
  const value = journalInput.value.trim();
  dailyEntryObj.journal = value;
};
let checkmark = document.createElement("img");

function flagClick(flag) {
  flag.addEventListener("click", () => {
    if (!newObjIsFlagged) {
      flag.classList.add("flagged");
      newObjIsFlagged = true;

      checkmark.style.border = "none";
      checkmark.style.paddingLeft = "10px";
      checkmark.src = "./icons_images/checkmark-20.png";

      flagButton.append(checkmark);
    } else {
      flag.classList.remove("flagged");
      flagButton.removeChild(checkmark);
      newObjIsFlagged = false;
    }
    return newObjIsFlagged;
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

function addMedItem(
  sectionArray,
  inputItem,
  count,
  addBtn,
  sectionList,
  key,
  dosage
) {
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newMedItemValue = inputItem.value.trim();
    const newMedCountValue = count.value;
    const selectedOption = dosage.options[dosage.selectedIndex];
    const selectedDosage = selectedOption.innerText;

    if (newMedItemValue && newMedCountValue > 0) {
      const newMedObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
        Dosage: selectedDosage,
        IsChecked: false,
      };

      sectionArray.push({ ...newMedObject, IsChecked: false });
      dailyEntryObj.medications.push(newMedObject);
      localStorage.setItem(key, JSON.stringify(sectionArray));

      updateMedList(dailyEntryObj.medications, sectionList);
      inputItem.value = "";
      count.value = "";
      dosage.selectedIndex = 0;
    }
  });
}

const updateMedList = (sectionArray, sectionList, key) => {
  sectionList.textContent = ""; // Clear existing list
  sectionArray.forEach((medication, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${medication.MedText} - ${medication.MedCount} ${medication.Dosage}`;

    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.paddingLeft = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = medication.IsChecked;
    checkbox.id = `medicationsCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      sectionArray[itemIndex].IsChecked = event.target.checked;
    });
    wrapper.appendChild(checkbox);

    const deleteBtn = deleteButton(sectionArray, index, sectionList, key);
    wrapper.appendChild(deleteBtn);

    listItem.appendChild(wrapper);

    sectionList.appendChild(listItem);
  });
};

// ---------- Exercises  ---------- //

function addExerciseItem(
  sectionArray,
  inputItem,
  count,
  addBtn,
  sectionList,
  key
) {
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newExerciseInput = inputItem.value.trim();
    const newRepCount = count.value;

    if (newExerciseInput && newRepCount > 0) {
      let exerciseObject = {
        Exercise: newExerciseInput,
        RepCount: newRepCount,
        IsChecked: false,
      };

      sectionArray.push(exerciseObject);
      dailyEntryObj.exercises.push(exerciseObject);
      localStorage.setItem(key, JSON.stringify(sectionArray));

      updateExerciseList(dailyEntryObj.exercises, sectionList, key);
      inputItem.value = "";
      count.value = "";
    }
  });
}

const updateExerciseList = (sectionArray, sectionList, key) => {
  sectionList.textContent = "";

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.Exercise} - Reps: ${updatedItem.RepCount}`;

    // Create wrapper for checkbox to allow for styling
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.paddingLeft = "10px";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `exercisesCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.checked = updatedItem.IsChecked;

    // Check if dailyEntryObj is available and the current item is in it
    if (dailyEntryObj && dailyEntryObj.exercises) {
      const foundItem = dailyEntryObj.exercises.find(
        (item) => item.Exercise === updatedItem.Exercise
      );
      if (foundItem) {
        checkbox.checked = foundItem.IsChecked;
      }
    }

    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      sectionArray[itemIndex].IsChecked = event.target.checked;
    });
    wrapper.appendChild(checkbox);

    let deleteBtn = deleteButton(sectionArray, index, sectionList, key);
    wrapper.appendChild(deleteBtn);

    newItem.appendChild(wrapper);

    sectionList.appendChild(newItem);
  });
};

// ---------- Habits ---------- //

function addHabitItem(sectionArray, inputItem, addBtn, sectionList, key) {
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newHabitInput = inputItem.value.trim();

    if (newHabitInput) {
      let habitObject = {
        Habit: newHabitInput,
        IsChecked: false,
      };

      sectionArray.push(habitObject);
      dailyEntryObj.habits.push(habitObject);

      localStorage.setItem(key, JSON.stringify(sectionArray));

      updateHabitList(dailyEntryObj.habits, sectionList, key);
      inputItem.value = "";
    }
  });
}

const updateHabitList = (sectionArray, sectionList, key) => {
  sectionList.textContent = "";

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.Habit}`;

    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.paddingLeft = "10px";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `habitsCheckbox${index}`;
    checkbox.className = "checkboxes";
    checkbox.checked = updatedItem.IsChecked;
    checkbox.dataset.index = index;
    checkbox.addEventListener("change", (event) => {
      const itemIndex = event.target.dataset.index;
      sectionArray[itemIndex].IsChecked = event.target.checked;
    });
    wrapper.appendChild(checkbox);

    let deleteBtn = deleteButton(sectionArray, index, sectionList, key);
    wrapper.appendChild(deleteBtn);

    newItem.appendChild(wrapper);

    sectionList.appendChild(newItem);
  });
};

// ---------- Weather ---------- //

let currentLat;
let currentLon;
let dataWeatherResultsSection = document.getElementById("weatherResults");
let dataWeatherResults;

async function fetchData(currentLat, currentLon) {
  if (currentLat === undefined || currentLon === undefined) {
    setTimeout(() => fetchData(currentLat, currentLon), 1000);
    return;
  }

  const weatherAPIKey = "f8c05dc88b6f863790f21354538cb343";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${weatherAPIKey}`;

  try {
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`);
    }

    const data = await response.json();

    const dataCity = data.name;
    const dataTemp = Math.round(data.main.temp - 273.15).toFixed(0);
    const dataFeelsLike = Math.round(data.main.feels_like - 273.15).toFixed(0);
    const dataDescription = data.weather[0].description;
    const dataWeatherIcon = data.weather[0].icon;
    const dataWeatherUrl = `https://openweathermap.org/img/wn/${dataWeatherIcon}.png`;

    dataWeatherResults = `Temperature: ${dataTemp}\u00B0C\nFeels Like: ${dataFeelsLike}\u00B0C\n`;

    const weatherIconElementDiv = document.createElement("div");
    weatherIconElementDiv.className = "weather-icon-div";
    const weatherIconElement = document.createElement("img");
    weatherIconElement.src = dataWeatherUrl;
    weatherIconElement.className = "weatherIconElement";
    weatherIconElement.style.padding = "5px";
    const radialGradientBackground =
      "radial-gradient(ellipse, #b298dc, #b298dc, transparent)";
    weatherIconElement.style.background = radialGradientBackground;
    weatherIconElement.style.borderRadius = "100%";

    weatherIconElement.style.minHeight = "3rem";
    weatherIconElement.title = dataDescription;

    const dataCityElement = document.getElementById("locationResults");
    dataCityElement.textContent = dataCity;

    dataWeatherResultsSection.innerHTML = "";

    weatherIconElementDiv.appendChild(weatherIconElement);
    dataWeatherResultsSection.append(dataWeatherResults);
    dataWeatherResultsSection.append(weatherIconElementDiv);

    return dataWeatherResults;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// --------- Function Execution, Event Handling, & Form Submission --------- //

function populateForm(targetDate) {
  try {
    dateElement.value = targetDate;

    let foundEntry = entriesArray.find((entry) => entry.date === targetDate);

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
      targetDate = date;
      journalInput.value = journal;
      if (isFlagged) {
        flagButton.classList.add("flagged");
        newObjIsFlagged = true;
      } else {
        flagButton.classList.remove("flagged");
        newObjIsFlagged = false;
      }
      dataWeatherResultsSection.textContent = weather;
      reverseRadioValue("emotionTracker", emotionTracker);
      reverseRadioValue("waterTracker", waterTracker);
      updateMedList(medications, medList);
      updateExerciseList(exercises, exerciseList, exKey);
      updateHabitList(habits, habitList, habKey);
      dailyEntryObj = foundEntry;
    } else {
      form.reset();
      dateElement.value = formattedDate;

      updateMedList([...medicationsArray], medList, medKey);
      updateExerciseList([...exercisesArray], exerciseList, exKey);
      updateHabitList([...habitsArray], habitList, habKey);
      fetchData(currentLat, currentLon);
      newObjIsFlagged = false;
      flag.classList.remove("flagged");

      let checkboxes = document.querySelectorAll('input[type = "checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      dailyEntryObj = {
        date: targetDate,
        weather: dataWeatherResultsSection.textContent,
        journal: "",
        isFlagged: newObjIsFlagged,
        emotionTracker: "",
        waterTracker: "",
        medications: [...medicationsArray],
        exercises: [...exercisesArray],
        habits: [...habitsArray],
      };
    }
  } catch (error) {
    console.error("Error in populating form", error);
  }
}

// ---------- Call Functions ---------- //

fetchData(currentLat, currentLon);

addMedItem(
  medicationsArray,
  medInput,
  countInput,
  addMedBtn,
  medList,
  medKey,
  dosageElement
);

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (journalInput.value.length !== 0) {
    await fetchData(currentLat, currentLon);

    dailyEntryObj.date = formattedDate;
    dailyEntryObj.weather = dataWeatherResults;
    dailyEntryObj.journal = journalInput.value;
    dailyEntryObj.isFlagged = newObjIsFlagged;
    dailyEntryObj.emotionTracker = radioValue("emotionTracker");
    dailyEntryObj.waterTracker = radioValue("waterTracker");

    // Search for existing entry with the same date
    const existingEntryIndex = entriesArray.findIndex(
      (entry) => entry.date === formattedDate
    );

    if (existingEntryIndex !== -1) {
      // Replace existing entry with the adjusted one
      entriesArray[existingEntryIndex] = dailyEntryObj;
    } else {
      // Add new entry to entriesArray
      entriesArray.push(dailyEntryObj);
    }

    // Save updated entriesArray to local storage
    localStorage.setItem(entriesKey, JSON.stringify(entriesArray));

    submitMessage.innerText = "Entry Saved!";
  } else {
    submitMessage.innerText = "Journal Entry Empty - Cannot Submit";
  }
});

function clearList(sectionArray, listId, key) {
  let list = document.getElementById(listId);

  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    sectionArray.splice(0, sectionArray.length);

    localStorage.setItem(key, JSON.stringify(sectionArray));

    if (listId === "medList") {
      updateMedList([...medicationsArray], medList, medKey);
    } else if (listId === "exerciseList") {
      updateExerciseList([...exercisesArray], exerciseList, exKey);
    } else if (listId === "habitList") {
      updateHabitList([...habitsArray], habitList, habKey);
    } else {
      console.log("List ID not recognized");
    }
    console.log("Section Array: ", sectionArray);
  } else {
    console.error("List with ID " + listId + " not found.");
  }
}

document.getElementById("deleteAllMeds").addEventListener("click", function () {
  clearList(medicationsArray, "medList", medKey);
});

document
  .getElementById("deleteAllExercises")
  .addEventListener("click", function () {
    clearList(exercisesArray, "exerciseList", exKey);
  });

document
  .getElementById("deleteAllHabits")
  .addEventListener("click", function () {
    clearList(habitsArray, "habitList", habKey);
  });
