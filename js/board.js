function renderBoard() {

}


/**
 * Opens the Add Task pop-up window in the board page. (Öffnet das Pop up Fenster Add Task in der board Seite.)
 */
function popUpWindowaddTask() {
    document.getElementById('container-opened-task').classList.remove('d-none');
    document.getElementById('add-task-window').classList.remove('d-none');
}

/**
 * Closes the Add Task pop-up window in the board page. (Schließt das Pop up Fenster Add Task in der board Seite.)
 */
function popUpWindowCloseAddTask() {
    document.getElementById('container-opened-task').classList.add('d-none');
    document.getElementById('add-task-window').classList.add('d-none');
}