import { input, search } from "@inquirer/prompts";
import { Command } from "commander";
import { TemplateServiceImpl } from "../services/templateService.js";
export default function updateTemplate() {
    const command = new Command("update");
    const templateService = new TemplateServiceImpl();
    command.description("Update template").action(async () => {
        try {
            const searchedName = await search({
                message: "Select the template you want to update:",
                source: term => {
                    if (!term)
                        return [];
                    return templateService.listContainsName(term);
                }
            });
            const currentTemplate = templateService.getByName(searchedName);
            const name = await input({
                message: "Enter the template name:",
                default: currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.name
            });
            const url = await input({
                message: "Enter the template repository url:",
                default: currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.url
            });
            const branch = await input({
                message: "New branch: ",
                default: currentTemplate === null || currentTemplate === void 0 ? void 0 : currentTemplate.branch
            });
            templateService.updateTemplate(name, { branch, name, url });
        }
        catch {
            console.log("Template not found!");
        }
    });
    return command;
}
