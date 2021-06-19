import modalTemplate from '../templates/modal-card-details.hbs';

const refs = {
  daysSpan: document.querySelector('[data-value="days"]'),
  hoursSpan: document.querySelector('[data-value="hours"]'),
  minsSpan: document.querySelector('[data-value="mins"]'),
  secsSpan: document.querySelector('[data-value="secs"]'),
};

export default class CountdownTimer {
  constructor({selector, targetDate, refs}) {
    // const dateNow = Date.now();
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = refs;
    this.timer = document.querySelector(selector);
    this.time = 0;
    this.intervalId = null;
  };

  start() {
    this.intervalId = setInterval(() => {
        const curentDate = Date.now();
        this.time = this.targetDate - curentDate;
        // console.log(time);
        // const { days, hours, mins, secs } 
      let updateClockInfo = this.getTimeComponents(this.time);
      this.updateClockface(updateClockInfo);
        // console.log(`${days}:${hours}:${mins}:${secs}`);
      // updateClockface({ days, hours, mins, secs });
      }, 1000);
  };
  
  updateClockface(updateClockInfo) {
    refs.daysSpan.textContent = `${updateClockInfo.days}`;
    refs.hoursSpan.textContent = `${updateClockInfo.hours}`;
    refs.minsSpan.textContent = `${updateClockInfo.mins}`;
    refs.secsSpan.textContent = `${updateClockInfo.secs}`;
  };

  getTimeComponents(time) {
    
    function pad(value) {
      return String(value).padStart(2, '0');
    };
    /*
    * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
    */
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
    * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    * остатка % и делим его на количество миллисекунд в одном часе
    * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
    */
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    /*
    * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
    */
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
    * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    * миллисекунд в одной секунде (1000)
    */
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
};
