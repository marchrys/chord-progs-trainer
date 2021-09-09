// class Rhythmplayer{
//     constructor(soundUrl){
//         this.context = '';
//         this.bufferLoader = '';
//         this.startTime = 0.1;

//         // Fix up prefixing
//         window.AudioContext = window.AudioContext || window.webkitAudioContext;
//         this.context = new AudioContext();
    
//         this.bufferLoader = new BufferLoader(
//         this.context,
//         [
//             soundUrl
//         ],
//         this.finishedLoading
//         );
    
//         this.bufferLoader.load();
//     }

//     finishedLoading(bufferList) {
//         this.kick = bufferList[0];
//     }

//     playSound(buffer, time) {
//         var source = this.context.createBufferSource();
//         source.buffer = buffer;
//         source.connect(this.context.destination);
//         source.start(this.startTime + time);
//     }

//       playPhrase(phraseDurations){
//           var notesTiming = [];
//           notesTiming.push(this.startTime);
//           for(var i=0; i<phraseDurations.length-1; i++){
//               notesTiming.push(notesTiming[i] + phraseDurations[i]);
//           }
            
//           notesTiming.forEach((item, index) => {
//               this.playSound(this.kick, item);
//           });
//       }
// }

let allSoundsLoaded = false;
var C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4;
var C5, Db5, D5, Eb5, E5, F5, Gb5, G5, Ab5, A5, Bb5, B5;
var soundNoteNames = [
  'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
  'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5'
];
const sounds = [];

soundNoteNames.forEach(function(soundNoteName) {
  sounds.push('sounds/Piano.mf.' + soundNoteName + '.mp3');
});

var context; 
var bufferLoader;
var startTime = 0.1;

function initSounds() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  
    bufferLoader = new BufferLoader(
      context,
      sounds,
      finishedLoadingSound
      );
  
    bufferLoader.load();
}
  
function finishedLoadingSound(bufferList) {
    // soundNotes.forEach(function(soundNote, index) {
    //   soundNote = bufferList[index];
    // });

    C4 = bufferList[0];
    Db4 = bufferList[1];
    D4 = bufferList[2];
    Eb4 = bufferList[3];
    E4 = bufferList[4];
    F4 = bufferList[5];
    Gb4 = bufferList[6];
    G4 = bufferList[7];
    Ab4 = bufferList[8];
    A4 = bufferList[9];
    Bb4 = bufferList[10];
    B4 = bufferList[11];

    C5 = bufferList[12];
    Db5 = bufferList[13];
    D5 = bufferList[14];
    Eb5 = bufferList[15];
    E5 = bufferList[16];
    F5 = bufferList[17];
    Gb5 = bufferList[18];
    G5 = bufferList[19];
    Ab5 = bufferList[20];
    A5 = bufferList[21];
    Bb5 = bufferList[22];
    B5 = bufferList[23];

    allSoundsLoaded = true;
} 

function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
}

function playPhrase(phraseDurations){
    var notesTiming = [];
    notesTiming.push(startTime);
    for(var i=0; i<phraseDurations.length-1; i++){
        notesTiming.push(notesTiming[i] + phraseDurations[i]);
    }
      
    notesTiming.forEach((item, index) => {
        playSound(piano, item);
    })
}

 

 
  
  

  



