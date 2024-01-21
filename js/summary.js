let todoCount
let inProgressCount
let awaitingCount
let doneCount
let nextDueDate
let urgentCount

/**
 * This function sets the greeting in dependence of the current time
 */
function greetingAds() {
    let now = new Date();
    let hours = now.getHours();
    let greeting;
    if (hours >= 6 && hours < 11) {
        greeting = "Good morning";
    } else if (hours >= 11 && hours < 18) {
        greeting = "Good afternoon";
    } else if (hours >= 18 && hours < 23) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }
    document.getElementById('welcome-text-desk').innerHTML = greeting;
    greetingCurrentUser()
}

/**
 * This function sets the name in welcome desk to the name of current user
 */
function greetingCurrentUser() {
    document.getElementById('welcome-name-desk').innerHTML = currentUser
}

/**
 * This function renders the summary
 */
function renderSummary() {
    getCurrentUser();
    getCount()
    renderCount()
    findNextDueTask()
    renderUpcomingUrgent()
}

/**
 * This function renders the count in the progress sections
 */
function renderCount() {
    document.getElementById('summaryCountInBoard').innerHTML = todoCount + inProgressCount + awaitingCount + doneCount;
    document.getElementById('summaryCountProgress').innerHTML = inProgressCount;
    document.getElementById('summaryCountAwaiting').innerHTML = awaitingCount;
    document.getElementById('summaryCountToDo').innerHTML = todoCount;
    document.getElementById('summaryCountDone').innerHTML = doneCount;
}

/**
 * This function gets the counts of the progress sections
 */
function getCount() {
    todoCount = countTasksByProgress("toDo");
    inProgressCount = countTasksByProgress("inProgress");
    awaitingCount = countTasksByProgress("awaiting")
    doneCount = countTasksByProgress("done")
}

/**
 * This function gets the count of every progress separately
 * 
 * @param {string} progress This is the name of the section to be counted
 * @returns number
 */
function countTasksByProgress(progress) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if ((progress === tasks[i].taskProgress) || (progress === "toDo" && tasks[i].taskProgress === '')) count++;
    }
    return count;
}

/**
 * This function renders the upcoming urgend content
 */
function renderUpcomingUrgent() {
    document.getElementById('summaryCountUrgent').innerHTML = urgentCount;
    document.getElementById('summaryNextDeadline').innerHTML = nextDueDate
}

/**
 * This function searches for the closest deadline
 * @returns date
 */
function findNextDueTask() {
    let urgentTasks = tasks.filter(task => task.prio.name === "urgent");
    urgentCount = urgentTasks.length
    if (urgentTasks.length === 0) {
        nextDueDate = 'No'; // Wenn keine dringenden Aufgaben vorhanden sind, gibt null zurück
        return
    }
    urgentTasks.sort((task1, task2) => {
        let dueDate1 = new Date(task1.dueDate);
        let dueDate2 = new Date(task2.dueDate);
        return dueDate1 - dueDate2;
    });
    nextDueDate = urgentTasks[0].dueDate; // Gibt die Aufgabe mit dem nächsten Fälligkeitsdatum zurück
}