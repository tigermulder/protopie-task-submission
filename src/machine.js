import './style.css';
import drinksData from './drinks.json'
import cocaColaImage from './images/coca-cola.jpg';
import waterImage from './images/water.jpg';
import coffeeImage from './images/coffee.jpg';

window.onload = function() {

  // JSON 데이터에 이미지 추가
  drinksData[0].image = cocaColaImage;
  drinksData[1].image = waterImage;
  drinksData[2].image = coffeeImage;

  // 음료 리스트
  const drinkList = document.getElementById('drinks-list');
  // 결제선택 라디오버튼
  const paymentRadioBtn = document.querySelectorAll('input[name="payment"]');
  // 현금센셕
  const cashInput = document.getElementById('cash-input-section');
  // 카드섹션
  const cardInput = document.getElementById('card-input-section');
  // 현금인풋
  const cashDisplay = document.getElementById('cash-display');
  // 카드인풋
  const cardBalanceInput = document.getElementById('card-balance-input');
  // 구매버튼
  const buyBtn = document.getElementById('buy-button');
  // 리셋버튼
  const resetBtn = document.getElementById('reset-button');
  
  // 장바구니
  let cart = [];
  // 현금잔액
  let currentCash = 0;
  // 카드잔액
  let cardBalance = 0;

  // 음료 목록 생성
  drinksData.forEach((item, index) => {
    const drinkElement = document.createElement('div');
    drinkElement.classList.add('drink');

    // 재고 text변수
    let stockStatusText = '';
    // 재고 state
    if (item.stock > 0) {
      drinkElement.classList.add('available'); // 재고가 있을때
      stockStatusText = '구매 가능';
    } else {
      drinkElement.classList.add('out-of-stock'); // 재고가 없을때
      stockStatusText = '품절';
    }
 
    drinkElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <div>가격: ${item.price}원</div>
      <div>재고: <span id="stock-${index}">${item.stock}개</span></div>
      <div><span class="stock-status">${stockStatusText}</span></div>
      <button class="select-drink-button" data-index="${index}" disabled>선택</button>
    `;
    drinkList.appendChild(drinkElement);
  });

  // 결제 방법 변경 시 처리
  paymentRadioBtn.forEach(radio => {
    radio.addEventListener('change', function() {
      const selectPayment = this.value;

      if (selectPayment === 'cash') {
        if (cardBalanceInput.value && parseInt(cardBalanceInput.value, 10) > 0) {
          alert('카드 금액이 입력되어 있습니다.');
          paymentRadioBtn[1].checked = true; // 카드로 다시 체크
        } else {
          cashInput.style.display = 'block';
          cardInput.style.display = 'none';
        }
      } else if (selectPayment === 'card') {
        if (currentCash > 0) {
          alert('현금이 입력되어 있습니다.');
          paymentRadioBtn[0].checked = true; // 현금으로 다시 체크
        } else {
          cashInput.style.display = 'none';
          cardInput.style.display = 'block';
        }
      }

      updateDrinkButtonsState();
    });
  });

  // 현금 추가 버튼 클릭 처리
  document.querySelectorAll('.cash-btn').forEach(button => {
    button.addEventListener('click', function() {
      const amount = parseInt(this.getAttribute('data-value'), 10);
      currentCash += amount;
      updateCashDisplay();
      updateDrinkButtonsState();
    });
  });

  // 카드 잔액 입력 시 처리
  cardBalanceInput.addEventListener('input', function() {
    cardBalance = parseInt(cardBalanceInput.value, 10) || 0;
    updateDrinkButtonsState();
  });

  // 현금 표시 업데이트
  function updateCashDisplay() {
    cashDisplay.textContent = `투입된현금: ${currentCash.toLocaleString()}원`;
  }

  function getSelectedPaymentAmount() {
    const selectPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectPayment) {
      return 0; // 결제 수단이 선택되지 않았을 때 0을 반환
    }
    
    if (selectPayment.value === 'cash') {
      return currentCash;
    } else if (selectPayment.value === 'card') {
      return parseInt(cardBalanceInput.value, 10) || 0;
    }
    return 0;
  }

  function updateDrinkButtonsState() {
    const paymentAmount = getSelectedPaymentAmount();
    const totalCartPrice = cart.reduce((total, drink) => total + drink.price, 0);

    document.querySelectorAll('.select-drink-button').forEach((button, index) => {
      const drink = drinksData[index];
      if (paymentAmount >= totalCartPrice + drink.price && drink.stock > 0) {
        button.disabled = false; // 충분한 금액이 있고 재고가 있으면 활성화
      } else {
        button.disabled = true; // 금액이 부족하거나 재고가 없으면 비활성화
      }
    });
  }

  // 음료 선택 시 장바구니에 추가
  document.querySelectorAll('.select-drink-button').forEach(button => {

    button.addEventListener('click', function() {
      const selectPayment = document.querySelector('input[name="payment"]:checked');

      if (!selectPayment) {
        alert('결제 수단부터 선택해주세요.');
        return;
      }

      const drinkIndex = this.getAttribute('data-index');
      const drink = drinksData[drinkIndex];

      // 현재 장바구니 총액
      const totalCartPrice = cart.reduce((acc, item) => acc + item.price, 0);

      // 총액이 현재 선택된 결제 수단의 금액을 초과하지 않게 제한
      if (totalCartPrice + drink.price <= getSelectedPaymentAmount()) {
        if (drink.stock > 0) {
          cart.push(drink);
          drink.stock--;
          updateCart();
          updateDrinkButtonsState();
        }
      } else {
        alert('입력된 금액을 초과할 수 없습니다.');
      }
    });
  });

  function updateCart() {
    const cartItemContainer = document.getElementById('cart-items');
    
    // 장바구니 내용 비우기
    cartItemContainer.innerHTML = '';

    let total = 0; // 총액을 저장할 변수

    // 장바구니에 담긴 각 제품을 처리
    cart.forEach((item) => {
      // 이미 해당 제품이 장바구니에 있는지 확인
      const existingItem = cartItemContainer.querySelector(`.cart-item[data-name="${item.name}"]`);

      if (existingItem) {
        // 이미 있는 경우 수량 증가
        const qtyElem = existingItem.querySelector('.item-qty');
        const currentQty = parseInt(qtyElem.textContent, 10);
        qtyElem.textContent = `${currentQty + 1} 개`;

        // 총액을 업데이트
        total += item.price;
      } else {
        // 제품을 장바구니에 추가
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-name', item.name);
        cartItem.innerHTML = `
          <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">(${item.price}원)</span>
          </div>
          <div class="item-controls">
            <span class="item-qty">1 개</span>
            <button class="decrease-qty-button" data-name="${item.name}">-</button>
          </div>
        `;
        cartItemContainer.appendChild(cartItem);

        // 총액에 추가된 제품의 가격을 반영합니다
        total += item.price;
      }
    });

    // 만약 장바구니가 비어 있으면 "장바구니가 비어 있습니다" 문구를 표시
    if (cart.length === 0) {
      cartItemContainer.innerHTML = '<p>장바구니가 비어 있습니다.</p>';
    }

    // 총액을 UI에 업데이트합니다
    const totalElement = document.getElementById('total-price');
    totalElement.textContent = `총액: ${total.toLocaleString()}원`;

    // 수량 감소 버튼에 이벤트 리스너 추가
    document.querySelectorAll('.decrease-qty-button').forEach(button => {
      button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        decreaseItemQuantity(itemName);
      });
    });

    // 구매 버튼 상태 업데이트
    updateBuyButtonState();
  }

  function decreaseItemQuantity(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex >= 0) {
      const item = cart[itemIndex];
      
      // 장바구니에서 해당 제품의 첫 번째 인덱스 찾기
      const current = cart.filter(cartItem => cartItem.name === itemName).length;
      if (current > 1) {
        // 같은 제품이 여러 개 있을 경우 하나 제거
        cart.splice(itemIndex, 1);
        item.stock++;
      } else {
        // 제품 수량이 1개일 경우 전체 제거
        cart.splice(itemIndex, 1);
        item.stock++;
      }

      updateCart();
      updateDrinkButtonsState();
      updateBuyButtonState();
    }
  }

  function updateBuyButtonState() {
    const paymentAmount = getSelectedPaymentAmount();
    const totalCartPrice = cart.reduce((total, drink) => total + drink.price, 0);

    if (totalCartPrice > 0 && paymentAmount >= totalCartPrice) {
      buyBtn.disabled = false;
    } else {
      buyBtn.disabled = true;
    }
  }

  // 구매 버튼 클릭 시 처리
  buyBtn.addEventListener('click', () => {
    const paymentAmount = getSelectedPaymentAmount();
    const totalCartPrice = cart.reduce((total, drink) => total + drink.price, 0);

    if (paymentAmount >= totalCartPrice) {
      let change = 0;

      if (document.querySelector('input[name="payment"]:checked').value === 'cash') {
        currentCash -= totalCartPrice; // 사용한 현금을 차감
        change = currentCash; // 잔돈 계산
        currentCash = 0; // 잔돈을 반환하므로 현금을 0으로 설정
        cashDisplay.textContent = `남은 현금: 0원`;
        alert(`구매 성공! 거스름돈: ${change.toLocaleString()}원`);
      } else {
        cardBalance -= totalCartPrice; // 사용한 카드 금액 차감
        cardBalanceInput.value = cardBalance; // 카드 잔액 UI 업데이트
        alert('구매 성공!');
      }

      // 장바구니에 있는 음료들의 재고 업데이트
      cart.forEach(item => {
        const drink = drinksData.find(d => d.name === item.name);
        if (drink) {
          const stockSpan = document.getElementById(`stock-${drinksData.indexOf(drink)}`);
          stockSpan.textContent = `${drink.stock}개`;
        }
      });

      cart = []; // 장바구니 초기화
      updateCart();
      updateCashDisplay();
      updateBuyButtonState();
    } else {
      alert('금액이 부족합니다.');
    }
  });



  resetBtn.addEventListener('click', () => {
    if (cart.length > 0) { // 장바구니에 물건이 있을 때만 경고 메시지를 띄움
        const confirmReset = confirm('초기화를 누르면 장바구니에 있는 것도 초기화됩니다. 계속하시겠습니까?');
        if (!confirmReset) {
          return; // 사용자가 취소를 누르면 초기화를 중단
        }
    }

    // 초기화
    currentCash = 0;
    cardBalance = 0;
    cardBalanceInput.value = '';
    cashDisplay.textContent = `투입된현금: 0원`;

    // 현금 라디오 버튼을 체크 상태로 설정, 카드 입력 섹션을 숨김
    paymentRadioBtn.forEach(radio => {
      if (radio.value === 'cash') {
        radio.checked = true;
        cashInput.style.display = 'block';
        cardInput.style.display = 'none';
      } else {
        radio.checked = false;
      }
    });

    // 장바구니 초기화
    cart = [];
    updateCart();
    updateDrinkButtonsState();
    updateBuyButtonState();
  });
};
