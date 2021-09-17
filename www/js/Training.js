class Training {
  constructor(lang, settings) {
    this.lang = lang;
    this.containerDiv = document.getElementById('training');
    this.settings = settings;
    this.chords = [];
    this.phraseChordsNum = 5;
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
    });
    
    // this.answerSelects.forEach(function(select) {
    //   this.chords.forEach(function(chord) {
    //     let option = document.createElement('option');
    //     option.innerHTML = chord.majorRoman;
    //     option.value = chord.id;
    //     select.appendChild(option);
    //   }.bind(this));
    // }.bind(this));

   
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

  generateQuestion() {
    const scaleNotes = [];
    let hasNullNote = false;
    const randScale = scales[Math.floor(Math.random()*scales.length)];
    const randTonic = notes[Math.floor(Math.random()*21)];
    
    scaleNotes.push(randTonic);
    for(let i=0; i<randScale.intervals.length; i++) {
      const nextNote = notes.find(note => note.id == randTonic.id + randScale.intervals[i]);
      if(nextNote == null) {
        hasNullNote = true;
        break;
      } else {
        scaleNotes.push(nextNote);
      }
    }

    for(let i=1; i<=2; i++) {
      for(let k=0; k<=randScale.intervals.length; k++) {
        const newNote = notes.find(note => note.id == scaleNotes[k].id + 31*i);
        scaleNotes.push(newNote);
      }
    }
       
    if(hasNullNote) {
      return null;
    } else {
      return scaleNotes;
    }
  }

  handleNewQuestionClick() {
    let scaleNotes = null;
    while(scaleNotes == null) {
      scaleNotes = this.generateQuestion();
    }
    console.log(JSON.stringify(scaleNotes));
  }
}

