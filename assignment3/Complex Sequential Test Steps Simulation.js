const login = (retryCount = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) return resolve('Login OK');

      if (retryCount > 1) {
        return login(retryCount - 1, delay * 2)
          .then(resolve)
          .catch(reject);
      }

      reject('Login failed');
    }, delay);
  });
};

const clickButton = (retryCount = 2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) return resolve('Button OK');

      if (retryCount > 1) {
        return clickButton(retryCount - 1)
          .then(resolve)
          .catch(reject);
      }

      reject('Button failed twice');
    }, 2000);
  });
};

const verifyDashboard = (retryCount = 2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) return resolve('Dashboard OK');

      if (retryCount > 1) {
        return verifyDashboard(retryCount - 1)
          .then(resolve)
          .catch(reject);
      }

      reject('Dashboard failed');
    }, 1000);
  });
};

const runTest = async () => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject('Timeout 8s'), 8000)
  );

  const flow = (async () => {
    const l = await login();
    console.log(l);

    const c = await clickButton();
    console.log(c);

    const v = await verifyDashboard();
    console.log(v);

    return 'All steps done';
  })();

  return Promise.race([flow, timeout]);
};

runTest().then(console.log).catch(console.error);
