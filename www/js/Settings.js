class Settings {
  constructor(lang) {
    this.lang = lang;
    this.containerDiv = document.getElementById('settings');
    this.levelSelect = null;
    this.levels = null;
    this.selectedLevel = null;
    this.levelKey = 'selected_level';

    this.levels = levels;

    // this.loadLevelsByVersion();
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
        <label> ${texts.level[this.lang]} </label>
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
    if(globalVars.version.id == 1) {
      this.levels = levels;
    } else {
      this.levels = levels.filter(level => level.inLite === true);
    }

    this.levels.sort(this.compareLevels);
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
    const level = levels.find(level => level.id == this.levelSelect.value);
     
    if(globalVars.version.id == 0 && level.inLite == false) {

      const levelsModal = this.containerDiv.querySelector('#prohibited-levels-modal');
      const levelsModalHeader = levelsModal.querySelector('h5');
      const levelsModalText = levelsModal.querySelector('.modal-text');
      const levelsModalOkBtn = levelsModal.querySelector('a');

      levelsModalHeader.innerHTML = texts.levelsModalHeaderText[this.lang];
      levelsModalText.innerHTML = texts.levelsModalText[this.lang];
      levelsModalOkBtn.innerHTML = texts.levelsModalOk[this.lang];
      
      const instance = M.Modal.init(levelsModal, {});
      instance.open();

      this.levelSelect.value = this.selectedLevel.id;
      this.initGuiComponents();
    } else {
      this.selectedLevel = this.levels.find(level => level.id == this.levelSelect.value);
      this.saveData();
    }
  }

  loadData() {
    if (localStorage.getItem(this.levelKey) !== null) {
      this.selectedLevel = JSON.parse(localStorage.getItem(this.levelKey));
    }
  }

  saveData() {
    localStorage.setItem(this.levelKey, JSON.stringify(this.selectedLevel));
  }

  getSelectedLevel() {
    return this.selectedLevel;
  }

  compareLevels( a, b ) {
    if ( a.order < b.order ){
      return -1;
    }
    if ( a.order > b.order ){
      return 1;
    }
    return 0;
  }
}

