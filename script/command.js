// return [pointer, command, arg1, arg2]
function getCommandsName(pointer, isRun)
{
    switch(program[pointer])
    {
        case "0":
        {
            if (isRun) KA();
            return [pointer + 1, "KA", undefined, undefined];
        }
        case "1":
        {
            if (isRun) AO();
            return [pointer + 1, "AO", undefined, undefined];
        }
        case "2":
        {
            if (isRun) CH();
            return [pointer + 1, "CH", undefined, undefined];
        }
        case "3":
        {
            if (isRun) CY();
            return [pointer + 1, "CY", undefined, undefined];
        }
        case "4":
        {
            if (isRun) AM();
            return [pointer + 1, "AM", undefined, undefined];
        }
        case "5":
        {
            if (isRun) MA();
            return [pointer + 1, "MA", undefined, undefined];
        }
        case "6":
        {
            if (isRun) MPlus();
            return [pointer + 1, "M+", undefined, undefined];
        }
        case "7":
        {
            if(isRun) MMinus();
            return [pointer + 1, "M-", undefined, undefined];
        }
        case "8":
        {
            if(isRun) TIA(program[pointer + 1]);
            return [pointer + 2, "TIA", program[pointer + 1], undefined];
        }
        case "9":
        {
            if(isRun) AIA(program[pointer + 1]);
            return [pointer + 2, "AIA", program[pointer + 1], undefined];
        }
        case "A":
        {
            if(isRun) TIY(program[pointer + 1]);
            return [pointer + 2, "TIY", program[pointer + 1], undefined];
        }
        case "B":
        {
            if(isRun) AIY(program[pointer + 1]);
            return [pointer + 2, "AIY", program[pointer + 1], undefined];
        }
        case "C":
        {
            if(isRun) CIA(program[pointer + 1]);
            return [pointer + 2, "CIA", program[pointer + 1], undefined];
        }
        case "D":
        {
            if(isRun) CIY(program[pointer + 1]);
            return [pointer + 2, "CIY", program[pointer + 1], undefined];
        }
        case "E":
        {
            switch(program[pointer + 1])
            {
                case "0":
                {
                    if(isRun) RSTO();
                    return [pointer + 2, "CAL", "RSTO", undefined];
                }
                case "1":
                {
                    if(isRun) SETR();
                    return [pointer + 2, "CAL", "SETR", undefined];
                }
                case "2":
                {
                    if(isRun) RSTR();
                    return [pointer + 2, "CAL", "RSTR", undefined];
                }
                case "3":
                {
                    if(isRun) window.alert("You can't run 'CAL INPUT'.");
                    return [pointer + 2, "CAL", "INPT", undefined];
                }
                case "4":
                {
                    if(isRun) CMPL();
                    return [pointer + 2, "CAL", "CMPL", undefined];
                }
                case "5":
                {
                    if(isRun) CHNG();
                    return [pointer + 2, "CAL", "CHNG", undefined];
                }
                case "6":
                {
                    if(isRun) SIFT();
                    return [pointer + 2, "CAL", "SIFT", undefined];
                }
                case "7":
                {
                    return [pointer + 2, "CAL", "ENDS", undefined];
                }
                case "8":
                {
                    return [pointer + 2, "CAL", "ERRS", undefined];
                }
                case "9":
                {
                    return [pointer + 2, "CAL", "SHTS", undefined];
                }
                case "A":
                {
                    return [pointer + 2, "CAL", "LONS", undefined];
                }
                case "B":
                {
                    //ar依存
                    return [pointer + 2, "CAL", "SUND", undefined];
                }
                case "C":
                {
                    if(isRun) TIMR();
                    return [pointer + 2, "CAL", "TIMR", undefined];
                }
                case "D":
                {
                    if(isRun) DSPR();
                    return [pointer + 2, "CAL", "DSPR", undefined];
                }
                case "E":
                {
                    if(isRun) window.alert("'CAL DEM-' has not been implemented.");
                    return [pointer + 2, "CAL", "DEM-", undefined];
                }
                case "F":
                {
                    if(isRun) window.alert("'CAL DEM+' has not been implemented.");
                    return [pointer + 2, "CAL", "DEM+", undefined];
                }
            }
        }
        case "F":
        {
            if(program[pointer] == "F" && program[pointer + 1] == "F" && program[pointer + 2] == "F")
            {
                return [pointer, undefined, undefined, undefined];
            }

            return [Jump(pointer, program[pointer + 1], program[pointer + 2]), "JUMP", program[pointer + 1], program[pointer + 2]];
        }
    }
}

function KA()
{
    flag = true;   
    if(key != undefined)
    {
        ar = key;
        flag = false;
        key = undefined;
    }
}

function AO()
{
    flag = true;
    show(ar);
}

function CH()
{
    flag = true;
    var w = ar;
    ar = br;
    br = w;

    w = yr;
    yr = zr;
    zr = w;
}

function CY()
{
    flag = true;
    var w = ar;
    ar = yr;
    yr = w; 
}

function AM()
{
    flag = true;
    memory[yr] = ar;
}

function MA()
{
    flag = true;
    ar = memory[yr];
}

function MPlus()
{
    var v = parseInt(memory[yr], 16) + parseInt(ar, 16);
    if(v >= 16)
    {
        v %= 16;
        ar = v.toString(16).toUpperCase();
        flag = true;
    }
    else
    {
        ar = v.toString(16).toUpperCase();
        flag = false;
    }
}

function MMinus()
{
    var m =  parseInt(memory[yr], 16);
    var a = parseInt(ar, 16);
    if(m >= a)
    {
        ar = (m - a).toString(16).toUpperCase();
        flag = true;
    }
    else
    {
        flag = false;
    }
}

function TIA(arg1)
{
    flag = true;
    ar = arg1;
}

function AIA(arg1)
{
    var v = parseInt(ar, 16) + parseInt(arg1, 16);
    if(v >= 16)
    {
        v %= 16;
        ar = v.toString(16).toUpperCase();
        flag = true;
    }
    else
    {
        ar = v.toString(16).toUpperCase();
        flag = false;
    }
}

function TIY(arg1)
{
    flag = true;
    yr = arg1;
}

function AIY(arg1)
{
    var v = parseInt(yr, 16) + parseInt(arg1, 16);
    if(v >= 16)
    {
        v %= 16;
        yr = v.toString(16).toUpperCase();
        flag = true;
    }
    else
    {
        yr = v.toString(16).toUpperCase();
        flag = false;
    }
}

function CIA(arg1)
{
    if(ar != arg1) flag = true;
    else flag = false;
}

function CIY(arg1)
{
    if(yr != arg1) flag = true;
    else flag = false;
}

function RSTO()
{
    flag = true;
    show(undefined);
}

function SETR()
{
    flag = true;
    light(yr, true);
}

function RSTR()
{
    flag = true;
    light(yr, false);
}

function CMPL()
{
    flag = true;
    ar = ~ar;
}

function CHNG()
{
    flag = true;

    var v = ar;
    ar = arex;
    arex = v;

    v = br;
    br = brex;
    brex = v;

    v = yr;
    yr = yrex;
    yrex = v;

    v = zr;
    zr = zrex;
    zrex = v;
}

function SIFT()
{
    if(ar % 2 == 0) flag = true;
    else flag = false;
    ar = ar >> 1;
}

function TIMR()
{
    flag = true;
    waittime = 100 * (ar + 1);
}

function DSPR()
{
    flag = true;
    var v = parseInt(memory["F"], 16) % 8;
    light(6, (v / 4) == 1);
    v %= 4;
    light(5, (v / 2) == 1);
    v %= 2;
    light(4, v == 1);

    v = parseInt(memory["E"], 16);
    light(3, (v / 8) == 1);
    v %= 8;
    light(2, (v / 4) == 1);
    v %= 4;
    light(1, (v / 2) == 1);
    v %= 2;
    light(0, v == 1);
}

function Jump(pointer, arg1, arg2)
{
    if(flag) return parseInt(arg1 + arg2, 16);
    flag = true;
    return pointer + 3;
}