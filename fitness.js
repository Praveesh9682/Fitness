function myFunction() {
    var x = document.getElementById("nav");
    if (x.className === "nav1") {
      x.className += " responsive";
    } else {
      x.className = "nav1";
    }
  }
// === SYNC SYSTEM START ===
function setupSync() {
  const syncMap = {
    h: ["bh","fbmi"],        // BMI height → BMR height
    w: ["bw","fw"],   // BMI weight → BMR + FAT
    bh: ["h","fbmi"],        // BMR height → BMI
    bw: ["w","fw"],   // BMR weight → BMI + FAT
    fw: ["w","bw"],   // FAT weight → BMI + BMR
    a: ["fa"],        // BMR age → FAT
    fa: ["a"],        // FAT age → BMR
    fbmi: ["h","bh"]
  };

  for (let id in syncMap) {
    let el = document.getElementById(id);
    if (!el) continue;

    el.addEventListener("input", function () {
      syncMap[id].forEach(targetId => {
        let targetEl = document.getElementById(targetId);
        if (targetEl && targetEl.value !== this.value) {
          targetEl.value = this.value;
        }
      });
    });
  }
}
document.addEventListener("DOMContentLoaded", setupSync);

// === BMI Calculator ===

function bmi() {
  var gender1=document.getElementById("gender1");
  var gender2=document.getElementById("gender2");
  var height = document.getElementById("h").value;
  var weight = document.getElementById("w").value;

  if (height == 0 || height > 250) {
    alert("Please fill the correct height.");
    return;
  } else if (weight == 0 || weight > 400) {
    alert("Please fill the correct weight.");
    return;
  }

  var heightM = height / 100;
  var bmi = weight / (heightM * heightM);

  // normal weight range
  var minWeight = 18.5 * (heightM * heightM);
  var maxWeight = 24.9 * (heightM * heightM);
 var greet="Hello";
  // BMI Category
  let category="", colorClass="";
  if (bmi < 18.5) { category="You are underweight😫"; colorClass="fat-result"; }
  else if (bmi >= 18.5 && bmi <= 24.9) { category="Wow, your weight is healthy😎"; colorClass="status-result"; }
  else if (bmi >= 25 && bmi <= 29.9) { category="You are overweight😫"; colorClass="protein-result"; }
  else { category="Obese"; colorClass="blood-result"; }

  document.getElementById("bmi_calc").innerHTML=
    `<div class="result-box ${colorClass}">
       ${greet}, Your BMI is: <b>${bmi.toFixed(2)} kg/m2</b>
     </div>`;

  document.getElementById("bmi_cal").innerHTML=
    `<div class="result-box lean-result">
       ${category}<br>
       👉 Your weight range should be between <b>${minWeight.toFixed(1)} kg</b> and 
       <b>${maxWeight.toFixed(1)} kg</b>.
     </div>`;
}

function cbmi(){
  document.getElementById("h").value='';
  document.getElementById("w").value='';
  document.getElementById("bmi_calc").innerHTML='';
  document.getElementById("bmi_cal").innerHTML='';
}
// === BMR Calculator ===


function bmr(){
  var gen = document.getElementById("gender").value;
  var height = document.getElementById("bh").value;
  var weight = document.getElementById("bw").value;
  var age = document.getElementById("a").value;

  if (height==0 || height>250){
      alert("Please fill the correct height."); return;
  }
  else if (weight==0||weight>400){
      alert("Please fill the correct weight."); return;
  }
  else if (age==0 ||age>100){
      alert("Please fill the correct age."); return;
  }

  let bmr=0, greet="";

  if(gen == "male"){
      greet="Mr.";
      bmr = 66.47 + (13.75*weight) + (5*height) - (6.8*age);
  }
  else if(gen == "female"){
      greet="Mrs.";
      bmr = 655.1 + (9.56*weight) + (1.85*height) - (4.68*age);
  }
  else{
      alert("please select your gender"); return;
  }

  // Daily calories according to activity multipliers
  let sedentary = (bmr*1.2).toFixed(0);
  let light = (bmr*1.375).toFixed(0);
  let moderate = (bmr*1.55).toFixed(0);
  let active = (bmr*1.725).toFixed(0);
  let veryActive = (bmr*1.9).toFixed(0);

  // Display BMR result
  document.getElementById("bmr_calc").innerHTML =
    `<div class="result-box fat-result">${greet}, Your BMR is: ${bmr.toFixed(2)} kcal/day</div>`;

  // Display TDEE
  document.getElementById("bmr_cal").innerHTML =
    `
    <br>
    <div class="result-box lean-result">
      <label><b>Select Your Activity:</b></label>
      <select id="activity">
        <option value="">--Choose--</option>
        <option value="${sedentary}">Sedentary (little/no exercise)</option>
        <option value="${light}">Lightly active (1-3 days/wk)</option>
        <option value="${moderate}">Moderately active (3-5 days/wk)</option>
        <option value="${active}">Active (6-7 days/wk)</option>
        <option value="${veryActive}">Very Active (hard exercise/job)</option>
      </select>
      <br><br>
      <label><b>Your Goal:</b></label>
      <select id="goal">
        <option value="">--Choose--</option>
        <option value="maintain">Maintain Weight</option>
        <option value="lose">Lose Weight</option>
        <option value="gain">Gain Weight</option>
      </select>
      <br><br>
      <button
  onclick="suggestCalories()"
  aria-label="Show calorie suggestion"
  style="
    background: linear-gradient(90deg,#0077cc,#005fa3);
    color: #ffffff;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    box-shadow: 0 6px 14px rgba(0,0,0,0.12);
    cursor: pointer;
    transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
    outline: none;
  "
  onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.18)';"
  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 14px rgba(0,0,0,0.12)';"
  onmousedown="this.style.transform='translateY(0) scale(.99)';"
  onmouseup="this.style.transform='translateY(-3px)';"
>
  Show Suggestion
</button>

      <div id="calorie_suggestion"></div>
    </div>`;
}

function suggestCalories(){
  let activity = document.getElementById("activity").value;
  let goal = document.getElementById("goal").value;
  let resultBox = document.getElementById("calorie_suggestion");

  if(activity=="" || goal==""){
    alert("Please select both activity and goal"); return;
  }

  let baseCalories = parseInt(activity);
  let suggestion="";

  if(goal=="maintain"){
    suggestion = `👉 To maintain your weight, consume around <b>${baseCalories} kcal/day</b>.`;
  }
  else if(goal=="lose"){
    suggestion = `👉 To reduce fat, consume around <b>${baseCalories-500} kcal/day</b> (approx 500 kcal deficit).`;
  }
  else if(goal=="gain"){
    suggestion = `👉 To gain weight, consume around <b>${baseCalories+500} kcal/day</b> (approx 500 kcal surplus).`;
  }

  resultBox.innerHTML = `<div class="result-box status-result">${suggestion}</div>`;
}

function cbmr(){
  document.getElementById("bh").value='';
  document.getElementById("bw").value='';
  document.getElementById("a").value='';
  document.getElementById("bmr_calc").innerHTML='';
  document.getElementById("bmr_cal").innerHTML='';
}


// // === FAT Calculator ===

function fat() {
  var gen = document.getElementById("fgender").value;
  var age = document.getElementById("fa").value;
  var weight = document.getElementById("fw").value;
  var bmi = document.getElementById("fbmi").value; //height

  if (age == 0 || age > 100) {
    alert("Please fill the correct age.");
    return;
  } else if (bmi == 0 || bmi > 250) {
    alert("Please fill the correct height.");
    return;
  }

  bmi = weight / ((bmi / 100) * (bmi / 100));
  let fat = 0,
    greet = "",
    blood = 0;
  let proteinLightMin = 0,
    proteinLightMax = 0,
    proteinMediumMin = 0,
    proteinMediumMax = 0,
    proteinHeavyMin = 0,
    proteinHeavyMax = 0;
  let status = "";

  if (gen == "male") {
    // Male
    fat = age > 17 ? 1.2 * bmi + 0.23 * age - 16.2 : 1.51 * bmi - 0.7 * age - 2.2;
    greet = "Mr.";
    blood = (weight * 75) / 1000; // male blood volume (liters)

    // Protein requirement Range (Male)
    proteinLightMin = (weight * 0.8).toFixed(1);
    proteinLightMax = (weight * 1.0).toFixed(1);

    proteinMediumMin = (weight * 1.1).toFixed(1);
    proteinMediumMax = (weight * 1.3).toFixed(1);

    proteinHeavyMin = (weight * 1.6).toFixed(1);
    proteinHeavyMax = (weight * 2.0).toFixed(1);

    // Male Body Fat % Range
    if (fat < 5) status = "Essential Fat";
    else if (fat >= 5 && fat <= 13) status = "Athlete";
    else if (fat >= 14 && fat <= 17) status = "Fitness";
    else if (fat >= 18 && fat <= 25) status = "Acceptable";
    else status = "Obese";

  } else if (gen == "female") {
    // Female
    fat = age > 17 ? 1.2 * bmi + 0.23 * age - 5.4 : 1.51 * bmi - 0.7 * age + 1.4;
    greet = "Mrs.";
    blood = (weight * 65) / 1000; // female blood volume (liters)

    // Protein requirement Range (Female)
    proteinLightMin = (weight * 0.7).toFixed(1);
    proteinLightMax = (weight * 0.9).toFixed(1);

    proteinMediumMin = (weight * 1.0).toFixed(1);
    proteinMediumMax = (weight * 1.2).toFixed(1);

    proteinHeavyMin = (weight * 1.4).toFixed(1);
    proteinHeavyMax = (weight * 1.6).toFixed(1);

    // Female Body Fat % Range
    if (fat < 10) status = "Essential Fat";
    else if (fat >= 10 && fat <= 20) status = "Athlete";
    else if (fat >= 21 && fat <= 24) status = "Fitness";
    else if (fat >= 25 && fat <= 30) status = "Acceptable";
    else status = "Obese";

  } else {
    alert("please select your gender");
    return;
  }

  // lean mass निकालना
  var lean = weight * fat / 100;

  // Display with colors
  document.getElementById("fat_calc").innerHTML =
    `<div class="result-box fat-result">Body Fat: ${fat.toFixed(2)} %</div>`;

  document.getElementById("fat_cal").innerHTML =
    `<div class="result-box status-result">${greet}, Your Fat Status is: ${status}</div>`;

  document.getElementById("fats_cal").innerHTML =
    `<div class="result-box lean-result">Fat in your body: ${lean.toFixed(2)} kg</div>
     <div class="result-box blood-result">Blood in your body: ${blood.toFixed(2)} Liter</div>
     <div class="result-box protein-result">
        <b>Protein Requirement (Range):</b><br>
        Light (Normal): ${proteinLightMin} – ${proteinLightMax} g/day<br>
        Intermediate (Fitness): ${proteinMediumMin} – ${proteinMediumMax} g/day<br>
        Heavy (Athlete): ${proteinHeavyMin} – ${proteinHeavyMax} g/day
     </div>`;
}


function cfat(){
  document.getElementById("gender1").checked=false;
  document.getElementById("gender2").checked=false;
  document.getElementById("fa").value='';
  document.getElementById("fw").value='';
  document.getElementById("fbmi").value='';
  document.getElementById("fat_calc").innerHTML='';
  document.getElementById("fat_cal").innerHTML='';
  document.getElementById("fats_cal").innerHTML='';
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

