#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { updateAllVersions } from "./utils/version.js";
import { checkForConf } from "./utils/config.js";

const VALID_VERSION_TYPES = ["major", "minor", "patch"];

const main = async () => {
  try {
    // Get version type from command line argument
    const versionType = process.argv[2];
    if (!versionType || !VALID_VERSION_TYPES.includes(versionType)) {
      console.error(`Error: Please provide a valid version type: ${VALID_VERSION_TYPES.join(', ')}`);
      process.exit(1);
    }
    
    // Load configuration
    const config = await checkForConf();
    console.log("Loaded configuration:", JSON.stringify(config, null, 2));
    
    // Update versions
    console.log(`Performing ${versionType} version bump...`);
    const newVersion = await updateAllVersions(versionType, config);
    
    // Verify updates
    console.log(`\nVersion updated to: ${newVersion}`);
    
    // Check if .env was updated
    try {
      const envContent = await readFile(".env", "utf8");
      console.log("\nCurrent .env file content:");
      console.log(envContent);
    } catch (error) {
      console.error("Could not read .env file:", error.message);
    }
    
    console.log("\nVersion bump completed successfully!");
  } catch (error) {
    console.error("Error during version bump test:", error);
    process.exit(1);
  }
};

main();
