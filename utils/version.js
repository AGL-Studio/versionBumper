import { readFile, writeFile } from "node:fs/promises";
import { readJsonFile, writeJsonFile } from "./file.js";

const PACKAGE_PATH = "package.json";

export const updatePackageVersion = async (versionType) => {
  const packageJson = await readJsonFile(PACKAGE_PATH);
  let [major, minor, patch] = packageJson.version.split(".").map(Number);

  switch (versionType) {
    case "major":
      major += 1;
      break;
    case "minor":
      minor += 1;
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
    const newEnvFile = envFile.replace(
      new RegExp(`^${envVersionValue}\\s*=\\s*.*`, "m"),
      `${envVersionValue}=${newVersion}`
    );
    await writeFile(envPath, newEnvFile);
  } catch (error) {
    console.error(`Error updating environment file at ${envPath}:`, error);
    throw error;
  }
};