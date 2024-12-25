#!/usr/bin/env/ node

import { configuration } from "./configuration";
import { installation } from "./installation";
import { welcome } from "./welcome";

async function main() {
  welcome();
  await installation();
  await configuration();
}

await main();
