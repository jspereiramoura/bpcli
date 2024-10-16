#!/usr/bin/env node

import { Command } from "commander";
import addNewTemplate from "./commands/addTemplate.js";
import deleteTemplate from "./commands/deleteTemplate.js";
import listTemplates from "./commands/listTemplates.js";
import updateTemplate from "./commands/updateTemplate.js";
import cloneTemplate from "./commands/cloneTemplate.js";

const program = new Command();

program
  .name("bpcli")
  .description("A CLI tool for managing boilerplate templates")
  .version("1.0.0", "-v,--version");

program
  .addCommand(addNewTemplate())
  .addCommand(listTemplates())
  .addCommand(updateTemplate())
  .addCommand(deleteTemplate())
  .addCommand(cloneTemplate());

program.parse(process.argv);
