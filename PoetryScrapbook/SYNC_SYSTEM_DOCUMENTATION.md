# Scrapbook Sync System Documentation

## Overview
The Poetry Scrapbook features a robust bidirectional sync system that ensures all changes made in either regular view or fullscreen mode are preserved and synchronized.

---

## Sync Architecture

### **Sync Direction 1: Fullscreen → Normal View**
**Frequency:** Every 1 second (1000ms)  
**Function:** `syncFromFullscreen()`

#### What Syncs:
1. ✅ **Text Content** - All textarea values
2. ✅ **Canvas Drawings** - Complete drawing data via `drawImage()`
3. ✅ **Element Positions** - Left and top coordinates
4. ✅ **Z-Index** - Layer order
5. ✅ **Background Image** - Custom backgrounds
6. ✅ **New Elements** - Elements added in fullscreen appear in normal view
7. ✅ **Deleted Elements** - Elements removed in fullscreen disappear from normal view

#### How It Works:
```javascript
// Every second while in fullscreen:
1. Get all elements from both views
2. For each matching element:
   - Copy textarea.value
   - Copy canvas content using drawImage()
   - Copy position (left, top)
   - Copy z-index
3. If element count changed:
   - Save all canvas data
   - Rebuild HTML from fullscreen
   - Restore canvas drawings
   - Re-initialize interactivity
4. Sync background image styles
```

---

### **Sync Direction 2: Normal View → Fullscreen**
**Frequency:** Every 2 seconds (2000ms)  
**Function:** `syncToFullscreen()`

#### What Syncs:
1. ✅ **Text Content** - Textarea values (only if user isn't typing)
2. ✅ **Canvas Drawings** - Complete drawing data
3. ✅ **Element Positions** - Coordinates and z-index
4. ✅ **Background Image** - Custom backgrounds

#### How It Works:
```javascript
// Every 2 seconds while in fullscreen:
1. Check if user is actively typing (skip if they are)
2. For each element:
   - Copy textarea.value from normal to fullscreen
   - Copy canvas content using drawImage()
   - Copy positions and z-index
3. Sync background image if changed
```

---

## Sync Triggers

### **Automatic Syncing:**
- ✅ Starts when entering fullscreen mode
- ✅ Runs continuously while in fullscreen
- ✅ Stops when exiting fullscreen

### **Manual Syncing:**
- ✅ Final sync on fullscreen exit
- ✅ Immediate sync when toggling modes

---

## Data Preservation

### **Text Areas:**
```javascript
// Syncs textarea.value directly
normalTextarea.value = fsTextarea.value;
```

### **Canvas Drawings:**
```javascript
// Uses canvas.toDataURL() and drawImage() for perfect reproduction
const normalCtx = normalCanvas.getContext('2d', { alpha: true });
normalCtx.clearRect(0, 0, normalCanvas.width, normalCanvas.height);
normalCtx.drawImage(fsCanvas, 0, 0);
```

### **Positions & Layering:**
```javascript
// Direct style property copying
element.style.left = sourceElement.style.left;
element.style.top = sourceElement.style.top;
element.style.zIndex = sourceElement.style.zIndex;
```

### **Background Images:**
```javascript
// Syncs all background properties
container.style.backgroundImage = source.style.backgroundImage;
container.style.backgroundSize = source.style.backgroundSize;
container.style.backgroundPosition = source.style.backgroundPosition;
container.style.backgroundRepeat = source.style.backgroundRepeat;
```

---

## Edge Cases Handled

### **1. New Elements Added**
- ✅ Detected by comparing element counts
- ✅ Triggers full HTML rebuild
- ✅ Canvas data preserved during rebuild
- ✅ All interactivity re-initialized

### **2. Elements Deleted**
- ✅ Detected by comparing element counts
- ✅ Triggers full HTML rebuild
- ✅ Remaining elements preserved

### **3. User Actively Typing**
- ✅ Sync skips active textarea to avoid disruption
- ✅ Checks `document.activeElement !== textarea`

### **4. Canvas Transparency**
- ✅ Alpha channel enabled: `getContext('2d', { alpha: true })`
- ✅ Transparent backgrounds preserved
- ✅ Eraser mode works correctly

### **5. Multiple Canvases**
- ✅ Each canvas tracked independently
- ✅ All canvases sync simultaneously
- ✅ Drawing on one doesn't affect others

---

## Testing Scenarios

### ✅ Scenario 1: Write in Normal, View in Fullscreen
1. Add text in normal view
2. Enter fullscreen
3. **Result:** Text appears immediately in fullscreen

### ✅ Scenario 2: Draw in Fullscreen, View in Normal
1. Enter fullscreen
2. Add drawing canvas and draw
3. Exit fullscreen
4. **Result:** Drawing appears in normal view

### ✅ Scenario 3: Work in Both Modes
1. Add text in normal view
2. Enter fullscreen
3. Add drawing in fullscreen
4. Exit fullscreen
5. **Result:** Both text and drawing preserved

### ✅ Scenario 4: Continuous Editing
1. Enter fullscreen
2. Type in textarea (syncs every 1 second)
3. Draw on canvas (syncs every 1 second)
4. Move elements (syncs every 1 second)
5. **Result:** All changes appear in normal view in real-time

### ✅ Scenario 5: Background Images
1. Set background in normal view
2. Enter fullscreen
3. **Result:** Background appears in fullscreen
4. Change background in fullscreen
5. Exit fullscreen
6. **Result:** New background in normal view

---

## Performance Optimization

### **Sync Frequencies:**
- **Fullscreen → Normal:** 1 second (user's main work area)
- **Normal → Fullscreen:** 2 seconds (lighter load)

### **Why Different Frequencies?**
- Users primarily work in fullscreen when it's open
- Normal view updates are less critical during fullscreen
- Reduces processing overhead
- Prevents sync conflicts

### **Smart Syncing:**
- Only syncs if in fullscreen mode
- Skips textarea sync if user is typing
- Only rebuilds HTML when element count changes
- Preserves canvas data during rebuilds

---

## Cleanup

### **On Fullscreen Exit:**
```javascript
clearInterval(syncInterval);      // Stop fullscreen → normal sync
clearInterval(syncToFsInterval);  // Stop normal → fullscreen sync
syncFromFullscreen();              // Final sync
```

---

## Conclusion

The sync system ensures **zero data loss** between modes:
- ✅ Text is always preserved
- ✅ Drawings are always preserved
- ✅ Positions are always preserved
- ✅ Layers are always preserved
- ✅ Backgrounds are always preserved
- ✅ New/deleted elements handled correctly
- ✅ User experience is smooth and uninterrupted

**Status: FULLY FUNCTIONAL** ✅

