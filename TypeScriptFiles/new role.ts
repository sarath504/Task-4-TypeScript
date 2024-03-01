function empSearch():void{
    var div=document.getElementsByClassName('assign-employees') as HTMLCollectionOf<Element>;
    (div[0] as HTMLElement).style.display=(div[0] as HTMLElement).style.display==="block" ? "none" : "block";
}

function boxColor(str:string):void{
    var role=document.getElementsByClassName('role-name') as HTMLCollectionOf<Element>;
    var description=document.getElementsByClassName('description') as HTMLCollectionOf<Element>;
    if(str=='role'){
        (role[0] as HTMLElement).style.border='none';
        (role[0] as HTMLElement).style.outline='2px solid #378EFF';
    }
    else if(str=='textarea'){
        (description[0] as HTMLElement).style.border='none';
        (description[0] as HTMLElement).style.outline='2px solid #378EFF';
    }
}

function removeColor(str:string):void{
    var role=document.getElementsByClassName('role-name') as HTMLCollectionOf<Element>;
    var description=document.getElementsByClassName('description') as HTMLCollectionOf<Element>;
    if(str=='role'){
        (role[0] as HTMLElement).style.outline='none';
        (role[0] as HTMLElement).style.border='1px solid black';
    }
    else if(str=='textarea'){
        (description[0] as HTMLElement).style.outline='none';
        (description[0] as HTMLElement).style.border='1px solid black';
    }
}


function dropDown(dropdownId:number,text:string){
    var dropdown=document.getElementById('dropdown'+dropdownId) as HTMLElement;
    dropdown!.querySelector(".dropbtn")!.textContent=text;
    
}

function dropdownLoc(dropdownId:number,text:string){
    var dropdown=document.getElementById('dropdown'+dropdownId) as HTMLElement;
    dropdown!.querySelector(".dropbtn-location")!.textContent=text;
}

function hamburgerOpen():void{
    var element=document.getElementsByClassName('left-container');
    var hamburger=document.getElementsByClassName('hamburger-menu');
    var mainContainer=document.getElementsByClassName('main-container');
    (element[0] as HTMLElement).style.display='none';
    hamburger[0].classList.add('hamburger-open');
    (hamburger[0] as HTMLElement).style.display='block';
    mainContainer[0].classList.add('expand');
}

function hamburgerClose():void{
    var leftUpdate=document.getElementsByClassName('left-container-update') as HTMLCollectionOf<Element>;
    var element=document.getElementsByClassName('left-container') as HTMLCollectionOf<Element>;
    var hamburger=document.getElementsByClassName('hamburger-menu') as HTMLCollectionOf<Element>;
    var mainContainer=document.getElementsByClassName('main-container') as HTMLCollectionOf<Element>;

    (hamburger[0] as HTMLElement).style.display='none';
    (element[0] as HTMLElement).style.display='block';
    (leftUpdate[0] as HTMLElement).style.marginTop='75%';
    mainContainer[0].classList.add('hamburger-close');
}
