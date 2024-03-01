"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var reset = document.getElementsByClassName('reset');
    var btn = document.getElementsByClassName('dropbtn');
    var btn0 = btn[0].innerHTML;
    var btn1 = btn[1].innerHTML;
    var btn2 = btn[2].innerHTML;
    reset[0].addEventListener('click', function () {
        resetDropdown(btn0, btn1, btn2);
    });
    var data = JSON.parse(localStorage.getItem('details'));
    dropdownValues(data);
    addData(data);
});
function addData(data) {
    var i = 0;
    data.forEach((item) => {
        let tableData = document.getElementsByClassName('user-data');
        let tr = document.createElement('tr');
        tr.classList.add('table-row');
        let td = document.createElement('td');
        let checkbox = document.createElement('input');
        td.classList.add('bodycell-checkbox');
        checkbox.type = 'checkbox';
        checkbox.classList.add("body-checkbox");
        checkbox.addEventListener('change', ActivateDeleteButton);
        td.appendChild(checkbox);
        tr.appendChild(td);
        tableData[0].append(tr);
        let td1 = document.createElement('td');
        td1.classList.add('userCell');
        let divMain = document.createElement('div');
        divMain.classList.add('emp-image');
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = item['image'];
        img.classList.add('user-img');
        div.appendChild(img);
        let div1 = document.createElement('div');
        div1.classList.add('user-details');
        let p1 = document.createElement('span');
        p1.classList.add('user-name');
        let p2 = document.createElement('span');
        p2.classList.add('user-email');
        p1.innerHTML = item['USER'];
        p1.style.fontWeight = 'bold';
        p2.innerHTML = item['EMAIL'];
        div1.appendChild(p1);
        div1.appendChild(p2);
        divMain.appendChild(div);
        divMain.appendChild(div1);
        td1.appendChild(divMain);
        tr.appendChild(td1);
        tableData[0].appendChild(tr);
        let locCell = document.createElement('td');
        locCell.innerText = item['LOCATION'];
        locCell.classList.add('locCell');
        tr.appendChild(locCell);
        tableData[0].appendChild(tr);
        let deptCell = document.createElement('td');
        deptCell.innerText = item['DEPARTMENT'];
        deptCell.classList.add('deptCell');
        tr.appendChild(deptCell);
        tableData[0].appendChild(tr);
        let roleCell = document.createElement('td');
        roleCell.innerText = item['ROLE'];
        roleCell.classList.add('roleCell');
        tr.appendChild(roleCell);
        tableData[0].appendChild(tr);
        let empnoCell = document.createElement('td');
        empnoCell.innerText = item['EMPNO'];
        empnoCell.classList.add('empnoCell');
        tr.appendChild(empnoCell);
        tableData[0].appendChild(tr);
        let statusCell = document.createElement('td');
        statusCell.classList.add('statusCell');
        let pg = document.createElement('p');
        pg.classList.add("status-color");
        pg.innerHTML = item['STATUS'];
        if (item['STATUS'] == 'In Active') {
            pg.style.backgroundColor = '#F89191';
            pg.style.color = 'white';
        }
        statusCell.appendChild(pg);
        tr.appendChild(statusCell);
        tableData[0].appendChild(tr);
        let joinCell = document.createElement('td');
        joinCell.innerText = item['JOINDT'];
        joinCell.classList.add('joinCell');
        tr.appendChild(joinCell);
        tableData[0].appendChild(tr);
        var dotsTd = document.createElement("td");
        var dotsContainer = document.createElement("div");
        dotsContainer.className = "custom-dropdown";
        var dotsSpan = document.createElement("span");
        dotsSpan.classList.add('dots-container');
        dotsSpan.innerHTML = "...";
        dotsSpan.style.cursor = 'pointer';
        dotsContainer.appendChild(dotsSpan);
        var dropdownMenu = document.createElement("div");
        dropdownMenu.className = "custom-dropdown-menu";
        var division1 = document.createElement('div');
        division1.classList.add('custom-dropdown-menu-item');
        var spanView = document.createElement('span');
        spanView.innerHTML = 'View Details';
        spanView.classList.add('view-details');
        division1.appendChild(spanView);
        var division2 = document.createElement('div');
        division2.classList.add('custom-dropdown-menu-item');
        var spanEdit = document.createElement('span');
        var a = document.createElement('a');
        var text = document.createTextNode('Edit');
        a.appendChild(text);
        a.classList.add('anchor-edit' + (i + 1));
        spanEdit.appendChild(a);
        var editClass = 'edit' + (i + 1);
        spanEdit.classList.add('edit');
        spanEdit.classList.add(editClass);
        division2.appendChild(spanEdit);
        spanEdit.addEventListener('click', function () {
            var index = editClass.charAt(editClass.length - 1);
            dotEdit(this.parentElement.parentElement.parentElement.parentElement.parentElement.rowIndex, index);
        });
        var division3 = document.createElement('div');
        division3.classList.add('custom-dropdown-menu-item');
        var spanDelete = document.createElement('span');
        spanDelete.innerHTML = 'Delete';
        spanDelete.classList.add('delete' + item['EMPNO']);
        division3.appendChild(spanDelete);
        spanDelete.addEventListener('click', function () {
            var index = editClass.charAt(editClass.length - 1);
            dotDelete(this.parentElement.parentElement.parentElement.parentElement.parentElement.rowIndex, index);
        });
        dropdownMenu.appendChild(division1);
        dropdownMenu.appendChild(division2);
        dropdownMenu.appendChild(division3);
        dotsContainer.appendChild(dropdownMenu);
        dotsTd.appendChild(dotsContainer);
        tr.appendChild(dotsTd);
        tableData[0].appendChild(tr);
        dotsSpan.addEventListener('click', function () {
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
        i++;
        document.body.addEventListener("click", function (event) {
            const target = event.target;
            if (!dropdownMenu.contains(target) && target !== dotsSpan) {
                dropdownMenu.style.display = "none";
            }
        });
    });
}
function dotEdit(r, index) {
    var rows = document.getElementsByClassName('table-row');
    var empno = rows[r - 1].getElementsByClassName('empnoCell')[0].innerHTML;
    const params = new URLSearchParams();
    params.append('empid', empno);
    var url = 'http://127.0.0.1:5501/Add-Employee/Add-Employee.html?' + params.toString();
    var a = document.getElementsByClassName('anchor-edit' + (index))[0];
    a.setAttribute('href', url);
}
function dotDelete(r, index) {
    var rows = document.getElementsByClassName('table-row');
    var msg = document.getElementsByClassName('delete-msg')[0];
    var data = JSON.parse(localStorage.getItem('details'));
    data.splice(parseInt(index) - 1, 1);
    localStorage.setItem('details', JSON.stringify(data));
    rows[r - 1].remove();
    msg.style.display = 'block';
    setTimeout(function () {
        msg.style.display = 'none';
    }, 3000);
}
function dropdownValues(data) {
    var div1 = document.getElementsByClassName("dropdown-content-loc");
    var location = [];
    data.forEach((item) => {
        location.push(item['LOCATION']);
    });
    var locationSet = new Set(location);
    var k = 0;
    locationSet.forEach((loc) => {
        var div = document.createElement('div');
        div.classList.add('dropdown-checkbox');
        var divLabel2 = document.createElement('div');
        divLabel2.classList.add('label-div');
        var label = document.createElement('label');
        var idname = 'label2-' + k;
        label.setAttribute('class', 'dropdown2-label');
        label.setAttribute('for', idname);
        var span2 = document.createElement('span');
        span2.classList.add('location-span');
        span2.innerHTML = loc;
        label.append(span2);
        divLabel2.appendChild(label);
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add("checkbox-dropdown2");
        checkBox.classList.add('check');
        checkBox.setAttribute('id', idname);
        checkBox.addEventListener("change", dropdownCountLocation);
        checkBox.style.marginRight = '10%';
        div.appendChild(divLabel2);
        div.appendChild(checkBox);
        div1[0].appendChild(div);
        k++;
    });
    var div2 = document.getElementsByClassName("dropdown-content-dept");
    var dept = [];
    data.forEach((item) => {
        dept.push(item['DEPARTMENT']);
    });
    var deptSet = new Set(dept);
    var j = 0;
    deptSet.forEach((dept) => {
        var div = document.createElement('div');
        div.classList.add('dropdown-checkbox');
        var divLabel3 = document.createElement('div');
        divLabel3.classList.add('label-div');
        var label = document.createElement('label');
        var idname = 'label3-' + j;
        label.setAttribute('class', 'dropdown3-label');
        label.setAttribute('for', idname);
        var span3 = document.createElement('span');
        span3.classList.add('department-span');
        span3.innerHTML = dept;
        label.appendChild(span3);
        divLabel3.appendChild(label);
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.style.marginRight = '10%';
        checkBox.classList.add("checkbox-dropdown3");
        checkBox.classList.add('check');
        checkBox.setAttribute("id", idname);
        checkBox.addEventListener("change", dropdownCountDepartment);
        div.appendChild(divLabel3);
        div.appendChild(checkBox);
        div2[0].appendChild(div);
        j++;
    });
    var div3 = document.getElementsByClassName("dropdown-content-status");
    var status = [];
    data.forEach((item) => {
        status.push(item['STATUS']);
    });
    var statusSet = new Set(status);
    var i = 0;
    statusSet.forEach((status) => {
        var div = document.createElement('div');
        div.classList.add('dropdown-checkbox');
        var divLabel1 = document.createElement('div');
        divLabel1.classList.add('label-div');
        var label = document.createElement('label');
        var idname = 'label1-' + i;
        label.setAttribute('class', 'dropdown1-label');
        label.setAttribute('for', idname);
        var span1 = document.createElement('span');
        span1.classList.add('status-span');
        span1.innerHTML = status;
        label.appendChild(span1);
        divLabel1.appendChild(label);
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.style.marginRight = '10%';
        checkBox.classList.add("checkbox-dropdown1");
        checkBox.classList.add('check');
        checkBox.setAttribute('id', idname);
        checkBox.addEventListener("change", dropdownCountStatus);
        div.appendChild(divLabel1);
        div.appendChild(checkBox);
        div3[0].appendChild(div);
        i++;
    });
}
function dropdownStatus() {
    var dropDown = document.getElementsByClassName('dropdown-content-status');
    var btn = document.getElementsByClassName('dropbtn');
    dropDown[0].style.borderRadius = '7px';
    dropDown[0].style.display = dropDown[0].style.display === 'block' ? 'none' : 'block';
    document.body.addEventListener("click", function (event) {
        var target = event.target;
        if (!dropDown[0].contains(target) && target !== btn[0]) {
            dropDown[0].style.display = "none";
        }
    });
}
function dropdownLocation() {
    var dropDown = document.getElementsByClassName('dropdown-content-loc');
    var btn = document.getElementsByClassName('dropbtn');
    dropDown[0].style.borderRadius = '7px';
    dropDown[0].style.display = dropDown[0].style.display === 'block' ? 'none' : 'block';
    document.body.addEventListener("click", function (event) {
        var target = event.target;
        if (!dropDown[0].contains(target) && target !== btn[1]) {
            dropDown[0].style.display = "none";
        }
    });
}
function dropdownDepartment() {
    var dropDown = document.getElementsByClassName('dropdown-content-dept');
    var btn = document.getElementsByClassName('dropbtn');
    dropDown[0].style.borderRadius = '7px';
    dropDown[0].style.display = dropDown[0].style.display === 'block' ? 'none' : 'block';
    document.body.addEventListener("click", function (event) {
        var target = event.target;
        if (!dropDown[0].contains(target) && target !== btn[2]) {
            dropDown[0].style.display = "none";
        }
    });
}
function dropdownCountStatus() {
    var count = document.getElementsByClassName('dropdown-count-status');
    var checked = document.getElementsByClassName('checkbox-dropdown1');
    var c1 = 0;
    for (var i = 0; i < checked.length; i++) {
        if (checked[i].checked) {
            c1 = c1 + 1;
        }
    }
    if (c1 > 0) {
        count[0].innerHTML = '(' + c1 + ')';
    }
    else {
        count[0].innerHTML = '';
    }
    applyColorChange();
}
function dropdownCountLocation() {
    var count = document.getElementsByClassName('dropdown-count-location');
    var checked = document.getElementsByClassName('checkbox-dropdown2');
    var c1 = 0;
    for (var i = 0; i < checked.length; i++) {
        if (checked[i].checked) {
            c1 = c1 + 1;
        }
    }
    if (c1 > 0) {
        count[0].innerHTML = '(' + c1 + ')';
    }
    else {
        count[0].innerHTML = '';
    }
    applyColorChange();
}
function dropdownCountDepartment() {
    var count = document.getElementsByClassName('dropdown-count-department');
    var checked = document.getElementsByClassName('checkbox-dropdown3');
    var c1 = 0;
    for (var i = 0; i < checked.length; i++) {
        if (checked[i].checked) {
            c1 = c1 + 1;
        }
    }
    if (c1 > 0) {
        count[0].innerHTML = '(' + c1 + ')';
    }
    else {
        count[0].innerHTML = '';
    }
    applyColorChange();
}
function applyColorChange() {
    var reset = document.getElementsByClassName('reset');
    var apply = document.getElementsByClassName('apply');
    var checked1 = document.getElementsByClassName('checkbox-dropdown1');
    var checked2 = document.getElementsByClassName('checkbox-dropdown2');
    var checked3 = document.getElementsByClassName('checkbox-dropdown3');
    var c1 = 0, c2 = 0, c3 = 0;
    for (var i = 0; i < checked1.length; i++) {
        if (checked1[i].checked) {
            c1 = c1 + 1;
        }
    }
    for (var i = 0; i < checked2.length; i++) {
        if (checked2[i].checked) {
            c2 = c2 + 1;
        }
    }
    for (var i = 0; i < checked3.length; i++) {
        if (checked3[i].checked) {
            c3 = c3 + 1;
        }
    }
    if (c1 > 0 || c2 > 0 || c3 > 0) {
        apply[0].classList.add('apply-enable');
        reset[0].classList.add('reset-enable');
    }
    else {
        apply[0].classList.remove('apply-enable');
        reset[0].classList.remove('reset-enable');
    }
    reset[0].addEventListener('click', () => {
        apply[0].classList.remove('apply-enable');
        reset[0].classList.remove('reset-enable');
    });
}
function filterButton(str) {
    var rows = document.getElementsByClassName('table-row');
    var btn = document.getElementsByClassName('btn-alpha');
    var result = str.charCodeAt(0);
    var data = JSON.parse(localStorage.getItem('details'));
    if (btn[result - 65].style.backgroundColor === 'rgb(244, 72, 72)') {
        btn[result - 65].style.removeProperty('background-color');
        btn[result - 65].classList.toggle('alpha-btn');
        var l = rows.length;
        for (var i = 0; i < l; i++) {
            rows[0].remove();
        }
        document.getElementsByClassName('vector-image')[0].src = "../Assets/Interface/black-filter.svg";
        addData(data);
    }
    else {
        var filteredData = data.filter((user) => user.USER.toLowerCase().startsWith(str.toLowerCase()));
        var l = rows.length;
        for (var i = 0; i < l; i++) {
            rows[0].remove();
        }
        btn[result - 65].style.backgroundColor = 'rgb(244, 72, 72)';
        addData(filteredData);
        document.getElementsByClassName('vector-image')[0].src = "../Assets/Interface/filter.svg";
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].innerText != str) {
                btn[i].classList.toggle('rem-btn');
                btn[i].classList.remove('alpha-btn');
                if (btn[i].style.backgroundColor === 'rgb(244, 72, 72)') {
                    btn[i].style.removeProperty('background-color');
                }
            }
            else {
                btn[i].classList.toggle('alpha-btn');
            }
        }
    }
}
function applyBtn() {
    var statusArray = [];
    var statusLabel = document.getElementsByClassName('status-span');
    var locationArray = [];
    var locationLabel = document.getElementsByClassName('location-span');
    var departmentArray = [];
    var departmentLabel = document.getElementsByClassName('department-span');
    var checked1 = document.getElementsByClassName('checkbox-dropdown1');
    var checked2 = document.getElementsByClassName('checkbox-dropdown2');
    var checked3 = document.getElementsByClassName('checkbox-dropdown3');
    var rows = document.getElementsByClassName('table-row');
    for (var i = 0; i < checked1.length; i++) {
        if (checked1[i].checked == true) {
            statusArray.push(statusLabel[i].innerHTML);
        }
    }
    for (var i = 0; i < checked2.length; i++) {
        if (checked2[i].checked == true) {
            locationArray.push(locationLabel[i].innerHTML);
        }
    }
    for (var i = 0; i < checked3.length; i++) {
        if (checked3[i].checked == true) {
            departmentArray.push(departmentLabel[i].innerHTML);
        }
    }
    if (statusArray.length > 0 && locationArray.length > 0 && departmentArray.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            var status = rows[i].getElementsByClassName('status-color')[0].innerHTML;
            var location = rows[i].getElementsByClassName('locCell')[0].innerHTML;
            var department = rows[i].getElementsByClassName('deptCell')[0].innerHTML;
            if (statusArray.includes(status) && locationArray.includes(location) && departmentArray.includes(department)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length > 0 && locationArray.length > 0 && departmentArray.length == 0) {
        for (var i = 0; i < rows.length; i++) {
            var status = rows[i].getElementsByClassName('status-color')[0].innerHTML;
            var location = rows[i].getElementsByClassName('locCell')[0].innerHTML;
            if (statusArray.includes(status) && locationArray.includes(location)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length == 0 && locationArray.length > 0 && departmentArray.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            var location = rows[i].getElementsByClassName('locCell')[0].innerHTML;
            var department = rows[i].getElementsByClassName('deptCell')[0].innerHTML;
            if (locationArray.includes(location) && departmentArray.includes(department)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length > 0 && locationArray.length == 0 && departmentArray.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            var status = rows[i].getElementsByClassName('status-color')[0].innerHTML;
            var department = rows[i].getElementsByClassName('deptCell')[0].innerHTML;
            if (statusArray.includes(status) && departmentArray.includes(department)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length == 0 && locationArray.length == 0 && departmentArray.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            var department = rows[i].getElementsByClassName('deptCell')[0].innerHTML;
            if (departmentArray.includes(department)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length == 0 && locationArray.length > 0 && departmentArray.length == 0) {
        for (var i = 0; i < rows.length; i++) {
            var location = rows[i].getElementsByClassName('locCell')[0].innerHTML;
            if (locationArray.includes(location)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length > 0 && locationArray.length == 0 && departmentArray.length == 0) {
        for (var i = 0; i < rows.length; i++) {
            var status = rows[i].getElementsByClassName('status-color')[0].innerHTML;
            if (statusArray.includes(status)) {
                rows[i].style.display = "";
            }
            else {
                rows[i].style.display = 'none';
            }
        }
    }
    else if (statusArray.length == 0 && locationArray.length == 0 && departmentArray.length == 0) {
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
}
function checkAll() {
    var header = document.getElementsByClassName('parent-checkbox');
    var body = document.getElementsByClassName('body-checkbox');
    for (var i = 0; i < body.length; i++) {
        body[i].checked = header[0].checked;
    }
}
function resetDropdown(btn0, btn1, btn2) {
    var rows = document.getElementsByClassName('table-row');
    var btn = document.getElementsByClassName('dropbtn');
    var reset = document.getElementsByClassName('reset');
    var apply = document.getElementsByClassName('apply');
    var check = document.getElementsByClassName('check');
    for (var i = 0; i < check.length; i++) {
        check[i].checked = false;
    }
    btn[0].innerHTML = btn0;
    btn[1].innerHTML = btn1;
    btn[2].innerHTML = btn2;
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = '';
    }
}
function ActivateDeleteButton() {
    var header = document.getElementsByClassName('parent-checkbox');
    var button = document.getElementsByClassName('delete-btn');
    var body = document.getElementsByClassName('body-checkbox');
    var check = false;
    var check2 = false;
    for (var i = 0; i < body.length; i++) {
        if (body[i].checked) {
            check = true;
        }
    }
    if (check) {
        button[0].classList.add('delete-btn-activate');
        button[0].disabled = false;
    }
    else {
        button[0].classList.remove('delete-btn-activate');
        button[0].disabled = true;
    }
    for (var i = 0; i < body.length; i++) {
        if (body[i].checked) {
            check2 = true;
            continue;
        }
        else {
            check2 = false;
            break;
        }
    }
    if (check2 == false) {
        header[0].checked = false;
    }
    else {
        header[0].checked = true;
    }
}
function deleteRow() {
    var div = document.getElementsByClassName('delete-confirm');
    var msg = document.getElementsByClassName('confirm-msg');
    var bodyCheckbox = document.getElementsByClassName('body-checkbox');
    var count = 0;
    for (var i = 0; i < bodyCheckbox.length; i++) {
        if (bodyCheckbox[i].checked == true) {
            count = count + 1;
        }
    }
    if (count > 1) {
        msg[0].innerHTML = 'Click Confirm to delete ' + count + ' rows';
    }
    else {
        msg[0].innerHTML = 'Click Confirm to delete ' + count + ' row';
    }
    div[0].style.display = 'block';
}
function deleteConfirm() {
    var data = JSON.parse(localStorage.getItem('details'));
    var button = document.getElementsByClassName('delete-btn');
    var bodyCheckbox = document.getElementsByClassName('body-checkbox');
    var row = document.getElementsByClassName('table-row');
    var div = document.getElementsByClassName('delete-confirm');
    var button = document.getElementsByClassName('delete-btn');
    var msg = document.getElementsByClassName('delete-msg');
    var totalRows = bodyCheckbox.length;
    var c = 0;
    for (var i = 0; i < totalRows; i++) {
        if (bodyCheckbox[c].checked == true) {
            var j = 0;
            data.forEach((item) => {
                if (item['EMPNO'] == row[c].getElementsByClassName('empnoCell')[0].innerHTML) {
                    data.splice(j, 1);
                    localStorage.setItem('details', JSON.stringify(data));
                }
                j++;
            });
            row[c].remove();
        }
        else {
            c = c + 1;
        }
    }
    button[0].classList.remove('delete-btn-activate');
    button[0].disabled = true;
    div[0].style.display = 'none';
    msg[0].style.display = 'block';
    setTimeout(function () {
        msg[0].style.display = 'none';
    }, 3000);
}
function cancelConfirm() {
    var button = document.getElementsByClassName('delete-btn');
    var div = document.getElementsByClassName('delete-confirm');
    var bodyCheckbox = document.getElementsByClassName('body-checkbox');
    var header = document.getElementsByClassName('parent-checkbox');
    for (var i = 0; i < bodyCheckbox.length; i++) {
        if (bodyCheckbox[i].checked == true) {
            bodyCheckbox[i].checked = false;
        }
    }
    header[0].checked = false;
    div[0].style.display = 'none';
    button[0].disabled = true;
    button[0].classList.remove('delete-btn-activate');
}
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
function sortTable(header) {
    var switching = true;
    var shouldSwitch = false;
    var x = undefined;
    var y = undefined;
    var d1 = undefined;
    var d2 = undefined;
    var switchCount = 0;
    var dir = 'asc';
    var rows = document.getElementsByClassName('table-row');
    while (switching) {
        var date = false;
        switching = false;
        for (var i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            if (header == 'location') {
                x = rows[i].getElementsByClassName('locCell')[0];
                y = rows[i + 1].getElementsByClassName('locCell')[0];
            }
            else if (header == 'department') {
                x = rows[i].getElementsByClassName('deptCell')[0];
                y = rows[i + 1].getElementsByClassName('deptCell')[0];
            }
            else if (header == 'role') {
                x = rows[i].getElementsByClassName('roleCell')[0];
                y = rows[i + 1].getElementsByClassName('roleCell')[0];
            }
            else if (header == 'empno') {
                x = rows[i].getElementsByClassName('empnoCell')[0];
                y = rows[i + 1].getElementsByClassName('empnoCell')[0];
            }
            else if (header == 'status') {
                x = rows[i].getElementsByClassName('status-color')[0];
                y = rows[i + 1].getElementsByClassName('status-color')[0];
            }
            else if (header == 'joindt') {
                var x1 = rows[i].getElementsByClassName('joinCell')[0];
                var y1 = rows[i + 1].getElementsByClassName('joinCell')[0];
                d1 = new Date(x1.innerHTML);
                d2 = new Date(y1.innerHTML);
                var date = true;
            }
            else if (header == 'user-head') {
                x = rows[i].getElementsByClassName('user-name')[0];
                y = rows[i + 1].getElementsByClassName('user-name')[0];
            }
            if (dir == 'asc') {
                if (date) {
                    if (d1 > d2) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if (dir == 'desc') {
                if (date) {
                    if (d1 < d2) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        }
        else {
            if (switchCount == 0 && dir == "asc") {
                dir = 'desc';
                switching = true;
            }
        }
    }
}
function exportToExcel() {
    var rows = document.getElementsByClassName('table-row');
    var name = document.getElementsByClassName('user-name');
    var email = document.getElementsByClassName('user-email');
    const csvData = [];
    for (let i = 0; i < rows.length; i++) {
        const row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 1; j < cols.length - 1; j++) {
            if (j == 1) {
                row.push(name[i].innerHTML);
                row.push(email[i].innerHTML);
                continue;
            }
            row.push(cols[j].innerText);
        }
        csvData.push(row.join(","));
    }
    const blob = new Blob([csvData.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
}
