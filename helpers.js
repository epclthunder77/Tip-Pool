
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);


}

function appendDeleteBtn(tr) {
  let newTd = document.createElement('td');
  newTd.innerText = 'X'; // Set the value as 'X' for the delete button

  // Attach event listener for deleting the row on 'click'
  newTd.addEventListener('click', function() {
    tr.remove(); // Remove the entire row (tr) from the DOM
  });

  tr.append(newTd); // Append the 'td' to the table row
}
