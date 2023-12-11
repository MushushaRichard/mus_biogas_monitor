document.addEventListener('DOMContentLoaded', function () {
  const sensorDataElement = document.getElementById('sensorData');
  const chartCanvas = document.getElementById('chart').getContext('2d');
  let historicalData = { methane: [], temperature: [], humidity: [] };

  // Initialize chart
  const chart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Methane Concentration',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: [],
          fill: false,
        },
        {
          label: 'Temperature',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: [],
          fill: false,
        },
        {
          label: 'Humidity',
          borderColor: 'rgba(255, 206, 86, 1)',
          data: [],
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          title: {
            display: true,
            text: 'Values',
          },
        },
      },
    },
  });

  function fetchData() {
    // Simulate data received from the API
    const simulatedData = {
      methane: getRandomInt(500, 1000),
      temperature: getRandomInt(20, 30),
      humidity: getRandomInt(40, 60),
      methaneStatus: getRandomStatus(),
      temperatureStatus: getRandomStatus(),
      humidityStatus: getRandomStatus(),
    };

    // Update the HTML with the simulated data
    const methaneConcentration = simulatedData.methane;
    const temperature = simulatedData.temperature;
    const humidity = simulatedData.humidity;
    const methaneStatus = simulatedData.methaneStatus;
    const temperatureStatus = simulatedData.temperatureStatus;
    const humidityStatus = simulatedData.humidityStatus;

    sensorDataElement.innerHTML = `
      <p>Methane Concentration: ${methaneConcentration} (${methaneStatus})</p>
      <p>Temperature: ${temperature} °C (${temperatureStatus})</p>
      <p>Humidity: ${humidity} % (${humidityStatus})</p>
    `;

    // Update historical data for the chart
    const timestamp = new Date().toLocaleTimeString();
    historicalData.methane.push({ x: timestamp, y: methaneConcentration });
    historicalData.temperature.push({ x: timestamp, y: temperature });
    historicalData.humidity.push({ x: timestamp, y: humidity });

    // Keep the chart data within the last 10 entries for better visualization
    if (historicalData.methane.length > 10) {
      historicalData.methane.shift();
      historicalData.temperature.shift();
      historicalData.humidity.shift();
    }

    // Update the chart with the latest data
    chart.data.labels = historicalData.methane.map(entry => entry.x);
    chart.data.datasets[0].data = historicalData.methane.map(entry => entry.y);
    chart.data.datasets[1].data = historicalData.temperature.map(entry => entry.y);
    chart.data.datasets[2].data = historicalData.humidity.map(entry => entry.y);
    chart.update();
  }

  // Fetch data initially
  fetchData();

  // Fetch data every 5 seconds (adjust as needed)
  setInterval(fetchData, 5000);

  // Helper function to generate a random integer within a specified range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to simulate random status (Normal or Warning)
  function getRandomStatus() {
    return Math.random() < 0.5 ? 'Normal' : 'Warning';
  }
});
