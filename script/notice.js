// ShowError
function showError(message, level) 
{
    switch(level) 
    {
        case "E":
        {
            window.alert("ERROR ! " + message);
        }
        break;
        case "W":
        {
            window.alert("Warning ! " + message);
        }
        break;
    }
}