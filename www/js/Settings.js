class Settings {
  constructor(lang) {
    this.lang = lang;
    this.containerDiv = document.getElementById('settings');
    this.levelSelect = null;
    this.levels = null;
    this.selectedLevel = null;
    this.levelKey = 'selected_level';

    this.loadLevelsByVersion();
    this.selectedLevel = this.levels[0];
    this.loadData();
    this.createGui();
    this.loadLevelsIntoSelect();
    this.initGuiComponents();
  }

  createGui() {
    this.containerDiv.innerHTML += 
      `<div class="input-field col s12"> 
        <select class="level-select"> 
        </select> 
        <label> ${texts.level['fr']} </label>
      </div>`;

      this.levelSelect = this.containerDiv.querySelector('.level-select');

      this.levelSelect.addEventListener('change', this.handleLevelChange.bind(this));
  }

  initGuiComponents() {
    //Initialisation des selects
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {});
  }

  //On filtre les niveaux si la version est Lite
  loadLevelsByVersion() {
    if(globalVars.version === 'Full') {
      this.levels = levels;
    } else {
      this.levels = levels.filter(level => level.inLite === true);
    }
  }

  loadLevelsIntoSelect() {
    this.levels.forEach(function(level) {
      let option = document.createElement('option');
      option.innerHTML = `${level.order} : ${level.description[app.lang]}`;
      option.value = level.id;
      this.levelSelect.appendChild(option);
    }.bind(this));

    this.levelSelect.value = this.selectedLevel.id;
  }

  handleLevelChange() {
    this.selectedLevel = this.levels.find(level => level.id == this.levelSelect.value);
    this.saveData();
  }

  loadData() {
    if (localStorage.getItem(this.levelKey) !== null) {
      this.selectedLevel = JSON.parse(localStorage.getItem(this.levelKey));
    }
  }

  saveData() {
    localStorage.setItem(this.levelKey, JSON.stringify(this.selectedLevel));
  }
}

