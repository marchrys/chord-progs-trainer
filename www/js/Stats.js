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

    console.log(this.containerDiv.outerHTML);
  }
}

