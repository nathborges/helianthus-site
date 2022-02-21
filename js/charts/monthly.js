const datamonthly = {
  labels: [],
  datasets: [{
    type: 'line',
    label: 'Tensão',
    data: [],
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
    data: [],
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
    data: [],
    borderColor: '#B966FF',
    yAxisID: 'power',
    fill: true,
    backgroundColor: createGradientPurple,
    elements: {
      line: {
        borderWidth: 2
      }
    },
    spanGaps: true,
  }
  ]
}

const monthchartconfig = {
  data: datamonthly,
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
          autoSkip: true,
          maxTicksLimit: 30,
          maxRotation: 0,
        }
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
          // Include a dollar sign in the ticks
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
const chartElementMonth = document.getElementById('monthly-chart').getContext("2d")
const chartMonth = new Chart(chartElementMonth, monthchartconfig);

window.addEventListener('load', function () {
  getMonthTimeMetrics('month')
  getMonthPowerMetrics('month')
  getMonthCurrentMetrics('month')
  getMonthVoltageMetrics('month')
})

function getMonthAverages(data) {
  let averages = data.averages
  return averages
}

function getMonthTimeMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getMonthAverages(data))
    .then((averages) => setMonthTimeOnChart(averages))
}


function setMonthTimeOnChart(data) {
  chartMonth.data.labels = []
  data.forEach(element => {
    let dateTime = new Date(element.time);
    let time = dateTime.toLocaleDateString('en-GB', { month: 'numeric', day: 'numeric' })
    chartMonth.data.labels.push(time)
  });
}

function getMonthPowerMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getMonthAverages(data))
    .then((averages) => setMonthPowerOnChart(averages))
}

function setMonthPowerOnChart(data) {
  chartMonth.data.datasets[2].data = []
  data.forEach(element => {
    let powerElement = Math.round(element.power)
    powerElement = (powerElement / 1000)
    chartMonth.data.datasets[2].data.push(powerElement)
  });
  chartMonth.update()
}

function getMonthCurrentMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getMonthAverages(data))
    .then((averages) => setCurrentOnChart(averages));
}

function setCurrentOnChart(data) {
  chartMonth.data.datasets[1].data = []
  data.forEach(element => {
    let currentElement = element.current.toFixed(2)
    chartMonth.data.datasets[1].data.push(currentElement);
  });
  chartMonth.update();
}

function getMonthVoltageMetrics(interval) {
  deviceid = sessionStorage.getItem('device');
  let url = generatorUrlPath(deviceid, interval);
  let arrayofaverages = loadData(url)
    .then((data) => getMonthAverages(data))
    .then((averages) => setVoltageOnChart(averages));
}

function setVoltageOnChart(data) {
  chartMonth.data.datasets[0].data = []
  data.forEach(element => {
    let voltageElement = Math.round(element.voltage)
    chartMonth.data.datasets[0].data.push(voltageElement);
  });
  chartMonth.update();
}


