let todoCount
let inProgressCount
let awaitingCount
let doneCount
let nextDueDate
let urgentCount

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

function greetingCurrentUser() {
    document.getElementById('welcome-name-desk').innerHTML = currentUser
}

function renderSummary() {
    getCurrentUser();
    getCount()
    renderCount()
    findNextDueTask()
    renderUpcomingUrgent()
}


function renderCount() {
    document.getElementById('summaryCountInBoard').innerHTML = todoCount + inProgressCount + awaitingCount + doneCount;
    document.getElementById('summaryCountProgress').innerHTML = inProgressCount;
    document.getElementById('summaryCountAwaiting').innerHTML = awaitingCount;
    document.getElementById('summaryCountToDo').innerHTML = todoCount;
    document.getElementById('summaryCountDone').innerHTML = doneCount;
}


function getCount() {
    todoCount = countTasksByProgress("toDo");
    inProgressCount = countTasksByProgress("inProgress");
    awaitingCount = countTasksByProgress("awaiting")
    doneCount = countTasksByProgress("done")
}


function countTasksByProgress(progress) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskProgress == progress) {
            count++;
        }
        if (progress == "toDo" && tasks[i].taskProgress == '') {
            count++
        }
    }
    return count;
}


function renderUpcomingUrgent() {
    document.getElementById('summaryCountUrgent').innerHTML = urgentCount;
    document.getElementById('summaryNextDeadline').innerHTML = nextDueDate
}


function findNextDueTask() {
    let urgentTasks = tasks.filter(task => task.prio.name === "urgent");
    urgentCount = urgentTasks.length
    if (urgentTasks.length === 0) {
        nextDueDate = 'No'; // Wenn keine dringenden Aufgaben vorhanden sind, gibt null zurück
        return
    }
    urgentTasks.sort((task1, task2) => {
        const dueDate1 = new Date(task1.dueDate);
        const dueDate2 = new Date(task2.dueDate);
        return dueDate1 - dueDate2;
    });
    nextDueDate = urgentTasks[0].dueDate; // Gibt die Aufgabe mit dem nächsten Fälligkeitsdatum zurück
}
