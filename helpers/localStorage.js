import { isEmpty } from "lodash";

export const getDataLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  return isEmpty(data) ? null : JSON.parse(data);
};

export const saveDataLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const removeDataLocalStorage = (name) => {
  localStorage.removeItem(name);
};
