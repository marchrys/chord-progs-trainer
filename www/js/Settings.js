class Settings {
  constructor(lang) {
    this.lang = lang;
    this.containerDiv = document.getElementById('settings');
    this.levelSelect = null;
    this.levels = null;

    this.loadLevelsByVersion();
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
      option.innerHTML = level.description[app.lang];
      option.value = level.id;
      this.levelSelect.appendChild(option);
    }.bind(this));
  }
}

