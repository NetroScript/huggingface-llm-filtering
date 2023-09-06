# huggingface-llm-filtering

Explore and filter HuggingFace models with ease. This utility web application enables users to view all models from a specific HuggingFace user, offering advanced filtering options tailored for Large Language Models (LLMs).

🔗 **Live Version:** [https://netroscript.github.io/huggingface-llm-filtering/](https://netroscript.github.io/huggingface-llm-filtering/)

## Features

- **Quick Search:** Instantly search for models by their names.
- **Flexible Filtering:** Filter by model type (GGML, GPTQ, GGUF), model size, and licensing.
- **Custom Sorting:** Organize models based on time, downloads, or likes.

![Application Screenshot](https://github.com/NetroScript/huggingface-llm-filtering/assets/18115780/1d8f05de-77c4-4ecb-9e3e-93a8f7c26489)

## Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/)
- **UI Toolkit:** [skeleton.dev](https://www.skeleton.dev/)
- **Data Source:** The app fetches models from a HuggingFace author through the official API and processes the data for optimized display.

## Development

### Setup

Install the necessary dependencies:
   ```bash
   pnpm install
   # Alternatively, you can use npm install or yarn
   ```

### Running Locally

To start a development server:

```bash
pnpm run dev
```

Or to start the server and launch the app in a new browser tab:

```bash
pnpm run dev -- --open
```

### Building for Production

To generate a production-ready version of the app (exported as static HTML):

```bash
pnpm run build
```

Preview the production build using:

```bash
pnpm run preview
```

### Continuous Deployment

This repository is equipped with a GitHub Actions workflow that auto-deploys changes to the GitHub Pages site.
