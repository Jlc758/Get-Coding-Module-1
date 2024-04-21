// localStorage.clear();
let dateElement = document.getElementById("date");
let currentDate = new Date();

let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);

let formattedDate = currentDate.toISOString().slice(0, 10);

console.log("Formatted Date: ", formattedDate);

console.log("Date Element: ", dateElement.value);

let previousDate = new Date(currentDate);
previousDate.setDate(currentDate.getDate() - 3);
let twoDaysAgo = previousDate.toISOString().slice(0, 10);

console.log("Two Days ago: ", twoDaysAgo);

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

const exerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");
const repCount = document.getElementById("repCount");

const habitInput = document.getElementById("newHabit");
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
      "Entries Array",
      entriesArray,
      "Meds DEO",
      dailyEntryObj.medications,
      "MedArray",
      medicationsArray,
      "Ex DEO",
      dailyEntryObj.exercises,
      "ExercisesArray",
      exercisesArray,
      "Hab DEO",
      dailyEntryObj.habits,
      "HabitsArray",
      habitsArray
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
  console.log("Refreshed location");
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
    // update formattedDate when the user changes the date
    let selectedDate = new Date(dateElement.value);
    formattedDate = selectedDate.toISOString().slice(0, 10);
    let submit = document.getElementById("submitButton");
    let emotionTracker = document.getElementById("emotionTracker");
    let waterTracker = document.getElementById("waterTracker");
    // let checkboxes = document.getElementsByClassName("checkboxes");

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
      // for (let i = 0; i < checkboxes.length; i++) {
      //   checkboxes[i].style.display = "none";
      // }
    } else {
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
    sectionArray.splice(index, 1); //delete using index
    console.log("section array spliced:", sectionArray);

    localStorage.setItem(key, JSON.stringify(sectionArray));

    if (listElement.id === "medList") {
      updateMedList(sectionArray, listElement);
    } else if (listElement.id === "exerciseList") {
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

function addMedItem(sectionArray, inputItem, count, addBtn, sectionList, key) {
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newMedItemValue = inputItem.value.trim();
    const newMedCountValue = count.value;

    if (newMedItemValue && newMedCountValue > 0) {
      const newMedObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
        IsChecked: false,
      };

      //! Update Local Storage state
      sectionArray.push({ ...newMedObject, IsChecked: false }); //! Ensure IsChecked is false
      localStorage.setItem(key, JSON.stringify(sectionArray));

      //! Reflect changes in the DOM by using the array from D.E.O.
      updateMedList(dailyEntryObj.medications, sectionList);
      inputItem.value = "";
      count.value = "";
    }
  });
}

const updateMedList = (sectionArray, sectionList, key) => {
  sectionList.textContent = ""; // Clear existing list
  sectionArray.forEach((medication, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${medication.MedText} - Count: ${medication.MedCount}`;

    // Create wrapper for checkbox to allow for styling
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.paddingLeft = "10px";

    // Create and append the checkbox
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

    // Create and append the delete button
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

      localStorage.setItem(key, JSON.stringify(sectionArray));

      updateExerciseList(sectionArray, sectionList, key);
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

      localStorage.setItem(key, JSON.stringify(sectionArray));

      updateHabitList(sectionArray, sectionList, key);
      inputItem.value = "";
    }
  });
}

const updateHabitList = (sectionArray, sectionList, key) => {
  sectionList.textContent = "";

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.Habit}`;

    // Create wrapper for checkbox to allow for styling
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
    const dataTemp = Math.round(data.main.temp - 273.15).toFixed(0);
    const dataFeelsLike = Math.round(data.main.feels_like - 273.15).toFixed(0);
    const dataDescription = data.weather[0].description;
    const dataWeatherIcon = data.weather[0].icon;
    const dataWeatherUrl = `https://openweathermap.org/img/wn/${dataWeatherIcon}.png`;

    // Handle the retrieved data
    dataWeatherResults = `Temperature: ${dataTemp}\u00B0C\nFeels Like: ${dataFeelsLike}\u00B0C\n`;

    // Create img element for the weather icon
    const weatherIconElement = document.createElement("img");
    weatherIconElement.src = dataWeatherUrl;
    weatherIconElement.className = weatherIconElement;
    weatherIconElement.style.padding = "5px";
    const radialGradientBackground =
      "radial-gradient(ellipse, #b298dc, #b298dc, transparent)";
    weatherIconElement.style.background = radialGradientBackground;
    weatherIconElement.style.borderRadius = "100%";
    weatherIconElement.style.marginTop = "1em";
    weatherIconElement.style.minHeight = "3rem";
    weatherIconElement.title = dataDescription;

    // Update DOM with City from API key-value pairs
    const dataCityElement = document.getElementById("locationResults");
    dataCityElement.textContent = dataCity;

    // const dataWeatherResults = dailyEntryObj.weather;

    // const dataWeatherResultsSection = document.getElementById("weatherResults");
    dataWeatherResultsSection.innerHTML = "";
    // dataWeatherResultsSection.textContent = dailyEntryObj.weather;
    // ? dataWeatherResults
    // : "Past Entry - No Weather Data Available";

    // Append icon img to weather results
    dataWeatherResultsSection.append(dataWeatherResults);
    dataWeatherResultsSection.append(weatherIconElement);

    return dataWeatherResults;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    throw error;
  }
}

// --------- Function Execution, Event Handling, & Form Submission --------- //

function populateForm(targetDate) {
  try {
    dateElement.value = targetDate;
    // let foundEntry = entriesArray.find(
    //   (entry) => entry.date === targetDate && journalInput.value.length > 0
    // );

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

      console.log("Found Entry", foundEntry);
    } else {
      form.reset();
      dateElement.value = formattedDate;
      console.log("Empty Entry");

      updateMedList(medicationsArray, medList);
      updateExerciseList(exercisesArray, exerciseList, exKey);
      updateHabitList(habitsArray, habitList, habKey);
      fetchData(currentLat, currentLon);
      newObjIsFlagged = false;
      flag.classList.remove("flagged");

      let checkboxes = document.querySelectorAll('input[type = "checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      //! initialize the arrays for a new form as the local storage arrays
      dailyEntryObj = {
        date: targetDate,
        weather: dataWeatherResultsSection.textContent,
        journal: "",
        isFlagged: newObjIsFlagged,
        emotionTracker: "",
        waterTracker: "",
        medications: medicationsArray,
        exercises: exercisesArray,
        habits: habitsArray,
      };
    }
  } catch (error) {
    console.error("Error in populating form", error);
  }
}

// ---------- Call Functions ---------- //

fetchData(currentLat, currentLon);

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

let submitMessage = document.getElementById("submitMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (journalInput.value.length !== 0) {
    await fetchData(currentLat, currentLon);

    //! on submit you can directly assign to the previously set values, note that the arrays are not here as they have already been set in their update functions.
    dailyEntryObj.date = formattedDate;
    dailyEntryObj.weather = dataWeatherResults;
    dailyEntryObj.journal = journalInput.value;
    dailyEntryObj.isFlagged = newObjIsFlagged;
    dailyEntryObj.emotionTracker = radioValue("emotionTracker");
    dailyEntryObj.waterTracker = radioValue("waterTracker");

    entriesArray.push(dailyEntryObj);
    localStorage.setItem(entriesKey, JSON.stringify(entriesArray));

    console.log("Form Submitted: ", dailyEntryObj);
    console.log(
      "DEO",
      dailyEntryObj,
      "Meds",
      dailyEntryObj.medications,
      "MedArray",
      medicationsArray,
      "Ex",
      dailyEntryObj.exercises,
      "ExercisesArray",
      exercisesArray,
      "Hab",
      dailyEntryObj.habits,
      "HabitsArray",
      habitsArray
    );

    submitMessage.innerText = "Entry Saved!";

    console.log("Flagged Entries: ");
  } else {
    submitMessage.innerText = "Journal Entry Empty - Cannot Submit";
  }
});

// --------- Lock Down Entries +2 Days Old ---------- //
