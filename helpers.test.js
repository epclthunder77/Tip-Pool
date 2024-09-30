


// function sumPaymentTotal(type) {
//     let total = 0;
  
//     for (let key in allPayments) {
//       let payment = allPayments[key];
  
//       total += Number(payment[type]);
//     }
  
//     return total;
//   }

// converts the bill and tip amount into a tip percent



// function calculateTipPercent(billAmt, tipAmt) {
//     return Math.round(100 / (billAmt / tipAmt));
//   }
  
//   // expects a table row element, appends a newly created td element from the value
//   function appendTd(tr, value) {
//     let newTd = document.createElement('td');
//     newTd.innerText = value;
  
//     tr.append(newTd);
//   }
  

/// ABOVE SHOULD BE TESTED//////

describe("Test helpers' functionality", function() {
  
    // Test for calculating tip percentage
    it("should correctly calculate the tip percentage", function() {
      let tipPercent = calculateTipPercent(10000, 500); // billAmt: 10000, tipAmt: 500
      expect(tipPercent).toEqual(5); // 500 is 5% of 10000
    });
  
    // Test for summing payments (for a specific type)
    it("should correctly return a sum of all payment types", function() {
      allPayments = {
        payment1: { billAmt: 10000, tipAmt: 500 },
        payment2: { billAmt: 20000, tipAmt: 1000 },
      };
  
      let totalTip = sumPaymentTotal('tipAmt'); // Summing up 'tipAmt' from all payments
      expect(totalTip).toEqual(1500); // 500 + 1000 = 1500
  
      let totalBill = sumPaymentTotal('billAmt'); // Summing up 'billAmt'
      expect(totalBill).toEqual(30000); // 10000 + 20000 = 30000
    });
  
  });
  describe("Delete Button Test Suite", function() {
  
    let testTr;
  
    beforeEach(function() {
      // Create a sample row for testing
      testTr = document.createElement('tr');
      appendDeleteBtn(testTr);
      document.body.append(testTr); // Append the row to the DOM for testing
    });
  
    afterEach(function() {
      // Clean up after each test
      testTr.remove();
    });
  
    it("should append a delete button ('X') to the row", function() {
      expect(testTr.children.length).toEqual(1); // One 'td' element should be appended
      expect(testTr.children[0].innerText).toEqual('X'); // The content of the 'td' should be 'X'
    });
  
    it("should remove the row from the DOM when 'X' is clicked", function() {
      let deleteBtn = testTr.querySelector('td');
      
      // Simulate a click event
      deleteBtn.click();
  
      // After clicking the 'X', the row should be removed
      expect(document.body.contains(testTr)).toBe(false);
    });
  
  });
  