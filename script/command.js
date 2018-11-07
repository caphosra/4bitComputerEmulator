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
            return [pointer + 1, "AO", undefined, undefined];
        }
        case "2":
        {
            return [pointer + 1, "CH", undefined, undefined];
        }
        case "3":
        {
            return [pointer + 1, "CY", undefined, undefined];
        }
        case "4":
        {
            return [pointer + 1, "AM", undefined, undefined];
        }
        case "5":
        {
            return [pointer + 1, "CY", undefined, undefined];
        }
        case "6":
        {
            return [pointer + 1, "M+", undefined, undefined];
        }
        case "7":
        {
            return [pointer + 1, "M-", undefined, undefined];
        }
        case "8":
        {
            return [pointer + 2, "TIA", program[pointer + 1], undefined];
        }
        case "9":
        {
            return [pointer + 2, "AIA", program[pointer + 1], undefined];
        }
        case "A":
        {
            return [pointer + 2, "TIY", program[pointer + 1], undefined];
        }
        case "B":
        {
            return [pointer + 2, "AIY", program[pointer + 1], undefined];
        }
        case "C":
        {
            return [pointer + 2, "CIA", program[pointer + 1], undefined];
        }
        case "D":
        {
            return [pointer + 2, "CIY", program[pointer + 1], undefined];
        }
        case "E":
        {
            switch(program[pointer + 1])
            {
                case "0":
                {
                    return [pointer + 2, "CAL", "RSTO", undefined];
                }
                case "1":
                {
                    return [pointer + 2, "CAL", "SETR", undefined];
                }
                case "2":
                {
                    return [pointer + 2, "CAL", "RSTR", undefined];
                }
                case "3":
                {
                    return [pointer + 2, "CAL", "INPT", undefined];
                }
                case "4":
                {
                    return [pointer + 2, "CAL", "CMPL", undefined];
                }
                case "5":
                {
                    return [pointer + 2, "CAL", "CHNG", undefined];
                }
                case "6":
                {
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
                    return [pointer + 2, "CAL", "SUND", undefined];
                }
                case "C":
                {
                    return [pointer + 2, "CAL", "TIMR", undefined];
                }
                case "D":
                {
                    return [pointer + 2, "CAL", "DSPR", undefined];
                }
                case "E":
                {
                    return [pointer + 2, "CAL", "DEM-", undefined];
                }
                case "F":
                {
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

            return [pointer + 3, "JUMP", program[pointer + 1], program[pointer + 2]];
        }
    }
}

function KA(flag)
{
    flag = true;   
    if(key == undefined)
    {
        return;
    }
    else
    {
        ar = key;
        flag = false;
        key = undefined;
    }
}
