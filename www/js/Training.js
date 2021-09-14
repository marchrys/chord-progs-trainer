class Training {
  constructor(lang, settings) {
    this.lang = lang;
    this.containerDiv = document.getElementById('training');
    this.settings = settings;
    this.chords = [];
    this.phraseChordsNum = 5;
    this.answerSelects = null;

    this.defineChords();
    //Au premier chargement, on affiche le preloader
    if(this.containerDiv.innerHTML == '') {
      this.displayPreloader();
      this.checkSoundsLoad();
    } else {
      this.createGui();
    }
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

  initGuiComponents() {
    //Initialisation des selects
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {});
  }

  createGui() {
    this.containerDiv.innerHTML = '';

    this.containerDiv.innerHTML += `<div class="row selects-row col s12"></div>`;
    this.containerDiv.innerHTML += `<div class="row buttons-row"></div>`;

    const selectsRow = this.containerDiv.querySelector('.selects-row');
    const buttonsRow = this.containerDiv.querySelector('.buttons-row');

    //Ajout des selects pour les réponses
    for(let i=1; i<=this.phraseChordsNum; i++) {
      selectsRow.innerHTML += 
        `<div class="input-field select-container col s2">
          <select class="answer-select">
          </select>
        </div>`;
    }
    const selectContainers = this.containerDiv.querySelectorAll('.select-container');
    selectContainers[0].classList.add('offset-s1');

    this.answerSelects = this.containerDiv.querySelectorAll('.answer-select');
    this.answerSelects.forEach(function(select) {
      select.disabled = true;
    });
    
    // this.answerSelects.forEach(function(select) {
    //   this.chords.forEach(function(chord) {
    //     let option = document.createElement('option');
    //     option.innerHTML = chord.majorRoman;
    //     option.value = chord.id;
    //     select.appendChild(option);
    //   }.bind(this));
    // }.bind(this));

    buttonsRow.innerHTML += `<a class="waves-effect waves-light btn col s12 md6 action-btn">New question</a>`;
    buttonsRow.innerHTML += `<a class="waves-effect waves-light btn col s12 md6 offset-md2 action-btn">Listen again</a>`;
    buttonsRow.innerHTML += `<a class="waves-effect waves-light btn col s12 md6 action-btn">Check answers</a>`;
    buttonsRow.innerHTML += `<a class="waves-effect waves-light btn col s12 md6 offset-md2 action-btn">Display right answers</a>`;

    this.initGuiComponents();
  }
}

