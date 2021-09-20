class Training {
  constructor(lang, settings) {
    this.lang = lang;
    this.containerDiv = document.getElementById('training');
    this.settings = settings;
    this.chords = [];
    this.randScale = null;
    this.randPhrase = null;
    this.phraseChordsNum = 5;
    this.phraseNoteIds = [];
    this.answerSelects = null;
    this.actionButtons = null;

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

    console.log('init');
  }

  createGui() {
    this.containerDiv.innerHTML = '';

    this.containerDiv.innerHTML += `<div class="row selects-row"></div>`;
    const selectsRow = this.containerDiv.querySelector('.selects-row');

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
    }.bind(this));
    if(this.randScale != null) {
      this.updateAnswerSelects();
      this.answerSelects.forEach(function(select) {
        select.disabled = false;
      }.bind(this));
    }

    this.containerDiv.innerHTML +=
    `<div class="row buttons-row col s12 valign-wrapper">
      <a class="waves-effect waves-light btn col s5 action-btn">
        ${texts.newQuest[this.lang]}
      </a>
      <a class="waves-effect waves-light btn col s5 offset-s2 action-btn">
         ${texts.listenAgain[this.lang]}
      </a>
    </div>`;

    this.containerDiv.innerHTML +=
    `<div class="row buttons-row col s12 valign-wrapper">
      <a class="waves-effect waves-light btn col s5 action-btn">
        ${texts.checkAns[this.lang]}
      </a>
      <a class="waves-effect waves-light btn col s5 offset-s2 action-btn">
        ${texts.displayRight[this.lang]}
      </a>
    </div>`;

    this.actionButtons = this.containerDiv.querySelectorAll('.action-btn');
    this.setButtonsState([false, true, true, true]);

    this.actionButtons[0].addEventListener('click', this.handleNewQuestionClick.bind(this));
    this.actionButtons[1].addEventListener('click', this.playQuestion.bind(this));

    this.initGuiComponents();
  }

  setButtonsState(states) {
    this.actionButtons.forEach(function(button, index) {
      if(states[index]) {
        button.classList.add('disabled');
      } else {
        button.classList.remove('disabled');
      }
    }.bind(this));
  }

  generateScale() {
    const scaleNotes = [];
    let hasNullNote = false;
    this.randScale = scales[Math.floor(Math.random()*scales.length)];
    const randTonic = notes[Math.floor(Math.random()*21)];

    scaleNotes.push(randTonic);
    for(let i=0; i<this.randScale.intervals.length; i++) {
      const nextNote = notes.find(note => note.id == randTonic.id + this.randScale.intervals[i]);
      if(nextNote == null) {
        hasNullNote = true;
        break;
      } else {
        scaleNotes.push(nextNote);
      }
    }

    if(hasNullNote) {
      return null;
    } else {
      for(let i=1; i<=2; i++) {
        for(let k=0; k<=this.randScale.intervals.length; k++) {
          const newNote = notes.find(note => note.id == scaleNotes[k].id + 31*i);
          scaleNotes.push(newNote);
        }
      }

      return scaleNotes;
    }
  }

  selectRandPhrase(scaleNotes) {
    const phrases = this.settings.selectedLevel.phrases;
    this.randPhrase = Utilities.getRandomArrayItem(phrases);
    console.log(this.randPhrase);
    let phraseChords = [];

    this.randPhrase.forEach(function(chordId) {
      const nextChord = chords.find(chord => chord.id == chordId);
      const chordNotes = [];
      nextChord.scaleDegrees.forEach(function(degree) {
        chordNotes.push(scaleNotes[degree-1]);
      });

      phraseChords.push(chordNotes);
    });

    this.phraseNoteIds = [];
    phraseChords.forEach(function(chord) {
      const chordNoteIds = [];
      chord.forEach(function(note) {
         chordNoteIds.push(note.id);
      });
      this.phraseNoteIds.push(chordNoteIds);
    }.bind(this));
  }

  playQuestion() {
    const sounds = [
      null,
      C2, null, Db2, Db2, null, D2, null, Eb2, Eb2, null, E2, E2, F2, F2, null, Gb2, Gb2, null, G2, null, Ab2, Ab2, null, A2, null, Bb2, Bb2, null, B2, B2, C3,
      C3, null, Db3, Db3, null, D3, null, Eb3, Eb3, null, E3, E3, F3, F3, null, Gb3, Gb3, null, G3, null, Ab3, Ab3, null, A3, null, Bb3, Bb3, null, B3, B3, C4,
      C4, null, Db4, Db4, null, D4, null, Eb4, Eb4, null, E4, E4, F4, F4, null, Gb4, Gb4, null, G4, null, Ab4, Ab4, null, A4, null, Bb4, Bb4, null, B4, B4, C5,
      C5, null, Db5, Db5, null, D5, null, Eb5, Eb5, null, E5, E5, F5, F5, null,Gb5, Gb5, null, G5, null, Ab5, Ab5, null,
      A5, null, Bb5, Bb5, null, B5, B5, C6,
      C6
    ];

    stopAllSounds();
    //Cette variable a été déclarée dans le fichier notes-player.js
    soundSources = [];

    let noteOnTime = 0;
    this.phraseNoteIds.forEach(function(chord, index) {
      noteOnTime = index*1.25;

      chord.forEach(function(noteId) {
        playSound(sounds[noteId], noteOnTime);
      }.bind(this));
    }.bind(this));
  }

  updateAnswerSelects() {
    console.log('test');
    this.answerSelects.forEach(function(select) {
      select.options.length = 0;

      this.chords.forEach(function(chord) {
        if(this.randScale.id == 1) { 
          select.options.add(new Option(chord.majorRoman, chord.id));
        } else {
          select.options.add(new Option(chord.minorRoman, chord.id));
        }
      }.bind(this));
    }.bind(this));

  }

  handleNewQuestionClick() {
    let scaleNotes = null;
    while(scaleNotes == null) {
      scaleNotes = this.generateScale();
    }

    this.createGui();

    this.selectRandPhrase(scaleNotes);
    this.playQuestion();

    this.setButtonsState([false, false, false, true]);
  }
}

