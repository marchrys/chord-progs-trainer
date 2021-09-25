// This is a JavaScript file
// App module
let app = {
  lang: null,
  init: function(){
      initSounds();

      const langStr = window.navigator.language;

      //On détecte la langue de l'appareil
      if(langStr.substr(0, 2) == 'fr'){
          app.lang = 'fr';
      }
      else{
          app.lang = 'en';
      }

      //On d辿finit le titre de l'appli
      document.getElementById('app-title').textContent = texts.appTitle[app.lang];

      screens.forEach(function(screen) {
        //On ajoute les tabs
        document.getElementById("tabs-container").innerHTML += 
        '<li class="tab">' +
            '<a href="#' + screen.containerDiv + '"  id="' + screen.containerDiv + '-tab">' + screen.title[app.lang] + '</a>' +
        '</li>';
      });

      const settings = new Settings(app.lang);
      const training = new Training(app.lang, settings);

      // Création d'un nouvel objet Training sur le click sur la première tab
      const tabs = document.querySelectorAll('.tab');
      tabs[0].addEventListener('click', function() {
        training.displayLevel();
         training.clearSelects();
         training.initGuiComponents();
         training.setButtonsState([false, true, true, true]);
         training.displayScore();
         training.initFeedback();
      });

      let elem = document.querySelector('.tabs'); 
      let instance = M.Tabs.init(elem, {});
  }
}

document.addEventListener("deviceready", app.init, false);