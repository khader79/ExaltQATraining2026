const getUserData = () => {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation to fetch user data
    setTimeout(() => {
      const userData = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      };

      if (typeof userData.id !== "number") {
        reject("The user id is not a number");
      } else {
        resolve(userData);
      }
    }, 2000);
  })
    .then((m) => {
      console.log(m);
    })
    .catch((e) => {
      console.log(e);
    });
};

getUserData();
