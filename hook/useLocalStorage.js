import {
  getDataLocalStorage,
  removeDataLocalStorage,
  saveDataLocalStorage,
} from "helpers/localStorage";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";

export default function useLocalStorage(key, inititalValue) {
  const [data, setData] = useState(inititalValue);
  useEffect(() => {
    const dataStorage = getDataLocalStorage(key);
    if (dataStorage) setData(dataStorage);
  }, []);
  useEffect(() => {
    if (isEqual(data, inititalValue)) removeDataLocalStorage(key);
    else saveDataLocalStorage(key, data);
  }, [data]);
  return [data, setData];
}
