"use strict";
function hamburgerOpen() {
    var element = document.getElementsByClassName('left-container');
    var hamburger = document.getElementsByClassName('hamburger-menu');
    var mainContainer = document.getElementsByClassName('main-container');
    element[0].style.display = 'none';
    hamburger[0].classList.add('hamburger-open');
    hamburger[0].style.display = 'block';
    mainContainer[0].classList.add('expand');
}
function hamburgerClose() {
    var leftUpdate = document.getElementsByClassName('left-container-update');
    var element = document.getElementsByClassName('left-container');
    var hamburger = document.getElementsByClassName('hamburger-menu');
    var mainContainer = document.getElementsByClassName('main-container');
    hamburger[0].style.display = 'none';
    element[0].style.display = 'block';
    leftUpdate[0].style.marginTop = '75%';
    mainContainer[0].classList.add('hamburger-close');
}
document.addEventListener('DOMContentLoaded', () => {
    var joindt = document.getElementsByClassName('joindt-data')[0];
    const date = new Date().toLocaleDateString();
    joindt.placeholder = date;
    var parameters = window.location.search;
    var urlparams = new URLSearchParams(parameters);
    var empno = urlparams.get('empid');
    var data = JSON.parse(localStorage.getItem('details'));
    if (empno) {
        document.getElementsByClassName('add-employee-btn')[0].innerHTML = 'Update';
    }
    data.forEach((element) => {
        if (element['EMPNO'] == empno) {
            var name = element['USER'].split(" ");
            document.getElementsByClassName('profile-picture')[0].src = element['image'];
            document.getElementsByClassName('last-name-data')[0].value = name[0];
            document.getElementsByClassName('first-name-data')[0].value = name[name.length - 1];
            document.getElementsByClassName('empno-data')[0].value = element['EMPNO'];
            document.getElementsByClassName('email-data')[0].value = element['EMAIL'];
            document.getElementsByClassName('mobile-data')[0].value = element['MOBILE'];
            document.getElementsByClassName('dob-data')[0].value = element['DOB'];
            document.getElementsByClassName('joindt-data')[0].value = element['JOINDT'];
            document.getElementsByClassName('btn-loc')[0].innerText = element['LOCATION'];
            document.getElementsByClassName('btn-role')[0].innerText = element['ROLE'];
            document.getElementsByClassName('btn-dept')[0].innerText = element['DEPARTMENT'];
            document.getElementsByClassName('btn-manager')[0].innerText = element['MANAGER'];
            document.getElementsByClassName('btn-project')[0].innerText = element['PROJECT'];
        }
    });
    var inputFile = document.getElementsByClassName('file-upload');
    inputFile[0].addEventListener('change', event => {
        var target = event.target;
        const image = target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener('load', () => {
            localStorage.setItem('profileImage', reader.result);
            console.log("Image is uploaded to local storage");
            var img = document.getElementsByClassName('profile-picture')[0];
            img.src = localStorage.getItem('profileImage');
        });
        inputFile[0].addEventListener('click', () => {
            inputFile[0].value = '';
        });
    });
});
function employeeValidation() {
    var div = document.getElementsByClassName('error-msg-div');
    var empNo = document.getElementsByClassName('empno-data');
    var fName = document.getElementsByClassName('first-name-data');
    var lName = document.getElementsByClassName('last-name-data');
    var emailId = document.getElementsByClassName('email-data');
    var joinDt = document.getElementsByClassName('joindt-data');
    var divs = [empNo, fName, lName, emailId, joinDt];
    var inputs = [empNo[0].value, fName[0].value, lName[0].value, emailId[0].value, joinDt[0].value];
    var errorDivs = [div[0], div[1], div[2], div[3], div[4]];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].length == 0) {
            errorDivs[i].style.display = 'flex';
            errorDivs[i].style.flexDirection = 'row';
            divs[i][0].style.outline = '2px solid red';
            divs[i][0].style.borderStyle = 'none';
        }
        else {
            errorDivs[i].style.display = 'none';
        }
    }
}
function loadData() {
    var btn = document.getElementsByClassName('dropbtn');
    var img = document.getElementsByClassName('profile-picture')[0];
    var empNo = document.getElementsByClassName('empno-data')[0].value;
    var fName = document.getElementsByClassName('first-name-data')[0].value;
    var lName = document.getElementsByClassName('last-name-data')[0].value;
    var emailId = document.getElementsByClassName('email-data')[0].value;
    var joinDt = document.getElementsByClassName('joindt-data')[0].value;
    var dob1 = document.getElementsByClassName('dob-data');
    var dob = dob1[0].value;
    var mobile1 = document.getElementsByClassName('mobile-data');
    var mobile = mobile1[0].value;
    var name = lName + " " + fName;
    var location = btn[0].innerText;
    var role = btn[1].innerText;
    var department = btn[2].innerText;
    var manager = btn[3].innerText;
    var project = btn[4].innerText;
    var data = {
        image: img.src,
        USER: name,
        EMAIL: emailId,
        LOCATION: location,
        DEPARTMENT: department,
        ROLE: role,
        EMPNO: empNo,
        STATUS: 'Active',
        JOINDT: joinDt,
        MOBILE: mobile,
        DOB: dob,
        MANAGER: manager,
        PROJECT: project
    };
    return data;
}
function saveData(data) {
    const storedData = JSON.parse(localStorage.getItem('details')) || [];
    var isExist = false;
    storedData.forEach((element) => {
        if (element['EMPNO'] == data['EMPNO']) {
            element['image'] = data['image'];
            element['EMPNO'] = data['EMPNO'];
            element['USER'] = data['USER'];
            element['EMAIL'] = data['EMAIL'];
            element['JOINDT'] = data['JOINDT'];
            element['LOCATION'] = data['LOCATION'];
            element['DEPARTMENT'] = data['DEPARTMENT'];
            element['ROLE'] = data['ROLE'];
            element['MOBILE'] = data['MOBILE'];
            element['DOB'] = data['DOB'];
            element['MANAGER'] = data['MANAGER'];
            element['PROJECT'] = data['PROJECT'];
            isExist = true;
        }
    });
    if (!isExist) {
        storedData.push(data);
    }
    localStorage.setItem('details', JSON.stringify(storedData));
}
function AddEmployee() {
    employeeValidation();
    var data = loadData();
    var div = document.getElementsByClassName('error-msg-div');
    var mainDiv = document.getElementsByClassName('profile-picture-div');
    var edit = document.getElementsByClassName("edit-text");
    var successMsg = document.getElementsByClassName('success-msg');
    var flag1 = false, flag2 = true;
    if (document.getElementsByClassName('profile-picture')[0].src != '../Assets/profile.PNG') {
        flag1 = true;
    }
    else {
        flag1 = true;
        mainDiv[0].style.width = '150px';
        edit[0].style.marginLeft = '20%';
    }
    for (var i = 0; i < div.length; i++) {
        if (div[i].style.display != 'none') {
            flag2 = false;
        }
    }
    if (flag1 && flag2) {
        saveData(data);
        successMsg[0].style.display = 'block';
        setTimeout(function () {
            successMsg[0].style.display = 'none';
            window.location.href = "../Employee/employee.html";
        }, 1000);
    }
}
function dropDownOptionsDisplay(str) {
    var dropDown = document.getElementsByClassName('dropdown-content');
    var btn = document.getElementsByClassName('dropbtn');
    var btnValues = ['Location', 'Job Title', 'Department', 'manager', 'project'];
    for (var i = 0; i < btn.length; i++) {
        if (btnValues[i] == str) {
            dropDown[i].style.borderRadius = '7px';
            dropDown[i].style.display = dropDown[i].style.display === 'block' ? 'none' : 'block';
            (function (i) {
                document.body.addEventListener("click", function (e) {
                    if (e.target !== btn[i]) {
                        dropDown[i].style.display = "none";
                    }
                });
            })(i);
        }
    }
}
function validateMobileNumber() {
    var mobileNumber = /^[0-9]{10}$/;
    var text = document.getElementsByClassName('mobile-data')[0].value;
    var mobile = document.getElementsByClassName('error-mobile');
    if (mobileNumber.test(text) || text.length == 0) {
        mobile[0].style.display = 'none';
    }
    else {
        mobile[0].style.display = 'block';
    }
}
function validateFirstName() {
    var fname = /^[a-zA-Z\s]*$/;
    var text = document.getElementsByClassName('first-name-data')[0].value;
    var firstName = document.getElementsByClassName('error-fname');
    if (fname.test(text)) {
        firstName[0].style.display = 'none';
    }
    else {
        firstName[0].style.display = 'block';
    }
}
function validateLastName() {
    var lname = /^[a-zA-Z\s]*$/;
    var text = document.getElementsByClassName('last-name-data')[0].value;
    var lastName = document.getElementsByClassName('error-lname');
    if (lname.test(text)) {
        lastName[0].style.display = 'none';
    }
    else {
        lastName[0].style.display = 'block';
    }
}
function validateEmail() {
    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var text = document.getElementsByClassName('email-data')[0].value;
    var emailId = document.getElementsByClassName('error-email');
    if (email.test(text)) {
        emailId[0].style.display = 'none';
    }
    else {
        emailId[0].style.display = 'block';
    }
}
function validateEmpId() {
    var empid = /^[A-Za-z0-9]*$/;
    var text = document.getElementsByClassName('empno-data')[0].value;
    var emp = document.getElementsByClassName('error-empid');
    if (empid.test(text)) {
        emp[0].style.display = 'none';
    }
    else {
        emp[0].style.display = 'block';
    }
}
function validateJoinDate() {
    var date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    var text = document.getElementsByClassName('joindt-data')[0].value;
    var joinDt = document.getElementsByClassName('error-date');
    if (date.test(text) || text.length == 0) {
        joinDt[0].style.display = 'none';
    }
    else {
        joinDt[0].style.display = 'block';
    }
}
function dropDown(dropdownId, text) {
    var dropdown = document.getElementById('dropdown' + dropdownId);
    dropdown.querySelector(".dropbtn").textContent = text;
}
function validEmployee(str) {
    var div = document.getElementsByClassName('error-msg-div');
    var empNo = document.getElementsByClassName('empno-data');
    var fName = document.getElementsByClassName('first-name-data');
    var lName = document.getElementsByClassName('last-name-data');
    var emailId = document.getElementsByClassName('email-data');
    var joinDt = document.getElementsByClassName('joindt-data');
    var fields = ['empno', 'fname', 'lname', 'email', 'joindt'];
    var divs = [empNo, fName, lName, emailId, joinDt];
    for (var i = 0; i < fields.length; i++) {
        if (str == fields[i]) {
            div[i].style.display = 'none';
            divs[i][0].style.outline = '2px solid #378EFF';
        }
    }
}
function InputBoxFocusOut(str) {
    var empNo = document.getElementsByClassName('empno-data');
    var fName = document.getElementsByClassName('first-name-data');
    var lName = document.getElementsByClassName('last-name-data');
    var emailId = document.getElementsByClassName('email-data');
    var joinDt = document.getElementsByClassName('joindt-data');
    var fields = ['empno', 'fname', 'lname', 'email', 'joindt'];
    var divs = [empNo, fName, lName, emailId, joinDt];
    for (var i = 0; i < fields.length; i++) {
        if (str == fields[i]) {
            divs[i][0].style.outline = 'none';
            divs[i][0].style.border = '1px solid black';
        }
    }
}
