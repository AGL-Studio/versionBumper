import { simpleGit } from "simple-git";

const gitOptions = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

export const pushToGit = async (newVersion, commitComment) => {
  const git = simpleGit(gitOptions);
  console.log("Committing changes and pushing to remote...");

  try {
    await git.add(".");
    await git.addTag(`dev-${newVersion}`);
    await git.commit(commitComment);
    await git.pushTags();
    await git.push();
  } catch (error) {
    console.error("Error during git operations:", error);
    process.exit(1);
  }
};