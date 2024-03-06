function openHambuger():void{
    var element=document.getElementsByClassName('left-container');
    var hamburger=document.getElementsByClassName('hamburger-menu');
    var mainContainer=document.getElementsByClassName('main-container');
    (element[0] as HTMLInputElement).style.display='none';
    hamburger[0].classList.add('hamburger-open');
    (hamburger[0] as HTMLInputElement).style.display='block';
    mainContainer[0].classList.add('expand');
}

function closeHamburger():void{
    var leftUpdate=document.getElementsByClassName('left-container-update');
    var element=document.getElementsByClassName('left-container');
    var hamburger=document.getElementsByClassName('hamburger-menu');
    var mainContainer=document.getElementsByClassName('main-container');
    (hamburger[0] as HTMLInputElement).style.display='none';
    (element[0] as HTMLInputElement).style.display='block';
    (leftUpdate[0] as HTMLInputElement).style.marginTop='75%';
    mainContainer[0].classList.add('hamburger-close');
}

interface Data{
    image:string
    USER:string;
    EMAIL:string;
    LOCATION:string;
    DEPARTMENT:string;
    ROLE:string;
    EMPNO:string;
    STATUS:string;
    JOINDT:string;
    PROJECT:string;
    MOBILE:string;
    MANAGER:string;
    DOB:string;
}

document.addEventListener('DOMContentLoaded',()=>{
    var joindt:Element=document.getElementsByClassName('joindt-data')[0];
    const date=new Date().toLocaleDateString();
    (joindt as HTMLInputElement).placeholder=date;
    var parameters=window.location.search;
    var urlparams=new URLSearchParams(parameters);
    var empno=urlparams.get('empid');
    var data:Data[]=JSON.parse(localStorage.getItem('details')!);
    if(empno){
        document.getElementsByClassName('add-employee-btn')[0].innerHTML='Update';
    }
    data.forEach((element) => {
        if(element['EMPNO']==empno){
            var name=element['USER'].split(" ");
            (document.getElementsByClassName('profile-picture')[0] as HTMLImageElement).src=element['image'];
            (document.getElementsByClassName('last-name-data')[0] as HTMLInputElement).value=name[0];
            (document.getElementsByClassName('first-name-data')[0] as HTMLInputElement).value=name[name.length-1];
            (document.getElementsByClassName('empno-data')[0] as HTMLInputElement).value=element['EMPNO'];
            (document.getElementsByClassName('email-data')[0] as HTMLInputElement).value=element['EMAIL'];
            (document.getElementsByClassName('mobile-data')[0] as HTMLInputElement).value=element['MOBILE'];
            (document.getElementsByClassName('dob-data')[0] as HTMLInputElement).value=element['DOB'];
            (document.getElementsByClassName('joindt-data')[0] as HTMLInputElement).value=element['JOINDT'];
            (document.getElementsByClassName('btn-loc')[0] as HTMLInputElement).innerText=element['LOCATION'];
            (document.getElementsByClassName('btn-role')[0] as HTMLInputElement).innerText=element['ROLE'];
            (document.getElementsByClassName('btn-dept')[0] as HTMLInputElement).innerText=element['DEPARTMENT'];
            (document.getElementsByClassName('btn-manager')[0] as HTMLInputElement).innerText=element['MANAGER'];
            (document.getElementsByClassName('btn-project')[0] as HTMLInputElement).innerText=element['PROJECT'];
        }
    });

    var inputFile=document.getElementsByClassName('file-upload');
    inputFile[0].addEventListener('change',event=>{

        var target=event.target as HTMLInputElement;
    const image:File=target.files![0];
    const reader=new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load',()=>{
        localStorage.setItem('profileImage',(reader.result as string));
        console.log("Image is uploaded to local storage");
        var img:HTMLImageElement=document.getElementsByClassName('profile-picture')[0] as HTMLImageElement;
        img.src=(localStorage.getItem('profileImage') as string);
    });
    inputFile[0].addEventListener('click',()=>{
        (inputFile[0] as HTMLInputElement).value='';
    });
    
});

});

function employeeValidation():void{
    var div:HTMLCollectionOf<Element>=document.getElementsByClassName('error-msg-div');
    var empNo:HTMLCollectionOf<Element>=document.getElementsByClassName('empno-data');
    var fName:HTMLCollectionOf<Element>=document.getElementsByClassName('first-name-data');
    var lName:HTMLCollectionOf<Element>=document.getElementsByClassName('last-name-data');
    var emailId:HTMLCollectionOf<Element>=document.getElementsByClassName('email-data');
    var joinDt:HTMLCollectionOf<Element>=document.getElementsByClassName('joindt-data');

    var divs=[empNo,fName,lName,emailId,joinDt]
    var inputs = [(empNo[0] as HTMLInputElement).value, (fName[0] as HTMLInputElement).value, (lName[0] as HTMLInputElement).value, (emailId[0] as HTMLInputElement).value, (joinDt[0] as HTMLInputElement).value];
    var errorDivs = [div[0], div[1], div[2], div[3], div[4]];

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].length==0) {
            (errorDivs[i] as HTMLElement).style.display = 'flex';
            (errorDivs[i] as HTMLElement).style.flexDirection = 'row';
            (divs[i][0] as HTMLElement).style.outline = '2px solid red';
            (divs[i][0] as HTMLElement).style.borderStyle = 'none';
        } else {
            (errorDivs[i] as HTMLElement).style.display = 'none';
        }
    }
}

function loadData():Data{
    var btn=document.getElementsByClassName('dropbtn');
    var img=document.getElementsByClassName('profile-picture')[0] as HTMLImageElement;
    var empNo=(document.getElementsByClassName('empno-data')[0] as HTMLInputElement).value;
    var fName=(document.getElementsByClassName('first-name-data')[0] as HTMLInputElement).value;
    var lName=(document.getElementsByClassName('last-name-data')[0] as HTMLInputElement).value;
    var emailId=(document.getElementsByClassName('email-data')[0] as HTMLInputElement).value;
    var joinDt=(document.getElementsByClassName('joindt-data')[0] as HTMLInputElement).value;

    var dob1:HTMLCollectionOf<Element>=document.getElementsByClassName('dob-data');
    var dob=(dob1[0] as HTMLInputElement).value;
    var mobile1=document.getElementsByClassName('mobile-data');
    var mobile=(mobile1[0] as HTMLInputElement).value;

    var name=lName+" "+fName;
    var location=(btn[0] as HTMLInputElement).innerText;
    var role=(btn[1] as HTMLInputElement).innerText;
    var department=(btn[2] as HTMLInputElement).innerText;
    var manager=(btn[3] as HTMLInputElement).innerText;
    var project=(btn[4] as HTMLInputElement).innerText;

    var data={
        image:img.src,
        USER:name,
        EMAIL:emailId,
        LOCATION:location,
        DEPARTMENT:department,
        ROLE:role,
        EMPNO:empNo,
        STATUS:'Active',
        JOINDT:joinDt,
        MOBILE:mobile,
        DOB:dob,
        MANAGER:manager,
        PROJECT:project
    };
    return data;
}

function saveData(data:Data){
    const storedData:Data[]=JSON.parse(localStorage.getItem('details') as string) || [];
    var isExist:boolean=false;
    storedData!.forEach((element)=>{
        if(element['EMPNO']==data['EMPNO']){
            element['image']=data['image'];
            element['EMPNO']=data['EMPNO'];
            element['USER']=data['USER'];
            element['EMAIL']=data['EMAIL'];
            element['JOINDT']=data['JOINDT'];
            element['LOCATION']=data['LOCATION'];
            element['DEPARTMENT']=data['DEPARTMENT'];
            element['ROLE']=data['ROLE'];
            element['MOBILE']=data['MOBILE'];
            element['DOB']=data['DOB'];
            element['MANAGER']=data['MANAGER'];
            element['PROJECT']=data['PROJECT'];
            isExist=true;
        }
    });
    if(!isExist){
        storedData.push(data);
    }
    localStorage.setItem('details',JSON.stringify(storedData));  
}

function AddEmployee():void{
    employeeValidation();
    var data:Data=loadData();
    var div:HTMLCollectionOf<Element>=document.getElementsByClassName('error-msg-div');
    var mainDiv:HTMLCollectionOf<Element>=document.getElementsByClassName('profile-picture-div');
    var edit:HTMLCollectionOf<Element>=document.getElementsByClassName("edit-text");
    var successMsg:HTMLCollectionOf<Element>=document.getElementsByClassName('success-msg');

    var flag1:boolean=false,flag2:boolean=true;
    if((document.getElementsByClassName('profile-picture')[0] as HTMLImageElement).src!='../Assets/profile.PNG'){
        flag1=true;
    }
    else{
        flag1=true;
        (mainDiv[0] as HTMLElement).style.width='150px';
        (edit[0] as HTMLElement).style.marginLeft='20%';
    }

    
    for(var i:number=0;i<div.length;i++){
        if((div[i] as HTMLElement).style.display!='none'){
            flag2=false;
        }
    }
    if(flag1 && flag2){
        saveData(data);
        (successMsg[0] as HTMLElement).style.display='block';

        setTimeout(function() {
            (successMsg[0] as HTMLElement).style.display='none';
            window.location.href="../Employee/employee.html";
        }, 1000);
    }
}

function dropDownOptionsDisplay(str:string):void{
    var dropDown:HTMLCollectionOf<Element>=document.getElementsByClassName('dropdown-content');
    var btn:HTMLCollectionOf<Element>=document.getElementsByClassName('dropbtn');
    var btnValues:string[]=['Location','Job Title','Department','manager','project'];
    for(var i:number=0;i<btn.length;i++){
        if(btnValues[i]==str){
            (dropDown[i] as HTMLElement).style.borderRadius='7px';
            (dropDown[i] as HTMLElement).style.display= (dropDown[i] as HTMLElement).style.display==='block' ? 'none' : 'block';
            (function(i:number){
                document.body.addEventListener("click", function(e:Event) {
                    if (e.target !==btn[i]) {
                        (dropDown[i] as HTMLElement).style.display = "none";
                    }
                });
            })(i);
        }
    }
}

function validateMobileNumber(){
    var mobileNumber:RegExp=/^[0-9]{10}$/;
    var text=(document.getElementsByClassName('mobile-data')[0] as HTMLInputElement).value;
    var mobile:HTMLCollectionOf<Element>=document.getElementsByClassName('error-mobile');
    if(mobileNumber.test(text) || text.length==0){
        (mobile[0] as HTMLElement).style.display='none';
    }
    else{
        (mobile[0] as HTMLElement).style.display='block';
    }
}

function validateFirstName(){
    var fname:RegExp=/^[a-zA-Z\s]*$/;
    var text=(document.getElementsByClassName('first-name-data')[0] as HTMLInputElement).value;
    var firstName:HTMLCollectionOf<Element>=document.getElementsByClassName('error-fname');
    if(fname.test(text)){
        (firstName[0] as HTMLElement).style.display='none';
    }
    else{
       (firstName[0] as HTMLElement).style.display='block'; 
    }
}

function validateLastName(){
    var lname:RegExp=/^[a-zA-Z\s]*$/;
    var text=(document.getElementsByClassName('last-name-data')[0] as HTMLInputElement).value;
    var lastName:HTMLCollectionOf<Element>=document.getElementsByClassName('error-lname');
    if(lname.test(text)){
        (lastName[0] as HTMLElement).style.display='none';
    }
    else{
        (lastName[0] as HTMLElement).style.display='block'; 
    }
}

function validateEmail(){
    var email:RegExp=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var text=(document.getElementsByClassName('email-data')[0] as HTMLInputElement).value;
    var emailId:HTMLCollectionOf<Element>=document.getElementsByClassName('error-email');
    if(email.test(text)){
        (emailId[0] as HTMLElement).style.display='none';
    }
    else{
        (emailId[0] as HTMLElement).style.display='block';
    }
}

function validateEmpId(){
    var empid:RegExp=/^[A-Za-z0-9]*$/;
    var text=(document.getElementsByClassName('empno-data')[0] as HTMLInputElement).value;
    var emp:HTMLCollectionOf<Element>=document.getElementsByClassName('error-empid');
    if(empid.test(text)){
        (emp[0] as HTMLElement).style.display='none';
    }
    else{
        (emp[0] as HTMLElement).style.display='block';
    }
}

function validateJoinDate(){
    var date:RegExp=/^\d{4}\-\d{1,2}\-\d{1,2}$/;
    var text=(document.getElementsByClassName('joindt-data')[0] as HTMLInputElement).value;
    var joinDt:HTMLCollectionOf<Element>=document.getElementsByClassName('error-date');
    if(date.test(text) || text.length==0){
        (joinDt[0] as HTMLElement).style.display='none';
    }
    else{
        (joinDt[0] as HTMLElement).style.display='block';
    }
}

function dropDownText(dropdownId:number,text:string){
    var dropdown=document.getElementById('dropdown'+dropdownId);
    (dropdown as HTMLElement).querySelector(".dropbtn")!.textContent=text;
}

function validEmployee(str:string){
    var div:HTMLCollectionOf<Element>=document.getElementsByClassName('error-msg-div');
    var empNo:HTMLCollectionOf<Element>=document.getElementsByClassName('empno-data');
    var fName:HTMLCollectionOf<Element>=document.getElementsByClassName('first-name-data');
    var lName:HTMLCollectionOf<Element>=document.getElementsByClassName('last-name-data');
    var emailId:HTMLCollectionOf<Element>=document.getElementsByClassName('email-data');
    var joinDt:HTMLCollectionOf<Element>=document.getElementsByClassName('joindt-data');

    var fields=['empno','fname','lname','email','joindt'];
    var divs=[empNo,fName,lName,emailId,joinDt]
    for(var i=0;i<fields.length;i++){
        if(str==fields[i]){
            (div[i] as HTMLElement).style.display='none';
            (divs[i][0] as HTMLElement).style.outline='2px solid #378EFF';
        }
    }
}

function InputBoxFocusOut(str:string):void{
    var empNo:HTMLCollectionOf<Element>=document.getElementsByClassName('empno-data');
    var fName:HTMLCollectionOf<Element>=document.getElementsByClassName('first-name-data');
    var lName:HTMLCollectionOf<Element>=document.getElementsByClassName('last-name-data');
    var emailId:HTMLCollectionOf<Element>=document.getElementsByClassName('email-data');
    var joinDt:HTMLCollectionOf<Element>=document.getElementsByClassName('joindt-data');

    var fields=['empno','fname','lname','email','joindt'];
    var divs=[empNo,fName,lName,emailId,joinDt]
    for(var i=0;i<fields.length;i++){
        if(str==fields[i]){
            (divs[i][0] as HTMLElement).style.outline='none';
            (divs[i][0] as HTMLElement).style.border='1px solid black';
        }
    }
}

