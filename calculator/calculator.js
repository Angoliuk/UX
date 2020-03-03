<<<<<<< HEAD
let onCalc = false;

function OnOffFunc() {

  if (onCalc == true) {

    onCalc = false

  } else {

    onCalc = true
  }

}

function Action(sign) {

  return document.getElementById('input').value = document.getElementById('input').value + sign;

}

function Deleting() {

  document.getElementById('input').value = "";

}

function Calculating() {

  let exercise = document.getElementById('input').value;

  if (onCalc == false) {

    alert("calculator is off,press 'on/off' button")

  } else {

    if (exercise == "" || exercise == "+" || exercise == "." || exercise == "-" || exercise == "*" || exercise == "/" || exercise == "%" || exercise == " " || exercise == "0.0") {
      alert('You dont enter anything or something went wrong')

    } else {

      document.getElementById('input').value = eval(exercise);

      if (document.getElementById('input-last-activities1').value == "") {
        document.getElementById('input').value = eval(exercise);
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);

      } else if (document.getElementById('input-last-activities2').value == "") {
        document.getElementById('input-last-activities2').value = document.getElementById('input-last-activities1').value;
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);
        let something = document.getElementById('input-last-activities2').value;

      } else {
        document.getElementById('input-last-activities3').value = document.getElementById('input-last-activities2').value;
        document.getElementById('input-last-activities2').value = document.getElementById('input-last-activities1').value;
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);
      };

    }

  }
=======
let onCalc = false;

function OnOffFunc() {

  if (onCalc == true) {

    onCalc = false;

  } else {

    onCalc = true;
  }

}

function Action(sign) {

  return document.getElementById('input').value = document.getElementById('input').value + sign;

}

function Deleting() {

  document.getElementById('input').value = "";

}

function Calculating() {

  let exercise = document.getElementById('input').value;

  if (onCalc == false) {

    alert("calculator is off,press 'on/off' button")

  } else {

    if (exercise == "" || exercise == "+" || exercise == "." || exercise == "-" || exercise == "*" || exercise == "/" || exercise == "%" || exercise == " " || exercise == "0.0") {
      alert('You dont enter anything or something went wrong')

    } else {

      document.getElementById('input').value = eval(exercise);

      if (document.getElementById('input-last-activities1').value == "") {
        document.getElementById('input').value = eval(exercise);
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);

      } else if (document.getElementById('input-last-activities2').value == "") {
        document.getElementById('input-last-activities2').value = document.getElementById('input-last-activities1').value;
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);
        let something = document.getElementById('input-last-activities2').value;

      } else {
        document.getElementById('input-last-activities3').value = document.getElementById('input-last-activities2').value;
        document.getElementById('input-last-activities2').value = document.getElementById('input-last-activities1').value;
        document.getElementById('input-last-activities1').value = exercise + " = " + eval(exercise);
      };

    }

  }
>>>>>>> smth
}