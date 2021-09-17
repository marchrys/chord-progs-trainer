class Utilities {
  constructor() {
  }

  static getRandomArrayItem(array) {
    const randItem = array[Math.floor(Math.random()*array.length)];

    return randItem;
  }
}

