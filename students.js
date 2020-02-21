//icon container (div under "studentContainerDiv")
function renderIconContainer(student) {
  const iconContainerDiv = document.createElement("div");
  iconContainerDiv.classList.add("icon-container");
  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = student.pic;
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("iconDiv");
  iconDiv.appendChild(icon);
  iconContainerDiv.appendChild(iconDiv);
  return iconContainerDiv;
}

//info container (div under "studentContainerDiv")
function renderInfoContainer(student) {
  const infoContainerDiv = document.createElement("div");
  //name
  const name = document.createElement("h1");
  name.classList.add("name");
  name.textContent = `${student.firstName} ${student.lastName}`;
  infoContainerDiv.appendChild(name);
  //email
  const email = document.createElement("p");
  email.classList.add("info");
  email.textContent = `Email: ${student.email}`;
  infoContainerDiv.appendChild(email);
  //company
  const company = document.createElement("p");
  company.classList.add("info");
  company.textContent = `Company: ${student.company}`;
  infoContainerDiv.appendChild(company);
  //skill
  const skill = document.createElement("p");
  skill.classList.add("info");
  skill.textContent = `Skill: ${student.skill}`;
  infoContainerDiv.appendChild(skill);
  //average
  const average = document.createElement("p");
  average.classList.add("info");
  const averageGrade =
    student.grades.reduce((total, grade) => total + Number(grade), 0) /
    student.grades.length;
  average.textContent = `Average: ${averageGrade}%`;
  infoContainerDiv.appendChild(average);
  infoContainerDiv.classList.add("info-container");
  //grades - detailed
  const completeGradesContainer = document.createElement("div");
  const gradeListUl = document.createElement("ul");
  completeGradesContainer.hidden = true;
  completeGradesContainer.classList.add("complete-grades");
  completeGradesContainer.appendChild(gradeListUl);
  const grades = student.grades;
  grades.forEach((grade, i) => {
    const gradeContainerLi = document.createElement("li");
    const gradeContent = document.createElement("p");
    gradeContent.textContent = `Test ${i + 1}: ${grade}%`;
    gradeContainerLi.appendChild(gradeContent);
    gradeListUl.appendChild(gradeContainerLi);
  });

  //add a text field that lets you add tags
  const tagInputField = document.createElement("input");
  //hit enter to add tag
  tagInputField.addEventListener("keyup", addNewTag);
  //
  tagInputField.classList.add("add-tag-input");
  tagInputField.setAttribute("id", "tag-input");
  completeGradesContainer.appendChild(tagInputField);
  infoContainerDiv.appendChild(completeGradesContainer);
  //return info container div
  return infoContainerDiv;
}

//add new tags when a user hits enter
function addNewTag(event) {
  if (event.keyCode === 13) {
    const inputText = event.target.value;
    event.target.value = "";
    const completeGradesDiv = event.target.parentElement;
    const individualTag = document.createElement("p");
    individualTag.classList.add("tag");
    individualTag.textContent = inputText;
    completeGradesDiv.appendChild(individualTag);
  }
}

//plus minus sign container (div under "studentContainerDiv")
function renderPlusMinus() {
  const plusMinusDiv = document.createElement("div");
  plusMinusDiv.classList.add("plus-minus");
  //"plus"
  const plus = document.createElement("button");
  plus.classList.add("expand-btn");
  plus.textContent = "+";
  plusMinusDiv.appendChild(plus);
  //when you click the plus sign, it turns to minus
  plus.addEventListener("click", togglePlusMinus);
  //return the div
  return plusMinusDiv;
}

function togglePlusMinus(event) {
  const BtnTextContent = event.target.textContent;
  const studentContainerDiv = event.target.parentElement.parentElement;
  const grades = studentContainerDiv.querySelector(".complete-grades");
  if (BtnTextContent.includes("+")) {
    event.target.textContent = "-";
    grades.hidden = false;
  } else {
    event.target.textContent = "+";
    grades.hidden = true;
  }
}

fetch("./students").then(response => {
  response.json().then(studentsObj => {
    studentsObj.students.forEach(student => {
      const studentContainerDiv = document.createElement("div");
      studentContainerDiv.classList.add("student-container");
      //first div under studentContainerDiv- profile
      //- this will contain 2 divs (student container & info container)
      const studentProfileDiv = document.createElement("div");
      studentProfileDiv.classList.add("student-profile");
      studentProfileDiv.appendChild(renderIconContainer(student));
      studentProfileDiv.appendChild(renderInfoContainer(student));
      studentContainerDiv.appendChild(studentProfileDiv);
      //plusMinusSign - second div under studentContainerDiv
      studentContainerDiv.appendChild(renderPlusMinus());
      //add each student's information on #studentsList
      document.querySelector("#studentsList").appendChild(studentContainerDiv);
    });
    //search function - search by first or last name
    const searchInput = document.querySelector("#name-input");
    //searchName function
    function searchName(event) {
      const searchStr = event.target.value.toLowerCase();
      const studentContainers = document.querySelectorAll(".student-container");
      //loop over the student containers
      studentContainers.forEach(container => {
        const h1Text = container
          .querySelector(".name")
          .textContent.toLowerCase();
        if (h1Text.includes(searchStr)) {
          container.style.display = "";
        } else {
          container.style.display = "none";
        }
      });
    }
    //call the function above when the input value changes
    searchInput.addEventListener("input", searchName);
    //search function #2 - search by tags
    const searchByTag = document.querySelector("#tag-search");
    searchByTag.addEventListener("input", searchTag);
    //searchTag function
    function searchTag(event) {
      const searchStr = event.target.value.toLowerCase();
      const studentContainers = document.querySelectorAll(".student-container");
      //loop over the student containers
      studentContainers.forEach(container => {
        //querySelectorAll returns a node list, which we have to convert into an array
        const tags = [...container.querySelectorAll(".tag")].map(tagNode =>
          tagNode.textContent.toLowerCase()
        );
        if (tags.length === 0 && searchStr.length === 0) {
          container.style.display = "";
        } else if (tags.some(tag => tag.includes(searchStr))) {
          container.style.display = "";
        } else {
          container.style.display = "none";
        }
      });
    }
  });
});
