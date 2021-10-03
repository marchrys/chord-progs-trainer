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
    this.answers = [];

    this.answerSelects = null;
    this.actionButtons = null;
    this.feedbacksDivs = null;

    this.questions = [];
    this.rightAnswers = [];

    this.defineChords();

    this.preloader = this.containerDiv.querySelector('#preloader');
    this.trainingScreen = this.containerDiv.querySelector('#training-screen');

    this.preloadTextDiv = this.preloader.querySelector('#preload-text');
    this.levelInfoDiv = this.containerDiv.querySelector('#level-info');
    this.scoreInfoDiv = this.containerDiv.querySelector('#score-info');
    this.answerSelects = this.containerDiv.querySelectorAll('.answer-select');
    this.feedbacksDivs = this.containerDiv.querySelectorAll('.feedback');
    this.actionButtons = this.containerDiv.querySelectorAll('.action-btn');

    this.questionsKey = 'questions';
    this.rightAnswersKey = 'right_answers';

    this.preloadTextDiv.innerHTML = texts.preloader[this.lang];
    
    this.levelInfoDiv.innerHTML = ` ${texts.level[this.lang]} ${this.settings.selectedLevel.order} : ${this.settings.selectedLevel.description[this.lang]} `;

    const textProperties = ['newQuest', 'listenAgain', 'checkAns', 'displayRight'];
    this.actionButtons.forEach(function(button, index) {
      button.innerHTML = texts[textProperties[index]][this.lang];
    }.bind(this));

    this.actionButtons[0].addEventListener('click', this.handleNewQuestionClick.bind(this));
    this.actionButtons[1].addEventListener('click', this.handleReplayClick.bind(this));
    this.actionButtons[2].addEventListener('click', this.handleCheckAnswerClick.bind(this));
    this.actionButtons[3].addEventListener('click', this.handleShowRightClick.bind(this));

    this.loadData();
    this.displayScore();
    this.initGuiComponents();
    this.setButtonsState([false, true, true, true]);
    this.checkSoundsLoad();
    //Au premier chargement, on affiche le preloader
    // if(this.containerDiv.innerHTML == '') {
    //   this.displayPreloader();
    //   this.checkSoundsLoad();
    // } else {
    //   this.createGui();
    // }
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
          this.preloader.style.display = 'none';
          this.trainingScreen.style.display = 'block';
        clearInterval(soundsLoad);
        return;
      }
    }.bind(this), 1000);
  }

  initGuiComponents() {
    //Initialisation des selects
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {});

    // Initialisation des tooltips
    var tooltipElems = document.querySelectorAll('.tooltipped');
    var tooltipInstances = M.Tooltip.init(tooltipElems, {});
  }

  createGui() {
    this.containerDiv.innerHTML = '';

    const infosRow = document.createElement('div');
    infosRow.className = 'row infos-row';
    this.containerDiv.appendChild(infosRow);

    for(let i=1; i<=2; i++) {
      const infosDiv = document.createElement('div');
      infosDiv.className = 'col s6 center-align';
      infosDiv.innerHTML = '';
      if(i == 1) {
        infosDiv.id = 'levelInfo';
      } else {
        infosDiv.id = 'scoreInfo';
      }
      infosRow.appendChild(infosDiv);
    }

    const levelInfoDiv = this.containerDiv.querySelector('#levelInfo');
    this.scoreInfoDiv = document.querySelector('#scoreInfo');

    levelInfoDiv.innerHTML = ` ${texts.level[this.lang]} ${this.settings.selectedLevel.order} : ${this.settings.selectedLevel.description[this.lang]} `; 

    this.containerDiv.innerHTML += `<div class="row selects-row"></div>`;
    const selectsRow = this.containerDiv.querySelector('.selects-row');

    for(let i=1; i<=this.phraseChordsNum; i++) {
    selectsRow.innerHTML +=
      `<div class="input-field select-container col s2">
        <select class="answer-select">
        </select>
        <label></label>
      </div>`;
    }

    const selectContainers = document.querySelectorAll('.select-container');
    this.answerSelects = document.querySelectorAll('.answer-select');
    selectContainers[0].classList.add('offset-s1');

    this.initGuiComponents();

    const feedbacksRow = document.createElement("div");
    feedbacksRow.className = 'row feedbacks-row';
    this.containerDiv.appendChild(feedbacksRow);

    for(let i=1; i<=this.phraseChordsNum; i++) {
      const feedbackDiv = document.createElement("div");
      feedbackDiv.className = 'col s2 feedback';
      feedbackDiv.innerHTML = '&nbsp;';
      feedbacksRow.appendChild(feedbackDiv);
    }
    this.feedbacksDivs = feedbacksRow.querySelectorAll('.feedback');
    this.feedbacksDivs[0].classList.add('offset-s1');

    for(let i=1; i<=2; i++) {
      const buttonsRow = document.createElement("div");
      buttonsRow.className = 'row buttons-row valign-wrapper';
      // p.innerHTML = 'Nouvelle question';
      this.containerDiv.appendChild(buttonsRow);
    }
    const buttonsRows = this.containerDiv.querySelectorAll('.buttons-row');
    
    buttonsRows.forEach(function(row) {
      for(let i=1; i<=2; i++) {
        const actionBtn = document.createElement("a");
        actionBtn.className = 'waves-effect waves-light btn col s5 action-btn';
        actionBtn.innerHTML = 'test';
        row.appendChild(actionBtn);
      }
    }.bind(this));

    this.actionButtons = this.containerDiv.querySelectorAll('.action-btn');
    
    //On décale les boutons de droite de deux colonnes
    this.actionButtons.forEach(function(button,index) {
      if(index % 2 !== 0) {
        button.classList.add('offset-s2');
      }
    }.bind(this));

    const textProperties = ['newQuest', 'listenAgain', 'checkAns', 'displayRight'];
    this.actionButtons.forEach(function(button, index) {
      button.innerHTML = texts[textProperties[index]][this.lang];
    }.bind(this));

    this.actionButtons[0].addEventListener('click', this.handleNewQuestionClick.bind(this));
    this.actionButtons[1].addEventListener('click', this.handleReplayClick.bind(this));
    this.actionButtons[2].addEventListener('click', this.handleCheckAnswerClick.bind(this));
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
    this.answerSelects.forEach(function(select) {
      select.options.length = 0;
      select.disabled = false;

      let option = document.createElement('option');
      option.innerHTML = '?';
      option.value = 0;
      select.appendChild(option);

      this.chords.forEach(function(chord) {
        let option = document.createElement('option');
        if(this.randScale.id == 1) {
          option.innerHTML = chord.majorRoman;
        } else {
          option.innerHTML = chord.minorRoman;
        }
        option.value = chord.id;
        select.appendChild(option);
      }.bind(this));
    }.bind(this));
  }

  handleNewQuestionClick() {
    let scaleNotes = null;
    while(scaleNotes == null) {
      scaleNotes = this.generateScale();
    }

    this.defineChords();
    this.updateAnswerSelects();
    this.initFeedback();

    this.selectRandPhrase(scaleNotes);
    this.playQuestion();
    this.updateQuestionsStats();
    this.saveData();
    this.displayScore();
    this.initGuiComponents();

    this.setButtonsState([true, false, false, true]);
  }

  handleReplayClick() {
    this.playQuestion();
    this.setButtonsState([true, false, false, true]);
  }

  handleCheckAnswerClick() {
    stopAllSounds();
    this.answers = [];
    this.answerSelects.forEach(function(select) {
      this.answers.push(select.value);
    }.bind(this));

    this.randPhrase.forEach(function(chordId, index) {
      if(this.answers[index] == chordId) {
        this.feedbacksDivs[index].style.color = getComputedStyle(this.feedbacksDivs[index]).getPropertyValue('--green-color');
        this.updateRightAnswersStats(this.answers[index]);
        this.saveData();
        this.displayScore();
        this.feedbacksDivs[index].innerHTML = '<i class="fas fa-check"></i>';
      } else {
        this.feedbacksDivs[index].style.color = getComputedStyle(this.feedbacksDivs[index]).getPropertyValue('--danger-color');
        this.feedbacksDivs[index].innerHTML = '<i class="fas fa-times"></i>';
      }
    }.bind(this));

    this.setButtonsState([false, true, true, false]);
  }

  displayScore() {
    const questionsByLevel = this.questions.filter(question => question.levelId == this.settings.selectedLevel.id);
    const rightAnswersByLevel = this.rightAnswers.filter(answer => answer.levelId == this.settings.selectedLevel.id);

    const successPercentage = Utilities.getPercentage(rightAnswersByLevel.length, questionsByLevel.length);

    this.scoreInfoDiv.innerHTML = 
    `Score: ${rightAnswersByLevel.length} / ${questionsByLevel.length} (${successPercentage}  %)
    <a class="btn tooltipped" data-position="top" data-tooltip="${texts.scoreInfoTooltip[this.lang]}">
      <i class="fas fa-info-circle"></i>
    </a>
    `;
  }

  initFeedback() {
    this.feedbacksDivs.forEach(function(div) {
      div.innerHTML = '&nbsp;';
    });
  }

  updateQuestionsStats() {
    this.randPhrase.forEach(function(chordId) {
      this.questions.push(
        {
          chordId: chordId,
          levelId: this.settings.selectedLevel.id,
        }
      );
    }.bind(this));
  } 

  updateRightAnswersStats(chordId) {
    this.rightAnswers.push(
      {
        chordId: chordId,
        levelId: this.settings.selectedLevel.id,
      }
    );
  }

  clearSelects() {
    this.answerSelects.forEach(function(select) {
      select.options.length = 0;
    }.bind(this));
  }

  displayLevel() {
    this.levelInfoDiv.innerHTML = ` ${texts.level[this.lang]} ${this.settings.selectedLevel.order} : ${this.settings.selectedLevel.description[this.lang]} `;
  }

  handleShowRightClick() {
    this.initFeedback();

    this.answerSelects.forEach(function(select, index) {
      select.value = this.randPhrase[index];
      select.disabled = true;
    }.bind(this));
    this.initGuiComponents();

    this.setButtonsState([false, true, true, true]);
  }

  loadData() {
    if (localStorage.getItem(this.questionsKey) !== null) {
      this.questions = JSON.parse(localStorage.getItem(this.questionsKey));
    }

    if (localStorage.getItem(this.rightAnswersKey) !== null) {
      this.rightAnswers = JSON.parse(localStorage.getItem(this.rightAnswersKey));
    }
  }

  saveData() {
    localStorage.setItem(this.questionsKey, JSON.stringify(this.questions));
    localStorage.setItem(this.rightAnswersKey, JSON.stringify(this.rightAnswers));
  }
}

