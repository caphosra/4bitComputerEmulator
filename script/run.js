function keyClick(k)
{
    key = k;
    console.log(key);
}

var oneframe = 50;
var timer = undefined;
var running = false;

var waittime = 0;

function run()
{
    init();

    var runbutton = document.getElementById("run");
    runbutton.disabled = "disabled";

    running = true;
    timer = setInterval(function()
    {
        if(waittime > 0)
        {
            waittime -= oneframe;
            if(waittime < 0)
            {
                console.log("waitfinish");
                waittime = 0;
            }
            else return;
        }

        var p, cmd, arg1, arg2;
        [p, cmd, arg1, arg2] = getCommandsName(pointer, true);
        if(cmd == undefined)
        {
            //program finish
            pointer = 0;
            console.log("finished");
        }
        else
        {
            pointer = p;
        }
    }, 
    oneframe);
}

function stop()
{
    running = false;
    if(timer != undefined) clearInterval(timer);
    init();
    var runbutton = document.getElementById("run");
    runbutton.disabled = "";
}

function init()
{
    key = undefined;
    flag = true;
    pointer = 0;
    timer = undefined;

    if(program === undefined) resetAllProgram();
    if(memory === undefined) resetMemory();

    for(var i = 0; i < 7; i++) light(i, false);
    show(undefined);
}

function resetAllProgram()
{
    var endofmemory = parseInt("4F", 16);

    program = [];
    // 16こ多めに入れることにより、プログラムのオーバーランを防ぐ
    for(var i = 0; i <= (endofmemory + 16); i++)
    {
        program.push("F");
    }
}

function resetMemory()
{
    memory = [];
    for(var i = 0; i < 16; i++)
    {
        memory.push("F");
    }
}

var program_text = undefined;

function setProgramText()
{
    if(program_text === undefined)
    {
        program_text = document.getElementById("program_text");
    }
    var str = program_text.value.split(',');
    for(var i = 0; i < 4 * 16; i++)
    {
        program[i] = str[i];
    }
    reloadView();
}

function getProgramText()
{
    if(program_text === undefined)
    {
        program_text = document.getElementById("program_text");
    }
    var str= "";
    for(var i = 0; i < 4 * 16; i++)
    {
        if(i == 4 * 16 -1)
        {
            str += program[i];
        }
        else
        {
            str += program[i] + ",";
        }
    }
    program_text.value = str;
}