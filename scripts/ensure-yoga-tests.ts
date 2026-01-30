#!/usr/bin/env bun
/**
 * Ensure Yoga test files exist, generating them if needed.
 * Called as a pretest script before running yoga tests.
 */

import { existsSync } from "fs";

const implementedDir = new URL("../tests/yoga/implemented", import.meta.url).pathname;

if (!existsSync(implementedDir)) {
  console.log("Generating Yoga tests...");
  await import("./import-yoga-tests.ts");
}
