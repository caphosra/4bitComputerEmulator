/*
mode
0 : program view
1 : memory view
*/
var mode = 0;

function selectMode()
{
    mode = mode + 1;
    mode = mode % 2;

    reloadView();
}

function reloadView() 
{
    console.log(mode);

    SetActiveButton("reload", true);
    SetActiveButton("save", false);
    SetActiveButton("cancel", false);
    SetActiveButton("select", true);
    SetActiveButton("edit", true);

    var m = document.getElementById("mode");

    switch(mode)
    {
        case 0:
        {
            var hex = document.getElementById("isHexadecimal");
            if(hex.checked)
            {
                m.innerHTML = "program(16)";
                programView();
            }
            else
            {
                m.innerHTML = "program(code)";
                programViewCommandMode();
            }
        }
        break;
        case 1:
        {
            m.innerHTML = "memory(16)";
            memoryView();
        }
        break;
    }
}

function programView()
{
    var endofmemory = parseInt("4F", 16);

    if (program === undefined) resetAllProgram();

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
    if (memory === undefined) resetMemory();

    var element = document.getElementById("memoryview");
    var str = "";

    str += "<table class='memoryTable'>";

    for(var i = 0; i < 16; i++)
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
    if (program === undefined) resetAllProgram();

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
    var endofmemory = parseInt("4F", 16);

    SetActiveButton("cancel", true);
    SetActiveButton("save", true);

    SetActiveButton("reload", false);
    SetActiveButton("select", false);
    SetActiveButton("edit", false);

    switch(mode)
    {
        case 0:
        {
            if (program === undefined) resetAllProgram();

            var element = document.getElementById("memoryview");
            var str = "";

            str += "<form><table class='memoryTable'>";

            for(var i = 0; i <= endofmemory; i++)
            {
            str += "<tr><td>" + i.toString(16).toUpperCase() + "</td>" +
                "<td><input type='text' value='" + program[i] + "' id='ipt" + i + "'>" +  + "</td></tr>\n";
            }

            str += "</table></form>"

            element.innerHTML = str;
        }
        break;
        case 1:
        {
            if (program === undefined) resetMemory();

            var element = document.getElementById("memoryview");
            var str = "";

            str += "<form><table class='memoryTable'>";

            for(var i = 0; i < 16; i++)
            {
                str += "<tr><td>M" + i.toString(16).toUpperCase() + "</td>" +
                    "<td><input type='text' value='" + memory[i] + "' id='ipt" + i + "'>" +  + "</td></tr>\n";
            }

            str += "<tr><td>Ar</td>" +
                "<td><input type='text' value='" + ar + "' id='ipt16'>" +  + "</td></tr>\n";
            str += "<tr><td>Br</td>" +
                "<td><input type='text' value='" + br + "' id='ipt17'>" +  + "</td></tr>\n";
            str += "<tr><td>Yr</td>" +
                "<td><input type='text' value='" + yr + "' id='ipt18'>" +  + "</td></tr>\n";
            str += "<tr><td>Zr</td>" +
                "<td><input type='text' value='" + zr + "' id='ipt19'>" +  + "</td></tr>\n";
            str += "<tr><td>ArEx</td>" +
                "<td><input type='text' value='" + arex + "' id='ipt20'>" +  + "</td></tr>\n";
            str += "<tr><td>BrEx</td>" +
                "<td><input type='text' value='" + brex + "' id='ipt21'>" +  + "</td></tr>\n";
            str += "<tr><td>YrEx</td>" +
                "<td><input type='text' value='" + yrex + "' id='ipt22'>" +  + "</td></tr>\n";
            str += "<tr><td>ZrEx</td>" +
                "<td><input type='text' value='" + zrex + "' id='ipt23'>" +  + "</td></tr>\n";

            str += "</table></form>"

            element.innerHTML = str;
        }
        break;
    }

    
}

function saveEdit()
{
    switch(mode)
    {
        case 0:
        {
            var endofmemory = parseInt("4F", 16);

            for(var i = 0; i <= endofmemory; i++)
            {
                var ipt = document.getElementById("ipt" + i);
                program[i] = ipt.value.toUpperCase();
            }
            reloadView();
        }
        break;
        case 1:
        {
            for(var i = 0; i < 16; i++)
            {
                var ipt = document.getElementById("ipt" + i);
                memory[i] = ipt.value.toUpperCase();
            }

            var ipt = document.getElementById("ipt16");
            ar = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt17");
            br = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt18");
            yr = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt19");
            zr = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt20");
            arex = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt21");
            brex = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt22");
            yrex = ipt.value.toUpperCase(); 
            var ipt = document.getElementById("ipt23");
            zrex = ipt.value.toUpperCase(); 

            reloadView();
        }
        break;
    }
}

function SetActiveButton(id, active)
{
    var button = document.getElementById(id);
    if(active)
    {
        button.className = "image_button";
    }
    else
    {
        button.className = "hidden";
    }
}