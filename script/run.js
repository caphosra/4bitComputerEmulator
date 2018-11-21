// Following parameters are for waiting program.
// WAIT_COUNT : the number of running command in one frame
var WAIT_COUNT = 10;
var wait_counter = 0;
var oneframe = 50;

var timer = undefined;
var running = false;

// waittime : the command of "CAL TIMR"
var waittime = 0;

function run() {
    init();

    var runbutton = document.getElementById("run");
    runbutton.className = "not_active";
    var stopbutton = document.getElementById("stop");
    stopbutton.className = "image_button";

    running = true;
    timer = setInterval(function () {
        // Init wait_counter
        wait_counter = 0;

        // Waiting
        if (waittime > 0) {
            waittime -= oneframe;
            if (waittime <= 0) {
                console.log("CAL TIMR Finished");
                waittime = 0;
            }
            else return;
        }

        // Not waiting
        if (waittime == 0) {
            while (wait_counter < WAIT_COUNT) {
                var p, cmd, arg1, arg2;
                // Run
                [p, cmd, arg1, arg2] = getCommandsName(pointer, true);
                if (cmd == undefined) {
                    // Program finish
                    pointer = 0;
                    console.log("Program Finished");

                    // Wait oneframe
                    return;
                }
                else {
                    pointer = p;

                    // If this program get waiting, reload this function  
                    if (arg1 == "TIMR") {
                        console.log("CAL TIMR called (WaitTime=" + waittime + ")");
                        return;
                    }
                }
                wait_counter += 1;
            }
        }
    },
    oneframe);
}

function stop() {
    running = false;
    if (timer != undefined) clearInterval(timer);
    init();
    var runbutton = document.getElementById("run");
    runbutton.className = "image_button";
    var stopbutton = document.getElementById("stop");
    stopbutton.className = "not_active";
}

function init() {
    key = undefined;
    flag = true;
    pointer = 0;
    timer = undefined;

    if (program === undefined) resetAllProgram();
    if (memory === undefined) resetMemory();

    for (var i = 0; i < 7; i++) light(i, false);
    show(undefined);
}

function resetAllProgram() {
    var endofmemory = parseInt("4F", 16);

    program = [];
    // 16こ多めに入れることにより、プログラムのオーバーランを防ぐ
    for (var i = 0; i <= (endofmemory + 16) ; i++) {
        program.push("F");
    }
}

function resetMemory() {
    memory = [];
    for (var i = 0; i < 16; i++) {
        memory.push("F");
    }
}

// Key clicked
function keyClick(k) {
    key = k;
    console.log("Key clicked (Key=" + key + ")");
}

var program_text = undefined;

// Set program_text (TextField)
function setProgramText() {
    if (program_text === undefined) {
        program_text = document.getElementById("program_text");
    }
    var str = program_text.value.split(',');
    for (var i = 0; i < 4 * 16; i++) {
        program[i] = str[i];
    }
    reloadView();
}

// Get program_text (TextField)
function getProgramText() {
    if (program_text === undefined) {
        program_text = document.getElementById("program_text");
    }
    var str = "";
    for (var i = 0; i < 4 * 16; i++) {
        if (i == 4 * 16 - 1) {
            str += program[i];
        }
        else {
            str += program[i] + ",";
        }
    }
    program_text.value = str;
}

var oneframe_ipt = undefined;
var oneframe_out = undefined;

// Set oneframe (Slider)
function setOneFrame() {
    if (oneframe_ipt === undefined) {
        oneframe_ipt = document.getElementById("oneframe");
    }
    if (oneframe_out === undefined) {
        oneframe_out = document.getElementById("oneframe_out");
    }

    oneframe_out.innerHTML = oneframe_ipt.value;
    oneframe = oneframe_ipt.value;
}

var wait_count_ipt = undefined;
var wait_count_out = undefined;

// Set WAIT_COUNT (Slider)
function setWAIT_COUNT() {
    if (wait_count_ipt === undefined) {
        wait_count_ipt = document.getElementById("wait_count");
    }
    if (wait_count_out === undefined) {
        wait_count_out = document.getElementById("wait_count_out");
    }

    wait_count_out.innerHTML = wait_count_ipt.value;
    WAIT_COUNT = wait_count_ipt.value;
}