import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch");

export const getDynamicValidCredentials = () => {
  let userCounter = localStorage.getItem("userCounter")
    ? parseInt(localStorage.getItem("userCounter"))
    : 30;

  const id = String(userCounter);

  localStorage.setItem("userCounter", String(userCounter + 1));

  return { trackingId: id, password: id };
};
