#!/usr/bin/env node
import inquirer from "inquirer";
import { checkForConf } from "./utils/config.js";
import { updateAllVersions } from "./utils/version.js";
import { pushToGit } from "./utils/git.js";

const VALID_VERSION_TYPES = ["major", "minor", "patch"];

const parseArgs = () => {
  const args = process.argv.slice(2);
  const config = {
    configPath: null
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" || args[i] === "-c") {
      config.configPath = args[i + 1];
      i++;
    }
  }

  return config;
};

const main = async () => {
  const { configPath } = parseArgs();
  const conf = await checkForConf(configPath);

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "versionType",
      message: "What type of change?",
      choices: VALID_VERSION_TYPES,
    },
    {
      type: "input",
      name: "commitMessage",
      message: "Enter the commit message:",
    },
    {
      type: "confirm",
      name: "updateEnv",
      message: "Do you want to update the .env file?",
      default: false,
      when: () => conf.changeEnv === undefined && !conf.files,
    },
  ]);

  const { versionType, commitMessage } = answers;
  
  // Create a working config that includes user answers
  const workingConfig = { ...conf };
  if (conf.changeEnv === undefined && !conf.files) {
    workingConfig.changeEnv = answers.updateEnv;
  }

  const newVersion = await updateAllVersions(versionType, workingConfig);

  if (!conf.skipGitCheck) {
    await pushToGit(newVersion, commitMessage);
  }
};

main().catch((error) => {
  console.error("Error in main execution:", error);
  process.exit(1);
});