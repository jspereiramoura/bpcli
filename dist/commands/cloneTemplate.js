import { input, search } from "@inquirer/prompts";
import { Command } from "commander";
import { TemplateServiceImpl } from "../services/templateService.js";
import { GitUtilsImpl } from "../utils/gitUtils.js";
export default function cloneTemplate() {
    const command = new Command("clone");
    const templateService = new TemplateServiceImpl();
    command.description("Clone template").action(async () => {
        try {
            const name = await search({
                message: "Enter the template name:",
                source: term => {
                    if (!term)
                        return [];
                    return templateService.listContainsName(term);
                }
            });
            const template = templateService.getByName(name);
            const path = await input({ message: "Project path:" });
            if (template) {
                GitUtilsImpl.cloneRepository({ path, template });
            }
        }
        catch {
            console.log("Template not found!");
        }
    });
    return command;
}
