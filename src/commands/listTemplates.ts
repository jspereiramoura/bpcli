import { Command } from "commander";
import { TemplateServiceImpl } from "../services/templateService.js";

export default function listTemplates(): Command {
  const command = new Command("list");

  command.description("List all templates").action(() => {
    const templateService = new TemplateServiceImpl();

    console.log(JSON.stringify(templateService.getTemplates(), null, 2));
  });

  return command;
}
