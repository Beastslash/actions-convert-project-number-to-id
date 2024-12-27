# actions-get-project-id-from-number
A GitHub action to get a project ID from its number.

## Inputs
| Name | Description | Required? |
| :- | :- | :- |
| `github-project-number` | The number of the project that you want to find the ID of. | Yes |
| `github-repository-name` | The name of the project's repository. If not provided, the workflow will default to its own repository. | No |
| `github-repository-owner` | The owner of the project's repository. If not provided, the workflow will default to its own repository owner. | No |
| `github-app-id` | The app ID of the GitHub app that you are authenticating with. | Only if `github-personal-access-token` is not provided |
| `github-app-private-key` | A private key of the GitHub app that you are authenticating with. | Only if `github-personal-access-token` is not provided |
| `github-app-installation-id` | The ID of the installation that you are authenticating with.<br /><br />You can get this from checking the URL after hitting "Configure" at `https://github.com/{USER or ORGANIZATION}/{REPOSITORY}/settings/installations`. | Only if `github-personal-access-token` is not provided |
| `github-personal-access-token` | The personal access token that you are authenticating with. [GITHUB_TOKEN won't work because they currently cannot access projects.](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions#github-actions-workflows) | Only if `github-app-id`, `github-app-private-key`, and `github-app-installation-id` are not provided |

## Outputs
| Name | Description |
| :- | :- |
| `GITHUB_PROJECT_ID` | The requested project ID. |

## Permissions
Your GitHub app installation or your personal access token must have at least the following permissions:
* Read access to projects (Organization permissions > Projects)

## Example usage
```yml
- name: Convert project number to ID
  id: convert_project_number_to_id
  uses: Beastslash/actions-get-project-id-from-number@v1.0.0
  with:
    github-project-number: ${{ vars.ISSUES_SYNC_GITHUB_PROJECT_NUMBER }}
    github-app-id: ${{ vars.ISSUES_SYNC_GITHUB_APP_ID }}
    github-app-private-key: ${{ secrets.ISSUES_SYNC_GITHUB_APP_PRIVATE_KEY }}
    github-app-installation-id: ${{ vars.ISSUES_SYNC_GITHUB_APP_INSTALLATION_ID }}
```
