const getOrCreateTooltip = (chart) => {
    let tooltipEL = chart.canvas.parentNode.querySelector('div')
    if (!tooltipEL) {
      tooltipEL = document.createElement('DIV')
      tooltipEL.classList.add('tooltipDesign')
      tooltipUL = document.createElement('UL')
      tooltipUL.classList.add('tooltipul')
      tooltipEL.appendChild(tooltipUL)
  
      tooltipEL.appendChild(tooltipUL)
      chart.canvas.parentNode.appendChild(tooltipEL)
    }
    return tooltipEL
  }
  
  const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context
    const tooltipEL = getOrCreateTooltip(chart)
  
    if (tooltip.opacity === 0) {
      tooltipEL.style.opacity = 0
      return
    }
  
    if (tooltip.body) {
      const titleLines = tooltip.title || []
      const bodyLines = tooltip.body.map(b => b.lines)
      const tooltipLI = document.createElement('LI')
  
      titleLines.forEach(title => {
        tooltipUL.appendChild(tooltipLI)
        const tooltipSPAN = document.createElement('SPAN')
        tooltipSPAN.classList.add('spanHour')
        tooltipLI.appendChild(tooltipSPAN)
  
        const tooltipHour = document.createElement('SPAN')
        const tooltipHourText = document.createTextNode('Hora')
        tooltipHour.classList.add('hourTitle')
        tooltipHour.appendChild(tooltipHourText)
        tooltipSPAN.appendChild(tooltipHour)
  
        const tooltipTitleP = document.createElement('P')
        const tooltipTitle = document.createTextNode(title)
        tooltipTitleP.appendChild(tooltipTitle)
        tooltipSPAN.appendChild(tooltipTitleP)
      })
  
      bodyLines.forEach(body => {
        const tooltipBodySPAN = document.createElement('SPAN')
        tooltipBodySPAN.classList.add('spanValues')
        tooltipLI.appendChild(tooltipBodySPAN)
  
        body.forEach(bodyItem => {
          const bodyDivided = bodyItem.split(": ")
          const bodyLabelSpan = document.createElement('SPAN')
          const bodyValueP = document.createElement('p')
          const bodylabelText = document.createTextNode(bodyDivided[0])
          let medida = ' '
          const unit = bodyDivided[0]
          switch (unit) {
            case "Tensão":
              medida = 'v'
              tooltipBodySPAN.style.gridArea = 'tensao'
              tooltipBodySPAN.style.borderRight = '#C4C4C4 solid 1px'
              break
            case "Potência":
              medida = 'kWh'
              tooltipBodySPAN.style.gridArea = 'potencia'
              tooltipBodySPAN.style.borderTop = '#C4C4C4 solid 1px'
              bodyLabelSpan.style.marginTop = '7px'
              bodyValueP.style.fontSize = '18px'
              bodyValueP.style.marginBottom = '10px'
  
              break
            case "Corrente":
              medida = 'A'
              tooltipBodySPAN.style.gridArea = 'corrente'
              break
          };
  
          const bodyValueText = document.createTextNode(bodyDivided[1] + medida)
  
  
          bodyLabelSpan.appendChild(bodylabelText)
          bodyValueP.appendChild(bodyValueText)
  
          tooltipBodySPAN.appendChild(bodyLabelSpan)
          tooltipBodySPAN.appendChild(bodyValueP)
          tooltipLI.appendChild(tooltipBodySPAN)
        })
      })
  
      const ULnode = tooltipEL.querySelector('ul')
  
      while (ULnode.firstChild) {
        ULnode.firstChild.remove()
      }
  
      ULnode.appendChild(tooltipLI)
      tooltipEL.style.opacity = 1

      const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches

      if (isMobile) {
        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
        tooltipEL.style.left = tooltip.caretX - 10 + 'px'
      } else {
        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
        tooltipEL.style.left = positionX + tooltip.caretX - 50  + 'px'
      }
    }
  }