# Deploying staging by hand

The normal path is Cloudflare Workers Builds: push to `main`, Cloudflare builds and deploys. When
that pipeline stalls — and on 2026-08-03 it stalled at "Initialize build environment," a stage that
runs before the repository is even cloned — you can deploy staging yourself in about two minutes.
This does exactly what the CI would do, from your own machine.

**This only touches staging** (`molumen.shanenh.workers.dev`). The live molumen.com is a separate
Squarespace site and is not affected by anything here.

## Before you start

You need Git and Node.js 20 or newer. Check in PowerShell:

```powershell
git --version
node --version
npm --version
```

If `node` is missing or below 20, install the LTS build from https://nodejs.org and reopen the
terminal. Astro 5 will not build on older Node.

## 1. Get the repository

You only do this once. Pick a folder you'll remember — this uses Desktop:

```powershell
cd $HOME\OneDrive\Desktop
git clone https://github.com/Shanenh22/MoLumenSite.git
cd MoLumenSite
```

If a browser or credential prompt appears, sign in to GitHub as normal.

**If you already cloned it before**, skip the clone and just update:

```powershell
cd $HOME\OneDrive\Desktop\MoLumenSite
git pull
```

## If PowerShell blocks npm

On a default Windows install, PowerShell refuses to run npm's wrapper script:

```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running
scripts is disabled on this system.
```

Node is fine; only the PowerShell shim is blocked. Two ways past it that change nothing on your
machine — pick either:

**Use the `.cmd` shims.** PowerShell runs these as ordinary programs, so the policy doesn't apply.
Append `.cmd` to `npm` and `npx` in every command below:

```powershell
npm.cmd ci
npm.cmd run build
npx.cmd wrangler login
npx.cmd wrangler deploy
```

**Or use Command Prompt instead.** Press Start, type `cmd`, open it, and the commands work
unmodified:

```
cd %USERPROFILE%\OneDrive\Desktop\MoLumenSite
npm ci
```

There is also the option of relaxing the policy for your own account with
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`. That works, and it is what
most Node developers on Windows end up doing, but it is a change to a security setting on your
machine and it is not needed for this — the two options above accomplish the same thing with nothing
left behind. Only do it if you want npm to work normally in PowerShell from now on.

## 2. Install dependencies

```powershell
npm ci
```

`npm ci` installs exactly what `package-lock.json` specifies. It takes 10–30 seconds and prints
something like `added 363 packages`. A deprecation warning about `tsconfck` is expected and harmless.

If it errors with "can only install packages when your package.json and package-lock.json are in
sync," stop and say so — that is a repository problem, not something to work around with
`npm install`.

## 3. Build the site

```powershell
npm run build
```

Expect `118 page(s) built` and `Complete!` at the end. The output lands in `dist/`.

A line reading `The collection "videos" does not exist or is empty` is expected — Mo hasn't supplied
video IDs yet. It is a warning, not an error, and the build still completes.

## 4. Sign in to Cloudflare

```powershell
npx wrangler login
```

The first run asks permission to install Wrangler — say yes. A browser window opens; approve the
access request. **If you have more than one Cloudflare account, make sure you pick the one that owns
`molumen.shanenh.workers.dev`.** Wrangler remembers the login, so you only do this once per machine.

To confirm it took, and to see which account you're in:

```powershell
npx wrangler whoami
```

## 5. Deploy

```powershell
npx wrangler deploy
```

Wrangler reads `wrangler.jsonc`, uploads the contents of `dist/` as static assets, and updates the
Worker named `molumen`. Expect output along the lines of:

```
✨ Read 289 files from the assets directory
Uploaded molumen (x.xx sec)
Deployed molumen triggers (x.xx sec)
  https://molumen.shanenh.workers.dev
```

## 6. Check it worked

Open these two in a browser:

- https://molumen.shanenh.workers.dev/llms.txt — should be plain text starting `# Mo Lumen
Astrology`. If it 404s, the old build is still being served.
- https://molumen.shanenh.workers.dev/ — scroll to the footer. The **Site** column should now list
  Resources, Courses and Guides.

If either still looks old, hard-refresh with `Ctrl+F5`, or add a throwaway query string
(`?x=1`) to bypass the edge cache.

## Doing it again later

Once set up, redeploying is three commands:

```powershell
cd $HOME\OneDrive\Desktop\MoLumenSite
git pull
npm run build
npx wrangler deploy
```

`npm ci` only needs rerunning when dependencies change.

## Notes

Deploying by hand does not disable Workers Builds. If the pipeline recovers, the next push to `main`
will deploy normally and overwrite whatever you deployed manually — which is fine, since it would be
building the same commit.

Wrangler stores its credentials in your user profile, not in this repository. Nothing secret is ever
committed.
