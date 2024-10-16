export declare const TEMPLATE_DIR: string;
export declare const TEMPLATE_FILE = "bpcli-templates.json";
export declare class TemplateServiceImpl {
    private templatesFilePath;
    constructor();
    getTemplates(): TemplateList;
    private writeFile;
    addTemplate(newTemplate: TemplateProps): void;
    deleteTemplate(name: string): void;
    updateTemplate(name: string, updatedTemplate: TemplateProps): void;
    listContainsName(term: string): string[];
    getByName(name: string): TemplateProps | null;
}
