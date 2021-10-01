class Stats {
  constructor(lang, training) {
    this.lang = lang;
    this.containerDiv = document.getElementById('stats');
    this.training = training;

    if(globalVars.version.id == 1) {
      this.levels = levels;
    } else {
      this.levels = levels.filter(level => level.inLite == true);
    }

    this.statsTbody = this.containerDiv.querySelector('#stats-tbody');

    this.questions = [];
    this.rightAnswers = [];

    this.loadData();
    this.fillStatsTable();
  }

  loadData() {
    if (localStorage.getItem(this.training.questionsKey) !== null) {
      this.questions = JSON.parse(localStorage.getItem(this.training.questionsKey));
    }

    if (localStorage.getItem(this.training.rightAnswersKey) !== null) {
      this.rightAnswers = JSON.parse(localStorage.getItem(this.training.rightAnswersKey));
    }
  }

  saveData() {
    localStorage.setItem(this.training.questionsKey, JSON.stringify(this.questions));
    localStorage.setItem(this.training.rightAnswersKey, JSON.stringify(this.rightAnswers));
  }

  fillStatsTable() {
    this.statsTbody.innerHTML = '';

    this.levels.forEach(function(level, index) {
      const questionsByLevel = this.questions.filter(question => question.levelId == level.id);
      const rightAnswersByLevel = this.rightAnswers.filter(answer => answer.levelId == level.id);

      let deleteStatsButtonHTML = ``;
      if(questionsByLevel.length > 0) {
        deleteStatsButtonHTML = `<a class="waves-effect waves-light btn delete-stats-btn" data-levelid="${level.id}">
                                    <i class="fas fa-trash-alt"></i>
                                 </a>`;
      }

      this.statsTbody.innerHTML += `<tr>
          <td> ${level.order} </td>
          <td> ${questionsByLevel.length} </td>
          <td> ${rightAnswersByLevel.length} </td>
          <td> ${Utilities.getPercentage(rightAnswersByLevel.length, questionsByLevel.length)}%</td>
          <td>${deleteStatsButtonHTML}</td>
        </tr>`;
    }.bind(this));

    let deleteAllStatsButtonHTML = ``;
      if(this.questions.length > 0) {
        deleteAllStatsButtonHTML = `<a class="waves-effect waves-light btn delete-all-stats-btn" data-levelid="-1">
                                     <i class="fas fa-trash-alt"></i>
                                   </a>`;
    }

    this.statsTbody.innerHTML += 
      `<tr>
        <td>Total</td>
        <td> ${this.questions.length} </td>
        <td> ${this.rightAnswers.length} </td>
        <td> ${Utilities.getPercentage(this.rightAnswers.length, this.questions.length)}%</td>
        <td> ${deleteAllStatsButtonHTML} </td>
      </tr>`;

      const deleteStatsButtons = this.containerDiv.querySelectorAll('.delete-stats-btn');
      deleteStatsButtons.forEach(function(button) {
        button.addEventListener('click', this.handleDeleteStatsClick.bind(this));
      }.bind(this));

      const deleteAllStatsButton = this.containerDiv.querySelector('.delete-all-stats-btn');
      if(deleteAllStatsButton !== null) {
        deleteAllStatsButton.addEventListener('click', this.handleDeleteStatsClick.bind(this));
      }
  }

  handleDeleteStatsClick(event) {
    const button = event.currentTarget;
    const levelId = button.dataset.levelid;
    
    const statsModal = this.containerDiv.querySelector('#delete-stats-modal');
    const instance = M.Modal.init(statsModal, {});

    const modalTitle = statsModal.querySelector('h4');
    modalTitle.innerHTML = texts.resetStatsTitle[this.lang];
    const modalTextDiv = statsModal.querySelector('.modal-text');

    const deleteOkBtn = statsModal.querySelector('#delete-ok-btn');
    deleteOkBtn.setAttribute('data-levelid', '');
    deleteOkBtn.setAttribute('data-levelid', levelId);
    deleteOkBtn.addEventListener('click', this.deleteStats.bind(this));

    if(deleteOkBtn.dataset.levelid != -1) {
      const level = levels.find(level => level.id == levelId);

      modalTextDiv.innerHTML = `${texts.resetLevelStatsMsg[app.lang]} ${level.id}: ${level.description[this.lang]}?`;
    } else {
      modalTextDiv.innerHTML = texts.resetAllStatsMsg[this.lang];
    }

    instance.open();
  }

  deleteStats(event) {
    const button = event.currentTarget;
    const levelId = button.dataset.levelid;
    
    if(levelId == -1) {
      this.questions = [];
      this.rightAnswers = [];
    } else {
      this.questions = this.questions.filter(question => question.levelId != levelId);
      this.rightAnswers = this.rightAnswers.filter(answer => answer.levelId != levelId);
    }

    this.fillStatsTable();
    this.saveData();
  }

  deleteStatsByLevel(event) {
    const button = event.currentTarget;
    const levelId = button.dataset.levelid;
    
    this.questions = this.questions.filter(question => question.levelId != levelId);
    this.rightAnswers = this.rightAnswers.filter(answer => answer.levelId != levelId);

    this.fillStatsTable();
    this.saveData();
  }

  deleteAllStats() {
    this.questions = [];
    this.rightAnswers = [];

    this.fillStatsTable();
    this.saveData();
  }
}

