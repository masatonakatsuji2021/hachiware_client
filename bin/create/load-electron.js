const { app, BrowserWindow } = require("electron");

let mainWIndow;

app.on("ready", function(){

    mainWIndow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: {width},
        height: {height},
    });

    mainWIndow.setMenuBarVisibility({toolbar});

    mainWIndow.loadFile("./_dist/index.html");

    // mainWIndow.webContents.openDevTools();

    mainWIndow.on("closed", function(){
        mainWIndow = null;
    });
});

app.on("window-all-closed", function(){
    if(process.platform != "darwin"){
        app.quit();
    }
});
