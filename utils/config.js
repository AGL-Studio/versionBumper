import { readJsonFile } from "./file.js";
import path from "path";

const DEFAULT_CONF_PATH = "versionBump.conf.json";

export const checkForConf = async (configPath = DEFAULT_CONF_PATH) => {
  try {
    const absolutePath = path.isAbsolute(configPath) 
      ? configPath 
      : path.join(process.cwd(), configPath);
    return await readJsonFile(absolutePath);
  } catch (error) {
    console.error(`Error reading JSON file at ${configPath}:`, error.message);
    return {};
  }
};