window.initalized = true
function editorSwitch(state){
    if(state){
        document.getElementById(`editor`).style.display = `block`
        document.getElementById(`modcustomthing`).style.display = `none`
    }else{
        document.getElementById(`editor`).style.display = `none`
        document.getElementById(`modcustomthing`).style.display = `flex`
    }
}

function createCustomUI(){
    let div = document.createElement(`div`)
    div.id = `modcustomthing`

    div.style.margin = `0`
    div.style.padding = `0`
    div.style.overflow = `hidden`
    div.style.font = `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
    div.style.direction = `ltr`
    div.style.position = `absolute`
    div.style.top = `0`
    div.style.bottom = `0`
    div.style.left = `0`
    div.style.right = `0`
    div.style.background = `none !important`
    div.style.backgroundColor = `#2263D2`
    div.style.display = `none`
    div.style.flexDirection = `column`
    div.style.alignItems = `top`
    div.style.justifyContent = `flex-start`
    div.style.zIndex = `1000`

    let gameinfo = document.createElement(`div`)
    gameinfo.id = `gameinfo`

    // rounded card at the top in a flexbox
    gameinfo.style.backgroundColor = `#fff`
    gameinfo.style.borderRadius = `5px`
    gameinfo.style.margin = `10px`
    gameinfo.style.padding = `10px`
    gameinfo.style.width = `90%`
    gameinfo.style.display = `flex`
    gameinfo.style.color = `#000`

    div.appendChild(gameinfo)

    document.getElementsByClassName(`insideeditorpanel`)[0].appendChild(div)
}

window.moduiopen = false
// editorSwitch toggle when alt+e is pressed
document.addEventListener(`keydown`, function(e){
    if(e.altKey && e.key == `w`){
        if(window.moduiopen){
            editorSwitch(true)
            window.moduiopen = false
        }else{
            editorSwitch(false)
            window.moduiopen = true
        }
    }
})

async function sendNotification(msg, color) {
    let iconcolor = `white`
    if(color){
        iconcolor = color
    }
    var notiArea = document.createElement("div");
    notiArea.className = "noti-area";
    notiArea.style.top = "-50px";
    notiArea.style.width = "100%";
    notiArea.style.height = "40px";
    notiArea.style.backgroundColor = "#00000000";
    notiArea.style.position = "absolute";
    notiArea.style.pointerEvents = "none";
    var notiBox = document.createElement("div");
    notiBox.className = "noti-box";
    notiBox.style.width = "30%";
    notiBox.style.height = "40px";
    notiBox.style.border = "2px solid";
    notiBox.style.borderColor = "black";
    notiBox.style.borderRadius = "25px";
    notiBox.style.backgroundColor = "#000000";
    notiBox.style.margin = "0 auto";
    notiBox.style.pointerEvents = "none";
    var notiText = document.createElement("div");
    notiText.className = "noti-text";
    notiText.style.color = "white";
    notiText.style.height = "40px";
    notiText.style.lineHeight = "40px";
    notiText.style.textAlign = "center";
    notiText.style.backgroundColor = "#00000000";
    notiText.style.margin = "0 auto";
    notiText.style.pointerEvents = "none";
    var notiIcon = document.createElement("div");
    notiIcon.className = "noti-icon";
    notiIcon.style.width = "30px";
    notiIcon.style.height = "30px";
    notiIcon.style.borderRadius = "50%";
    notiIcon.style.backgroundColor = iconcolor;
    notiIcon.style.margin = "0 auto";
    notiIcon.style.position = "absolute";
    notiIcon.style.top = "6.5px";
    notiIcon.style.marginLeft = "5px";
    notiIcon.style.pointerEvents = "none";
    notiArea.appendChild(notiBox);
    notiBox.appendChild(notiText);
    notiBox.appendChild(notiIcon);
    notiText.innerHTML = msg;
    document.body.appendChild(notiArea);
    let topphat = document.getElementsByClassName(`noti-area`)[0].style.top
    topphat = topphat.replace("px", "")
    topphat = parseInt(topphat)
    while(topphat <= 10){
        topphat = document.getElementsByClassName(`noti-area`)[0].style.top
        topphat = topphat.replace("px", "")
        topphat = parseInt(topphat)
        document.getElementsByClassName(`noti-area`)[0].style.top = (topphat + 4) + "px";
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    await new Promise(resolve => setTimeout(resolve, 1400));
    topphat = document.getElementsByClassName(`noti-area`)[0].style.top
    topphat = topphat.replace("px", "")
    topphat = parseInt(topphat)
    while(topphat >= -50){
        topphat = document.getElementsByClassName(`noti-area`)[0].style.top
        topphat = topphat.replace("px", "")
        topphat = parseInt(topphat)
        document.getElementsByClassName(`noti-area`)[0].style.top = (topphat - 4) + "px";
        await new Promise(resolve => setTimeout(resolve, 1));
    }
    document.body.removeChild(notiArea);
    return true;
}

window.modrunning = true

//  ui update tick
setInterval(function(){
    if(window.modrunning){
        if(window.moduiopen){
            document.getElementById(`gameinfo`).innerText = `Game Info:
            Total amount of aliens: ${game.aliens.length}
            Total amount of asteroids: ${game.asteroids.length}
            Total amount of players: ${game.ships.length}
            List of players and their IDs:`
    
            // loop through all the ships and add them to the list
            for(let i = 0; i < game.ships.length; i++){
                document.getElementById(`gameinfo`).innerText += `\nid: ${i}, Name: ${game.ships[i].name}, Type: ${game.ships[i].type}\nCoordinates: X: ${game.ships[i].x}, Y: ${game.ships[i].y}`
            }
        }
    
        // continueously search #terminal for the span "Mod stopped" and if it exists add a period to it
        if(document.getElementById(`terminal`)){
            if(document.getElementById(`terminal`).innerText.includes(`Mod stopped\n> \n `)){
                // loop through spans
                // the spans find Mod stopped and add a period to it
    
                let spans = document.querySelector(`#terminal > div.terminal-wrapper > div.terminal-output`)
                // look for 
                // <div data-index="4"><div style="width: 100%;"><span>Mod&nbsp;started</span></div></div>
                for(let i = 0; i < spans.childNodes.length; i++){
                    if(spans.childNodes[i].innerHTML.includes(`Mod&nbsp;stopped`)){
                        spans.childNodes[i].innerHTML += spans.childNodes[i].innerHTML.replace(`Mod&nbsp;stopped`,`Mod&nbsp;stopped.`)
                        sendNotification(`Mod stopped.`, `#ff0000`)
                        spans.childNodes[i].childNodes[0].remove()
                        moduiopen = false
                        modrunning = false
                        editorSwitch(false)
                    }
                }
    
    
            }
        }
    }
}, 100)

createCustomUI()
sendNotification(`Mod ran!`, `#00ff00`)
