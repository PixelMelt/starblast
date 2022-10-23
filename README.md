# Pixelmelt's starblastio repo
Assortment of code related to the game starblast.io

# Ancients Epic Modding UI (AEMU)
place the following before your modding code.
```
const include = async function(url) {let response = await fetch(url);let text = await response.text();(1, eval)(text);return text;}
if (!window.initalized) {include("https://pixelmelt.github.io/starblast/src/ancientsEpicModdingUI.js")}
```
when the mod is run, AMEU should initalize and the UI will be available by pressing the key combo ALT + W


# Web Clients
https://github.com/PixelMelt/starblast/tree/main/starblast%20clients/web%20clients

All publicly avalable web clients, dating back to the games release in 2016.

# Desktop Clients
Linux - https://starblast.data.neuronality.com/download/starblast-latest-x86_64.AppImage

Mac - https://starblast.data.neuronality.com/download/Starblast.dmg

Windows - https://starblast.data.neuronality.com/download/starblast_setup-latest.exe
