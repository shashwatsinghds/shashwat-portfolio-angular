# Environment Configuration

This directory contains environment configuration files for the Angular application.

## Setup Instructions

1. Copy the template files to create your actual environment files:
   ```bash
   cp environment.template.ts environment.ts
   cp environment.prod.template.ts environment.prod.ts
   ```

2. Update the copied files with your actual values:
   - Replace `YOUR_GITHUB_USERNAME` with your GitHub username
   - Replace `YOUR_GITHUB_TOKEN` with your GitHub personal access token

## Security Note

- The actual environment files (`environment.ts` and `environment.prod.ts`) are gitignored
- Only the template files are committed to the repository
- Never commit files containing real tokens or sensitive data

## GitHub Token

To create a GitHub personal access token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with appropriate permissions
3. Use the token in your environment files
