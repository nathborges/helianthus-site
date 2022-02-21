const weekdata = {
  labels: [],
  datasets: [{
    type: 'line',
    label: 'Tensão',
    data: [127, 140, 127, 100, 127, 100],
    borderColor: '#4D75B8',
    yAxisID: 'volts',
    fill: true,
    backgroundColor: createGradientBlue,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  },
  {
    type: 'line',
    label: 'Corrente',
    data: [5, 10, 5, 10, 2, 10],
    borderColor: '#EB5E00',
    fill: true,
    yAxisID: 'ampere',
    backgroundColor: createGradientOrange,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  },
  {
    type: 'line',
    label: 'Potência',
    data: [0, 300, 0, 0, 200, 0],
    borderColor: '#B966FF',
    yAxisID: 'power',
    fill: true,
    backgroundColor: createGradientPurple,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  }
  ]
}


const weekchartconfig = {

  data: weekdata,
  options: {
    layout: {
      padding: {
        left: 10,
        bottom: -3
      },
    },
    responsive: false,
    legend: {
      display: false
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    tooltip: {
      enabled: false,
      position: 'nearest'
    },
    scales: {
      xAxis: {
        grid: {
          display: true
        },
        ticks: {
          font: {
            family: "Inter Medium",
            size: "12px"
          },
          min: 0
        },
        autoSkip: true,
        maxTicksLimit: 4,
      },
      volts: {
        type: 'linear',
        position: 'left',
        stack: 'water',
        stackWeight: 1,
        offset: true,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          tickLength: 9
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return value + 'v'
          },
          font: {
            family: "Inter Medium",
            size: "12px"
          },
          stepSize: 5,
          suggestedMin: 0,
          suggestedMax: 120,
          maxTicksLimit: 4
        }
      },
      ampere: {
        type: 'linear',
        position: 'left',
        stack: 'water',
        stackWeight: 1,
        offset: true,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          tickLength: 9
        },
        ticks: {
          callback: function (value, index, values) {
            return value + 'A'
          },
          font: {
            family: "Inter Medium",
            size: "12px"
          },
          stepSize: 0.5,
          suggestedMin: 0.7,
          suggestedMax: 2,
          maxTicksLimit: 4
        }
      },
      power: {
        type: 'linear',
        position: 'left',
        stack: 'water',
        stackWeight: 1,
        offset: true,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          tickLength: 9
        },
        ticks: {
          callback: function (value, index, values) {
            return value + 'kWh'
          },
          font: {
            family: "Inter Medium",
            size: "12px"
          },
          min: 0,
          stepSize: 0.25,
          maxTicksLimit: 4
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          externalTooltipHandler(context)
          changeHourToDate()
        }
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'vertical',
          scaleID: 'power',
          borderColor: 'rgba(204,204,204,0.9)',
          borderWidth: 1,
          value: 0,
        }, {
          type: 'line',
          mode: 'vertical',
          scaleID: 'ampere',
          borderColor: 'rgba(204,204,204,0.9)',
          borderWidth: 1,
          value: 0,
        }, {
          type: 'line',
          mode: 'vertical',
          scaleID: 'volts',
          borderColor: 'rgba(204,204,204,0.9)',
          borderWidth: 1,
          value: 0,
        }]
      }
    }
  }
}

const chartElementWeek = document.getElementById('weekly-chart').getContext("2d")
const chartWeek = new Chart(chartElementWeek, weekchartconfig);

window.addEventListener('load', function () {
  getWeekTimeMetrics('week');
  getWeekPowerMetrics('week');
  getWeekCurrentMetrics('week');
  getWeekVoltageMetrics('week');
})

function getWeekAverages(data) {
  let averages = data.averages
  return averages
}

function getWeekTimeMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  loadData(url)
    .then((data) => getWeekAverages(data))
    .then((averages) => setTimeOnWeekChart(averages))
}

function setTimeOnWeekChart(data) {
  chartWeek.data.labels = []
  data.forEach(element => {
    let dateTime = new Date(element.time);
    let time = dateTime.toLocaleDateString('en-GB', { month: 'numeric', day: 'numeric' })
    chartWeek.data.labels.push(time)
  });
  chartWeek.update()
}

function getWeekPowerMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getWeekAverages(data))
    .then((averages) => setPowerOnWeekChart(averages))
}

function setPowerOnWeekChart(data) {
  chartWeek.data.datasets[2].data = []
  data.forEach(element => {
    let powerElement = Math.round(element.power)
    powerElement = (powerElement / 1000)
    chartWeek.data.datasets[2].data.push(powerElement)
  });
  chartWeek.update()
}

function getWeekCurrentMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getWeekAverages(data))
    .then((averages) => setCurrentOnWeekChart(averages));
}

function setCurrentOnWeekChart(data) {
  chartWeek.data.datasets[1].data = []
  data.forEach(element => {
    let currentElement = element.current.toFixed(2)
    chartWeek.data.datasets[1].data.push(currentElement);
  });
  chartWeek.update();
}

function getWeekVoltageMetrics(interval) {
  deviceid = sessionStorage.getItem('device');
  let url = generatorUrlPath(deviceid, interval);
  let arrayofaverages = loadData(url)
    .then((data) => getWeekAverages(data))
    .then((averages) => setVoltageOnWeekChart(averages));
}

function setVoltageOnWeekChart(data) {
  chartWeek.data.datasets[0].data = []
  data.forEach(element => {
    let voltageElement = element.voltage;
    chartWeek.data.datasets[0].data.push(voltageElement);
  });
  chartWeek.update();
}


