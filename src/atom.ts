import { atom } from "recoil";

const isDarkMode = atom({
  key: "isDarkMode",
  default: false,
});

export { isDarkMode };
