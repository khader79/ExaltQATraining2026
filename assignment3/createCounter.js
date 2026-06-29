const createCounter = (initialValue = 0, step = 1) => {
  let count = initialValue;
  return {
    increment: () => (count += step),
    decrement: () => {
      if (count - step < 0) {
        console.log('Count cannot go below zero');
        return;
      }
      count -= step;
    },
    reset: () => (count = initialValue),
    getValue: () => count,
  };
};

const counter = createCounter(5, 2);
console.log(counter.getValue());
counter.increment();
console.log(counter.getValue());
counter.decrement();
console.log(counter.getValue());
counter.decrement();
console.log(counter.getValue());
counter.reset();
console.log(counter.getValue());
