// let dateElement = document.getElementById("date");
// let currentDate = new Date();
// let timezoneOffset = currentDate.getTimezoneOffset();
// currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
// let formattedDate = currentDate.toISOString().slice(0, 10);

// const weeklySumChartCanvas = document.getElementById("weeklySumChart");

// const entriesKey = "entriesArray";
// const entriesArray = JSON.parse(localStorage.getItem(entriesKey));
// console.log("Entries Array: ", entriesArray);
const ctx = document.getElementById("myChart");

new Chart(ctx, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Moodlet",
        data: [1, 2, 3, 4, 5],
      },
      {
        type: "line",
        label: "Water Level",
        data: [8, 16, 24, 32, 50],
      },
    ],
    labels: ["8oz", "16oz", "24oz", "32oz", "30oz+"],
  },
});
