const nav = document.getElementById('all-charts-container-nav')

function resetButton() {
  const allButtons = nav.getElementsByTagName('LI')

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.backgroundColor = 'transparent'
    allButtons[i].style.borderRight = '0px transparent'
    allButtons[i].style.borderWidth = '0px'
    allButtons[i].style.marginLeft = '20px'
  }
};

function paintButton(button) {
  button.style.backgroundColor = '#CCCCCC'
  button.style.borderRadius = '9.5px'
  button.style.border = '2px solid #CCCCCC'
  button.style.borderRight = '9px solid #CCCCCC'
  button.style.borderLeft = '11px solid #CCCCCC'
  button.style.marginLeft = '10px'
};

function showAndHideCanvas(elementCanvaId, displayconfig) {
  var chartElement = document.getElementById(elementCanvaId)
  chartElement.style.display = displayconfig
}

function hideAllCanvas() {
  const allCanvas = document.getElementsByTagName('canvas')
  for (let i = 0; i < allCanvas.length; i++) {
    allCanvas[i].style.display = 'none'
  }
}

function buttonsSwitchActions(button) {
  switch (button) {
    case 'Diário':
      hideAllCanvas()
      showAndHideCanvas('diary-chart', 'inline-block')
      showAndCalculateEstimatePrice('day')
      getAndSetSumPower('day')
      break

    case 'Semanal':
      hideAllCanvas()
      showAndHideCanvas('weekly-chart', 'inline-block')
      showAndCalculateEstimatePrice('week')
      getAndSetSumPower('week')
      break

    case 'Mensal':
      hideAllCanvas()
      showAndHideCanvas('monthly-chart', 'inline-block')
      showAndCalculateEstimatePrice('month')
      getAndSetSumPower('month')

      break
  }
}

function buttonsDefault() {
  const buttonDiary = document.getElementById('diary-button')
  resetButton()
  paintButton(buttonDiary)
  hideAllCanvas()
  showAndHideCanvas('diary-chart', 'initial')
  showAndCalculateEstimatePrice('day')
  getAndSetSumPower('day')
}

function buttonsActions() {
  nav.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'LI'
    if (!isButton) {
      return
    };

    const buttonElement = document.getElementById(event.target.id)

    resetButton()
    paintButton(buttonElement)
    buttonsSwitchActions(buttonElement.textContent)
  })
};

window.addEventListener('load', function () {
  buttonsDefault()
  buttonsActions()
})


function changeHourToDate() {
  let element = document.querySelector('.hourTitle')
  element.innerHTML = 'Data'
}