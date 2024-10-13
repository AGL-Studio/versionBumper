import { readJsonFile } from "./file.js";

const CONF_PATH = "versionBump.conf.json";

export const checkForConf = async () => {
  try {
    return await readJsonFile(CONF_PATH);
  } catch (error) {
    console.error(`Error reading JSON file at ${CONF_PATH}:`, error.message);
    return {};
  }
};