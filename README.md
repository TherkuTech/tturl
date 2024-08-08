# TTURL - URL Shortener

TTURL is a simple and efficient URL shortener built with Next.js that allows you to shorten your URLs in just one click.

- One-click URL shortening
- Customizable short links
- Real-time analytics (click counts, referrers)
- User-friendly interface

## Demo

Check out the live demo [here](https://tturl.vercel.app/) (replace with your live demo URL).

## Contribution
Please go through the [CONTRIBUTING](https://github.com/Sriparno08/Openpedia/blob/main/CONTRIBUTING.md) guide for details.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Create your env file

create .env file and add these variables
DATABASE_URL = 'your mongodb url'
NEXT_PUBLIC_FRONTEND_URL = http://localhost:3000

## Generate prisma

Use this command to Generate Prisma Client.. make sure you are in the rood dir of the project

```npx prisma generate```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

***Usage***
To shorten a URL:

Enter the URL you want to shorten in the input field.
Click the "Shorten" button.
Copy the generated short URL and share it!

***Contributing***
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
