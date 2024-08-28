/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/machine.js":
/*!************************!*\
  !*** ./src/machine.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _drinks_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drinks.json */ \"./src/drinks.json\");\n/* harmony import */ var _images_coca_cola_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/coca-cola.jpg */ \"./src/images/coca-cola.jpg\");\n/* harmony import */ var _images_water_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/water.jpg */ \"./src/images/water.jpg\");\n/* harmony import */ var _images_coffee_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/coffee.jpg */ \"./src/images/coffee.jpg\");\n\n\n\n\n\nwindow.onload = function () {\n  // JSON 데이터에 이미지 추가\n  _drinks_json__WEBPACK_IMPORTED_MODULE_1__[0].image = _images_coca_cola_jpg__WEBPACK_IMPORTED_MODULE_2__;\n  _drinks_json__WEBPACK_IMPORTED_MODULE_1__[1].image = _images_water_jpg__WEBPACK_IMPORTED_MODULE_3__;\n  _drinks_json__WEBPACK_IMPORTED_MODULE_1__[2].image = _images_coffee_jpg__WEBPACK_IMPORTED_MODULE_4__;\n\n  // 음료 리스트\n  var drinkList = document.getElementById('drinks-list');\n  // 결제선택 라디오버튼\n  var paymentRadioBtn = document.querySelectorAll('input[name=\"payment\"]');\n  // 현금센셕\n  var cashInput = document.getElementById('cash-input-section');\n  // 카드섹션\n  var cardInput = document.getElementById('card-input-section');\n  // 현금인풋\n  var cashDisplay = document.getElementById('cash-display');\n  // 카드인풋\n  var cardBalanceInput = document.getElementById('card-balance-input');\n  // 구매버튼\n  var buyBtn = document.getElementById('buy-button');\n  // 리셋버튼\n  var resetBtn = document.getElementById('reset-button');\n\n  // 장바구니\n  var cart = [];\n  // 현금잔액\n  var currentCash = 0;\n  // 카드잔액\n  var cardBalance = 0;\n\n  // 음료 목록 생성\n  _drinks_json__WEBPACK_IMPORTED_MODULE_1__.forEach(function (item, index) {\n    var drinkElement = document.createElement('div');\n    drinkElement.classList.add('drink');\n\n    // 재고 text변수\n    var stockStatusText = '';\n    // 재고 state\n    if (item.stock > 0) {\n      drinkElement.classList.add('available'); // 재고가 있을때\n      stockStatusText = '구매 가능';\n    } else {\n      drinkElement.classList.add('out-of-stock'); // 재고가 없을때\n      stockStatusText = '품절';\n    }\n    drinkElement.innerHTML = \"\\n      <img src=\\\"\".concat(item.image, \"\\\" alt=\\\"\").concat(item.name, \"\\\">\\n      <h3>\").concat(item.name, \"</h3>\\n      <div>\\uAC00\\uACA9: \").concat(item.price, \"\\uC6D0</div>\\n      <div>\\uC7AC\\uACE0: <span id=\\\"stock-\").concat(index, \"\\\">\").concat(item.stock, \"\\uAC1C</span></div>\\n      <div><span class=\\\"stock-status\\\">\").concat(stockStatusText, \"</span></div>\\n      <button class=\\\"select-drink-button\\\" data-index=\\\"\").concat(index, \"\\\" disabled>\\uC120\\uD0DD</button>\\n    \");\n    drinkList.appendChild(drinkElement);\n  });\n\n  // 결제 방법 변경 시 처리\n  paymentRadioBtn.forEach(function (radio) {\n    radio.addEventListener('change', function () {\n      var selectPayment = this.value;\n      if (selectPayment === 'cash') {\n        if (cardBalanceInput.value && parseInt(cardBalanceInput.value, 10) > 0) {\n          alert('카드 금액이 입력되어 있습니다.');\n          paymentRadioBtn[1].checked = true; // 카드로 다시 체크\n        } else {\n          cashInput.style.display = 'block';\n          cardInput.style.display = 'none';\n        }\n      } else if (selectPayment === 'card') {\n        if (currentCash > 0) {\n          alert('현금이 입력되어 있습니다.');\n          paymentRadioBtn[0].checked = true; // 현금으로 다시 체크\n        } else {\n          cashInput.style.display = 'none';\n          cardInput.style.display = 'block';\n        }\n      }\n      updateDrinkButtonsState();\n    });\n  });\n\n  // 현금 추가 버튼 클릭 처리\n  document.querySelectorAll('.cash-btn').forEach(function (button) {\n    button.addEventListener('click', function () {\n      var amount = parseInt(this.getAttribute('data-value'), 10);\n      currentCash += amount;\n      updateCashDisplay();\n      updateDrinkButtonsState();\n    });\n  });\n\n  // 카드 잔액 입력 시 처리\n  cardBalanceInput.addEventListener('input', function () {\n    cardBalance = parseInt(cardBalanceInput.value, 10) || 0;\n    updateDrinkButtonsState();\n  });\n\n  // 현금 표시 업데이트\n  function updateCashDisplay() {\n    cashDisplay.textContent = \"\\uD22C\\uC785\\uB41C\\uD604\\uAE08: \".concat(currentCash.toLocaleString(), \"\\uC6D0\");\n  }\n  function getSelectedPaymentAmount() {\n    var selectPayment = document.querySelector('input[name=\"payment\"]:checked');\n    if (!selectPayment) {\n      return 0; // 결제 수단이 선택되지 않았을 때 0을 반환\n    }\n    if (selectPayment.value === 'cash') {\n      return currentCash;\n    } else if (selectPayment.value === 'card') {\n      return parseInt(cardBalanceInput.value, 10) || 0;\n    }\n    return 0;\n  }\n  function updateDrinkButtonsState() {\n    var paymentAmount = getSelectedPaymentAmount();\n    var totalCartPrice = cart.reduce(function (total, drink) {\n      return total + drink.price;\n    }, 0);\n    document.querySelectorAll('.select-drink-button').forEach(function (button, index) {\n      var drink = _drinks_json__WEBPACK_IMPORTED_MODULE_1__[index];\n      if (paymentAmount >= totalCartPrice + drink.price && drink.stock > 0) {\n        button.disabled = false; // 충분한 금액이 있고 재고가 있으면 활성화\n      } else {\n        button.disabled = true; // 금액이 부족하거나 재고가 없으면 비활성화\n      }\n    });\n  }\n\n  // 음료 선택 시 장바구니에 추가\n  document.querySelectorAll('.select-drink-button').forEach(function (button) {\n    button.addEventListener('click', function () {\n      var selectPayment = document.querySelector('input[name=\"payment\"]:checked');\n      if (!selectPayment) {\n        alert('결제 수단부터 선택해주세요.');\n        return;\n      }\n      var drinkIndex = this.getAttribute('data-index');\n      var drink = _drinks_json__WEBPACK_IMPORTED_MODULE_1__[drinkIndex];\n\n      // 현재 장바구니 총액\n      var totalCartPrice = cart.reduce(function (acc, item) {\n        return acc + item.price;\n      }, 0);\n\n      // 총액이 현재 선택된 결제 수단의 금액을 초과하지 않게 제한\n      if (totalCartPrice + drink.price <= getSelectedPaymentAmount()) {\n        if (drink.stock > 0) {\n          cart.push(drink);\n          drink.stock--;\n          updateCart();\n          updateDrinkButtonsState();\n        }\n      } else {\n        alert('입력된 금액을 초과할 수 없습니다.');\n      }\n    });\n  });\n  function updateCart() {\n    var cartItemContainer = document.getElementById('cart-items');\n\n    // 장바구니 내용 비우기\n    cartItemContainer.innerHTML = '';\n    var total = 0; // 총액을 저장할 변수\n\n    // 장바구니에 담긴 각 제품을 처리\n    cart.forEach(function (item) {\n      // 이미 해당 제품이 장바구니에 있는지 확인\n      var existingItem = cartItemContainer.querySelector(\".cart-item[data-name=\\\"\".concat(item.name, \"\\\"]\"));\n      if (existingItem) {\n        // 이미 있는 경우 수량 증가\n        var qtyElem = existingItem.querySelector('.item-qty');\n        var currentQty = parseInt(qtyElem.textContent, 10);\n        qtyElem.textContent = \"\".concat(currentQty + 1, \" \\uAC1C\");\n\n        // 총액을 업데이트\n        total += item.price;\n      } else {\n        // 제품을 장바구니에 추가\n        var cartItem = document.createElement('div');\n        cartItem.classList.add('cart-item');\n        cartItem.setAttribute('data-name', item.name);\n        cartItem.innerHTML = \"\\n          <div class=\\\"item-details\\\">\\n            <span class=\\\"item-name\\\">\".concat(item.name, \"</span>\\n            <span class=\\\"item-price\\\">(\").concat(item.price, \"\\uC6D0)</span>\\n          </div>\\n          <div class=\\\"item-controls\\\">\\n            <span class=\\\"item-qty\\\">1 \\uAC1C</span>\\n            <button class=\\\"decrease-qty-button\\\" data-name=\\\"\").concat(item.name, \"\\\">-</button>\\n          </div>\\n        \");\n        cartItemContainer.appendChild(cartItem);\n\n        // 총액에 추가된 제품의 가격을 반영합니다\n        total += item.price;\n      }\n    });\n\n    // 만약 장바구니가 비어 있으면 \"장바구니가 비어 있습니다\" 문구를 표시\n    if (cart.length === 0) {\n      cartItemContainer.innerHTML = '<p>장바구니가 비어 있습니다.</p>';\n    }\n\n    // 총액을 UI에 업데이트합니다\n    var totalElement = document.getElementById('total-price');\n    totalElement.textContent = \"\\uCD1D\\uC561: \".concat(total.toLocaleString(), \"\\uC6D0\");\n\n    // 수량 감소 버튼에 이벤트 리스너 추가\n    document.querySelectorAll('.decrease-qty-button').forEach(function (button) {\n      button.addEventListener('click', function () {\n        var itemName = this.getAttribute('data-name');\n        decreaseItemQuantity(itemName);\n      });\n    });\n\n    // 구매 버튼 상태 업데이트\n    updateBuyButtonState();\n  }\n  function decreaseItemQuantity(itemName) {\n    var itemIndex = cart.findIndex(function (item) {\n      return item.name === itemName;\n    });\n    if (itemIndex >= 0) {\n      var item = cart[itemIndex];\n\n      // 장바구니에서 해당 제품의 첫 번째 인덱스 찾기\n      var current = cart.filter(function (cartItem) {\n        return cartItem.name === itemName;\n      }).length;\n      if (current > 1) {\n        // 같은 제품이 여러 개 있을 경우 하나 제거\n        cart.splice(itemIndex, 1);\n        item.stock++;\n      } else {\n        // 제품 수량이 1개일 경우 전체 제거\n        cart.splice(itemIndex, 1);\n        item.stock++;\n      }\n      updateCart();\n      updateDrinkButtonsState();\n      updateBuyButtonState();\n    }\n  }\n  function updateBuyButtonState() {\n    var paymentAmount = getSelectedPaymentAmount();\n    var totalCartPrice = cart.reduce(function (total, drink) {\n      return total + drink.price;\n    }, 0);\n    if (totalCartPrice > 0 && paymentAmount >= totalCartPrice) {\n      buyBtn.disabled = false;\n    } else {\n      buyBtn.disabled = true;\n    }\n  }\n\n  // 구매 버튼 클릭 시 처리\n  buyBtn.addEventListener('click', function () {\n    var paymentAmount = getSelectedPaymentAmount();\n    var totalCartPrice = cart.reduce(function (total, drink) {\n      return total + drink.price;\n    }, 0);\n    if (paymentAmount >= totalCartPrice) {\n      var change = 0;\n      if (document.querySelector('input[name=\"payment\"]:checked').value === 'cash') {\n        currentCash -= totalCartPrice; // 사용한 현금을 차감\n        change = currentCash; // 잔돈 계산\n        currentCash = 0; // 잔돈을 반환하므로 현금을 0으로 설정\n        cashDisplay.textContent = \"\\uB0A8\\uC740 \\uD604\\uAE08: 0\\uC6D0\";\n        alert(\"\\uAD6C\\uB9E4 \\uC131\\uACF5! \\uAC70\\uC2A4\\uB984\\uB3C8: \".concat(change.toLocaleString(), \"\\uC6D0\"));\n      } else {\n        cardBalance -= totalCartPrice; // 사용한 카드 금액 차감\n        cardBalanceInput.value = cardBalance; // 카드 잔액 UI 업데이트\n        alert('구매 성공!');\n      }\n\n      // 장바구니에 있는 음료들의 재고 업데이트\n      cart.forEach(function (item) {\n        var drink = _drinks_json__WEBPACK_IMPORTED_MODULE_1__.find(function (d) {\n          return d.name === item.name;\n        });\n        if (drink) {\n          var stockSpan = document.getElementById(\"stock-\".concat(_drinks_json__WEBPACK_IMPORTED_MODULE_1__.indexOf(drink)));\n          stockSpan.textContent = \"\".concat(drink.stock, \"\\uAC1C\");\n        }\n      });\n      cart = []; // 장바구니 초기화\n      updateCart();\n      updateCashDisplay();\n      updateBuyButtonState();\n    } else {\n      alert('금액이 부족합니다.');\n    }\n  });\n  resetBtn.addEventListener('click', function () {\n    if (cart.length > 0) {\n      // 장바구니에 물건이 있을 때만 경고 메시지를 띄움\n      var confirmReset = confirm('초기화를 누르면 장바구니에 있는 것도 초기화됩니다. 계속하시겠습니까?');\n      if (!confirmReset) {\n        return; // 사용자가 취소를 누르면 초기화를 중단\n      }\n    }\n\n    // 초기화\n    currentCash = 0;\n    cardBalance = 0;\n    cardBalanceInput.value = '';\n    cashDisplay.textContent = \"\\uD22C\\uC785\\uB41C\\uD604\\uAE08: 0\\uC6D0\";\n\n    // 현금 라디오 버튼을 체크 상태로 설정, 카드 입력 섹션을 숨김\n    paymentRadioBtn.forEach(function (radio) {\n      if (radio.value === 'cash') {\n        radio.checked = true;\n        cashInput.style.display = 'block';\n        cardInput.style.display = 'none';\n      } else {\n        radio.checked = false;\n      }\n    });\n\n    // 장바구니 초기화\n    cart = [];\n    updateCart();\n    updateDrinkButtonsState();\n    updateBuyButtonState();\n  });\n};\n\n//# sourceURL=webpack://protopie/./src/machine.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* 기본 스타일 */\nbody {\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  font-family: Arial, sans-serif;\n  background-color: #f4f4f4;\n  box-sizing: border-box;\n}\n\n#pdf-container {\n  text-align: center;\n  margin-bottom: 30px;\n}\n\n#pdf-container a {\n  text-decoration: none;\n  background-color: red;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 5px;\n  font-size: 1rem;\n}\n\n#vending-machine {\n  max-width: 900px;\n  width: 100%;\n  padding: 20px;\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  box-sizing: border-box;\n}\n\n/* 제목 */\n#vending-machine h1 {\n  margin-bottom: 20px;\n  font-size: 1.5rem;\n  text-align: center;\n}\n\n/* 음료 목록 */\n#drinks-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n\n#drinks-list h3 {\n  margin: 10px 0;\n}\n\n#drinks-list button {\n  width: 100%;\n}\n\n.drink {\n  flex: 1 1 calc(33.333% - 15px); /* 3열 레이아웃 */\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 15px;\n  gap: 8px;\n  background-color: #fafafa;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  box-sizing: border-box;\n  transition: background-color 0.3s ease;\n}\n\n.drink img {\n  width: 100%;\n  height: 300px;\n  border-radius: 4px;\n  object-fit: fill;\n}\n\n/* 재고가 있을 때 */\n.drink.available .stock-status{\n  color: #28a745;\n}\n\n/* 재고가 없을 때 */\n.drink.out-of-stock .stock-status{\n  color: #dc3545;\n}\n\n/* 재고 상태 텍스트 스타일 */\n.stock-status {\n  font-weight: bold;\n  margin-left: 5px;\n}\n\n/* 선택 버튼 */\n.select-drink-button {\n  padding: 8px 40px;\n  font-size: 1rem;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.select-drink-button:hover {\n  background-color: #0056b3;\n}\n\n/* 비활성화된 선택 버튼 */\n.select-drink-button:disabled {\n  background-color: #cccccc;\n  cursor: not-allowed;\n}\n\n/* 결제 방법 선택 */\n#payment {\n  display: flex;\n  justify-content: space-between;\n  gap: 15px;\n  margin-bottom: 20px;\n}\n\n.payment-option {\n  flex: 1;\n  padding: 10px 0;\n  font-size: 1rem;\n  border-radius: 4px;\n  text-align: center;\n  background-color: #cccccc;\n  color: #fff;\n  cursor: pointer;\n}\n\n/* 라디오 버튼 숨기기 */\n#payment input[type=\"radio\"] {\n  display: none;\n}\n\n/* 선택된 옵션 배경색 추가 */\n#payment input[type=\"radio\"]:checked + .payment-option {\n  background-color: #007bff;\n  color: white;\n}\n\n/* 카드 잔액 입력 섹션 */\n#card-input-section,\n#cash-input-section {\n  margin-bottom: 20px;\n}\n\n#card-input-section input,\n#cash-input-section input {\n  width: 100%;\n  padding: 10px;\n  font-size: 1rem;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  box-sizing: border-box;\n}\n\n/* 동전 스타일 */\n.cash-btn[data-value=\"100\"],\n.cash-btn[data-value=\"500\"] {\n  width: 80px;\n  height: 80px;\n  margin: 5px;\n  border-radius: 50%;\n  background-color: #f0c040;\n  color: white;\n  font-size: 1.2rem;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s ease, transform 0.2s ease;\n}\n\n.cash-btn[data-value=\"100\"]:hover,\n.cash-btn[data-value=\"500\"]:hover {\n  background-color: #d0a030;\n  transform: scale(1.1);\n}\n\n/* 지폐 스타일 */\n.cash-btn[data-value=\"1000\"],\n.cash-btn[data-value=\"5000\"],\n.cash-btn[data-value=\"10000\"] {\n  width: 150px;\n  height: 60px;\n  margin: 5px;\n  border-radius: 10px;\n  background-color: #228B22;\n  color: white;\n  font-size: 1.2rem;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.3s ease, transform 0.2s ease;\n}\n\n.cash-btn[data-value=\"1000\"]:hover,\n.cash-btn[data-value=\"5000\"]:hover,\n.cash-btn[data-value=\"10000\"]:hover {\n  background-color: #1e7a1e;\n  transform: scale(1.05);\n}\n\n/* 현금 표시 영역 */\n#cash-display {\n  margin-top: 10px;\n  font-size: 1.2rem;\n}\n\n/* 장바구니 */\n#cart-list {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 10px;\n  margin: 15px 0;\n  background-color: #fafafa;\n}\n\n#cart-items {\n  margin-bottom: 10px;\n}\n\n#total-price-container {\n  border-top: 1px solid #ddd;\n  padding-top: 10px;\n  text-align: right;\n}\n\n#cart-list .cart-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n\n#cart-list .item-details {\n  display: flex;\n  gap: 5px;\n  flex: 1;\n}\n\n#cart-list .item-controls {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n#cart-list .item-name {\n  flex: 1;\n}\n\n#cart-list .item-qty {\n  min-width: 50px;\n  text-align: right;\n}\n\n\n#total-price {\n  margin-bottom: 10px;\n}\n\n#reset-button {\n  width: 100%;\n  padding: 15px;\n  font-size: 1rem;\n  border-radius: 4px;\n  border: none;\n  cursor: pointer;\n  background-color: #333;\n  color: #fff;\n}\n\n/* 구매 버튼 */\n#buy-button {\n  width: 100%;\n  padding: 15px;\n  margin-bottom: 10px;\n  font-size: 1rem;\n  background-color: #28a745;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n#buy-button:hover {\n  background-color: #218838;\n}\n\n#buy-button:disabled {\n  background-color: #cccccc;\n  cursor: not-allowed;\n}\n\n/* 반응형 */\n@media (max-width: 768px) {\n  #vending-machine {\n    padding: 15px;\n  }\n\n  #vending-machine h1 {\n    font-size: 1.25rem;\n  }\n\n  .drink {\n    flex: 1 1 calc(50% - 15px); /* 2열 레이아웃 */\n  }\n\n  .select-drink-button {\n    font-size: 0.9rem;\n  }\n\n  #cart-list {\n    padding: 10px;\n  }\n\n  #buy-button {\n    font-size: 0.9rem;\n    padding: 12px;\n  }\n}\n\n@media (max-width: 480px) {\n  #vending-machine {\n    padding: 10px;\n  }\n\n  #vending-machine h1 {\n    font-size: 1rem;\n  }\n\n  .drink {\n    flex: 1 1 100%; /* 1열 레이아웃 */\n  }\n\n  .drink img {\n    height: 300px;\n    width: auto;\n  }\n\n  #payment-method {\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .select-drink-button {\n    font-size: 0.8rem;\n  }\n\n  #cart-list {\n    padding: 8px;\n  }\n\n  #buy-button {\n    font-size: 0.8rem;\n    padding: 10px;\n  }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://protopie/./src/style.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://protopie/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://protopie/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://protopie/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://protopie/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/images/coca-cola.jpg":
/*!**********************************!*\
  !*** ./src/images/coca-cola.jpg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"ea2e0289f480c820a2a7.jpg\";\n\n//# sourceURL=webpack://protopie/./src/images/coca-cola.jpg?");

/***/ }),

/***/ "./src/images/coffee.jpg":
/*!*******************************!*\
  !*** ./src/images/coffee.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"405b4e6586b1f6266b35.jpg\";\n\n//# sourceURL=webpack://protopie/./src/images/coffee.jpg?");

/***/ }),

/***/ "./src/images/water.jpg":
/*!******************************!*\
  !*** ./src/images/water.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f3460a82d3282362a66b.jpg\";\n\n//# sourceURL=webpack://protopie/./src/images/water.jpg?");

/***/ }),

/***/ "./src/drinks.json":
/*!*************************!*\
  !*** ./src/drinks.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('[{\"name\":\"coca-cola\",\"price\":1100,\"stock\":10},{\"name\":\"water\",\"price\":600,\"stock\":8},{\"name\":\"coffee\",\"price\":700,\"stock\":0}]');\n\n//# sourceURL=webpack://protopie/./src/drinks.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/machine.js");
/******/ 	
/******/ })()
;