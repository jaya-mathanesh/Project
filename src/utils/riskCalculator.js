const riskColors = {
  LOW: '#35d08b',
  CAUTION: '#f4c95d',
  DANGER: '#f28c45',
  'EXTREME DANGER': '#f05252',
  SEVERE: '#a92f4d',
}

export function getRiskLevel(index) {
  if (index < 28) return 'LOW'
  if (index < 30) return 'CAUTION'
  if (index < 32) return 'DANGER'
  if (index < 35) return 'EXTREME DANGER'
  return 'SEVERE'
}

export function getRiskColor(level) {
  return riskColors[level] || riskColors.CAUTION
}
