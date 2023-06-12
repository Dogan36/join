
  
  // load every single category in list
  
  
  
  
  
  
  
  
  async function addNewCategory(n) {
    let categorytext = document.getElementById(`category${n}`);
    let newCategory = {
      'categorytext': categorytext.value,
      'categoryColor': selectedColor
    }
    categorys.push(newCategory);
    categorytext.value = '';
    document.getElementById(`color-button-container${n}`).innerHTML = ""; // Deletes the color in the input field (Löscht die Colorfabe in dem Eingabefeld)
    await setServer(); /* setSverver loads the current data from the server (setSverver lädt die aktuellen daten vom server) */
  }
  
  async function deleteCategory(i, n) {
    categorys.splice(i, 1);
    await setServer(); /* setSverver loads the current data from the server (setSverver lädt die aktuellen daten vom server) */
    await renderTaskCategory(n)
  }
  
  
  
  function colorButton(i, n) {
    selectedColor = '';
    selectedColor = buttonBackgroundColor[i];
    document.getElementById(`color-button-container${n}`).innerHTML = `<div class="color-category-button" style="background-color :${selectedColor};"></div>`;
  }
  

  
  
  //Dropdown erste zeile wenn geöffnet
  function turnArrowinDropdown(n, content) {
  document.querySelector('.arrow-Icon').classList.add('arrow-rotate')
  console.log('test')
  }
  
  //fügt im dropdown "newCategory" hinzu
  function renderNewCategorySelection(n, content) {
    content.innerHTML += `
    
  }
  
  //gewähltes element erscheint auf vorderer auswahlbox
  function selectCategory(i, n) {
    let category = categorys[i];
    document.getElementById(`select-container${n}`).innerHTML = categoryTemplate(category)
  }
  
  // gehört zusammen
  function categoryTemplate(category) {
    return `
    <div onclick="openAddTaskCategory(${n});" class="categoryOption select-task0">
                  <div class="selection-point-container">
                    <div>${category['categorytext']}</div>
                    <div id="color-button-container${n}"><div class="color-category-button" style="background-color :${category['categoryColor']};">  
                    </div></div>
                  </div>
                  <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
                </div>`
  }
  
  
  function resetNewCategoryInput(n) {
    document.getElementById(`new-category-container${n}`).value = "";
    document.getElementById(`color-button-container${n}`).innerHTML = '';
  }
  
  
  // rendert das geschlossene dropdown mit standarttext
  function renderSelectTaskCategory(n) {
    document.getElementById(`select-container${n}`).innerHTML = ``;
    document.getElementById(`select-container${n}`).innerHTML = renderSelectTaskCategoryHTML(n);
  
  }
  
  // gehört zusammen
  function renderSelectTaskCategoryHTML(n) {
    return `
      <div onclick="openAddTaskCategory(${n});" class="categoryOption selectTask">
        <div id="select-open-task-category${n}" class="input-outline">Select task category</div>
        <img class="arrow-icon" src="./assets/img/arrow_icon.svg" alt="">
      </div>
      `
  }
  
  