function myFunction() {
    var x = document.getElementById("nav");
    if (x.className === "nav1") {
      x.className += " responsive";
    } else {
      x.className = "nav1";
    }
  }
function bmi(){
    var height= document.getElementById("h").value
    var weight= document.getElementById("w").value
    var bmi=weight/((height/100)*(height/100));
    var userBMI=document.getElementById("bmi_calc");
    userBMI.textContent=bmi.toFixed(2);
    if (height==0 || height>250 ){
        alert("Please fill the correct height.")
        return true;
    }
    else if (weight==0 || weight>400 ){
        alert("Please fill the correct weight.")
        return true;

    }
    else if(bmi<18.5){
        document.getElementById("bmi_cal").innerHTML="Oops! You are underweight."
        return false;
    }else if(bmi>24.9){
        document.getElementById("bmi_cal").innerHTML="Oops! You are overweight."
        return false;
    }else{
        document.getElementById("bmi_cal").innerHTML="Wow ! Your weight is healthy."
        return false;
    }

}
function cbmi(){
    var height= document.getElementById("h").value=''
    var weight= document.getElementById("w").value=''
    document.getElementById("bmi_calc").innerHTML=''
    document.getElementById("bmi_cal").innerHTML=''

}

function bmr(){
    var height= document.getElementById("bh").value
    var weight= document.getElementById("bw").value
    var age= document.getElementById("a").value
    var bmr=66.47+13.75*weight+5*height-6.8*age ;
    var userBMR=document.getElementById("bmr_calc");
    userBMR.textContent=bmr.toFixed(2);
    if (height==0 || height>250){
        alert("Please fill the correct height.")
    }
    else if (weight==0||weight>400){
        alert("Please fill the correct weight.")
    }
    else if (age==0 ||age>100){
        alert("Please fill the correct age.")
    }
    else{
        document.getElementById("bmr_cal").innerHTML="These are your daily calories."
    }
}
function cbmr(){
    var height= document.getElementById("bh").value=''
    var weight= document.getElementById("bw").value=''
    var age= document.getElementById("a").value=''
     document.getElementById("bmr_calc").innerHTML=''
     document.getElementById("bmr_cal").innerHTML=''
}
function fat(){
    var gender1=document.getElementById("gender1")
    var gender2=document.getElementById("gender2")
    var age=document.getElementById("fa").value
    var weight=document.getElementById("fw").value
    var bmi=document.getElementById("fbmi").value 
     if (age==0){
        alert("Please fill the correct age.")
    }
    else if (bmi==0){
        alert("Please fill the correct BMI.")
    }
    else if (age>100){
        alert("Please fill the correct age.")
    }
    else if (bmi>100){
        alert("Please fill the correct BMI.")
    }
    else{
        document.getElementById("fat_cal").innerHTML="( Check your fat(%) range below.)"
    }
    if(gender1.checked==true){
         if(age>17){
            var fat=1.2*bmi+0.23*age-16.2
        }
        else{
            var fat=1.51*bmi-0.70*age-2.2
        }
    }else if(gender2.checked==true){
        if(age>17){
            var fat=1.2*bmi+0.23*age-5.4
        }
        else{
            var fat=1.51*bmi-0.70*age+1.4
        }
    }else{
        alert("please select your gender")
    }
    var userFAT=document.getElementById("fat_calc");
    userFAT.textContent=fat.toFixed(2);
    var lean=weight*fat/100;
    var pl=document.getElementById("fats_cal");
    pl.textContent=lean.toFixed(2);
}
function cfat(){
    var gender1 =document.getElementById("gender1").value=''
    var gender2=document.getElementById("gender2").value=''
    var age=document.getElementById("fa").value=''
    var weight=document.getElementById("fw").value=''
    var bmi=document.getElementById("fbmi").value =''
    document.getElementById("fat_calc").innerHTML=''
document.getElementById("fat_cal").innerHTML=''
document.getElementById("fats_cal").innerHTML=''
}

// function validateemail()  
// {  
// var x=document.myform.email.value;  
// var atposition=x.indexOf("@");  
// var dotposition=x.lastIndexOf(".");  
// if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
//   alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
//   return false;  
// }
// }
