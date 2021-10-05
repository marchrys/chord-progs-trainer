const notes = [
  {
     id: 1,
     name: {
       en: 'C',
       fr: 'Do',
     },
     isRoot: true,
   },
   {
     id: 2,
     name: {
       en: 'Dbb',
       fr: 'Rébb',
     },
     isRoot: false,
   },
   {
     id: 3,
     name: {
       en: 'C#',
       fr: 'Do#',
     },
     isRoot: true,
   },
   {
     id: 4,
     name: {
       en: 'Db',
       fr: 'Réb',
     },
     isRoot: true,
   },
   {
     id: 5,
     name: {
       en: 'Cx',
       fr: 'Dox',
     },
     isRoot: false,
   },
   {
     id: 6,
     name: {
       en: 'D',
       fr: 'Ré',
     },
     isRoot: true,
   },
   {
     id: 7,
     name: {
       en: 'Ebb',
       fr: 'Mibb',
     },
     isRoot: false,
   },
   {
     id: 8,
     name: {
       en: 'D#',
       fr: 'Ré#',
     },
     isRoot: true,
   },
   {
     id: 9,
     name: {
       en: 'Eb',
       fr: 'Mib',
     },
     isRoot: true,
   },
   {
     id: 10,
     name: {
       en: 'Dx',
       fr: 'Réx',
     },
     isRoot: false,
   },
   {
     id: 11,
     name: {
       en: 'E',
       fr: 'Mi',
     },
     isRoot: true,
   },
   {
     id: 12,
     name: {
       en: 'Fb',
       fr: 'Fab',
     },
     isRoot: false,
   },
   {
     id: 13,
     name: {
       en: 'E#',
       fr: 'Mi#',
     },
     isRoot: false,
   },
   {
     id: 14,
     name: {
       en: 'F',
       fr: 'Fa',
     },
     isRoot: true,
   },
   {
     id: 15,
     name: {
       en: 'Gbb',
       fr: 'Solbb',
     },
     isRoot: false,
   },
   {
     id: 16,
     name: {
       en: 'F#',
       fr: 'Fa#',
     },
     isRoot: true,
   },
   {
     id: 17,
     name: {
       en: 'Gb',
       fr: 'Solb',
     },
     isRoot: true,
   },
   {
     id: 18,
     name: {
       en: 'Fx',
       fr: 'Fax',
     },
     isRoot: false,
   },
   {
     id: 19,
     name: {
       en: 'G',
       fr: 'Sol',
     },
     isRoot: true,
   },
   {
     id: 20,
     name: {
       en: 'Abb',
       fr: 'Labb',
     },
     isRoot: false,
   },
   {
     id: 21,
     name: {
       en: 'G#',
       fr: 'Sol#',
     },
     isRoot: true,
   },
   {
     id: 22,
     name: {
       en: 'Ab',
       fr: 'Lab',
     },
     isRoot: true,
   },
   {
     id: 23,
     name: {
       en: 'Gx',
       fr: 'Solx',
     },
     isRoot: false,
   },
   {
     id: 24,
     name: {
       en: 'A',
       fr: 'La',
     },
     isRoot: true,
   },
   {
     id: 25,
     name: {
       en: 'Bbb',
       fr: 'Sibb',
     },
     isRoot: false,
   },
   {
     id: 26,
     name: {
       en: 'A#',
       fr: 'La#',
     },
     isRoot: true,
   },
   {
     id: 27,
     name: {
       en: 'Bb',
       fr: 'Sib',
     },
     isRoot: true,
   },
   {
     id: 28,
     name: {
       en: 'Ax',
       fr: 'Lax',
     },
     isRoot: false,
   },
   {
     id: 29,
     name: {
       en: 'B',
       fr: 'Si',
     },
     isRoot: true,
   },
   {
     id: 30,
     name: {
       en: 'Cb',
       fr: 'Dob',
     },
     isRoot: false,
   },
   {
     id: 31,
     name: {
       en: 'B#',
       fr: 'Si#',
     },
     isRoot: false,
   },
];

for(let i=1; i<=2; i++) {
  notes.forEach(function(note) {
    notes.push(
      {
        id : note.id + 31*i,
        name : {
          en: note.name.en,
          fr: note.name.fr
        },
        isRoot: false,
      }
    );
  });
}


