if (window.location.pathname == "/") {
  var connected = false
  if (localStorage.clientcolor == undefined) {
    localStorage.clientcolor = `#8934C2`
  }
  if (localStorage.clientcolor == undefined) {
    localStorage.clientcoloralt = `#000000`
  }
  class guidetect{
    getinfo(){
      return `Great, you have A-ClientGUI installed`
    }
  }
  var gd = new guidetect()
  window.gd = new guidetect()

  if (typeof(ac) != 'undefined') {
    if (ac.guidetect() == "im here!") {
      connected = true
      console.log(`%c [!] A-ClientGUI - GUI: connected [!] `, `background: ${localStorage.clientcoloralt}; color: ${localStorage.clientcolor}`);
    }
  }else{
    console.log(`%c [!] A-ClientGUI - I cannot find a copy of A-Client 1.6 or higher installed, I cannot function without it :( [!] `, `background: ${localStorage.clientcoloralt}; color: ${localStorage.clientcolor}`);
  }
  if (connected == true) {
    if (window.location.pathname == "/") {
      var selectelem = `<div class="menu">
                          <i style="padding-left:13px;">A-Client Controls</i>
                          <div class="settings">
                            <input id="clickMe" type="button" value="AutoSecondary" onclick="ac.sendmsg('Auto Secondary Enabled'); ac.autosecondary();" />
                            <input id="clickMe" type="button" value="Nordic" onclick="ac.sendmsg('Nordic Simulator Enabled'); ac.nordic();" />
                            <input id="clickMe" type="button" value="ResetZoom" onclick="ac.sendmsg('Zoom Reset'); ac.resetzoom();" />
                            <input id="clickMe" type="button" value="DTMUnlock" onclick="ac.sendmsg('Unlocking Ship Switcher'); ac.DTMUnlock();" />
                            <input id="clickMe" type="button" value="AutoToxic" onclick="ac.sendmsg('AutoToxic Enabled'); ac.autotoxic();" />
                            <input id="clickMe" type="button" value="SecondarySpam" onclick="ac.sendmsg('Secondary Spam Enabled'); ac.secondaryspam();" />
                          </div>
                        </div>`;
      var basestyle = `.menu:not(:hover) .settings{display: none;} .menu:hover .settings{display: fixed; padding:4px;} .menu{position: fixed; top: 0; right: 0; z-index: 100000000; width: 150px; height: 20px; background-image: linear-gradient(#8934C2, #340057); webkit-transition: .3s ease; transition: .3s ease;} .menu:hover{background-image: linear-gradient(#8934C2, #340057); width: 150px; height: 200px;}`;

      function addStyle(style)
      {
          var headelem = document.getElementsByTagName("head")[0];
          var styleelem = document.createElement("style");
          styleelem.setAttribute("id","customtheme");
          styleelem.type="text/css";
          styleelem.appendChild(document.createTextNode(style));
          headelem.appendChild(styleelem);
      }

      document.body.insertAdjacentHTML("beforeend",selectelem);
      addStyle(basestyle);
    }

    if (localStorage.gui == undefined) {
      localStorage.gui = "on"
    }
    document.addEventListener('keydown', function(e){
      if (e.keyCode == 191) {
        if (localStorage.gui == "on") {
          document.getElementsByClassName("menu")[0].style.top = "-30px"
          localStorage.gui = "off"
          return
        }
        if (localStorage.gui == "off") {
          document.getElementsByClassName("menu")[0].style.top = "0px"
          localStorage.gui = "on"
          return
        }
      }
    })
    if (localStorage.gui == "on") {
      document.getElementsByClassName("menu")[0].style.top = "0px"
    }
    if (localStorage.gui == "off") {
      document.getElementsByClassName("menu")[0].style.top = "-30px"
    }
  }
}
