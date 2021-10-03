const levels = [
  {
    id: 1,
    description: {
      en: 'I or i, IV or iv and V',
      fr: 'I ou i, IV ou iv et V'
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
      en: 'vi or bVI',
      fr: 'vi ou bVI'
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
  {
    id: 3,
    description: {
      en: 'ii or ii&deg;',
      fr: 'ii ou ii&deg;'
    },
    order: 3,
    inLite: false,
    chordIds: [1, 2, 4, 5, 6],
    phrases: [
      [1, 6, 4, 2, 5],
      [1, 6, 2, 5, 1],
      [1, 6, 2, 5, 6],
      [1, 4, 2, 5, 1],
      [1, 4, 2, 5, 6],
      [1, 2, 5, 1, 5],
    ]
  },
];

