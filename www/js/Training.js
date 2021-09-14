class Training {
  constructor(lang, settings) {
    this.lang = lang;
    this.containerDiv = document.getElementById('training');
    this.settings = settings;
    this.chords = [];

    this.defineChords();
    this.displayPreloader();
    this.checkSoundsLoad();
  }

  defineChords() {
    // chords.forEach(function(chord) {
    //   if(this.settings.selectedLevel.chordIds.includes(chord.id)) {
    //      this.chords.push(chord);
    //   }
    // }.bind(this));

    this.chords = chords.filter(chord => this.settings.selectedLevel.chordIds.includes(chord.id));
  }

  displayPreloader() {
    this.containerDiv.innerHTML += 
        `<div> ${texts.preloader[this.lang]} </div>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>`;
  }

  checkSoundsLoad() {
    const soundsLoad = setInterval(function() {
      if(allSoundsLoaded) {
        console.log('ok');
        this.createGui();
        // this.createElementNotes();
        // this.setSelectedOptions();
        // this.initSelects();
        clearInterval(soundsLoad);
        return;
      }
    }.bind(this), 1000);
  }

  createGui() {
    this.containerDiv.innerHTML = '';
  }
}

