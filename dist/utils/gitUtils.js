import simpleGit from "simple-git";
export class GitUtilsImpl {
    static cloneRepository({ path, template }) {
        simpleGit()
            .clone(template.url, path, ["-b", template.branch], err => {
            return err
                ? console.error("Clone error")
                : console.log("Successful clone");
        })
            .then(() => {
            simpleGit(path).branch(["-m", "main"]);
        });
    }
}
