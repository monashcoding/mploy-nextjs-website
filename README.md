# MAC MPLOY Website
This is the repo for the website for MPLOY, a project that aims to collate job listings into one centralized platform.

## Getting Started
Clone the repository and install the dependencies:

```bash
git clone
cd mac-mploy-website
npm install
````

Then, ensure that you have the following environment variables set:

```bash
MONGO_URI = YOUR_MONGO_URI
```

You can do this by creating an .env file in the root project directory, or by setting the environment variables in your deployment service.

Then, for the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This repository is automatically deployed on Coolify and is available to view at [https://mploy-dev.monashcoding.com/](https://mploy-dev.monashcoding.com/).

