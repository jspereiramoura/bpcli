import fs from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
export const TEMPLATE_DIR = homedir();
export const TEMPLATE_FILE = "bpcli-templates.json";
export class TemplateServiceImpl {
    constructor() {
        this.templatesFilePath = path.join(TEMPLATE_DIR, TEMPLATE_FILE);
    }
    getTemplates() {
        if (fs.existsSync(this.templatesFilePath)) {
            const data = fs.readFileSync(this.templatesFilePath, "utf-8");
            return JSON.parse(data);
        }
        return [];
    }
    writeFile(templates) {
        fs.writeFileSync(this.templatesFilePath, JSON.stringify(templates, null, 2), "utf-8");
    }
    addTemplate(newTemplate) {
        const templates = this.getTemplates();
        templates.push(newTemplate);
        this.writeFile(templates);
    }
    deleteTemplate(name) {
        const templates = this.getTemplates().filter(template => template.name !== name);
        this.writeFile(templates);
    }
    updateTemplate(name, updatedTemplate) {
        const templates = this.getTemplates().map(template => {
            if (template.name === name)
                return updatedTemplate;
            return template;
        });
        this.writeFile(templates);
    }
    listContainsName(term) {
        return this.getTemplates()
            .map(template => template.name)
            .filter(name => name.includes(term));
    }
    getByName(name) {
        var _a;
        return (_a = this.getTemplates().find(template => template.name === name)) !== null && _a !== void 0 ? _a : null;
    }
}
