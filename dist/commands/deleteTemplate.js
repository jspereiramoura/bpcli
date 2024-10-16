import { search } from "@inquirer/prompts";
import { Command } from "commander";
import { TemplateServiceImpl } from "../services/templateService.js";
export default function deleteTemplate() {
    const command = new Command("rm");
    const templateService = new TemplateServiceImpl();
    command.description("Delete template").action(async () => {
        try {
            const name = await search({
                message: "Enter the template name for deletion:",
                source: term => {
                    if (!term)
                        return [];
                    return templateService.listContainsName(term);
                }
            });
            templateService.deleteTemplate(name);
        }
        catch {
            console.log("Template not found!");
        }
    });
    return command;
}
