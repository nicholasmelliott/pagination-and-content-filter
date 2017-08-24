
/*------variables--------------*/

const page = document.querySelector(".page");
const header = document.querySelector(".page-header");
const students = document.querySelectorAll(".student-item");
let paginationDiv = document.querySelector(".pagination");
const errorH3 = document.createElement("h3");
const studentsPerPage = 10;
let foundStudents = [];

/*------console--------------*/
console.log("Total # of students: " + students.length);

/*------functions--------------*/

//hides all students on page
const hideAllStudents = () => {
    for(let i = 0; i < students.length; i++){
        students[i].style.display = "none";
    }
}

//removes existing pagination link section from page
const removeOldPageLinkSection = () => {
        if(paginationDiv){
            page.removeChild(paginationDiv);
        }
}

//creates pagination section with the necessary amount of links depending on students per page
const createPageLinkSection = (list) => {
        let amountOfPages = Math.ceil(list.length/studentsPerPage);
        console.log("Total # of pages: " + amountOfPages); //for testing
        const pageLinkDiv = document.createElement("div");
        const pageLinkUl  = document.createElement("ul");
        pageLinkDiv.className = "pagination";
        page.append(pageLinkDiv);
        pageLinkDiv.append(pageLinkUl);
        for(let i = 0; i < amountOfPages; i++){
            const pageLinkLi = document.createElement("li");
            const pageLinkA = document.createElement("a");
            pageLinkA.setAttribute("href", "#");
            pageLinkA.textContent = i+1;
            pageLinkUl.append(pageLinkLi);
            pageLinkLi.append(pageLinkA);        
        }  
        pageLinkUl.firstChild.firstChild.className = "active";   
}

//adds listeners to all anchor elements in pagination div
const addListeners = (list) => {
    //Resets pagination variable
    paginationDiv = document.querySelector(".pagination");
    const ul = paginationDiv.querySelector("ul");
    const li = ul.children;
    for(let i = 0; i < li.length; i++){
        li[i].addEventListener("click", (event) => { 
            //Removes active class from prev link  and adds it to newly clicked link
            const a = document.querySelectorAll(".pagination a");
            for(let i = 0; i < a.length; i++){
                a[i].classList.remove("active");
            }
            let li = event.target;
            let textCont = parseInt(li.textContent);
            li.className = "active";
            showPage(textCont, list);
        });
    }
}

//creates a search bar section
const createSearchSection = () => {
    const searchDiv = document.createElement("div");
    const searchInput  = document.createElement("input");
    const searchBtn  = document.createElement("button");
    searchDiv.className = "student-search";
    searchBtn.textContent = "Search";
    header.append(searchDiv);
    searchDiv.append(searchInput);
    searchDiv.append(searchBtn);
}

//creates error message for when searches yeild no matches
const createErrorMessage = () => {
    errorH3.textContent = "No matching students were found.";
    page.appendChild(errorH3);
}

const hideErrorMessage = () => { 
        errorH3.style.display = "none";       
}

const showErrorMessage = () => { 
        errorH3.style.display = "block";       
}


/*-----Main functions----------*/


//Shows proper number of students on page depending on the page number clicked
const showPage = (pageNum, list) => {
    hideAllStudents();
    console.log("Current students displayed: ") //for testing
    for(let i = 0; i < list.length; i++){
        if(i < pageNum * studentsPerPage && i >= (pageNum - 1) * studentsPerPage){
            list[i].style.display = "block";
            console.log(i + 1);
        }
    }
}  

//appends pagination div to page and adds listeners to each anchor
const appendPageLinks = (list) => {
    let amountOfPages = Math.ceil(list.length/studentsPerPage);
    removeOldPageLinkSection();
    //only appends pagination div if there are 2 pages worth of students or more
    if(amountOfPages > 1){
        createPageLinkSection(list);
        addListeners(list);
    }
}

//appends search list to page, grabs user input and displays matched students to page
const searchList = () => {
    createSearchSection();
    const searchBtn = header.querySelector(".student-search button");
    const searchInput = header.querySelector(".student-search input");
    searchBtn.addEventListener("click", () => {
        console.log("****STUDENT SEARCH****");
        paginationDiv = document.querySelector(".pagination");
        let userInput = searchInput.value.toUpperCase();
        console.log("User Input: " + userInput.toUpperCase());
        foundStudents = [];
        for(let i = 0; i < students.length; i++){
            let name = students[i].querySelector("h3").textContent.toUpperCase();
            let email = students[i].querySelector(".email").textContent.toUpperCase()
            let emailSub = email.substring(0, email.lastIndexOf("e"));
            if(name.indexOf(userInput) > -1 || emailSub.indexOf(userInput) > -1){
                foundStudents.push(students[i]);
            }
        }
        console.log("Total # of matching students: " + foundStudents.length); 
        if(!foundStudents[0]){
            createErrorMessage();
            showErrorMessage();
            removeOldPageLinkSection();
            hideAllStudents();
        }else{   
            hideErrorMessage();
            appendPageLinks(foundStudents);
            showPage(1, foundStudents);
        }        
    });    
}

appendPageLinks(students);
showPage(1, students);
searchList();








