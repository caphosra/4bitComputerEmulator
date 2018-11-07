/*
mode
0 : program view
1 : memory view
2 : program view command mode
*/
var mode = 0;

function selectMode()
{
    mode = mode + 1;
    mode = mode % 3;

    reloadView();
}

function reloadView() 
{
    console.log(mode);

    var save = document.getElementById("save");
    save.className = "hidden";
    var select = document.getElementById("select");
    select.className = "";

    var m = document.getElementById("mode");

    switch(mode)
    {
        case 0:
        {
            m.innerHTML = "program(16)";
            programView();
        }
        break;
        case 1:
        {
            m.innerHTML = "memory(16)";
            memoryView();
        }
        break;
        case 2:
        {
            m.innerHTML = "program(code)";
            programViewCommandMode();
        }
        break;
    }
}

function programView()
{
    var endofmemory = parseInt("4F", 16);

    if (program === undefined)
    {
        program = [];
        // 3つ多めに入れることにより、プログラムのオーバーランを防ぐ
        for(var i = 0; i <= (endofmemory + 3); i++)
        {
            program.push("F");
        }
    }

    var element = document.getElementById("memoryview");
    var str = "";

    str += "<table class='memoryTable'>";

    for(var i = 0; i <= endofmemory; i++)
    {
        str += "<tr><td>" + i.toString(16).toUpperCase() + "</td>" +
            "<td>" + program[i] + "</td></tr>\n";
    }

    str += "</table>"

    element.innerHTML = str;
}

function memoryView()
{
    if (memory === undefined)
    {
        memory = [];
        for(var i = 0; i < 16; i++)
        {
            memory.push("F");
        }
    }

    var element = document.getElementById("memoryview");
    var str = "";

    str += "<table class='memoryTable'>";

    for(var i = 0; i < 15; i++)
    {
        str += "<tr><td>M" + i.toString(16).toUpperCase() + "</td>" +
            "<td>" + memory[i] + "</td></tr>\n";
    }

    str += "<tr><td>Ar</td><td>" + ar + "</td></tr>\n";
    str += "<tr><td>Br</td><td>" + br + "</td></tr>\n";
    str += "<tr><td>Yr</td><td>" + yr + "</td></tr>\n";
    str += "<tr><td>Zr</td><td>" + zr + "</td></tr>\n";

    str += "<tr><td>A'r</td><td>" + arex + "</td></tr>\n";
    str += "<tr><td>B'r</td><td>" + brex + "</td></tr>\n";
    str += "<tr><td>Y'r</td><td>" + yrex + "</td></tr>\n";
    str += "<tr><td>Z'r</td><td>" + zrex + "</td></tr>\n";

    str += "</table>"

    element.innerHTML = str;
}

function programViewCommandMode()
{
    var endofmemory = parseInt("4F", 16);

    if (program === undefined)
    {
        program = [];
        // 3つ多めに入れることにより、プログラムのオーバーランを防ぐ
        for(var i = 0; i <= (endofmemory + 3); i++)
        {
            program.push("F");
        }
    }

    var element = document.getElementById("memoryview");
    var str = "";

    str += "<table class='memoryTable'>";

    var pointer = 0;

    while(true)
    {
        var p, cmd, arg1, arg2;
        [p, cmd, arg1, arg2] = getCommandsName(pointer, false);
        if(cmd == undefined) break;

        str += "<tr><td>" + pointer.toString(16).toUpperCase() + "</td>" +
            "<td>" + cmd + "</td></tr>\n";
        pointer++;

        if(arg1 == undefined) continue;

        str += "<tr><td>" + pointer.toString(16).toUpperCase() + "</td>" +
            "<td>" + arg1 + "</td></tr>\n";
        pointer++;

        if(arg2 == undefined) continue;

        str += "<tr><td>" + pointer.toString(16).toUpperCase() + "</td>" +
            "<td>" + arg2 + "</td></tr>\n";
        pointer++;
    }

    str += "</table>"

    element.innerHTML = str;
}

function editMode()
{
    var save = document.getElementById("save");
    save.className = "";
    var select = document.getElementById("select");
    select.className = "hidden";

    var endofmemory = parseInt("4F", 16);

    if (program === undefined)
    {
        program = [];
        // 3つ多めに入れることにより、プログラムのオーバーランを防ぐ
        for(var i = 0; i <= (endofmemory + 3); i++)
        {
            program.push("F");
        }
    }

    var element = document.getElementById("memoryview");
    var str = "";

    str += "<table class='memoryTable'>";

    for(var i = 0; i <= endofmemory; i++)
    {
        str += "<tr><td>" + i.toString(16).toUpperCase() + "</td>" +
            "<td><input value=" + program[i] + " id='ipt" + i + "'>" +  + "</td></tr>\n";
    }

    str += "</table>"

    element.innerHTML = str;
}

function SaveEdit()
{
    var endofmemory = parseInt("4F", 16);

    for(var i = 0; i <= endofmemory; i++)
    {
        var ipt = document.getElementById("ipt" + i);
        program[i] = ipt.value.toUpperCase();
    }
    reloadView();
}