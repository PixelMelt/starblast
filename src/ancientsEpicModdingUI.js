window.initalized = true

console.log(`inserting into run stop functions`)

Modding.prototype.run = Function("return " + Modding.prototype.run.toString().replace(`var t;`,`window.modrunning=true;var t;`))();
Modding.prototype.stop = Function("return " + Modding.prototype.stop.toString().replace(`return`,`window.modrunning=false;return`))();

function aemuKick(id,reason="Unspecified"){
    if(!window.modrunning){console.log(`mod not running, cannot kick`);return;}
    if(id == undefined){console.log(`no id specified, cannot kick`);return;}
    game.ships[id].gameover({"You were kicked for : ":reason,"Your name: ":game.ships[id].name,"Score: ":game.ships[id].score});
    game.modding.terminal.echo(" | Player: "+game.ships[id].name+", id: "+id+" Has successfully been kicked\n");
}

function createKickUI(){
    // create a pop up in the middle of the screen with 2 inputs and a button to cancel or kick
    
    let kickUI = document.createElement(`div`)
    kickUI.id = `kickUI`

    kickUI.style.margin = `0`
    kickUI.style.padding = `0`
    kickUI.style.overflow = `hidden`
    kickUI.style.font = `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
    kickUI.style.position = `absolute`
    kickUI.style.top = `0`
    kickUI.style.bottom = `0`
    kickUI.style.left = `0`
    kickUI.style.right = `0`
    kickUI.style.background = `none`
    kickUI.style.backgroundColor = `#2263D264`
    kickUI.style.flexDirection = `column`
    kickUI.style.display = `flex`
    kickUI.style.alignItems = `center`
    kickUI.style.justifyContent = `center`
    kickUI.style.zIndex = `1000`

    // dropdown menu for all the players in the game
    let kickUIinputUser = document.createElement(`select`)
    kickUIinputUser.id = `kickUIinputUser`
    kickUIinputUser.style.margin = `10px`
    kickUIinputUser.style.padding = `10px`
    kickUIinputUser.style.display = `flex`
    kickUIinputUser.style.color = `#000`
    kickUIinputUser.style.backgroundColor = `#fff`
    kickUIinputUser.style.borderRadius = `5px`

    // add a default option that says "no players in game"
    let kickUIinputUserDefault = document.createElement(`option`)
    kickUIinputUserDefault.value = ``
    kickUIinputUserDefault.innerHTML = `No players in game`
    kickUIinputUser.appendChild(kickUIinputUserDefault)
    
    // if there are ships in the game
    if(game.ships.length > 0){
        // remove all children of the select element
        while(kickUIinputUser.firstChild){
            kickUIinputUser.removeChild(kickUIinputUser.firstChild)
        }
        // content of the dropdown menu
        for(let i = 0; i < game.ships.length; i++){
            let option = document.createElement(`option`)
            option.value = i
            option.innerHTML = game.ships[i].name + ` (id: ` + i + `)`
            kickUIinputUser.appendChild(option)
        }
    }


    // input for the reason
    let kickUIinputReason = document.createElement(`input`)
    kickUIinputReason.id = `kickUIinputReason`
    kickUIinputReason.style.backgroundColor = `#fff`
    kickUIinputReason.style.borderRadius = `5px`
    kickUIinputReason.style.margin = `10px`
    kickUIinputReason.style.padding = `10px`
    // text box example value
    kickUIinputReason.placeholder = `Reason for kick`

    // group the buttons together
    let kickUIbuttons = document.createElement(`div`)
    kickUIbuttons.style.display = `flex`
    kickUIbuttons.style.flexDirection = `row`
    kickUIbuttons.style.alignItems = `center`
    kickUIbuttons.style.justifyContent = `center`

    // button to cancel
    let kickUIcancel = document.createElement(`button`)
    kickUIcancel.id = `kickUIcancel`
    kickUIcancel.innerHTML = `Cancel`
    kickUIcancel.style.backgroundColor = `#fff`
    kickUIcancel.style.borderRadius = `5px`
    kickUIcancel.style.margin = `10px`
    kickUIcancel.style.padding = `10px`
    kickUIcancel.onclick = function(){
        // destroy the UI
        document.getElementById(`kickUI`).remove()
    }

    // button to kick
    let kickUIkick = document.createElement(`button`)
    kickUIkick.id = `kickUIkick`
    kickUIkick.innerHTML = `Kick`
    kickUIkick.style.backgroundColor = `#fff`
    kickUIkick.style.borderRadius = `5px`
    kickUIkick.style.margin = `10px`
    kickUIkick.style.padding = `10px`
    kickUIkick.onclick = function(){
        // kick the player
        aemuKick(kickUIinputUser.value,kickUIinputReason.value)
        // destroy the UI
        document.getElementById(`kickUI`).remove()
    }

    // append all the elements to the UI
    kickUIbuttons.appendChild(kickUIcancel)
    kickUIbuttons.appendChild(kickUIkick)
    kickUI.appendChild(kickUIinputUser)
    kickUI.appendChild(kickUIinputReason)
    kickUI.appendChild(kickUIbuttons)
    document.body.appendChild(kickUI)
}

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
    div.style.background = `none`
    div.style.backgroundColor = `#2263D2`
    div.style.display = `none`
    div.style.flexDirection = `column`
    div.style.alignItems = `top`
    div.style.justifyContent = `flex-start`
    div.style.zIndex = `1000`

    document.getElementsByClassName(`insideeditorpanel`)[0].appendChild(div)
}

function createGameinfo(){
    let gameinfo = document.createElement(`div`)
    gameinfo.id = `gameinfo`

    // rounded card at the top in a flexbox
    gameinfo.style.backgroundColor = `#fff`
    gameinfo.style.borderRadius = `5px`
    gameinfo.style.margin = `10px`
    gameinfo.style.padding = `10px`
    gameinfo.style.display = `flex`
    gameinfo.style.color = `#000`

    document.getElementById(`modcustomthing`).appendChild(gameinfo)
}

function createTopButtons(){
    let div = document.createElement(`div`)
    div.id = `modcustombuttons`

    div.style.overflow = `hidden`
    div.style.font = `12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`
    div.style.display = `flex`
    div.style.flexDirection = `row`
    div.style.alignItems = `top`
    div.style.justifyContent = `flex-start`
    div.style.zIndex = `1000`

    function buttonStyle(button){
        button.style.backgroundColor = `#fff`
        button.style.border = `0px solid #000`
        button.style.borderRadius = `5px`
        button.style.margin = `10px`
        button.style.padding = `10px`
        button.style.width = `90%`
        button.style.display = `flex`
        button.style.color = `#000`
        return button
    }
    
    let endgame = document.createElement(`div`)
    endgame.id = `modcustombuttonendgame`
    endgame.innerHTML = `End game`
    endgame.onclick = function(){
        game.modding.commands.stop()
    }
    endgame = buttonStyle(endgame)


    let kickplayer = document.createElement(`div`)
    kickplayer.id = `modcustombuttonkickplayer`
    kickplayer.innerHTML = `Kick`
    kickplayer.onclick = function(){
        createKickUI()
        console.log(`kick`)
    }
    kickplayer = buttonStyle(kickplayer)

    div.appendChild(endgame)
    div.appendChild(kickplayer)

    document.getElementById(`modcustomthing`).appendChild(div)
}

function createTopLogotext(){
    let div = document.createElement(`div`)
    div.id = `modcustomlogotext`

    div.style.overflow = `hidden`
    div.style.display = `flex`
    div.style.flexDirection = `column`
    div.style.alignItems = `top`
    div.style.justifyContent = `flex-start`
    div.style.zIndex = `1000`

    let text = document.createElement(`div`)
    text.id = `modcustomlogotexttext`
    text.innerHTML = `AEMU Modding Interface`

    // rounded card at the top in a flexbox
    text.style.backgroundColor = `#fff`
    text.style.border = `0px solid #000`
    text.style.borderRadius = `5px`
    text.style.margin = `10px`
    text.style.padding = `10px`
    text.style.display = `flex`

    text.style.color = `rgba(0, 0, 0, 0.6)`
    text.style.background = `#2d6edd`
    text.style.textShadow = `rgba(0, 0, 0, 0.2) 2px 8px 6px, rgba(255, 255, 255, 0.3) 0px -5px 35px`
    text.style.color = `var(--darkreader-inline-color)`
    text.style.fontSize = `3.5em`

    div.appendChild(text)

    document.getElementById(`modcustomthing`).appendChild(div)
}

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
window.moduiopen = false
// editorSwitch toggle when alt+e is pressed
document.addEventListener(`keydown`, function(e){
    if(e.altKey && e.key == `w`){
        if(window.modrunning){
            if(window.moduiopen){
                editorSwitch(true)
                window.moduiopen = false
            }else{
                editorSwitch(false)
                window.moduiopen = true
            }
        }
    }
})


window.verifystate = window.modrunning
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
                document.getElementById(`gameinfo`).innerText += `\nid: ${i}, Name: ${game.ships[i].name}, Type: ${game.ships[i].type}, Coordinates: X: ${Math.round(game.ships[i].x * 100) / 100}, Y: ${Math.round(game.ships[i].y * 100) / 100}`
            }
        }

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
                        editorSwitch(true)
                    }
                }
            }
        }

    }


    if(window.modrunning){
        if(!window.verifystate){
            window.verifystate = true
            sendNotification(`Mod started.`, `#00ff00`)
        }
    }else{
        if(window.verifystate){
            window.verifystate = false
            sendNotification(`Mod stopped.`, `#ff0000`)
            moduiopen = false
            modrunning = false
            editorSwitch(true)
        }
    }
}, 100)

createCustomUI()

createTopLogotext()
createTopButtons()
createGameinfo()
