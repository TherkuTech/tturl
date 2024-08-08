# Contributing Guidelines

Ready to contribute?

Please read the guidelines carefully before making your first contribution:

- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Creating a Pull Request](#creating-a-pull-request)
- [Style Guide for Commits](#style-guide-for-commits)

## Issues

- Always create an issue before creating a pull request.
- Always ensure that the issue to be created is unique.
- Always ensure that the resource to be added is unique.
- Always start working on an issue after getting assigned to it.

<hr>

## Pull Requests

- Each pull request should contain a single logical change.
- The pull request title should summarize the changes made in it.
- The changes made in the pull request should be described in detail.
- The pull request should be linked to an issue.

<hr>

## Creating a Pull Request

Before moving on, please ensure that these technologies are installed on your system:

- Node.js
- NPM

Here is the step-by-step process of creating a pull request in this repository:

Step 1: Fork the repository

Step 2: Clone the forked repository to your local machine

```sh
https://github.com/TherkuTech/tturl.git
```
    
Step 3: Navigate to the project directory

```sh
cd tturl
```

Step 4: Install the required dependencies

```sh
npm install
```
step 5 : Generate prisma

Use this command to Generate Prisma Client.. make sure you are in the rood dir of the project

```sh
npx prisma generate
```

Step 6: Create and switch to a new branch

```sh
git switch -c <branch>
```

Step 7: Launch the website on `localhost:3000`

```sh
npm start
```

Step 8: Make changes to the project and stage them

```sh
git add .
```

Step 9: Commit the changes

```sh
git commit -m "<message>"
```

Step 10: Push the changes to the corresponding remote branch

```sh
git push origin <branch>
```

Step 11: Create a pull request!

Subsequently, also go through the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

<hr>

## Style Guide for Commits

The commit message should be:

```sh
git commit -m "[Resource] Add <name>"
```
<hr>


