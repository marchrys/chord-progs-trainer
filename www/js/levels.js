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
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 2,
    description: {
      en: 'vi or bVI',
      fr: 'vi ou bVI'
    },
    order: 2,
    inLite: true,
    chordIds: [1, 4, 5, 6],
    phrases: [
      [1, 6, 4, 5, 1],
      [1, 6, 4, 5, 6],
      [1, 4, 1, 5, 6],
      [1, 5, 6, 4, 5],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 3,
    description: {
      en: 'ii or ii&deg;',
      fr: 'ii ou ii&deg;'
    },
    order: 3,
    inLite: true,
    chordIds: [1, 2, 4, 5, 6],
    phrases: [
      [1, 6, 4, 2, 5],
      [1, 6, 2, 5, 1],
      [1, 6, 2, 5, 6],
      [1, 4, 2, 5, 1],
      [1, 4, 2, 5, 6],
      [1, 2, 5, 1, 5],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 4,
    description: {
      en: 'iii',
      fr: 'iii'
    },
    order: 4,
    inLite: false,
    chordIds: [1, 2, 3, 4, 5, 6],
    phrases: [
      [1, 3, 4, 5, 1],
      [1, 3, 4, 5, 6],
      [1, 3, 4, 2, 5],
      [1, 3, 6, 4, 5],
      [1, 3, 6, 2, 5],
      [1, 6, 3, 4, 5],
      [1, 3, 5, 1, 5],
    ],
    scaleTypeIds: [1],
  },
  {
    id: 5,
    description: {
      en: 'Vsus4',
      fr: 'Vsus4'
    },
    order: 5,
    inLite: false,
    chordIds: [1, 2, 4, 5, 8, 6],
    phrases: [
      [1, 4, 8, 5, 1],
      [1, 4, 1, 8, 5], 
      [1, 6, 4, 8, 5],
      [1, 6, 2, 8, 5],
      [1, 4, 2, 8, 5],
      [1, 2, 8, 5, 1],
      [1, 2, 8, 5, 6],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 6,
    description: {
      en: 'V7',
      fr: 'V7'
    },
    order: 6,
    inLite: false,
    chordIds: [1, 2, 4, 5, 9, 6],
    phrases: [
      [1, 4, 9, 1, 5],
      [1, 4, 1, 9, 1], 
      [1, 9, 1, 4, 5], 
      [1, 6, 2, 9, 1],
      [1, 6, 2, 9, 6],
      [1, 4, 2, 9, 1],
      [1, 4, 2, 9, 6],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 7,
    description: {
      en: 'vi7 or bVI&Delta;7',
      fr: 'vi7 ou bVI&Delta;7'
    },
    order: 7,
    inLite: false,
    chordIds: [1, 2, 4, 5, 9, 6, 10],
    phrases: [
      [1, 10, 4, 2, 5],
      [1, 10, 4, 9, 1], 
      [1, 10, 4, 5, 6],
      [1, 10, 2, 9, 1],
      [1, 10, 2, 5, 6],
      [1, 5, 10, 4, 5],
      [1, 5, 10, 2, 5],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 8,
    description: {
      en: 'ii7 or ii&oslash;7',
      fr: 'ii7 ou ii&oslash;7'
    },
    order: 8,
    inLite: false,
    chordIds: [1, 11, 4, 5, 9, 6, 10],
    phrases: [
      [1, 10, 4, 11, 5],
      [1, 10, 11, 9, 1], 
      [1, 10, 11, 5, 6],
      [1, 4, 11, 9, 1], 
      [1, 4, 11, 5, 6],
      [1, 9, 10, 11, 5],
      [1, 11, 9, 1, 5],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 9,
    description: {
      en: 'V7/V',
      fr: 'V7/V'
    },
    order: 9,
    inLite: false,
    chordIds: [1, 12, 4, 5, 6],
    phrases: [
      [1, 6, 4, 12, 5],
      [1, 6, 12, 5, 1],
      [1, 6, 12, 5, 6],
      [1, 4, 12, 5, 1],
      [1, 4, 12, 5, 6],
      [1, 4, 1, 12, 5],
      [1, 4, 5, 12, 5],
    ],
    scaleTypeIds: [1, 2],
  },
  {
    id: 10,
    description: {
      en: 'V7/vi',
      fr: 'V7/vi'
    },
    order: 10,
    inLite: false,
    chordIds: [1, 2, 12, 13, 4, 5, 6],
    phrases: [
      [1, 13, 6, 4, 5],
      [1, 13, 6, 2, 5],
      [1, 13, 6, 12, 5],
      [1, 13, 4, 12, 5],
      [1, 13, 4, 5, 1],
      [1, 13, 4, 5, 6],
    ],
    scaleTypeIds: [1],
  },
  {
    id: 11,
    description: {
      en: 'V7/ii',
      fr: 'V7/ii'
    },
    order: 11,
    inLite: false,
    chordIds: [1, 2, 12, 4, 5, 6, 14],
    phrases: [
      [1, 14, 2, 5, 1],
      [1, 14, 2, 5, 6],
      [1, 14, 2, 12, 5],
      [1, 14, 12, 5, 1], 
      [1, 14, 12, 5, 6], 
      [1, 4, 14, 2, 5],
    ],
    scaleTypeIds: [1],
  },
  {
    id: 12,
    description: {
      en: 'V7/IV',
      fr: 'V7/IV'
    },
    order: 12,
    inLite: false,
    chordIds: [1, 15, 2, 12, 4, 5, 6],
    phrases: [
      [1, 15, 4, 5, 1],
      [1, 15, 4, 5, 6], 
      [1, 15, 4, 2, 5],
      [1, 15, 4, 12, 5],
      [1, 15, 4, 1, 5],
    ],
    scaleTypeIds: [1],
  },
  {
    id: 13,
    description: {
      en: 'bII',
      fr: 'bII'
    },
    order: 14,
    inLite: false,
    chordIds: [1, 16, 4, 5, 6],
    phrases: [
      [1, 6, 4, 16, 5],
      [1, 6, 16, 5, 1],
      [1, 6, 16, 5, 6],
      [1, 4, 16, 5, 1],
      [1, 4, 16, 5, 6],
    ],
    scaleTypeIds: [2],
  },
  {
    id: 14,
    description: {
      en: 'V7/iv',
      fr: 'V7/iv'
    },
    order: 13,
    inLite: false,
    chordIds: [1, 17, 2, 12, 4, 5, 6],
    phrases: [
      [1, 17, 4, 5, 1],
      [1, 17, 4, 5, 6], 
      [1, 17, 4, 2, 5],
      [1, 17, 4, 12, 5],
      [1, 17, 4, 1, 5],
    ],
    scaleTypeIds: [2],
  },
];

