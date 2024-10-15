declare type templateProps = {
  name: string;
  url: string;
  branchName: string;
};

declare interface TemplateService {
  getTemplates(): Record<string, string>;
  addTemplate(...props: templateProps): void;
  deleteTemplate(templateName: string): void;
  updateTemplate(...props: templateProps): void;
}

declare interface GitUtils {
  cloneRepository(
    repoUrl: string,
    targetPath: string,
    branchName?: string
  ): Promise<void>;
}
