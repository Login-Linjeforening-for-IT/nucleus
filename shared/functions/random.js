/**
 * Returns a random number between min and max
 * 
 * @param {int} min Lowest acceptable integer
 * @param {int} max Highest acceptable integer
 * @returns 
 */
export default function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }