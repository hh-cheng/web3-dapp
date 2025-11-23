# Deploying to Cloudflare Pages

This guide explains how to deploy the `hello-dapp` Next.js application to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed globally (or use npx)
3. Cloudflare API token or authenticated Wrangler session

## Setup

### 1. Install Dependencies

The required dependencies are already in `package.json`:
- `@cloudflare/next-on-pages` - Adapter for Next.js on Cloudflare Pages
- `wrangler` - Cloudflare CLI tool

### 2. Configure Environment Variables

Set the following environment variables in Cloudflare Pages dashboard or via Wrangler:

- `LOGGER_CONTRACT` - Your Logger contract address
- `RED_PACKET_CONTRACT` - Your Red Packet contract address
- `WALLETCONNECT_PROJECT_ID` - Your WalletConnect project ID

## Deployment Methods

### Method 1: Deploy via Cloudflare Dashboard (Recommended)

Since you've already created the project, follow these steps to configure it:

1. **Connect your repository (if not already connected):**
   - In your Cloudflare Pages project dashboard
   - Go to "Settings" → "Builds & deployments"
   - Click "Connect to Git" and select your repository
   - Choose the branch (usually `main` or `master`)

2. **Configure build settings:**
   
   Go to "Settings" → "Builds & deployments" and configure:
   
   - **Framework preset:** `None` (we'll use custom build command)
   - **Root directory:** Leave empty (builds from repository root)
   - **Build command:** 
     ```bash
     pnpm install && cd apps/hello-dapp && pnpm pages:build
     ```
   - **Build output directory:** 
     ```
     apps/hello-dapp/.vercel/output/static
     ```
   
   **Alternative configuration (if root directory approach doesn't work):**
   - **Root directory:** `apps/hello-dapp`
   - **Build command:** 
     ```bash
     pnpm install && pnpm pages:build
     ```
   - **Build output directory:** 
     ```
     .vercel/output/static
     ```

3. **Set Node.js version:**
   - Go to "Settings" → "Environment variables"
   - Add environment variable:
     - **Name:** `NODE_VERSION`
     - **Value:** `18` (or `20`)

4. **Set environment variables:**
   
   Go to "Settings" → "Environment variables" and add:
   
   - **Production variables:**
     - `LOGGER_CONTRACT` - Your Logger contract address
     - `RED_PACKET_CONTRACT` - Your Red Packet contract address  
     - `WALLETCONNECT_PROJECT_ID` - Your WalletConnect project ID
   
   - **Preview variables:** (optional, same as production)
     - Add the same variables for preview deployments

5. **Deploy:**
   - Go to "Deployments" tab
   - Click "Retry deployment" or push a new commit to trigger deployment
   - Cloudflare will automatically deploy on every push to your connected branch

### Method 2: Deploy via Wrangler CLI

1. **Authenticate Wrangler:**
   ```bash
   npx wrangler login
   ```

2. **Build the application:**
   ```bash
   cd apps/hello-dapp
   pnpm pages:build
   ```

3. **Deploy:**
   ```bash
   pnpm pages:deploy
   ```

   Or manually:
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=hello-dapp
   ```

### Method 3: Deploy from Monorepo Root

From the root of the monorepo:

```bash
# Build
pnpm --filter hello-dapp pages:build

# Deploy
cd apps/hello-dapp
npx wrangler pages deploy .vercel/output/static --project-name=hello-dapp
```

## Local Development with Cloudflare Pages

To test your app locally with Cloudflare Pages compatibility:

```bash
cd apps/hello-dapp
pnpm pages:dev
```

This will start a local development server that mimics Cloudflare Pages environment.

## Troubleshooting

### Build Issues

- Ensure Node.js version is compatible (Cloudflare Pages uses Node.js 18+)
- Check that all dependencies are properly installed
- Verify environment variables are set correctly

### Monorepo Considerations

- Make sure the build command runs from the correct directory
- Ensure workspace dependencies (`contracts` package) are accessible
- You may need to configure Cloudflare Pages to install dependencies from the root

### Environment Variables

- Variables must be set in Cloudflare Pages dashboard for production
- Use Wrangler secrets for sensitive values:
  ```bash
  npx wrangler pages secret put LOGGER_CONTRACT
  ```

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

