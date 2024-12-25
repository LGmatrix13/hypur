import { input } from "@inquirer/prompts";
import { confirm } from "@inquirer/prompts";
import { createSpinner } from "nanospinner";
import fs from "node:fs";
import path from "node:path";
import { sleep } from "./sleep";

async function seedDirectory(directory: string) {
  const spinner = createSpinner("Adding kent...").start();
  await sleep(200);

  const directoryPath = path.resolve(process.cwd(), directory);

  if (fs.existsSync(directoryPath)) {
    spinner.error({ text: `The directory ${directoryPath} already exists` });
  } else {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      spinner.success({
        text: `kent is now chilling in ${directoryPath}!`,
      });
    } catch (error) {
      spinner.error(`Failed to add kent to "${directoryPath}"`);
      console.error((error as Error).message);
      process.exit(1);
      return;
    }
  }
}

async function seedStarter(directory: string) {
  const spinner = createSpinner("Adding starter...").start();
  await sleep(200);
  const directoryPath = path.resolve(process.cwd(), directory);

  if (fs.existsSync(directoryPath)) {
    const sourceFile = "./starter.ts";
    const destination = path.resolve(directoryPath, sourceFile);
    fs.copyFile(sourceFile, destination, (error) => {
      if (error !== null) {
        spinner.error(`Failed to add starter to "${directoryPath}"`);
        console.error(error.message);
        process.exit(1);
      } else {
        spinner.success({ text: "Added starter!" });
      }
    });
  } else {
    spinner.error({ text: `The directory ${directoryPath} does not exist` });
  }
}

export async function configuration() {
  console.log();
  const directory = await input({
    message: "What directory would you like kent to live?",
  });
  await seedDirectory(directory);
  const starter = await confirm({
    message: "Would you like the starter?",
  });
  if (starter) {
    await seedStarter(directory);
  }
}
