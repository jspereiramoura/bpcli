import { Command } from "commander";
import { TemplateServiceImpl } from "../services/templateService.js";
import { input } from "@inquirer/prompts";

export default function addNewTemplate(): Command {
  const command = new Command("add");

  command.description("Add a new template").action(async () => {
    const name = await input({ message: "Enter the template name:" });
    const url = await input({ message: "Enter the template repository url:" });
    const branch = await input({
      message: "Enter the template branch (default: main)",
      default: "main"
    });

    const templateService = new TemplateServiceImpl();

    templateService.addTemplate({
      url,
      branch,
      name
    });
  });

  return command;
}
