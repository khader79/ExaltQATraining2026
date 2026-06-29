const fn = (i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.random();
      if (randomNum > 0.5) {
        resolve("Success!");
      } else {
        reject(i);
      }
    }, 1000);
  });
};

const fetchWithRetry = (fn, retries, backoff, i = 1) => {
  if (retries <= 0) {
    return Promise.reject(new Error("Max retries exceeded"));
  }
  return fn(i)
    .then((result) => {
      console.log(`Attempt succeeded: ${result}`);
    })
    .catch((error) => {
      console.error(`Attempt failed: ${error}`);
      return fetchWithRetry(fn, retries - 1, backoff, i + 1);
    });
};

fetchWithRetry(fn, 3, 1000).catch((error) => {
  console.error(error.message);
});
