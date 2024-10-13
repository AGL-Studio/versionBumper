import { readJsonFile } from "./file.js";

const CONF_PATH = "versionBump.conf.json";

export const checkForConf = async () => {
  try {
    return await readJsonFile(CONF_PATH);
  } catch {
    return {};
  }
};