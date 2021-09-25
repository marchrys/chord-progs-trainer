class Utilities {
  constructor() {
  }

  static getRandomArrayItem(array) {
    const randItem = array[Math.floor(Math.random()*array.length)];

    return randItem;
  }

  static getPercentage(firstNum, secondNum) {
    let percentage;

    if(secondNum == 0) {
      percentage = 0;
    } else {
      percentage = Math.round((firstNum * 100) / secondNum);
    }

    return percentage;
  }
}

