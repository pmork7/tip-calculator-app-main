let billTotal = document.getElementById("bill");
let peopleTotal = document.getElementById("people");
let tipPerPerson = document.getElementById("tip-amount");
let totalPerPerson = document.getElementById("total-amount");
let tipButtons = document.getElementsByClassName("tip-buttons")[0].children;
let errorMessage = document.getElementById("error-message");
let customTip = tipButtons[5];
let resetButton = document.getElementById("reset-button");
let totalPerPersonValue = 0;
let billTotalValue = 0;
let peopleTotalValue = 0;
let tipPercentValue = 0;
let tipPerPersonValue = 0;
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

billTotal.addEventListener("input", function() {
  if (/^\d*\.?\d*$/.test(this.value)) {
    console.log(this.value);
    billTotalValue = this.value;
    console.log(billTotalValue);
    if (this.value != "") {
      billTotal.value = (parseInt(this.value)).toString();
    }
    calculate();
  } else {
    this.value = "";
    this.classList.add("shake");
    this.classList.add("error-display")
    setTimeout(function() {
      billTotal.classList.remove("shake")
      billTotal.classList.remove("error-display");
    }, 500);
  }
})

peopleTotal.addEventListener("input", function() {
  if (/^\d*\.?\d*$/.test(this.value)) {
    console.log(/^\d*\.?\d*$/.test(this.value));
    peopleTotalValue = this.value;
    if (this.value != "") {
      peopleTotal.value = (parseInt(this.value)).toString();
    }
    calculate();
  } else {
    this.value = "";
    this.classList.add("error-display");
    this.classList.add("shake");
    errorMessage.classList.add("visible");
    errorMessage.classList.remove("invisible")
    setTimeout(
      function()  {
                    peopleTotal.classList.remove("shake");
                    peopleTotal.classList.remove("error-display");
                    errorMessage.classList.remove("visible");
                    errorMessage.classList.add("invisible");
                  }, 1000);
  }
})

resetButton.addEventListener("click", function() {
  billTotal.value = "";
  billTotalValue = 0;
  peopleTotal.value = "";
  peopleTotalValue = 0;
  tipPerPerson.textContent = "$0.00";
  tipPercentValue = 0;
  totalPerPerson.textContent = "$0.00";
  totalPerPersonValue = 0;
  customTip.value = "";
})

function initializeTipButtons() {
  let i = 0;
  for (i = 0; i < tipButtons.length - 1; i++) {
    tipButtons[i].addEventListener("click", function() {
      tipPercentValue = parseInt(this.textContent.substring(0, this.textContent.length - 1)) * 0.01;
      calculate();
    })
  }
  customTip.addEventListener("input", function() {
    tipPercentValue = parseInt(this.value) * 0.01;
    calculate();
  })
}

function calculate() {
  if (peopleTotalValue != 0 && tipPercentValue != 0) {
    let tipTotalValue = billTotalValue * tipPercentValue;
    tipPerPersonValue = Math.round(((tipTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    tipPerPerson.textContent = `${formatter.format(tipPerPersonValue)}`;
    totalPerPersonValue = Math.round(((billTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    totalPerPerson.textContent = `${formatter.format(totalPerPersonValue)}`;
  } else if (peopleTotalValue != 0) {
    totalPerPersonValue = Math.round(((billTotalValue / peopleTotalValue) + Number.EPSILON) * 100) / 100;
    totalPerPerson.textContent = `${formatter.format(totalPerPersonValue)}`;
  }
}

initializeTipButtons();
