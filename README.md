This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# E-commerce Frontend (ecom-frontend)

This is a Ecommerce frontend project built with Next.js 15, React 19, and Tailwind CSS.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   git clone https://github.com/naveensanadhya/ecom-frontend.git

2. Navigate to the project directory:

   cd ecom-frontend

3. Install the dependencies:

   npm install

4. Create a .env file and fill in the required environment variables:

   cp env.example .env

5. Fill in the .env file with your specific configuration:

   - NEXT_PUBLIC_BACKEND_URL=your-backend-url 
   - NEXT_PUBLIC_SOCKET_URL=your-socket-url
   - NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

## Running the Application
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
