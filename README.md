# Second-Hand Land

A fullstack e-commerce platform built with **React (frontend)** and **Express (backend)**.

---

## Getting Started

### 1. Clone or Fork the Repository

**Clone directly:**

```bash
git clone https://github.com/Trung4n/second-hand-land.git
```

### 2. Install Dependencies

**At the root directory, run:**

```bash
npm install
```

This will install dependencies for both client and server if workspaces are configured.

**Alternatively, install manually:**

```bash
cd client && npm install
```

```bash
cd server && npm install
```

### 3. Run the Development Servers

**To run both frontend and backend simultaneously:**

```bash
npm run dev
```

**Or run each part separately:**

```bash
# In /client
npm start
```

```bash
# In /server
npm run dev
```

## Commit Message Convention

We follow the Conventional Commits style to keep commit history clean and meaningful.
| Type | Meaning |
| ---------- | --------------------------------------------- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code refactoring (no new feature or bug fix) |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, spaces, etc.) |
| `test` | Adding or updating tests |
| `chore` | Build process or auxiliary tool changes |
| `perf` | Performance improvements |
| `ci` | Continuous integration or deployment changes |

Basic Format

```
<type>: <short description>
```

### Commit Message Template

To ensure consistent commit messages across the team, set up the commit template once:

```bash
git config commit.template .gitmessage.txt
```
