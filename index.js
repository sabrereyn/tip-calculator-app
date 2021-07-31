let billInput = $("#input-bill");
let peopleInput = $("#input-people");
let displayTip = $("#display-tip-amt");
let displayTotal = $("#display-total-amt");
let tipInputs = $(".tip-input");
let tipAmount = 0;
let billAmount = 0;
let noOfPeople = 1;

$(document).on("keydown", (e) => {
  if (e.which == 13) {
    document.activeElement.blur();
  }
});

/* Bill Input */
$("#input-bill").focusout(() => {
  billAmount = Number($("#input-bill").val());
  $("#input-bill").val(billAmount.toFixed(2));
  calculate();
});

/* Tip Amount Feature

	Toggle clicked class when clicking different buttons or selecting custom, and
	place value of chosen input into tipAmount.
*/

for (let i = 0; i < tipInputs.length; i++) {
  $(tipInputs[i]).click(() => {
    toggleTipBtns();
    $("#custom").val("");
    $(tipInputs[i]).addClass("clicked");
    tipAmount = Number($(tipInputs[i]).attr("value"));
    calculate();
  });
}

$("#custom").focusout(() => {
  toggleTipBtns();
  tipAmount = Number($("#custom").val());
  calculate();
});

/* Number of people
	
	Check to see if the amount of people is zero. If so,
	display an error and prevent calculation. Else, add
	value to noOfPeople variable.
*/
$("#input-people")
  .focusout(() => {
    let peopleValue = Number($("#input-people").val());
    if (peopleValue === 0) {
      $("#error-msg").css("visibility", "visible");
      $("#input-people").addClass("error");
    } else {
      noOfPeople = peopleValue;
      calculate();
    }
  })
  .on("input", () => {
    $("#input-people").removeClass("error");
    $("#error-msg").css("visibility", "hidden");
  });

/* Reset Button */
$("#reset").click(() => {
  $("#input-bill").val("0.00");
  toggleTipBtns();
  $("#custom").val("");
  $("#input-people").val("1");
  tipAmount = 0;
  billAmount = 0;
  noOfPeople = 1;
  calculate();
});

/* Calcuate the tip and total amount per person */
const calculate = () => {
  let tipPerPerson = Number((billAmount * (tipAmount / 100)) / noOfPeople);
  let totalPerPerson = Number(billAmount / noOfPeople + tipPerPerson);
  displayTip.text("$" + tipPerPerson.toFixed(2));
  displayTotal.text("$" + totalPerPerson.toFixed(2));
};

/* Loop through input buttons and remove their clicked class if present */
const toggleTipBtns = () => {
  for (let i = 0; i < tipInputs.length; i++) {
    if ($(tipInputs[i]).hasClass("clicked")) {
      $(tipInputs[i]).removeClass("clicked");
    }
  }
};

/* Limit the input of bill-input to two decimal places */
const twoDecimals = (e) => {
  let t = e.value;
  e.value =
    t.indexOf(".") >= 0
      ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
      : t;
};
