const healthImpacts = {
  LOW: {
    possibleEffects: ['Warmth or mild discomfort'],
    exposure: 'Low',
    meaning: 'Heat-related discomfort is less likely, but it is still a good idea to drink water.',
  },
  CAUTION: {
    possibleEffects: ['Increased sweating', 'Fatigue', 'Mild dehydration', 'Headache'],
    exposure: 'Moderate',
    meaning: 'Increased ambient heat may cause fatigue and increased sweating.',
  },
  DANGER: {
    possibleEffects: ['Heavy sweating', 'Tiredness', 'Dizziness', 'Dehydration'],
    exposure: 'High',
    meaning: 'Long periods in the heat may increase tiredness and the chance of dehydration.',
  },
  'EXTREME DANGER': {
    possibleEffects: ['Heavy sweating', 'Weakness', 'Dizziness', 'Headache'],
    exposure: 'Very high',
    meaning: 'Prolonged heat exposure may be difficult to tolerate. Reduce outdoor activity and take cooling breaks.',
  },
  SEVERE: {
    possibleEffects: ['Heavy sweating', 'Weakness', 'Dizziness', 'Dehydration'],
    exposure: 'Very high',
    meaning: 'Very high heat stress is indicated. Limit outdoor exposure and move to a cooler place if feeling unwell.',
  },
}

export const peopleNeedingExtraCare = [
  'Elderly people',
  'Children',
  'Outdoor workers',
  'People doing strenuous physical activity',
]

export function getHealthImpact(riskLevel) {
  return healthImpacts[riskLevel] || healthImpacts.CAUTION
}
