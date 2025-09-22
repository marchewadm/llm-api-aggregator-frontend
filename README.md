# LLM API Aggregator (Frontend)

LLM API Aggregator is a tool that allows you to store your chats from various LLMs in one place. Its frontend is built using Vue.js, Pinia, VeeValidate, VueUse, and @vueuse/motion, with components delivered through shadcn-vue for a smooth user experience.

The repository with the application's backend is located at [this link](https://github.com/marchewadm/llm-api-aggregator-backend). Make sure to set it up, otherwise the application will not work properly.

## Table Of Contents

- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Before Usage](#before-usage)
- [Installation](#installation)
  - [Cloning The Repository](#cloning-the-repository)
    - [Running The Project Via Docker Compose (Recommended)](#running-the-project-via-docker-compose-recommended)
    - [Running The Project Without Docker](#running-the-project-without-docker)
- [License](#license)

## Demo

https://github.com/user-attachments/assets/4d0dd8c1-d570-44ac-9942-9cd799fb8c0c

## Prerequisites

- **Node.js v.20** or higher, only if you are not using Docker.
- **Docker** - it is not required, but if you want to speed up the installation process, it is recommended to use Docker.

## Before Usage

Before installing application, make sure that `.env` file is created.

The `.env` file should look like this:

```
VITE_BACKEND_URL=BACKEND_API_URL
```

NOTE:

- Remember to adjust `VITE_BACKEND_URL` according to where the backend API is running. If it is running locally, your URL should look like this: `VITE_BACKEND_URL=http://localhost:8000/api`.

## Installation

### Cloning The Repository

```bash
git clone https://github.com/marchewadm/llm-api-aggregator-frontend.git
cd llm-api-aggregator-frontend
```

#### Running The Project Via Docker Compose (Recommended)

1. **Build Docker Image**

```bash
docker compose build
```

2. **Run The Container**

```bash
docker compose up -d
```

3. **Stop The Container**

```bash
docker compose down
```

#### Running The Project Without Docker

1. **Install All Dependencies**

```bash
npm install
```

2. **Usage**

Run one of the commands below to start using your app:

- Development mode:
```bash
npm run dev
```

- Production mode:
```bash
npm run build
```

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
