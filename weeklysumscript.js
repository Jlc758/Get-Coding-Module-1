let dateElement = document.getElementById("date");
let currentDate = new Date();
let timezoneOffset = currentDate.getTimezoneOffset();
currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
let formattedDate = currentDate.toISOString().slice(0, 10);

const weeklySumChartCanvas = document.getElementById("weeklySumChart");

const entriesKey = "entriesArray";
const entriesArray = JSON.parse(localStorage.getItem(entriesKey));
console.log("Entries Array: ", entriesArray);

const data = entriesArray.map((entry) => ({
  date: entry.date,
  emotionTracker: entry.emotiontracker,
  waterTracker: entry.waterTracker,
}));

const labels = data.map((entry) => entry.date);
const emotionsData = data.map((entry) => entry.emotionTracker);
const waterData = data.map((entry) => entry.waterTracker);

const chartData = {
  labels: labels,
  datasets: [
    {
      label: "Emotion Tracker",
      data: emotionsData,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Water Tracker",
      data: waterData,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const ctx = weeklySumChartCanvas.getContext("2d");

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const weeklySumChart = new Chart(ctx, {
  type: "line",
  data: chartData,
  options: options,
});
