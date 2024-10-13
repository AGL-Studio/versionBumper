import { readFile, writeFile } from "node:fs/promises";

export const readJsonFile = async (path) => {
  try {
    const fileData = await readFile(path, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading JSON file at ${path}:`, error);
    throw error;
  }
};

export const writeJsonFile = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing JSON file at ${path}:`, error);
    throw error;
  }
};