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

    this.answerButtons = null;
    this.answersSelect = null;
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
    this.answerButtons = this.containerDiv.querySelectorAll('.answer-btn');
    this.answersSelect = this.containerDiv.querySelector('.answers-select');
    this.answerSelectLabel = this.containerDiv.querySelector('#answer-select-label');
    this.answerSelects = this.containerDiv.querySelectorAll('.answer-select');
    this.feedbacksDivs = this.containerDiv.querySelectorAll('.feedback');
    this.actionButtons = this.containerDiv.querySelectorAll('.action-btn');

    this.playings = 0;

    this.questionsKey = 'questions';
    this.rightAnswersKey = 'right_answers';

    this.preloadTextDiv.innerHTML = texts.preloader[this.lang];
    
    this.levelInfoDiv.innerHTML = ` ${texts.level[this.lang]} ${this.settings.selectedLevel.order} : ${this.settings.selectedLevel.description[this.lang]} `;

    this.answerSelectLabel.textContent = texts.answerSelect[this.lang];

    const textProperties = ['newQuest', 'listenAgain', 'checkAns', 'displayRight'];
    this.actionButtons.forEach(function(button, index) {
      button.innerHTML = texts[textProperties[index]][this.lang];
    }.bind(this));

    this.answerButtons.forEach(function(button) {
      button.addEventListener('click', this.handleAnswerButtonClick.bind(this));
      button.classList.add('disabled');
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

    this.chords = [];
    this.settings.selectedLevel.chordIds.forEach(function(chordId) {
      this.chords.push(chords.find(chord => chord.id == chordId));
    }.bind(this));
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
    
    const scaleId = this.settings.selectedLevel.scaleTypeIds[Math.floor(Math.random()*this.settings.selectedLevel.scaleTypeIds.length)];
    this.randScale = scales.find(scale => scale.id == scaleId);
    
    const possibleTonics = notes.filter(note => note.isRoot == true);
    const randTonic = possibleTonics[Math.floor(Math.random()*possibleTonics.length)];

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
        if(Array.isArray(degree) == false) {
          chordNotes.push(scaleNotes[degree-1]);
        } else {
          const naturalNote = notes.find(note => note.id == scaleNotes[degree[0]-1].id);
          const alteredNote = notes.find(note => note.id == naturalNote.id + degree[1]);
          chordNotes.push(alteredNote);
        }
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
      C2, C2, Db2, Db2, D2, D2, D2, Eb2, Eb2, E2, E2, E2, F2, F2, F2, Gb2, Gb2, G2, G2, G2, Ab2, Ab2, A2, A2, A2, Bb2, Bb2, B2, B2, B2, C3,
      C3, C3, Db3, Db3, D3, D3, D3, Eb3, Eb3, E3, E3, E3, F3, F3, F3, Gb3, Gb3, G3, G3, G3, Ab3, Ab3, A3, A3, A3, Bb3, Bb3, B3, B3, B3, C4,
      C4, C4, Db4, Db4, D4, D4, D4, Eb4, Eb4, E4, E4, E4, F4, F4, F4, Gb4, Gb4, G4, G4, G4, Ab4, Ab4, A4, A4, A4, Bb4, Bb4, B4, B4, B4, C5,
      C5, C5, Db5, Db5, D5, D5, D5, Eb5, Eb5, E5, E5, E5, F5, F5, F5,Gb5, Gb5, G5, G5, G5, Ab5, Ab5, A5, A5, A5, Bb5, Bb5, B5, B5, B5, C6,
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

  updateAnswersSelect() {
    this.answersSelect.options.length = 0;

    this.chords.forEach(function(chord) {
      let option = document.createElement('option');
      if(this.randScale.id == 1) {
        option.innerHTML = chord.majorRoman;
      } else {
        option.innerHTML = chord.minorRoman;
      }
      option.value = chord.id;
      this.answersSelect.appendChild(option);
    }.bind(this));
  }

  handleNewQuestionClick() {
    let scaleNotes = null;
    while(scaleNotes == null) {
      scaleNotes = this.generateScale();
    }

    this.playings = 1;

    this.defineChords();
    this.updateAnswersSelect();
    this.setAnswerButtonsState(true);
    this.initAnswerButtons();
    this.initFeedback();

    this.selectRandPhrase(scaleNotes);
    this.displayTonicChord();
    this.playQuestion();
    this.updateQuestionsStats();
    this.saveData();
    this.displayScore();
    this.initGuiComponents();

    this.setButtonsState([true, false, false, true]);
  }

  handleReplayClick() {
    this.playQuestion();

    this.playings++;

    if(globalVars.version.id == 0 && this.playings == globalVars.version.maxLitePlayings) {
      this.playings = 0;
      this.setButtonsState([true, true, false, true]);
    } else {
      this.setButtonsState([true, false, false, true]);
    }
  }

  handleCheckAnswerClick() {
    stopAllSounds();
    this.answers = [];

    this.answerButtons.forEach(function(button) {
      this.answers.push(button.dataset.answerid);
      button.setAttribute('data-answerid', "0");
      this.setAnswerButtonsState(false);
    }.bind(this));

    // this.answerSelects.forEach(function(select) {
    //   this.answers.push(select.value);
    // }.bind(this));

    this.randPhrase.forEach(function(chordId, index) {
      if(index > 0) {
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
      }
      else {
        this.feedbacksDivs[index].innerHTML = '&nbsp;';
      }
    }.bind(this));
    this.initGuiComponents();

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
    this.randPhrase.forEach(function(chordId, index) {
      if(index > 0) {
        this.questions.push(
          {
            chordId: chordId,
            levelId: this.settings.selectedLevel.id,
          }
        );
      }
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

  clearAnswerSelect() {
    this.answersSelect.options.length = 0;
  }

  displayLevel() {
    this.levelInfoDiv.innerHTML = ` ${texts.level[this.lang]} ${this.settings.selectedLevel.order} : ${this.settings.selectedLevel.description[this.lang]} `;
  }

  handleShowRightClick() {
    this.initFeedback();

    this.randPhrase.forEach(function(chordId, index) {
      const chord = chords.find(chord => chord.id == chordId);
      if(this.randScale.id == 1) {
        this.answerButtons[index].innerHTML = chord.majorRoman;
      } else {
        this.answerButtons[index].innerHTML = chord.minorRoman;
      }
    }.bind(this));

    // this.answerSelects.forEach(function(select, index) {
    //   select.value = this.randPhrase[index];
    //   select.disabled = true;
    // }.bind(this));
    // this.initGuiComponents();

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

  handleAnswerButtonClick(event) {
    const button = event.currentTarget;
    
    button.setAttribute('data-answerid', this.answersSelect.value);
    button.innerHTML = this.answersSelect.options[this.answersSelect.selectedIndex].text;
  }

  setAnswerButtonsState(state) {
    this.answerButtons.forEach(function(button, index) {
      if(state) {
        if(index > 0) {
          button.classList.remove('disabled');
        }
      } else {
        button.classList.add('disabled');
      }
    }.bind(this));
  }

  displayTonicChord() {
    const chord = chords.find(chord => chord.id == this.randPhrase[0]);
    if(this.randScale.id == 1) {
      this.answerButtons[0].textContent = chord.majorRoman;
    } else {
      this.answerButtons[0].textContent = chord.minorRoman;
    }
  }

  initAnswerButtons() {
    this.answerButtons.forEach(function(button) {
      button.setAttribute('data-answerid', "0");
      button.textContent = '?';
    }.bind(this));
  }
}

