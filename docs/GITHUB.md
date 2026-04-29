# GitHub Integration Guidelines

This document provides information about how the carrillo.app project integrates with GitHub and guidelines for managing the GitHub repository effectively.

## Repository Structure

The carrillo.app project is hosted on GitHub at [https://github.com/carrilloapps/carrilloapps](https://github.com/carrilloapps/carrilloapps). The repository follows a standard structure:

- `main` branch: Production code
- `develop` branch: Development and integration
- Feature branches: Created for specific features or issues

## GitHub Configuration

### Branch Protection

The `main` branch is protected with the following rules:
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Include administrators in these restrictions

### Required Status Checks

- CI workflow (linting, building)
- Security scanning
- Dependency validation

## GitHub Actions

The repository uses GitHub Actions for automation. The workflows are defined in the `.github/workflows` directory:

- `ci.yml`: Continuous Integration workflow that runs on pull requests and pushes to main
- `deploy.yml`: Deployment workflow that runs when changes are merged to main
- `dependency-check.yml`: Regular check for dependency updates and vulnerabilities

## Issue Management

### Issue Templates

The repository includes templates for different types of issues:
- Bug reports: `.github/ISSUE_TEMPLATE/bug_report.md`
- Feature requests: `.github/ISSUE_TEMPLATE/feature_request.md`
- Documentation updates: `.github/ISSUE_TEMPLATE/documentation.md`

### Issue Labels

Issues are categorized with labels:
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

### Project Boards

GitHub Projects is used to track the progress of issues and pull requests. The main project board has the following columns:
- To Do: Not started
- In Progress: Currently being worked on
- Review: Ready for review
- Done: Completed tasks

## Pull Request Process

1. Create a new branch from `develop` (or `main` for hotfixes)
2. Make your changes and commit them
3. Open a pull request against the base branch
4. Fill in the pull request template
5. Request reviews from team members
6. Address review comments
7. Once approved, merge the pull request

### Pull Request Template

A template for pull requests is provided at `.github/PULL_REQUEST_TEMPLATE.md`. It includes:
- Description of changes
- Related issue(s)
- Type of change
- Testing information
- Checklist for the author

## Release Process

1. Merge all desired changes to the `develop` branch
2. Test thoroughly on the `develop` branch
3. Create a release branch `release/vX.Y.Z`
4. Make any final adjustments and version updates
5. Merge to `main` and create a GitHub Release
6. Tag the release with the appropriate version number

### Release Notes

Release notes should include:
- Summary of the release
- New features
- Bug fixes
- Breaking changes
- Dependencies updated
- Contributors

## GitHub Features Used

### Discussions

GitHub Discussions is enabled for:
- Q&A
- Ideas and feedback
- General community discussions

### Wiki

The GitHub Wiki contains supplementary documentation:
- User guides
- FAQs
- Troubleshooting

### GitHub Pages

GitHub Pages is used to host:
- API documentation
- Code coverage reports
- Other static documentation

## Security

### Dependency Management

- Dependabot is configured to check for dependency updates
- Security advisories are monitored and addressed promptly

### Security Scanning

- CodeQL is configured to scan for security vulnerabilities
- SAST (Static Application Security Testing) is performed on all pull requests

### Security Policy

The security policy is defined in `SECURITY.md` and outlines:
- Supported versions
- Reporting a vulnerability
- Expected response time
- Disclosure process

## Contributing Through GitHub

Community contributions are welcome. The process is outlined in `CONTRIBUTING.md`:

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit a pull request
5. Respond to feedback

## Continuous Integration

The CI workflow includes:
1. Installing dependencies
2. Linting code
3. Building the project
4. Running tests
5. Analyzing code quality

## Continuous Deployment

The CD workflow includes:
1. Building the project
2. Running tests
3. Deploying to staging environment
4. Promoting to production after approval

## GitHub Integrations

The repository is integrated with:
- Vercel for deployments
- CodeCov for test coverage reporting
- Snyk for security vulnerability scanning
- LGTM for code quality analysis

## Best Practices

1. Keep PRs small and focused
2. Use meaningful commit messages
3. Reference issues in commits and PRs
4. Keep the repository clean (no build artifacts)
5. Document changes thoroughly

## Contact

For questions about GitHub integration or repository management, contact José Carrillo at junior@carrillo.app.
