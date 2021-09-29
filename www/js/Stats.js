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
    this.levels.forEach(function(level, index) {
      const questionsByLevel = this.questions.filter(question => question.levelId == level.id);
      const rightAnswersByLevel = this.rightAnswers.filter(answer => answer.levelId == level.id);

      this.statsTbody.innerHTML += `<tr>
          <td> ${index+1} </td>
          <td> ${level.description[app.lang]} </td>
          <td> ${questionsByLevel.length} </td>
          <td> ${rightAnswersByLevel.length} </td>
          <td> ${Utilities.getPercentage(rightAnswersByLevel.length, questionsByLevel.length)}%</td>
          <td></td>
        </tr>`;
    }.bind(this));

    this.statsTbody.innerHTML += 
      `<tr>
        <td></td>
        <td>Total</td>
        <td> ${this.questions.length} </td>
        <td> ${this.rightAnswers.length} </td>
        <td> ${Utilities.getPercentage(this.rightAnswers.length, this.questions.length)}%</td>
        <td></td>
      </tr>`;
  }
}

