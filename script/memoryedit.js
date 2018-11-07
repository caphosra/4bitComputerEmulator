function programEdit()
{
    var pointer = document.getElementById("editprogram_pointer");
    var value = document.getElementById("editprogram_value");

    program[pointer.value] = Number(value.value).toString(16).toUpperCase();

    reloadView();
}

function memoryEdit(pointer, value)
{
    memory[pointer] = value;
}