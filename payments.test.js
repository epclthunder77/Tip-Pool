describe("Payment Form Test Suite", function() {
  
    beforeEach(function() {
      // Set up input values and reset allPayments and paymentId before each test
      billAmtInput.value = '100';
      tipAmtInput.value = '20';
      paymentId = 0;
      allPayments = {};
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
    });
  
    it("should add a valid payment on submit", function() {
      submitPaymentInfo(); // call the function directly, no need for form submission event
  
      expect(Object.keys(allPayments).length).toEqual(1); // Verify one payment was added
      expect(allPayments['payment1'].billAmt).toEqual('100');
      expect(allPayments['payment1'].tipAmt).toEqual('20');
      expect(allPayments['payment1'].tipPercent).toEqual(20); // 20% tip on $100
    });
  
    it("should not add payment with empty inputs", function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
  
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(0); // No payments should be added
    });
  
    it("should not add payment with negative bill amount", function() {
      billAmtInput.value = '-50';
      tipAmtInput.value = '5';
  
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(0); // No payments should be added
    });
  
    it("should correctly append payment to the table", function() {
      submitPaymentInfo();
  
      let curPayment = allPayments['payment1'];
      let paymentRow = document.querySelector('#paymentTable tbody tr');
  
      expect(paymentRow.children.length).toEqual(4); // Check if 3 columns were added to the row
      expect(paymentRow.children[0].innerText).toEqual('$100'); // Bill amount
      expect(paymentRow.children[1].innerText).toEqual('$20'); // Tip amount
      expect(paymentRow.children[2].innerText).toEqual('20%'); // Tip percent
      expect(paymentRow.children[3].innerText).toEqual('X') // Delete Button
    });
  
    it("should correctly update the summary", function() {
      submitPaymentInfo();
      
      updateSummary();
  
      expect(summaryTds[0].innerHTML).toEqual('$100'); // Total Bill amount
      expect(summaryTds[1].innerHTML).toEqual('$20');  // Total Tip amount
      expect(summaryTds[2].innerHTML).toEqual('20%');  // Average Tip Percent
    });
  
    it("should calculate the correct average tip percent with multiple payments", function() {
      billAmtInput.value = '200';
      tipAmtInput.value = '40';
      submitPaymentInfo(); // Submit first payment
      
      billAmtInput.value = '300';
      tipAmtInput.value = '30';
      submitPaymentInfo(); // Submit second payment
  
      updateSummary();
  
      expect(summaryTds[0].innerHTML).toEqual('$500'); // Total Bill amount ($200 + $300)
      expect(summaryTds[1].innerHTML).toEqual('$70');  // Total Tip amount ($40 + $30)
      expect(summaryTds[2].innerHTML).toEqual('15%');  // Average Tip Percent (20% from first + 10% from second / 2 = 15%)
    });
  
    afterEach(function() {
      // Clean up after each test to avoid state carryover
      billAmtInput.value = '';
      tipAmtInput.value = '';
      allPayments = {};
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
    });
  });


  describe("Delete Payment Test Suite", function() {
  
    beforeEach(function() {
      // Reset before each test
      billAmtInput.value = '100';
      tipAmtInput.value = '20';
      allPayments = {};
      paymentId = 0;
      paymentTbody.innerHTML = ''; // Clear table body before each test
    });
  
    it("should add a delete button to the payment row", function() {
      submitPaymentInfo(); // Submit a payment
  
      let paymentRow = document.querySelector('#paymentTable tbody tr');
      let deleteBtn = paymentRow.querySelector('td:last-child'); // The last td should be the delete button
  
      expect(deleteBtn.innerText).toEqual('X'); // Ensure 'X' is added as delete button
    });
  
    it("should remove the payment row from the table when delete button is clicked", function() {
      submitPaymentInfo(); // Submit a payment
  
      let paymentRow = document.querySelector('#paymentTable tbody tr');
      let deleteBtn = paymentRow.querySelector('td:last-child');
  
      deleteBtn.click(); // Simulate a click on the delete button
  
      expect(paymentTbody.contains(paymentRow)).toBe(false); // Ensure the row is removed
    });
    
  });
  