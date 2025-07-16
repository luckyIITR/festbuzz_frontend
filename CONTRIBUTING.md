# Contributing to FestBuz Frontend

Thank you for your interest in contributing to the FestBuz Frontend project! We welcome contributions from everyone. Please follow these guidelines to help us maintain a collaborative and efficient workflow.

## Table of Contents
- [Getting Started](#getting-started)
- [Branching Strategy](#branching-strategy)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Code of Conduct](#code-of-conduct)

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luckyIITR/festbuzz_frontend.git
   cd festbuz_frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Common Git Commands

Here are some essential Git commands to help you contribute effectively:

- **Clone the repository:**
  ```bash
  git clone https://github.com/luckyIITR/festbuzz_frontend.git
  ```
- **Create a new branch:**
  ```bash
  git checkout -b feature/your-feature-name
  ```
- **Check out an existing branch:**
  ```bash
  git checkout branch-name
  ```
- **Check status of your changes:**
  ```bash
  git status
  ```
- **Add files to staging:**
  ```bash
  git add .
  # or add specific files
  git add path/to/file
  ```
- **Commit your changes:**
  ```bash
  git commit -m "feat: add new feature"
  ```
- **Pull latest changes from main:**
  ```bash
  git pull origin main
  ```
- **Push your branch to remote:**
  ```bash
  git push origin feature/your-feature-name
  ```
- **Fetch and merge upstream changes:**
  ```bash
  git fetch origin
  git merge origin/main
  ```
- **Rebase your branch onto main:**
  ```bash
  git fetch origin
  git rebase origin/main
  ```
- **Stash your local changes:**
  ```bash
  git stash
  # To apply stashed changes later
  git stash pop
  ```
- **View commit log:**
  ```bash
  git log --oneline --graph --all
  ```

For more advanced usage, refer to the [Git documentation](https://git-scm.com/doc).

## Branching Strategy
- Use `main` for production-ready code.
- Create feature branches from `main` using the format: `feature/your-feature-name`.
- For bug fixes, use: `fix/short-description`.
- For documentation, use: `docs/short-description`.

## Coding Standards
- Follow the existing code style and structure.
- Use consistent naming conventions.
- Run the linter before committing:
  ```bash
  npm run lint
  # or
  yarn lint
  ```
- Write clear, concise comments where necessary.
- Avoid using rainbow color schemes; stick to the project's color palette.

## Commit Messages
- Use clear, descriptive commit messages.
- Format: `<type>: <short summary>` (e.g., `feat: add user login page`)
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

## Pull Request Process
1. Ensure your branch is up to date with `main`.
2. Open a pull request (PR) with a clear description of your changes.
3. Reference related issues if applicable (e.g., `Closes #123`).
4. Request reviews from team members.
5. Address feedback and make necessary changes.
6. Once approved, your PR will be merged by a maintainer.

## Reporting Issues
- Use the issue tracker to report bugs or request features.
- Provide as much detail as possible (steps to reproduce, screenshots, etc.).
- Check for existing issues before creating a new one.

## Code of Conduct
Please be respectful and considerate in all interactions. For more details, refer to the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) if available.

---

Happy coding! 🎉 