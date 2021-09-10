class Training {
  constructor(lang, settings) {
    this.lang = lang;
    this.settings = settings;
    this.chords = [];

    this.defineChords();

    console.log(JSON.stringify(this.chords));
  }

  defineChords() {
    // chords.forEach(function(chord) {
    //   if(this.settings.selectedLevel.chordIds.includes(chord.id)) {
    //      this.chords.push(chord);
    //   }
    // }.bind(this));

    this.chords = chords.filter(chord => this.settings.selectedLevel.chordIds.includes(chord.id));
  }
}

