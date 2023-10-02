var kills = [
    {
        killer: "John",
        killerSide: "ct",
        victim: "Doe",
        victimSide: "t",
        weapon: "ak47",
        headshot: false
    },
    {
        killer: "Xmarks",
        killerSide: "t",
        victim: "Tristesse",
        victimSide: "ct",
        weapon: "zeus",
        headshot: false
    },
    {
        killer: "Gratefuldread",
        killerSide: "ct",
        victim: "Matilderex",
        victimSide: "t",
        weapon: "deagle",
        headshot: true
    },
    {
        killer: "terrafirma",
        killerSide: "t",
        victim: "Pearoo",
        victimSide: "ct",
        weapon: "ssg08",
        headshot: false
    },
    {
        killer: "DeathWatcher",
        killerSide: "ct",
        victim: "Sparkplugx",
        victimSide: "t",
        weapon: "p90",
        headshot: true
    },
    {
        killer: "Klondike",
        killerSide: "t",
        victim: "LilJoey",
        victimSide: "ct",
        weapon: "m4a4",
        headshot: false
    },
    {
        killer: "Urvasectu",
        killerSide: "ct",
        victim: "Tenacity_RT",
        victimSide: "t",
        weapon: "m4a1s",
        headshot: true
    },
    {
        killer: "FevreDream",
        killerSide: "t",
        victim: "Prima",
        victimSide: "ct",
        weapon: "galilar",
        headshot: false
    },
    {
        killer: "DogofWar",
        killerSide: "t",
        victim: "JuicyRaptor",
        victimSide: "ct",
        weapon: "famas",
        headshot: false
    }
];
var madeUpPerson = {
    name: "Nostr1c",
    team: "t"
}

var chatIsOpened = false;
var consoleIsOpened = false;
var allMessages = {};
var messageId = 0;

$(document).ready(function() {
    // Remove this
    setInterval(function(){ 
        addKillToKillFeed()
    }, 1350);

    // Startmenu sound when hovering
    $(document).on("mouseenter", ".topbar-options-child", () => {
        playSound("sound3", 0.02);
    });

    $(document).on("mouseenter", ".friends-child", () => {
        playSound("sound3", 0.02);
    });

    // Send advertisement each minute
    setInterval(function(){ 
        sendAdvertisement();
    }, 60000);

    // Open & Close Chat & Console
    $(document).on('keyup', function(e) {

        // Chat
        if (!chatIsOpened) {
            if (e.key == "t") {
                $("#chat-wrapper").addClass("opened")
                $("#chat-input").select();
                console.log("Chat is opened.")
                chatIsOpened = true;
            }
        } else {
            if (e.key == "Escape") {
                $("#chat-wrapper").removeClass("opened")
                console.log("Chat is closed.")
                chatIsOpened = false;
                $("#chat-parent").animate({ scrollTop: 0 }, 0);
            }
        }

        // Console
        if (!consoleIsOpened) {
            if (e.key == "§") {
                $("#console-wrapper").show();
                $("#console-input").select();
                console.log("Console is opened.")
                consoleIsOpened = true;
            }
        } else {
            if (e.key == "Escape") {
                $("#console-wrapper").hide();
                console.log("Console is closed.")
                consoleIsOpened = false;
            }
        }
    });

    // Close console button
    $(document).on("click", "#console-close", () => {
        $("#console-wrapper").hide();
        consoleIsOpened = false;
    });

    // Send chat message through enter
    $("#chat-input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            let message = $(this).val();
            if (message) {
                sendMessage(`<span class="chat-${madeUpPerson.team}">${madeUpPerson.name}</span>: ${message}`);
            }
        }
    });

    // Send chat message with click
    $(document).on("click", "#chat-send-btn", () => {
        let message = $("#chat-input").val();
        if (message) {
            sendMessage(message);
        }
    });

    // Send console command through enter
    $("#console-input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            let command = $(this).val();
            if (command) {
                sendCommand(command);
            }
        }
    });

    // Open up scoreboard
    $(document).on('keydown', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '9'){
            $("#sb-wrapper").show();
        }
    });

    // Close scoreboard
    $(document).on('keyup', function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '9'){
            $("#sb-wrapper").hide();
        }
    });
})

function playSound(sound, volume) {
    switch (sound) {
        case "sound1":
            newSound = "assets/sounds/mixkit-game-click-1114.wav";
        break;
        case "sound2":
            newSound = "assets/sounds/mixkit-game-quick-warning-notification-268.wav";
        break;
        case "sound3":
            newSound = "assets/sounds/mixkit-gate-latch-click-1924.wav";
        break;
        case "sound4":
            newSound = "assets/sounds/mixkit-interface-click-1126.wav";
        break;
        case "sound5":
            newSound = "assets/sounds/mixkit-interface-click-hover-1127.wav";
        break;
        case "sound6":
            newSound = "assets/sounds/mixkit-modern-click-box-check-1120.wav";
        break;
        case "sound7":
            newSound = "assets/sounds/mixkit-modern-technology-select-3124.wav";
        break;
        case "sound8":
            newSound = "assets/sounds/mixkit-old-camera-shutter-click-1137.wav";
        break;
        case "sound9":
            newSound = "assets/sounds/mixkit-sci-fi-click-900.wav";
        break;
        default:
            console.log("Empty action received.");
    }

    var audio = new Audio(newSound);
    audio.loop = false;
	audio.volume = volume;
    audio.play().catch(function (error) {
        console.log("Chrome cannot play sound without user interaction first.")});; 
}

function addKillToKillFeed() {
    let html = `
    <div class="kill">
        <div class="player-parent ${kills[Math.floor(Math.random() * kills.length)].killerSide}">
            <span class="player">${kills[Math.floor(Math.random() * kills.length)].killer}</span>
        </div>
        <img class="weapon" src="assets/killfeed/weapons/${kills[Math.floor(Math.random() * kills.length)].weapon}.png">
        ${
            kills[Math.floor(Math.random() * kills.length)].headshot ?
            "<img class='weapon' src='assets/killfeed/headshot.png'></img>" : ""
        }
        <div class="player-parent ${kills[Math.floor(Math.random() * kills.length)].victimSide}">
            <span class="player">${kills[Math.floor(Math.random() * kills.length)].victim}</span>
        </div>
    </div>`;
    $(html).appendTo("#killfeed")
    .delay(4000)
    .queue(function() {
        $(this).remove();
    });

    addToConsole(`${kills[Math.floor(Math.random() * kills.length)].killer} killed ${kills[Math.floor(Math.random() * kills.length)].victim} with a ${kills[Math.floor(Math.random() * kills.length)].weapon}`);
}

function sendMessage(data, console) {
    messageId++;
    let html = `
        <span>${data}</span>
    `;

    $(html).prependTo("#chat-parent");

    allMessages[messageId] = {
        content: data
    }

    if (!console) {
        chatIsOpened = false;
        $("#chat-wrapper").removeClass("opened")
        $("#chat-input").val("");
        $("#chat-parent").animate({ scrollTop: 0 }, 0);
        addToConsole(data);
        addToConsole(JSON.stringify(allMessages));
        console.log("Chat is closed.")
    }
}

function addToConsole(data) {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    let html = `
    <span><span>${time}: </span>${data}</span>
    `;
    $("#console-body").prepend(html);
}

function sendCommand(data) {
    if (data == "clear") {
        $("#console-body").html("");
    } else {
        addToConsole("<span style='color: red'>There is no such command. Try again!</span>")
    }

    $("#console-input").val("");
}

function sendAdvertisement() {
    sendMessage(advertisements[Math.floor(Math.random() * advertisements.length)], true)
}