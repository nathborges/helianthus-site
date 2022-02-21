const createGradientPurple = () => {
  const chartId = document.getElementById('diary-chart').getContext('2d')
  const gradientPurple = chartId.createLinearGradient(0, 50, 0, 90)
  gradientPurple.addColorStop(0, 'rgba(185, 102, 255, 0.18)')
  gradientPurple.addColorStop(1, 'rgba(185, 102, 255, 0)')
  return gradientPurple
}

const createGradientOrange = () => {
  const chartId = document.getElementById('diary-chart').getContext('2d')
  const gradientOrange = chartId.createLinearGradient(0, 150, 0, 190)
  gradientOrange.addColorStop(0, 'rgba(235, 94, 0, 0.18)')
  gradientOrange.addColorStop(1, 'rgba(235, 94, 0, 0)')
  return gradientOrange
}

const createGradientBlue = () => {
  const chartId = document.getElementById('diary-chart').getContext('2d')
  const gradientBlue = chartId.createLinearGradient(0, 250, 0, 300)
  gradientBlue.addColorStop(0, 'rgba(77, 117, 184, 0.18)')
  gradientBlue.addColorStop(1, 'rgba(77, 117, 184, 0)')
  return gradientBlue
}
