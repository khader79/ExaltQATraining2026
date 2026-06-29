const fetchUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("User fetced");
    }, 2000);
  }).then((m) => {
    console.log(m);
  });
};

const fetchOrders = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Orders fetched");
    }, 3000);
  }).then((m) => {
    console.log(m);
  });
};

const runSequential = async () => {
  console.time("Sequential");
  await fetchUser();
  await fetchOrders();
  console.timeEnd("Sequential");
};

const runParallel = () => {
  console.time("Parallel");
  return Promise.all([fetchUser(), fetchOrders()]).then(() => {
    console.timeEnd("Parallel");
  });
};
runSequential();
runParallel();
