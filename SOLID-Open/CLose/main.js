const amountInput = document.querySelector('#order-amount');
const shippingSelect = document.querySelector('#shipping-type');
const calcButton = document.querySelector('#calc-btn');
const resultEl = document.querySelector('#result');

function formatPrice(value) {
  return value.toFixed(2).replace('.', ',') + ' €';
}

const shippingRules = {
  standard: { minAmount: 50, cost: 4.99 },
  express: { minAmount: 100, cost: 9.99 },
  pickup: { minAmount: 30, cost: 2.99 },
};

function calculateShippingCost(type, orderAmount) {
  const rule = shippingRules[type];
  if (!rule) return 0; 

  return orderAmount >= rule.minAmount ? 0 : rule.cost;
}

calcButton.addEventListener('click', () => {
  const type = shippingSelect.value;
  const amount = Number(amountInput.value) || 0;

  const shippingCost = calculateShippingCost(type, amount);

  resultEl.textContent =
    'Frais de livraison : ' + formatPrice(shippingCost);
});
