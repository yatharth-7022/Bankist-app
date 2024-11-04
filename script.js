"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (currentUser) {
  containerMovements.innerHTML = "";
  currentUser.movements.map((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
       <div class="movements__type movements__type--${type}">${index} ${type}</div>
       <div class="movements__value">${movement}</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const totalMoney = function (currentUser) {
  currentUser.balance = currentUser.movements.reduce(
    (accum, curr) => accum + curr,
    0
  );
  labelBalance.textContent = `${currentUser.balance}€`;
  // console.log(currentUser);
};

const moneyCredited = function (currentUser) {
  const finalMoneyCredited = currentUser.movements
    .filter((movement) => movement > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${finalMoneyCredited}€`;
};

const moneyDebited = function (currentUser) {
  const finalMoneyDebited = currentUser.movements
    .filter((movement) => movement < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${finalMoneyDebited}€`;
};

const interest = function (currentUser) {
  const finalInterest = Math.trunc(
    currentUser.movements
      .filter((movement) => movement > 0)
      .map((deposit) => (deposit * currentUser.interestRate) / 100)
      .reduce((acc, curr) => acc + curr, 0)
  );
  labelSumInterest.textContent = `${finalInterest}€`;
};

const createUserNames = function (currentUser) {
  currentUser.forEach((acc) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((n) => {
        return n[0];
      })
      .join("");
  });
};
const updateUI = function (acc) {
  displayMovements(acc);
  totalMoney(acc);
  moneyCredited(acc);
  moneyDebited(acc);
  interest(acc);
};
createUserNames(accounts);
let currentUser;
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentUser = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  // console.log(currentUser);
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentUser.owner.split(" ")[0] //gives only the first name of the user
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentUser);
  }
});
let transferringUser;
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const inputAmount = Number(inputTransferAmount.value);
  transferringUser = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  // console.log(transferringUser);
  if (
    inputAmount > 0 &&
    transferringUser &&
    currentUser.balance >= inputAmount &&
    transferringUser?.userName !== currentUser.userName
  ) {
    currentUser.movements.push(-inputAmount);
    transferringUser.movements.push(inputAmount);
    updateUI(currentUser);
    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferAmount.blur();
    // console.log("transfer success");
  }
});

// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
