const billAmountInput = document.querySelector('#bill-amount');
const customTipInput = document.querySelector('.custom-tip');
const numberOfPeopleInput = document.querySelector('.number-of-people');
const generateBillBtn = document.querySelector('.generate-bill-btn');
const tipAmountOutput = document.querySelector('.tip-amount span');
const taxAmountOutput = document.querySelector('.tax-amount span');
const totalBillOutput = document.querySelector('.total span');
const eachPersonBillOutput = document.querySelector('.each-person-bill span');
const tipsContainer = document.querySelector('.tip-container');
const resetBtn = document.querySelector('.reset-btn');
const taxInput = document.querySelector('#tax-percentage');
const roundAmountsCheckbox = document.querySelector('#round-amounts');
const currencySelect = document.querySelector('#currency');

let tipPercentage = 0;
let currencySymbol = '₹';

// Update currency symbol when the user changes currency
currencySelect.addEventListener('change', () => {
  switch (currencySelect.value) {
    case 'USD':
      currencySymbol = '$';
      break;
    case 'EUR':
      currencySymbol = '€';
      break;
    default:
      currencySymbol = '₹';
  }
  updateCurrencySymbol();
});

// Generate the bill when the "Generate Bill" button is clicked
generateBillBtn.addEventListener('click', () => {
  const billAmount = parseFloat(billAmountInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);
  const taxPercentage = parseFloat(taxInput.value) || 0;
  
  if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0 || billAmount <= 0) {
    alert("Please enter valid values for bill amount and number of people.");
    return;
  }

  const taxAmount = billAmount * (taxPercentage / 100);
  const tipAmount = billAmount * (tipPercentage / 100);
  let totalBill = billAmount + tipAmount + taxAmount;
  let eachPersonBill = totalBill / numberOfPeople;

  // Handle rounding
  if (roundAmountsCheckbox.checked) {
    totalBill = Math.round(totalBill);
    eachPersonBill = Math.round(eachPersonBill);
  }

  tipAmountOutput.innerText = `${currencySymbol}${tipAmount.toFixed(2)}`;
  taxAmountOutput.innerText = `${currencySymbol}${taxAmount.toFixed(2)}`;
  totalBillOutput.innerText = `${currencySymbol}${totalBill.toFixed(2)}`;
  eachPersonBillOutput.innerText = `${currencySymbol}${eachPersonBill.toFixed(2)}`;

  resetBtn.disabled = false;
});

// Handle tip percentage selection from the preset buttons
tipsContainer.addEventListener('click', (e) => {
  if (tipsContainer.classList.contains('disabled')) return;

  if (e.target !== tipsContainer) {
    [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'));
    e.target.classList.add('selected');
    tipPercentage = parseInt(e.target.innerText);
    customTipInput.value = '';

    if (numberOfPeopleInput.value && tipPercentage) {
      generateBillBtn.disabled = false;
    } else {
      generateBillBtn.disabled = true;
    }
  }
});

// Handle custom tip input and disable preset tip buttons
customTipInput.addEventListener('input', () => {
  tipPercentage = parseInt(customTipInput.value);
  [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'));

  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

// Reset all inputs and outputs when the "Reset" button is clicked
resetBtn.addEventListener('click', () => {
  tipPercentage = 0;
  billAmountInput.value = '';
  customTipInput.value = '';
  numberOfPeopleInput.value = '';
  taxInput.value = '';
  tipAmountOutput.innerText = '';
  taxAmountOutput.innerText = '';
  totalBillOutput.innerText = '';
  eachPersonBillOutput.innerText = '';
  [...tipsContainer.children].forEach((tip) => tip.classList.remove('selected'));

  resetBtn.disabled = true;
  generateBillBtn.disabled = true;
  disableTipAndPeopleInput();
});

// Enable the inputs for tip and people once a bill amount is entered
billAmountInput.addEventListener('input', () => {
  if (billAmountInput.value) {
    enableTipAndPeopleInput();
  } else {
    disableTipAndPeopleInput();
  }
});

// Handle number of people input and enable the "Generate Bill" button when valid
numberOfPeopleInput.addEventListener('input', () => {
  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

// Enable tip and people input fields
function enableTipAndPeopleInput() {
  customTipInput.disabled = false;
  numberOfPeopleInput.disabled = false;
  tipsContainer.classList.remove('disabled');
}

// Disable tip and people input fields
function disableTipAndPeopleInput() {
  customTipInput.disabled = true;
  numberOfPeopleInput.disabled = true;
  tipsContainer.classList.add('disabled');
}

// Update the displayed currency symbol in outputs
function updateCurrencySymbol() {
  tipAmountOutput.innerText = `${currencySymbol}0.00`;
  taxAmountOutput.innerText = `${currencySymbol}0.00`;
  totalBillOutput.innerText = `${currencySymbol}0.00`;
  eachPersonBillOutput.innerText = `${currencySymbol}0.00`;
}
