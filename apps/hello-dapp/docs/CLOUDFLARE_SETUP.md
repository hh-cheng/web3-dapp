# Cloudflare Pages Setup Guide

## Quick Setup Steps for Your Existing Project

Since you've already created the `hello-dapp` project in Cloudflare Pages, follow these steps:

### Step 1: Connect Repository (if not done)

1. Go to your project: https://dash.cloudflare.com/717e02d4aef49c7f4da4bd94dc9b1a0c/pages/view/hello-dapp
2. Click "Settings" → "Builds & deployments"
3. If not connected, click "Connect to Git" and select your repository

### Step 2: Configure Build Settings

Navigate to **Settings** → **Builds & deployments** → **Build configuration**

Use these exact settings:

#### Option A: Build from Repository Root (Recommended)

```
Framework preset: None
Root directory: (leave empty)
Build command: pnpm install && cd apps/hello-dapp && pnpm pages:build
Build output directory: apps/hello-dapp/.vercel/output/static
```

#### Option B: Build from App Directory (Alternative)

```
Framework preset: None
Root directory: apps/hello-dapp
Build command: pnpm install && pnpm pages:build
Build output directory: .vercel/output/static
```

**Note:** If Option A doesn't work (pnpm can't find workspace), use Option B and ensure pnpm is installed globally in Cloudflare's build environment.

### Step 3: Set Node.js Version

In **Settings** → **Environment variables**, add:

```
NODE_VERSION = 18
```

Or use the build command with Node version:
```bash
NODE_VERSION=18 pnpm install && cd apps/hello-dapp && pnpm pages:build
```

### Step 4: Add Environment Variables

Go to **Settings** → **Environment variables** and add these for **Production**:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `LOGGER_CONTRACT` | `0x...` | Your Logger contract address |
| `RED_PACKET_CONTRACT` | `0x...` | Your Red Packet contract address |
| `WALLETCONNECT_PROJECT_ID` | `your-project-id` | Your WalletConnect project ID |

**Important:** Also add these same variables for **Preview** environment if you want preview deployments to work.

### Step 5: Trigger Deployment

1. Go to the **Deployments** tab
2. Click **"Retry deployment"** or push a commit to your connected branch
3. Monitor the build logs to ensure it completes successfully

### Step 6: Verify Deployment

Once deployed, your app will be available at:
- Production: `https://hello-dapp.pages.dev` (or your custom domain)
- Preview: `https://<branch-name>-hello-dapp.pages.dev`

## Troubleshooting

### Build Fails: "Cannot find module 'contracts'"

This means the workspace dependency isn't being resolved. Try:

1. Ensure `pnpm install` runs from the repository root
2. Check that `pnpm-workspace.yaml` is in the root
3. Verify the `contracts` package exists in `packages/contracts`

### Build Fails: "pnpm: command not found"

Cloudflare Pages should have pnpm pre-installed. If not:

1. Add this to your build command: `npm install -g pnpm && pnpm install && ...`
2. Or use npm instead: `npm install && cd apps/hello-dapp && npm run pages:build`

### Environment Variables Not Working

1. Ensure variables are set for the correct environment (Production/Preview)
2. Check that variable names match exactly (case-sensitive)
3. Redeploy after adding new variables

### Build Output Directory Not Found

1. Verify the build command completes successfully
2. Check build logs to see where `.vercel/output/static` is created
3. Adjust the output directory path accordingly

## Manual Deployment (Alternative)

If automatic deployments aren't working, you can deploy manually:

```bash
# From repository root
pnpm install
cd apps/hello-dapp
pnpm pages:build

# Deploy using Wrangler
npx wrangler pages deploy .vercel/output/static --project-name=hello-dapp
```

## Need Help?

- Check build logs in Cloudflare Pages dashboard
- Review [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- See [DEPLOY.md](./DEPLOY.md) for more detailed information

