$("#menu1_btn").click(function(){
    document.getElementsByClassName("menu1")[0].style.display = "block";
    document.getElementsByClassName("menu2")[0].style.display = "none";
    document.getElementsByClassName("menu3")[0].style.display = "none";
    document.getElementsByClassName("home")[0].style.display = "none";
});
$("#menu2_btn").click(function(){
    document.getElementsByClassName("menu1")[0].style.display = "none";
    document.getElementsByClassName("menu2")[0].style.display = "block";
    document.getElementsByClassName("menu3")[0].style.display = "none";
    document.getElementsByClassName("home")[0].style.display = "none";
});
$("#menu3_btn").click(function(){
    document.getElementsByClassName("menu1")[0].style.display = "none";
    document.getElementsByClassName("menu2")[0].style.display = "none";
    document.getElementsByClassName("menu3")[0].style.display = "block";
    document.getElementsByClassName("home")[0].style.display = "none";
});
