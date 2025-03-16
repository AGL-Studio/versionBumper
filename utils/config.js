import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const DEFAULT_CONFIG_PATH = "versionBump.conf.json";

export const checkForConf = async (customConfigPath) => {
  const configPath = customConfigPath || DEFAULT_CONFIG_PATH;
  
  try {
    if (!existsSync(configPath)) {
      console.log(`No config file found at ${configPath}, using defaults`);
      return { changeEnv: false };
    }
    
    const confData = await readFile(configPath, "utf8");
    const conf = JSON.parse(confData);
    console.log(`Loaded configuration from ${configPath}`);
    return conf;
  } catch (error) {
    console.error(`Error reading config file ${configPath}:`, error);
    return { changeEnv: false };
  }
};