class Scheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.count = 0;
  }

  add(time, order) {
    const promiseCreator = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time);
      });

    this.queue.push(promiseCreator);
  }

  startRequest() {
    let i = 0;
    while (i <= this.limit) {
      this.request();
      i++;
    }
  }

  request() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count += 1;
    this.queue
      .shift()()
      .then(() => {
        this.count -= 1;
        this.request();
      });
  }
}

const sch = new Scheduler(2);

function addTask(time, order) {
  sch.add(time, order);
}

addTask(300, "a");
addTask(1000, "b");
addTask(500, "c");
addTask(100, "d");
sch.startRequest();
