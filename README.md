<h1 align="center">🐋 Dockerize App - App Elecciones</h1>

<div align="center">

[![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vue](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)](https://vuetifyjs.com/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

</div>

<div align="center">

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)](https://learn.microsoft.com/es-es/azure/?product=popular)

</div>

---

## Prepare the work environment

It is necessary to have **Node.js** previously installed on the computer, you can download the latest **LTS** version for your operating system from [here](https://nodejs.org/en/download)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

---

## Collaborative work

The correct flow to start a new development would be the following:

- Create an issue with the necessary requirements

  - This will allow monitoring with comments, annotations or specific documentation for each specific case.

  - The title of the issue must be specific and preferably not exceed 50 characters

- Create a work branch with the name of the issue to be resolved

- Make the necessary changes only on this branch following the standard commit convention

- At the end create a pre-released version with this branch providing a brief explanation of the changes made and ensuring to maintain the semantic version conventions

- Then create the pull request between this version and the "develop" branch.

The pull requests will be reviewed by the team for their approval, <span style="color: yellow">remember that it is your responsibility to verify the comments and reviews as well as to merge with develop once it is accepted</span>

### NOTES

> The **_master_** branch of this repository is for production releases and only pull request from the **_develop_** branch should be accepted.

> This repository uses [conventional commits](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) for version and change management. You can find a brief explanation about its use [here](/.docs/conventional-commits.md).
