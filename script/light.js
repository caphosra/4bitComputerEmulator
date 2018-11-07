var elements = undefined;

function light(number, on)
{
    if (elements == undefined)
    {
        elements = [];
        for(var i = 0; i < 7; i++)
            elements.push(document.getElementById("l" + i));
    }

    if(on) elements[number].src = "img/on.png";
    else elements[number].src = "img/off.png";
}

var showlight = undefined;

function show(number)
{
    if (showlight == undefined)
    {
        showlight = document.getElementById("showlight");
    }
    if(number == undefined) 
    {
        showlight.src = "img/null.png";
    }
    else
    {
        showlight.src = "img/" + number + ".png";
    }
}