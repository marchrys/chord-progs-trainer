const levels = [
  {
    id: 1,
    description: {
      en: 'Tonic, subdominant and dominant',
      fr: 'Tonique, sous-dominante et dominante'
    },
    order: 1,
    inLite: true,
    chordIds: [1, 4, 5],
    phrases: [
      [1, 4, 1, 5, 1],
      [1, 5, 1, 4, 1],
      [1, 4, 5, 1, 5],
      [1, 5, 1, 4, 5],
    ]
  },
  {
    id: 2,
    description: {
      en: 'Submediant',
      fr: 'Sus-dominante'
    },
    order: 2,
    inLite: false,
    chordIds: [1, 4, 5, 6],
    phrases: [
      [1, 6, 4, 5, 1],
      [1, 6, 4, 5, 6],
      [1, 4, 1, 5, 6],
      [1, 5, 6, 4, 5],
    ]
  },
];

