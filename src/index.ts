import core from "@actions/core"
import github from "@actions/github"
import { App, Octokit } from "octokit"

try {

  // Create the Octokit.
  const accessToken = core.getInput("github-token", {required: false});
  let octokit: Octokit | ReturnType<(typeof github)["getOctokit"]>;
  if (accessToken) {

    octokit = github.getOctokit(accessToken);

  } else {
      
    const appID = core.getInput("github-app-id", {required: true});
    const privateKey = core.getInput("github-app-private-key", {required: true});
    const installationID = parseInt(core.getInput("github-app-installation-id", {required: true}), 10);

    const app = new App({
      appId: appID,
      privateKey
    });
    
    octokit = await app.getInstallationOctokit(installationID); // Get the installation ID from the GitHub app settings.

  }

  // Get the project ID from the number.
  const projectNumber = parseInt(core.getInput("github-project-number", {required: true}), 10);
  const repositoryOwner = core.getInput("github-repository-owner", {required: false}) ?? github.context.repo.owner;
  const repositoryName = core.getInput("github-repository-name", {required: false}) ?? github.context.repo.repo;
  console.log(github.context.repo);
  const response = await octokit.graphql<{
    repository: {
      projectV2: {
        id: string
      }
    }
  }>(`
    query getProjectID($repositoryName: String!, $repositoryOwner: String!, $projectNumber: Int!) {
      repository(name: $repositoryName, owner: $repositoryOwner) {
        projectV2(number: $projectNumber) {
          id
        }
      }
    }
  `, {
    repositoryName,
    repositoryOwner,
    projectNumber
  });

  core.setOutput("github-project-id", response.repository.projectV2.id);

} catch (error) {

  core.setFailed(error instanceof Error ? error : "Unknown error.");

}