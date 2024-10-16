import fs from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

export const TEMPLATE_DIR = homedir();
export const TEMPLATE_FILE = "bpcli-templates.json";

export class TemplateServiceImpl {
  private templatesFilePath: string;

  constructor() {
    this.templatesFilePath = path.join(TEMPLATE_DIR, TEMPLATE_FILE);
  }

  public getTemplates(): TemplateList {
    if (fs.existsSync(this.templatesFilePath)) {
      const data = fs.readFileSync(this.templatesFilePath, "utf-8");
      return JSON.parse(data) as TemplateList;
    }

    return [];
  }

  private writeFile(templates: TemplateList): void {
    fs.writeFileSync(
      this.templatesFilePath,
      JSON.stringify(templates, null, 2),
      "utf-8"
    );
  }

  addTemplate(newTemplate: TemplateProps): void {
    const templates = this.getTemplates();
    templates.push(newTemplate);

    this.writeFile(templates);
  }

  deleteTemplate(name: string): void {
    const templates = this.getTemplates().filter(
      template => template.name !== name
    );

    this.writeFile(templates);
  }

  updateTemplate(name: string, updatedTemplate: TemplateProps): void {
    const templates = this.getTemplates().map(template => {
      if (template.name === name) return updatedTemplate;
      return template;
    });

    this.writeFile(templates);
  }

  listContainsName(term: string) {
    return this.getTemplates()
      .map(template => template.name)
      .filter(name => name.includes(term));
  }

  getByName(name: string): TemplateProps | null {
    return this.getTemplates().find(template => template.name === name) ?? null;
  }
}
