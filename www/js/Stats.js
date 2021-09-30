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
          <td> ${level.description[app.lang]} </td>
          <td> ${questionsByLevel.length} </td>
          <td> ${rightAnswersByLevel.length} </td>
          <td> ${Utilities.getPercentage(rightAnswersByLevel.length, questionsByLevel.length)}%</td>
          <td>${deleteStatsButtonHTML}</td>
        </tr>`;
    }.bind(this));

    let deleteAllStatsButtonHTML = ``;
      if(this.questions.length > 0) {
        deleteAllStatsButtonHTML = `<a class="waves-effect waves-light btn delete-all-stats-btn">
                                    <i class="fas fa-trash-alt"></i>
                                 </a>`;
    }

    this.statsTbody.innerHTML += 
      `<tr>
        <td></td>
        <td>Total</td>
        <td> ${this.questions.length} </td>
        <td> ${this.rightAnswers.length} </td>
        <td> ${Utilities.getPercentage(this.rightAnswers.length, this.questions.length)}%</td>
        <td> ${deleteAllStatsButtonHTML} </td>
      </tr>`;

      const deleteStatsButtons = this.containerDiv.querySelectorAll('.delete-stats-btn');
      deleteStatsButtons.forEach(function(button) {
        button.addEventListener('click', this.deleteStatsByLevel.bind(this));
      }.bind(this));

      const deleteAllStatsButton = this.containerDiv.querySelector('.delete-all-stats-btn');
      deleteAllStatsButton.addEventListener('click', this.deleteAllStats.bind(this));
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

