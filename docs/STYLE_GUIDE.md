# Website Style Guide
**Based on OutdatedDesigns.html**

This guide provides the standard structure, styling, and interactive elements for creating new pages on this website.

---

## 📋 Table of Contents
1. [Basic HTML Structure](#basic-html-structure)
2. [Required Meta Tags & Security](#required-meta-tags--security)
3. [External Dependencies](#external-dependencies)
4. [Color Palette](#color-palette)
5. [Typography](#typography)
6. [Header/Jumbotron](#headerjumbotron)
7. [Navigation Bar](#navigation-bar)
8. [Content Layout](#content-layout)
9. [Footer](#footer)
10. [Background Animation](#background-animation)
11. [Interactive Elements](#interactive-elements)
12. [Image Modal](#image-modal)
13. [Spotify Widget](#spotify-widget)
14. [Complete Template](#complete-template)

---

## Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Catherine Ann MacDonald</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Security Headers -->
  <!-- External Dependencies -->
  <!-- Page-Specific Scripts -->
  <!-- Custom Styles -->
</head>
<body>
  <!-- Header/Jumbotron -->
  <!-- Navigation Bar -->
  <!-- Main Content -->
  <!-- Walking Character -->
  <!-- Footer -->
  <!-- Image Modal -->
  <!-- Spotify Widget -->
  <!-- Scripts -->
</body>
</html>
```

---

## Required Meta Tags & Security

**Copy this entire block into every page:**

```html
<!-- Security Headers -->
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="no-referrer-when-downgrade">
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://ajax.googleapis.com https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com; connect-src 'self'; style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com; img-src 'self' data:; frame-src https://open.spotify.com; font-src 'self' data:;">
```

---

## External Dependencies

**Bootstrap 4.5.2 + jQuery (required for all pages):**

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
```

---

## Color Palette

| Purpose | Color | Hex Code |
|---------|-------|----------|
| **Primary Brand Color** | Red | `#b82b2f` |
| **Text Color** | Black | `#000000` |
| **Background Elements** | White | `#ffffff` |
| **Muted Text** | Gray | `#aaa` |
| **Spotify Green** | Green | `#1DB954` |

---

## Typography

**Font Family:** Arial, sans-serif (site-wide)

### Text Shadows
All headings use a white outline effect:
```css
text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;
```

**Apply to:**
- `<h1>` - Primary color (#b82b2f)
- `<h2>`, `<h5>` - When used on colored backgrounds
- Subtitle text in jumbotron

---

## Header/Jumbotron

**Standard jumbotron with banner image:**

```html
<div class="jumbotron jumbotron-fluid text-center" style="margin-bottom:0">
  <h1>Catherine Ann MacDonald</h1>
  <p style="color: #b82b2f; text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Writer-Artist</p>
  <a href="ChatBot.html" style="text-decoration: none; transition: transform 0.2s ease; display: inline-block; position: relative;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
    <img src="TestBot/noise.gif" alt="noise" style="width: 22px; height: 15px; position: absolute; top: 5px; left: 5px;">
    <img src="TestBot/test.png" alt="computer" style="width: 32px; height: 32px; position: relative;">
  </a>
</div>

<style>
.jumbotron {
  background-image: url("rexbanner.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
}
</style>
```

---

## Navigation Bar

**Standard navigation with Projects and Archive dropdowns:**

```html
<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #b82b2f;">
  <a class="navbar-brand" href="#">Menu</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="currentportfolio.html">Current Portfolio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="blog.html">Blog</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="projectsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Projects
        </a>
        <div class="dropdown-menu" aria-labelledby="projectsDropdown">
          <a class="dropdown-item" href="spectrum.html">Spectrum</a>
          <a class="dropdown-item" href="party.html">Party</a>
          <a class="dropdown-item" href="Coding.html">Coding</a>
          <a class="dropdown-item" href="Videos.html">Videos</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="archiveDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Archive
        </a>
        <div class="dropdown-menu" aria-labelledby="archiveDropdown">
          <a class="dropdown-item" href="earlywork.html">Early Work</a>
          <a class="dropdown-item" href="OutdatedDesigns.html">Outdated Designs</a>
        </div>
      </li>
    </ul>
  </div>  
</nav>
```

---

## Content Layout

**Standard container with full-width content:**

```html
<div class="container" style="margin-top:30px">
  <div class="row">
    <div class="col-12">
      <h2 style="text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Page Title</h2>
      <h5 style="text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Subtitle</h5>
      
      <!-- Your content here -->
      
    </div>
  </div>
</div>
```

### Magazine-Style Card Gallery

For displaying artwork/images in a grid:

```html
<div class="row">
  <div class="col-md-6 col-lg-4 mb-4">
    <div class="card magazine-card" style="background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9)); border: none; box-shadow: 0 4px 16px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
      <img src="path/to/image.png" class="card-img-top" alt="Image Title" style="height: 250px; object-fit: cover; cursor: pointer;" onclick="openModal(this, 'Image Title', 'Description of the image')">
      <div class="card-body text-center">
        <h6 class="card-title" style="color: #b82b2f; font-weight: bold;">Image Title</h6>
        <p class="card-text small">Description</p>
        <small class="text-muted">Category</small>
      </div>
    </div>
  </div>
</div>

<style>
.magazine-card {
  border-radius: 10px;
  overflow: hidden;
}

.magazine-card:hover {
  transform: translateY(-5px);
}
</style>
```

---

## Footer

**Standard footer with banner background:**

```html
<div style="background-image: url('SitePics/elizabanner.png'); background-size: contain; background-position: center; background-repeat: no-repeat; padding: 20px; text-align: center; margin-top: 30px; border-radius: 10px; box-shadow: 0 -2px 8px rgba(0,0,0,0.1);">
  <p style="color: white; margin: 0; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Catherine Ann MacDonald</p>
  <p style="color: white; margin: 5px 0 0 0; font-size: 14px; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">&copy; 2025</p>
</div>
```

---

## Background Animation

**Animated spectrum background (scrolling effect):**

```html
<style>
body {
  background-image: url("SitePics/spectrumbackground.png");
  background-size: 200% 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: 0% 50%;
  font-family: Arial, sans-serif;
  animation: spectrumScroll 40s linear infinite;
  color: black;
}

@keyframes spectrumScroll {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

h1 {
  color: #b82b2f;
  font-family: Arial, sans-serif;
  text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;
}
</style>
```

---

## Interactive Elements

### 1. Cursor Follower (Trailing Images)

**Paste this script in the `<head>` section:**

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  const numFollowers = 5; // Number of trailing images
  const followers = [];
  const positions = [];
  let isMouseOnPage = false;
  let targetX = 0;
  let targetY = 0;
  
  // Create multiple cursor followers
  for (let i = 0; i < numFollowers; i++) {
    const follower = document.createElement('img');
    follower.src = 'SitePics/Bugtie.png';
    follower.style.position = 'fixed';
    follower.style.width = '30px';
    follower.style.height = '30px';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9999';
    follower.style.display = 'none';
    follower.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
    document.body.appendChild(follower);
    
    followers.push(follower);
    positions.push({ x: 0, y: 0 });
  }
  
  // Animation function
  function animate() {
    if (isMouseOnPage && followers[0].style.display !== 'none') {
      // Update each follower to follow the previous one
      for (let i = 0; i < numFollowers; i++) {
        const follower = followers[i];
        const pos = positions[i];
        
        let targetX, targetY;
        if (i === 0) {
          // First follower follows the mouse
          targetX = window.mouseX;
          targetY = window.mouseY;
        } else {
          // Other followers follow the previous follower
          const prevPos = positions[i - 1];
          targetX = prevPos.x;
          targetY = prevPos.y;
        }
        
        // Calculate distance for speed variation
        const dx = targetX - pos.x;
        const dy = targetY - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Different speeds for each follower (first is fastest)
        const speed = 0.3 - (i * 0.05); // Speed decreases for each follower
        
        if (distance > 1) {
          pos.x += dx * speed;
          pos.y += dy * speed;
          
          // Only rotate if there's significant movement to prevent jitter
          if (distance > 3) {
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            // Normalize angle to 0-360 range
            let normalizedAngle = angle;
            if (normalizedAngle < 0) {
              normalizedAngle += 360;
            }
            
            // Allow natural rotation but prevent upside-down orientations
            // Keep rotation between -90 and 90 degrees (right-side up range)
            if (normalizedAngle > 90 && normalizedAngle <= 270) {
              // If upside down, flip to right-side up equivalent
              normalizedAngle = normalizedAngle - 180;
            }
            
            follower.style.transform = `rotate(${normalizedAngle}deg)`;
          }
          
          follower.style.left = (pos.x - 15) + 'px';
          follower.style.top = (pos.y - 15) + 'px';
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  // Mouse tracking
  document.addEventListener('mousemove', function(e) {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
    
    if (!isMouseOnPage) {
      isMouseOnPage = true;
      // Show all followers
      followers.forEach(follower => {
        follower.style.display = 'block';
      });
    }
  });
  
  document.addEventListener('mouseleave', function() {
    isMouseOnPage = false;
    // Hide all followers
    followers.forEach(follower => {
      follower.style.display = 'none';
    });
  });
  
  // Start animation
  animate();
});
</script>
```

### 2. Walking Character

**HTML (place before footer):**
```html
<img id="walkingCharacter" class="walking-character" src="SitePics/Shadite.png" alt="Walking Character">
```

**Script (in `<head>`):**
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  const walkingChar = document.getElementById('walkingCharacter');
  let position = 0;
  let direction = 1; // 1 for right, -1 for left
  const speed = 2; // pixels per frame
  const maxWidth = window.innerWidth - 50; // account for character width
  
  function walk() {
    position += speed * direction;
    
    // Reverse direction when hitting edges
    if (position >= maxWidth) {
      direction = -1;
      walkingChar.style.transform = 'scaleX(-1)'; // flip horizontally
    } else if (position <= 0) {
      direction = 1;
      walkingChar.style.transform = 'scaleX(1)'; // normal orientation
    }
    
    walkingChar.style.left = position + 'px';
    requestAnimationFrame(walk);
  }
  
  // Start walking animation
  walk();
});
</script>
```

**CSS:**
```css
.walking-character {
  position: fixed;
  bottom: 20px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  transition: transform 0.1s ease-in-out;
}
```

---

## Image Modal

**For opening images in a gallery overlay:**

**HTML (place before `</body>`):**
```html
<div id="imageModal" class="modal" style="display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; background-image: url('SitePics/galaxy.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
  <span class="close" style="position: absolute; top: 15px; right: 35px; color: #f1f1f1; font-size: 40px; font-weight: bold; cursor: pointer;">&times;</span>
  <img class="modal-content" id="modalImage" style="margin: auto; display: block; width: 90%; max-width: 1200px; max-height: 90%; object-fit: contain;">
  <div id="caption" style="margin: auto; display: block; width: 80%; max-width: 700px; text-align: center; color: #ccc; padding: 10px 0; height: 150px;"></div>
</div>
```

**Script:**
```html
<script>
// Get the modal
var modal = document.getElementById('imageModal');
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on an image, open the modal
function openModal(img, title, description) {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = '<h3 style="color: #b82b2f; margin-bottom: 10px;">' + title + '</h3><p style="font-size: 16px; line-height: 1.5;">' + description + '</p>';
}

// When the user clicks on (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modal.style.display = "none";
  }
});
</script>
```

**Usage:** Add `onclick="openModal(this, 'Title', 'Description')"` to any image.

---

## Spotify Widget

**Draggable, minimizable Spotify playlist player:**

**CSS:**
```html
<style>
/* Spotify Player Widget */
#spotifyWidget {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background: #000;
  border: 3px solid #1DB954;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  z-index: 9999;
  cursor: move;
}

#spotifyHeader {
  background: #1DB954;
  color: #fff;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  border-radius: 7px 7px 0 0;
}

#spotifyMinimize {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

#spotifyMinimize:hover {
  color: #000;
}
</style>
```

**HTML:**
```html
<div id="spotifyWidget">
  <div id="spotifyHeader">
    <span>🎵 Spotify Player</span>
    <button id="spotifyMinimize" onclick="toggleSpotify()">+</button>
  </div>
  <div id="spotifyContent" style="display: none;">
    <iframe id="spotifyIframe" style="border-radius: 0 0 7px 7px;" src="https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>
</div>
```

**Scripts:**
```html
<script>
// Set Spotify widget to minimized state on load
document.addEventListener('DOMContentLoaded', function() {
  const spotifyWidget = document.getElementById('spotifyWidget');
  if (spotifyWidget) {
    spotifyWidget.style.width = '200px';
  }
});
</script>

<script>
// Draggable Spotify Widget
let spotifyDragging = false;
let spotifyCurrentX;
let spotifyCurrentY;
let spotifyInitialX;
let spotifyInitialY;
let spotifyXOffset = 0;
let spotifyYOffset = 0;

const spotifyWidget = document.getElementById('spotifyWidget');
const spotifyHeader = document.getElementById('spotifyHeader');

spotifyHeader.addEventListener('mousedown', spotifyDragStart);
document.addEventListener('mousemove', spotifyDrag);
document.addEventListener('mouseup', spotifyDragEnd);

function spotifyDragStart(e) {
  spotifyInitialX = e.clientX - spotifyXOffset;
  spotifyInitialY = e.clientY - spotifyYOffset;
  
  if (e.target === spotifyHeader || e.target.parentElement === spotifyHeader) {
    spotifyDragging = true;
  }
}

function spotifyDrag(e) {
  if (spotifyDragging) {
    e.preventDefault();
    spotifyCurrentX = e.clientX - spotifyInitialX;
    spotifyCurrentY = e.clientY - spotifyInitialY;
    spotifyXOffset = spotifyCurrentX;
    spotifyYOffset = spotifyCurrentY;
    
    spotifySetTranslate(spotifyCurrentX, spotifyCurrentY, spotifyWidget);
  }
}

function spotifyDragEnd(e) {
  spotifyInitialX = spotifyCurrentX;
  spotifyInitialY = spotifyCurrentY;
  spotifyDragging = false;
}

function spotifySetTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function toggleSpotify() {
  const content = document.getElementById('spotifyContent');
  const btn = document.getElementById('spotifyMinimize');
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    btn.textContent = '−';
    spotifyWidget.style.width = '300px';
  } else {
    content.style.display = 'none';
    btn.textContent = '+';
    spotifyWidget.style.width = '200px';
  }
}
</script>
```

**Note:** If you have multiple pages with Spotify widgets, add unique prefixes to variable/function names (e.g., `spotifyOutdatedDragging` for OutdatedDesigns.html) to avoid conflicts.

---

## Complete Template

**Copy this entire template to create a new page:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Catherine Ann MacDonald</title>
  
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Security Headers -->
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="Referrer-Policy" content="no-referrer-when-downgrade">
  <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://ajax.googleapis.com https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com; connect-src 'self'; style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com; img-src 'self' data:; frame-src https://open.spotify.com; font-src 'self' data:;">
  
  <!-- Bootstrap CSS & JS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  
  <!-- Cursor follower script -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const numFollowers = 5;
      const followers = [];
      const positions = [];
      let isMouseOnPage = false;
      
      for (let i = 0; i < numFollowers; i++) {
        const follower = document.createElement('img');
        follower.src = 'SitePics/Bugtie.png';
        follower.style.position = 'fixed';
        follower.style.width = '30px';
        follower.style.height = '30px';
        follower.style.pointerEvents = 'none';
        follower.style.zIndex = '9999';
        follower.style.display = 'none';
        follower.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
        document.body.appendChild(follower);
        
        followers.push(follower);
        positions.push({ x: 0, y: 0 });
      }
      
      function animate() {
        if (isMouseOnPage && followers[0].style.display !== 'none') {
          for (let i = 0; i < numFollowers; i++) {
            const follower = followers[i];
            const pos = positions[i];
            
            let targetX, targetY;
            if (i === 0) {
              targetX = window.mouseX;
              targetY = window.mouseY;
            } else {
              const prevPos = positions[i - 1];
              targetX = prevPos.x;
              targetY = prevPos.y;
            }
            
            const dx = targetX - pos.x;
            const dy = targetY - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = 0.3 - (i * 0.05);
            
            if (distance > 1) {
              pos.x += dx * speed;
              pos.y += dy * speed;
              
              if (distance > 3) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                let normalizedAngle = angle;
                if (normalizedAngle < 0) {
                  normalizedAngle += 360;
                }
                
                if (normalizedAngle > 90 && normalizedAngle <= 270) {
                  normalizedAngle = normalizedAngle - 180;
                }
                
                follower.style.transform = `rotate(${normalizedAngle}deg)`;
              }
              
              follower.style.left = (pos.x - 15) + 'px';
              follower.style.top = (pos.y - 15) + 'px';
            }
          }
        }
        requestAnimationFrame(animate);
      }
      
      document.addEventListener('mousemove', function(e) {
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
        
        if (!isMouseOnPage) {
          isMouseOnPage = true;
          followers.forEach(follower => {
            follower.style.display = 'block';
          });
        }
      });
      
      document.addEventListener('mouseleave', function() {
        isMouseOnPage = false;
        followers.forEach(follower => {
          follower.style.display = 'none';
        });
      });
      
      animate();
    });

    // Walking character animation
    document.addEventListener('DOMContentLoaded', function() {
      const walkingChar = document.getElementById('walkingCharacter');
      let position = 0;
      let direction = 1;
      const speed = 2;
      const maxWidth = window.innerWidth - 50;
      
      function walk() {
        position += speed * direction;
        
        if (position >= maxWidth) {
          direction = -1;
          walkingChar.style.transform = 'scaleX(-1)';
        } else if (position <= 0) {
          direction = 1;
          walkingChar.style.transform = 'scaleX(1)';
        }
        
        walkingChar.style.left = position + 'px';
        requestAnimationFrame(walk);
      }
      
      walk();
    });
  </script>

  <style>
  .jumbotron {
    background-image: url("SitePics/rexbanner.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: white;
  }
  </style>
</head>
<body>

<!-- Header -->
<div class="jumbotron jumbotron-fluid text-center" style="margin-bottom:0">
  <h1>Catherine Ann MacDonald</h1>
  <p style="color: #b82b2f; text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Writer-Artist</p>
  <a href="ChatBot.html" style="text-decoration: none; transition: transform 0.2s ease; display: inline-block; position: relative;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
    <img src="TestBot/noise.gif" alt="noise" style="width: 22px; height: 15px; position: absolute; top: 5px; left: 5px;">
    <img src="TestBot/test.png" alt="computer" style="width: 32px; height: 32px; position: relative;">
  </a>
</div>

<!-- Navigation -->
<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #b82b2f;">
  <a class="navbar-brand" href="#">Menu</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="currentportfolio.html">Current Portfolio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="blog.html">Blog</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="projectsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Projects
        </a>
        <div class="dropdown-menu" aria-labelledby="projectsDropdown">
          <a class="dropdown-item" href="spectrum.html">Spectrum</a>
          <a class="dropdown-item" href="party.html">Party</a>
          <a class="dropdown-item" href="Coding.html">Coding</a>
          <a class="dropdown-item" href="Videos.html">Videos</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="archiveDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Archive
        </a>
        <div class="dropdown-menu" aria-labelledby="archiveDropdown">
          <a class="dropdown-item" href="earlywork.html">Early Work</a>
          <a class="dropdown-item" href="OutdatedDesigns.html">Outdated Designs</a>
        </div>
      </li>
    </ul>
  </div>  
</nav>

<!-- Main Content -->
<div class="container" style="margin-top:30px">
  <div class="row">
    <div class="col-12">
      <h2 style="text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Page Title</h2>
      <h5 style="text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;">Subtitle</h5>
      
      <!-- YOUR CONTENT HERE -->
      
    </div>
  </div>
</div>

<!-- Walking Character -->
<img id="walkingCharacter" class="walking-character" src="SitePics/Shadite.png" alt="Walking Character">

<!-- Footer -->
<div style="background-image: url('SitePics/elizabanner.png'); background-size: contain; background-position: center; background-repeat: no-repeat; padding: 20px; text-align: center; margin-top: 30px; border-radius: 10px; box-shadow: 0 -2px 8px rgba(0,0,0,0.1);">
  <p style="color: white; margin: 0; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Catherine Ann MacDonald</p>
  <p style="color: white; margin: 5px 0 0 0; font-size: 14px; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">&copy; 2025</p>
</div>

<!-- Animated Background -->
<style>
body {
  background-image: url("SitePics/spectrumbackground.png");
  background-size: 200% 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: 0% 50%;
  font-family: Arial, sans-serif;
  animation: spectrumScroll 40s linear infinite;
  color: black;
}

@keyframes spectrumScroll {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.walking-character {
  position: fixed;
  bottom: 20px;
  width: 50px;
  height: 50px;
  z-index: 1000;
  transition: transform 0.1s ease-in-out;
}

h1 {
  color: #b82b2f;
  font-family: Arial, sans-serif;
  text-shadow: 2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 2px 0 white, 0 -2px 0 white, 2px 0 0 white, -2px 0 0 white;
}

.magazine-card {
  border-radius: 10px;
  overflow: hidden;
}

.magazine-card:hover {
  transform: translateY(-5px);
}
</style>

<!-- Image Modal -->
<div id="imageModal" class="modal" style="display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; background-image: url('SitePics/galaxy.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
  <span class="close" style="position: absolute; top: 15px; right: 35px; color: #f1f1f1; font-size: 40px; font-weight: bold; cursor: pointer;">&times;</span>
  <img class="modal-content" id="modalImage" style="margin: auto; display: block; width: 90%; max-width: 1200px; max-height: 90%; object-fit: contain;">
  <div id="caption" style="margin: auto; display: block; width: 80%; max-width: 700px; text-align: center; color: #ccc; padding: 10px 0; height: 150px;"></div>
</div>

<script>
var modal = document.getElementById('imageModal');
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var span = document.getElementsByClassName("close")[0];

function openModal(img, title, description) {
  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = '<h3 style="color: #b82b2f; margin-bottom: 10px;">' + title + '</h3><p style="font-size: 16px; line-height: 1.5;">' + description + '</p>';
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modal.style.display = "none";
  }
});
</script>

<!-- Spotify Widget (Optional) -->
<style>
#spotifyWidget {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background: #000;
  border: 3px solid #1DB954;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  z-index: 9999;
  cursor: move;
}

#spotifyHeader {
  background: #1DB954;
  color: #fff;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
  border-radius: 7px 7px 0 0;
}

#spotifyMinimize {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

#spotifyMinimize:hover {
  color: #000;
}
</style>

<div id="spotifyWidget">
  <div id="spotifyHeader">
    <span>🎵 Spotify Player</span>
    <button id="spotifyMinimize" onclick="toggleSpotify()">+</button>
  </div>
  <div id="spotifyContent" style="display: none;">
    <iframe id="spotifyIframe" style="border-radius: 0 0 7px 7px;" src="https://open.spotify.com/embed/playlist/66TP5uc6hwyESdV9AuvUZJ?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const spotifyWidget = document.getElementById('spotifyWidget');
  if (spotifyWidget) {
    spotifyWidget.style.width = '200px';
  }
});

let spotifyDragging = false;
let spotifyCurrentX;
let spotifyCurrentY;
let spotifyInitialX;
let spotifyInitialY;
let spotifyXOffset = 0;
let spotifyYOffset = 0;

const spotifyWidget = document.getElementById('spotifyWidget');
const spotifyHeader = document.getElementById('spotifyHeader');

spotifyHeader.addEventListener('mousedown', spotifyDragStart);
document.addEventListener('mousemove', spotifyDrag);
document.addEventListener('mouseup', spotifyDragEnd);

function spotifyDragStart(e) {
  spotifyInitialX = e.clientX - spotifyXOffset;
  spotifyInitialY = e.clientY - spotifyYOffset;
  
  if (e.target === spotifyHeader || e.target.parentElement === spotifyHeader) {
    spotifyDragging = true;
  }
}

function spotifyDrag(e) {
  if (spotifyDragging) {
    e.preventDefault();
    spotifyCurrentX = e.clientX - spotifyInitialX;
    spotifyCurrentY = e.clientY - spotifyInitialY;
    spotifyXOffset = spotifyCurrentX;
    spotifyYOffset = spotifyCurrentY;
    
    spotifySetTranslate(spotifyCurrentX, spotifyCurrentY, spotifyWidget);
  }
}

function spotifyDragEnd(e) {
  spotifyInitialX = spotifyCurrentX;
  spotifyInitialY = spotifyCurrentY;
  spotifyDragging = false;
}

function spotifySetTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function toggleSpotify() {
  const content = document.getElementById('spotifyContent');
  const btn = document.getElementById('spotifyMinimize');
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    btn.textContent = '−';
    spotifyWidget.style.width = '300px';
  } else {
    content.style.display = 'none';
    btn.textContent = '+';
    spotifyWidget.style.width = '200px';
  }
}
</script>

</body>
</html>
```

---

## Quick Reference

### Key Assets Used:
- `SitePics/rexbanner.png` - Header jumbotron background
- `SitePics/elizabanner.png` - Footer background
- `SitePics/spectrumbackground.png` - Animated page background
- `SitePics/Bugtie.png` - Cursor follower image
- `SitePics/Shadite.png` - Walking character
- `SitePics/galaxy.png` - Modal background
- `SitePics/whitepaper.jpg` - Background for cards/sections
- `SitePics/hebetransparent.png` - Corner decorations
- `SitePics/mesosad.png` - About me image
- `SitePics/framethorns.png` - Frame decoration
- `TestBot/noise.gif` & `TestBot/test.png` - ChatBot link animation

### Colors:
- Primary: `#b82b2f`
- Spotify Green: `#1DB954`

### Standard Spacing:
- Container top margin: `30px`
- Card margin bottom: `mb-4` (Bootstrap class)
- Footer margin top: `30px`

---

## Tips for Creating New Pages

1. **Start with the Complete Template** - Copy the entire template and modify the content section
2. **Update Page-Specific Content** - Change the `<h2>` and `<h5>` in the main content area
3. **Keep Navigation Consistent** - Don't modify the navbar unless adding new pages
4. **Test Interactivity** - Verify cursor followers, walking character, and modal work properly
5. **Optimize Images** - Ensure all referenced images exist in the project
6. **Unique Function Names** - If adding multiple pages with Spotify widgets, add unique prefixes to avoid JavaScript conflicts
7. **Mobile Responsiveness** - Bootstrap grid classes (col-md-6, col-lg-4) handle this automatically

---

**Version:** 1.0  
**Last Updated:** October 9, 2025  
**Based On:** OutdatedDesigns.html

