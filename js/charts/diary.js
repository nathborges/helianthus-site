const datadiary = {
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

const daychartconfig = {
  data: datadiary,
  options: {
    layout: {
      padding: {
        left: 10,
        bottom: -7
      },
    },
    responsive: false,
    maintainAspectRatio: false,
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
            size: "11px"
          },
          autoSkip: true,
          maxTicksLimit: 48,
          min: 0,
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
          tickLength: 9,
        },
        ticks: {
          callback: function (value, index, values) {
            return value + 'v'
          },
          font: {
            family: "Inter Medium",
            size: "12px"
          },
          stepSize: 5,
          min: 0,
          suggestedMax: 120,
          maxTicksLimit: 4,
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
          min: 0,
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
          stepSize: 0.25,
          maxTicksLimit: 4,
          suggestedMin: 0
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler
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

const chartDayElement = document.getElementById('diary-chart').getContext("2d")
const chartDay = new Chart(chartDayElement, daychartconfig)

window.addEventListener('load', function () {
  getDayTimeMetrics('day')
  getDayPowerMetrics('day')
  getDayCurrentMetrics('day')
  getDayVoltageMetrics('day')
})

function getDayAverages(data) {
  let averages = data.averages
  return averages
}

function getDayTimeMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getDayAverages(data))
    .then((averages) => setDayTimeOnChart(averages))
}


function setDayTimeOnChart(data) {
  chartDay.data.labels = []
  data.forEach(element => {
    let dateTime = new Date(element.time)
    let time = dateTime.toLocaleTimeString('en-GB', { timeStyle: 'short' })
    chartDay.data.labels.push(time)
  })
}

function getDayPowerMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getDayAverages(data))
    .then((averages) => setDayPowerOnChart(averages))
}

function setDayPowerOnChart(data) {
  chartDay.data.datasets[2].data = []
  data.forEach(element => {
    let powerElement = Math.round(element.power)
    powerElement = (powerElement / 1000)
    chartDay.data.datasets[2].data.push(powerElement)
  })
  chartDay.update()
}

function getDayCurrentMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getDayAverages(data))
    .then((averages) => setDayCurrentOnChart(averages))
}

function setDayCurrentOnChart(data) {
  chartDay.data.datasets[1].data = []
  data.forEach(element => {
    let currentElement = element.current.toFixed(2)
    chartDay.data.datasets[1].data.push(currentElement)
  })
  chartDay.update()
}

function getDayVoltageMetrics(interval) {
  deviceid = sessionStorage.getItem('device')
  let url = generatorUrlPath(deviceid, interval)
  let arrayofaverages = loadData(url)
    .then((data) => getDayAverages(data))
    .then((averages) => setDayVoltageOnChart(averages))
}

function setDayVoltageOnChart(data) {
  chartDay.data.datasets[0].data = []
  data.forEach(element => {
    let voltageElement = element.voltage.toFixed(2)
    chartDay.data.datasets[0].data.push(voltageElement)
  })
  chartDay.update()
}
