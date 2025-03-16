import { readFile, writeFile } from "node:fs/promises";
import { readJsonFile, writeJsonFile } from "./file.js";

const PACKAGE_PATH = "package.json";

export const updatePackageVersion = async (versionType) => {
  const packageJson = await readJsonFile(PACKAGE_PATH);
  let [major, minor, patch] = packageJson.version.split(".").map(Number);

  switch (versionType) {
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor += 1;
      patch = 0;
      break;
    case "patch":
      patch += 1;
      break;
    default:
      throw new Error(`Invalid version type: ${versionType}`);
  }

  const newVersionString = `${major}.${minor}.${patch}`;
  console.log(
    `Updating ${versionType} version ${packageJson.version} -> ${newVersionString}`
  );

  packageJson.version = newVersionString;
  await writeJsonFile(PACKAGE_PATH, packageJson);

  return packageJson.version;
};

export const updateEnv = async (newVersion, envPath, envVersionValue) => {
  try {
    const envFile = await readFile(envPath, "utf8");
    const regex = new RegExp(`(^|\\n)${envVersionValue}\\s*=.*`, "m");
    
    if (!regex.test(envFile)) {
      console.warn(`Warning: Key "${envVersionValue}" not found in ${envPath}. Adding it.`);
      const newEnvFile = envFile + `\n${envVersionValue}=${newVersion}`;
      await writeFile(envPath, newEnvFile);
    } else {
      const newEnvFile = envFile.replace(
        regex,
        `$1${envVersionValue}=${newVersion}`
      );
      await writeFile(envPath, newEnvFile);
    }
    console.log(`✓ Updated version in ${envPath}: ${envVersionValue}=${newVersion}`);
  } catch (error) {
    console.error(`Error updating environment file at ${envPath}:`, error);
    throw error;
  }
};

export const updateAllVersions = async (versionType, config) => {
  const newVersion = await updatePackageVersion(versionType);
  
  if (config.files && Array.isArray(config.files)) {
    for (const file of config.files) {
      if (file.path === PACKAGE_PATH) continue;
      
      if (file.type === "env") {
        console.log(`Updating env file: ${file.path} with key: ${file.key}`);
        await updateEnv(newVersion, file.path, file.key);
      } else if (file.type === "json") {
        // Handle other file types as needed
        console.log(`JSON file handling for ${file.path} not implemented yet`);
      }
    }
  }
  else if (config.changeEnv) {
    const envPath = config.envVersionFile || ".env";
    const envVersionValue = config.envVersionValue || "VERSION";
    await updateEnv(newVersion, envPath, envVersionValue);
  }
  
  return newVersion;
};