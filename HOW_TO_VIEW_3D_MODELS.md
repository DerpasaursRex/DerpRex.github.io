# How to View 3D Models Locally

## The Problem
When you open `3D.html` or `3D-babylon.html` directly by double-clicking (file:// protocol), browsers block loading .obj files for security reasons. This is why your 3D models don't load.

## Solutions

### Option 1: Use GitHub Pages (Easiest - Recommended!)
Just push your files to GitHub and the models will work automatically:

```bash
git add .
git commit -m "Add 3D model viewers"
git push
```

Then visit: `https://yourusername.github.io/DerpRex.github.io/3D-babylon.html`

The models will work perfectly on GitHub Pages!

---

### Option 2: Install a Simple Local Server

#### Option A: Install Python (Recommended)
1. Download Python from: https://www.python.org/downloads/
2. During installation, **check "Add Python to PATH"**
3. Open terminal in your project folder
4. Run: `python -m http.server 8000`
5. Open browser to: `http://localhost:8000/3D-babylon.html`

#### Option B: Install Node.js
1. Download Node.js from: https://nodejs.org/
2. Install it
3. Open terminal in your project folder
4. Run: `npx http-server -p 8000`
5. Open browser to: `http://localhost:8000/3D-babylon.html`

#### Option C: Use VS Code Live Server Extension
1. Open your project in VS Code
2. Install "Live Server" extension
3. Right-click `3D-babylon.html`
4. Click "Open with Live Server"
5. Browser opens automatically with working models!

---

### Option 3: Use Vercel (You Already Have This!)
Since you already deployed to Vercel:

1. Make sure `3D-babylon.html` is pushed to GitHub
2. Vercel will auto-deploy
3. Visit: `https://derp-rex-github-io-git-main-derpasaursrexs-projects.vercel.app/3D-babylon.html`

The models will work!

---

## Quick Fix for Now

**Easiest right now:**
```bash
# Push to GitHub
git add .
git commit -m "Add Babylon.js 3D viewers"
git push

# Then visit your GitHub Pages URL
```

Your 3D models will work immediately on GitHub Pages!

