/**
 * This function clears the input fields off add task and clears the warnings
 */
function clearTheInputFields() {
    deleteAddTaskFields()
    clearWarnings()
  }
  
  /**
   * This function deletes the values of the input fields and resets the buttons and dropdowns
   */
  function deleteAddTaskFields() {
    document.getElementById(`taskTitleInput${n}`).value = '';
    document.getElementById(`addTaskDescription${n}`).value = '';
    document.getElementById(`dueDate${n}`).value = '';
    document.getElementById(`addTaskSubtaskPoint${n}`).innerHTML = '';
    resetSubtasks()
    //resetPrioButtons()
    renderAddTask()
  }
  
  /**
   * This function resets the subtasks
   */
  function resetSubtasks() {
    subtasks = []
  }
  
  
/**
 * This function adds a warning on title
 */
function addTitleWarnings() {
    document.getElementById(`requiredTitle${n}`).classList.remove('hidden');
    document.getElementById(`taskTitleInput${n}`).style.border = '2px solid red';
  }
  
  /**
   * This function clears the warning on title
   */
  function clearTitleWarnings() {
    document.getElementById(`requiredTitle${n}`).classList.add('hidden');
    document.getElementById(`taskTitleInput${n}`).style = '';
  }
  
  /**
   * This function adds warning on description
   */
  function addDescriptionWarnings() {
    document.getElementById(`requiredDescription${n}`).classList.remove('hidden');
    document.getElementById(`addTaskDescription${n}`).style.border = '2px solid red';
  }
  
  /**
   * This function clears warning on description
   */
  function clearDescriptionWarnings() {
    document.getElementById(`requiredDescription${n}`).classList.add('hidden');
    document.getElementById(`addTaskDescription${n}`).style = '';
  }
  
  /**
   * This function adds warning on new category
   */
  function addNewCategoryWarning() {
    document.getElementById(`newCategoryContainer${n}`).style.border = '2px solid red';
    document.getElementById(`requiredCategory${n}`).classList.remove('hidden');
    document.getElementById(`requiredCategory${n}`).innerHTML = 'Please enter name and color'
  }
  
  /**
   * This function adds warning on new priority
   */
  function addPrioWarnings() {
    document.getElementById(`prioRed${n}`).style.border = '2px solid red';
    document.getElementById(`prioYellow${n}`).style.border = '2px solid red';
    document.getElementById(`prioGreen${n}`).style.border = '2px solid red';
    document.getElementById(`requiredPrio${n}`).classList.remove('hidden');
  }
  
  /**
   * This function clears warning on new priority
   */
  function clearPrioWarnings() {
    document.getElementById(`prioRed${n}`).style = '';
    document.getElementById(`prioYellow${n}`).style = '';
    document.getElementById(`prioGreen${n}`).style = '';
    document.getElementById(`requiredPrio${n}`).classList.add('hidden');
  }
  
  /**
   * This function adds warning on category
   */
  function addCategoryWarnings() {
    document.getElementById(`requiredCategory${n}`).classList.remove('hidden');
    document.getElementById(`requiredCategory${n}`).innerHTML = 'This field is required'
    document.getElementById(`selectContainer${n}`).style.border = '2px solid red';
  }
  
  /**
   * This function clears warning on category
   */
  function clearCategoryWarnings() {
    document.getElementById(`requiredCategory${n}`).classList.add('hidden');
    document.getElementById(`selectContainer${n}`).style = '';
    document.getElementById(`requiredCategory${n}`).classList.add('hidden');
    document.getElementById(`newCategoryContainer${n}`).style = '';
  }
  
  /**
   * This function adds warning on assigned to
   */
  function addAssignedTowarnings() {
    document.getElementById(`requiredAssignedTo${n}`).classList.remove('hidden');
    document.getElementById(`assignedToContainer${n}`).style.border = '2px solid red';
  }
  
  /**
   * This function clears warning on assigned to
   */
  function clearAssignedTowarnings() {
    document.getElementById(`requiredAssignedTo${n}`).classList.add('hidden');
    document.getElementById(`assignedToContainer${n}`).style = '';
  }
  
  /**
   * This function adds warning on due date
   */
  function addDueDateWarnings() {
    document.getElementById(`requiredDueDate${n}`).classList.remove('hidden');
    document.getElementById(`dueDate${n}`).style.border = '2px solid red';
  }
  
  /**
   * This function clears warning on due date
   */
  function clearDueDateWarnings() {
    document.getElementById(`requiredDueDate${n}`).classList.add('hidden');
    document.getElementById(`dueDate${n}`).style = '';
  }
  
  /**
   * This function chooses priority
   * 
   * @param {string} color This is the color of the choosen priority
   */
  function choosePrio(color) {
    clearPrioWarnings()
    let divClicked = document.getElementById(`${color}${n}`)
    setPrioColor(color)
    resetPrioButtons()
    divClicked.classList.add(`${color}`)
    changePrioButtonIcon(color)
  }
  
/**
 * This function resets the prio buttons
 */
function resetPrioButtons() {
    document.getElementById(`prioRed${n}`).classList.remove('prioRed')
    document.getElementById(`prioYellow${n}`).classList.remove('prioYellow')
    document.getElementById(`prioGreen${n}`).classList.remove('prioGreen')
    document.getElementById(`prioUrgentIcon${n}`).src = 'assets/img/prioUrgentIcon.svg'
    document.getElementById(`prioMediumIcon${n}`).src = 'assets/img/prioMediumIcon.svg'
    document.getElementById(`prioLowIcon${n}`).src = 'assets/img/prioLowIcon.svg'
  }
  
  /**
   * This function checks if the input title is empty and adds warning otherwise clears the warnings
   * 
   * @returns boolean
   */
  function checkMandatoryFieldTitle() {
    let inputFeldTitle = document.getElementById(`taskTitleInput${n}`);
    if (inputFeldTitle.value === '') {
      addTitleWarnings()
      return true
    }
    else clearTitleWarnings()
  }
  
  /**
   * This function checks if the input description is empty and adds warning otherwise clears the warnings
   * 
   * @returns boolean
   */
  function checkMandatoryFieldDescription() {
    let textareaFeldDescription = document.getElementById(`addTaskDescription${n}`);
    if (textareaFeldDescription.value === '') {
      addDescriptionWarnings()
      return true
    }
    else clearDescriptionWarnings()
  }
  
  /**
   * This function checks if the input due date is empty and adds warning otherwise clears the warnings
   * 
   * @returns boolean
   */
  function checkMandatoryFieldDueDate() {
    let inputFeldDueDate = document.getElementById(`dueDate${n}`);
    if (inputFeldDueDate.value === '') {
      addDueDateWarnings()
      return true
    }
    else clearDueDateWarnings()
  }
  
  /**
   * This function checks if the input category is empty and adds warning otherwise clears the warnings
   * 
   * @returns boolean
   */
  function checkMandatoryFieldCategory() {
    if (choosenCategory == undefined) {
      addCategoryWarnings();
      return true
    }
    else clearCategoryWarnings()
  }
  
  /**
   * This function checks if the input prio is empty and adds warning otherwise clears the warnings
   * 
   * @returns boolean
   */
  function checkPrio() {
    let prioColorRed = document.getElementById(`prioRed${n}`);
    let prioColorYellow = document.getElementById(`prioYellow${n}`);
    let prioColorGreen = document.getElementById(`prioGreen${n}`);
    if (!prioColorRed.classList.contains('prioRed') && !prioColorYellow.classList.contains('prioYellow') && !prioColorGreen.classList.contains('prioGreen')) {
      addPrioWarnings()
      return true
    } else {
      clearPrioWarnings()
      return false
    }
  }
  
  /**
   * This function renders the categories into the drop down
   */
  function renderAddTaskCategorys() {
    let content = document.getElementById(`categorySelection${n}`);
    content.innerHTML = ''
    for (let i = 0; i < categorys.length; i++) {
      let category = categorys[i];
      content.innerHTML += renderAddTaskCategoriesHTML(i, category);
    }
  }
  
  /**
   * This function generates the html of the categories
   * 
   * @param {number} i index of the category in categorys
   * @param {string} category name of the category
   * @returns string
   */
  function renderAddTaskCategoriesHTML(i, category) {
    return `
    <div class="categoryOption" >
      <div class="selectionPointContainer" onclick="selectCategory(${i})">
        <div>${category['categorytext']}</div>
        <div class="color" style="background-color: ${category['categoryColor']}"></div>
      </div>
      <div class="colorAndDeleteIconContainer">
        <img onclick="deleteCategory(${i})" class="deleteIcon" src = "./assets/img/delete.png" alt = "" >
      </div> 
    </div>`
  }
  
  /**
   * This function renders the category which is selected
   */
  function renderAddTaskCategorySelect() {
    let content = document.getElementById(`selectContainer${n}`);
    content.innerHTML = `
    <div onclick="toggleAddTaskCategory()" class="categoryOption selectTask">
    <input readonly id="selectStartTaskCategory${n}" class="inputOutline"
    placeholder="Select task category"></input>
    <img class="arrowIcon" id="arrowIconCategory${n}" src="./assets/img/arrowIcon.svg" alt="" />
  </div>
  <div id="contentCategoryContainer${n}" class="d-none">
    <div onclick="openNewCategoryInput()" class="categoryOption">New Category</div>
    <div id="categorySelection${n}" class=""></div>
  </div>`
  }
  
  /**
   * This function toogles the category container
   */
  function toggleAddTaskCategory() {
    if (document.getElementById(`contentCategoryContainer${n}`).classList.contains('d-none'))
      openAddTaskCategory()
    else {
      closeAddTaskCategory();
      checkMandatoryFieldCategory()
    }
  }
  
  /**
   * This function opens the category container
   */
  function openAddTaskCategory() {
    document.getElementById(`contentCategoryContainer${n}`).classList.remove('d-none')
    document.getElementById(`arrowIconCategory${n}`).classList.add('arrowRotate')
  }
  
  /**
   * This function closes the category container
   */
  function closeAddTaskCategory() {
    let contentCategoryContainer = document.getElementById(`contentCategoryContainer${n}`)
    let arrowIconCategory = document.getElementById(`arrowIconCategory${n}`)
    if (contentCategoryContainer) {
      contentCategoryContainer.classList.add('d-none')
      arrowIconCategory.classList.remove('arrowRotate')
      choosenCategory = undefined
    }
  }
  
  /**
   * This function opens the new category input
   */
  function openNewCategoryInput() {
    choosenCategory = undefined
    document.getElementById(`newCategoryContainer${n}`).classList.remove('d-none');
    document.getElementById(`colorContainer${n}`).classList.remove('d-none');
    document.getElementById(`selectContainer${n}`).classList.add('d-none');
  }
  
  /**
   * This function closes the new category input
   */
  function closeAddTaskNewCategory() {
    document.getElementById(`newCategoryContainer${n}`).classList.add('d-none');
    document.getElementById(`colorContainer${n}`).classList.add('d-none');
    document.getElementById(`selectContainer${n}`).classList.remove('d-none');
  }
  
  /**
   * This function checks if the new category name is inserted and color choosen and shows warning
   */
  function checkNewCategoryName() {
    let name = document.getElementById(`category${n}`);
    let color = document.getElementById(`colorButtonContainer${n}`);
    if (name.value === '' || color.innerHTML === '') addNewCategoryWarning()
    else {
      clearCategoryWarnings()
      addNewCategory();
      resetNewCategoryInput()
      closeAddTaskNewCategory()
      selectCategory(categorys.length - 1)
    }
  }
  
  /**
 * This function resets inputs on new category
 */
function resetNewCategoryInput() {
    document.getElementById(`category${n}`).value = "";
    document.getElementById(`colorButtonContainer${n}`).innerHTML = '';
  }
  
  /**
 * This function generates the html for the select container
 * 
 * @param {JSON} category This is the json of the selected category
 * @returns string
 */
function categoryTemplate(category) {
    return `
      <div onclick="renderAddTaskCategorySelect(); renderAddTaskCategorys(), toggleAddTaskCategory()" class="categoryOption">
                    <div class="selectionPointContainer">
                      <div>${category['categorytext']}</div>
                      <div id="colorButtonContainer${n}"><div class="colorCategoryButton" style="background-color :${category['categoryColor']};">  
                      </div></div>
                    </div>
                    <img class="arrowIcon" id="arrowIconCategory${n}" src="./assets/img/arrowIcon.svg" alt="">
                  </div>`
  }
  
  /**
   * This function generates the html for the selected contacts
   */
  function renderAddTaskContactsSelect() {
    document.getElementById(`selectContactsContainer${n}`).innerHTML = `
    <div onclick="toggleAddTaskContacts()" class="contactsOption">
                <div class="addTaskDropdownHeader" id="selectStartTaskContact${n}">
                  Select contacts to assign
                </div>
                <img id="arrowRotate${n}" class="arrowIcon" src="./assets/img/arrowIcon.svg" alt="" />
              </div>
              <div id="contacts${n}" class="d-none">
                </div>
            `
  }
  
  /**
   * This function generates the html for the contacts
   */
  function renderAddTaskContacts() {
    let content = document.getElementById(`contacts${n}`);
    content.innerHTML = '';
    content.innerHTML = `
      <div id="inviteNewContactContainer${n}" onclick="openInviteNewContact()" class="contactsOption">
        <div>Invite new contact</div>
        <img class="contactIcon" src="assets/img/contactIcon.svg" alt="">
      </div>`;
  
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact['name'] !== 'Contact deleted') {
        content.innerHTML += /*html*/ `
        <div class="contactsOption" onclick="toggleCheckbox('${contact['name'] + n}')">
        <div class="selectionPointContainer">
          <div>${contact['name']}</div>
        </div>
        <div>
          <input id='${contact['name'] + n}' type="checkbox" name="option[]${n}" value="Option ${i}">
          <label for="${contact['name'] + n}"></label>
        </div>
      </div>`;
      }
    }
  }
  
/**
 * This function clears invite new contact input
 */
function clearInviteNewContactValue() {
    document.getElementById(`inviteNewContact${n}`).value = ''
  }
  