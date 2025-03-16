import { readFile, writeFile } from "node:fs/promises";

export const readJsonFile = async (path) => {
  try {
    const data = await readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file at ${path}:`, error);
    throw error;
  }
};

export const writeJsonFile = async (path, data) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await writeFile(path, jsonString);
    console.log(`✓ Successfully wrote to ${path}`);
  } catch (error) {
    console.error(`Error writing JSON file at ${path}:`, error);
    throw error;
  }
};