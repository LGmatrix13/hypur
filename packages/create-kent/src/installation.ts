import { sleep } from "./sleep";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";

export async function installation() {
  const spinner = createSpinner("Installing kent...").start();
  await sleep(500);
  exec("echo npm install kent", (error) => {
    if (error !== null) {
      spinner.reset();
      spinner.error({ text: "Failed to install kent" });
      process.exit(1);
    } else {
      spinner.reset();
      spinner.success({ text: "kent installed" });
    }
  });
}
