const createRetryWrapper = (fn, maxTries) => {
  let attempts = 0;

  function wrapper() {
    attempts++;

    if (fn()) {
      console.log(`Attempt ${attempts}: Success!`);
      return true;
    }

    console.log(`Attempt ${attempts}: Failed!`);

    if (attempts < maxTries) {
      return wrapper();
    }

    console.log('Max retries exceeded');
    return false;
  }

  return wrapper;
};

const fn = () => Math.random() > 0.5;

const wrapper = createRetryWrapper(fn, 3);
wrapper();
