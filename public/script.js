var form = document.getElementById("new-invite");
var color = document.getElementById("color");
var body = document.getElementById("content");
var defaultColor = "#000000";
var font = document.getElementById("font");
var title = document.getElementById("new-form-title");
var from = document.getElementById("new-form-from");
var template = document.getElementById("tmplt");
var x = document.getElementById("navbar");
var mainCont = document.querySelector(".main-invite-container");
var inviteCont = document.querySelectorAll(".invite-container");
var arrinv = document.getElementById("ar-inv");
var accinv = document.getElementById("ac-inv");
var notify = document.getElementById("notify");
color.value = defaultColor;
color.addEventListener("input", updateFirst, false);
font.addEventListener("input",updateFont,false);
template.addEventListener("input",updateEvent,false);
function updateFirst(event)
{
    body.style.color = event.target.value;
    title.style.color = event.target.value;
    from.style.color = event.target.value;
}
function updateFont(event)
{
    body.style.fontFamily = event.target.value;
    title.style.fontFamily = event.target.value;
    from.style.fontFamily = event.target.value;
}
function updateEvent(event)
{
    if(event.target.value === "Bday")
    {
        body.innerHTML = "<p>Hey <em>nameOfReciever</em></p><p>As you know I have my <em>Bday</em> on <strong>Date</strong>, <p>So I am throwing a party for the same and wanted you to come for the same. The time for the party is mentioned below.</p>";

    }
    if(event.target.value === "Wedding")
    {
        body.innerHTML = "<p>Hey <em>nameOfReciever</em></p><p>My <em>wedding</em> is happening on <strong>Date</strong>, <p>I wanted to invite all my close friends to attend my wedding and so I want you to attend it.<p>The time and location for the same is mentioned below<br>*location*</p>";
    }
    if(event.target.value === "celeb")
    {
        body.innerHTML = "<p>Hey <em>nameOfReciever</em></p><p>On the occasion of <em>mention the reason for celebration here</em>, so I am hosting a party for the celebration the same and wanted you to attend it.</p><p>The time for the party is mentioned below</p>";
    }
    if(event.target.value === "default")
    {
        body.innerHTML = "";
    }
}

function myFunction()
{
    x.classList.toggle("responsive");
    mainCont.classList.toggle("responsive");
    for(var i=0;i<inviteCont.length;i++)
    {
        inviteCont[i].classList.toggle("responsive");
    }

}


