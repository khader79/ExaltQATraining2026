const waitFor = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done"), ms);
  });
};

const waitForFunction = async (ms) => {
  console.log("First");
  const result = await waitFor(ms);
  console.log(result);
  console.log("Second");
  return result;
};
waitForFunction(2000);
