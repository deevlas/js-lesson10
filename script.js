function userCard(numb) {
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];
    let key = numb;
    let date = new Date()

    function addTransaction(type, money) {
        historyLogs.push({
            type,
            money,
            date
        })
    }

    return {
        getCardOptions: function getCardOptions() {

            let options = {
                balance,
                transactionLimit,
                historyLogs,
                key
            }
            return options
        },
        putCredits: function putCredits(moneyPlus) {
            balance += moneyPlus
            addTransaction("Received credits", moneyPlus)
            console.log(`Вы получили ${moneyPlus} И теперь у вас ${balance}`)
        },
        takeCredits: function (moneyMinus) {
            let err = 0;
            console.log(`Ваш лимит ${transactionLimit}`)
            if (balance < moneyMinus) {
                err++
                console.error(`Не достаточно денег на балансе ${balance}`)
            }
            if (transactionLimit < moneyMinus) {
                err++
                console.error(`Сумма превышает лимит снятия ${transactionLimit}`)
            }
            if (err === 0) {
                balance -= moneyMinus
                addTransaction("Withdrawal of credits", moneyMinus)
            }
            return err
        },
        setTransactionLimit: function (moneyTransactionLimit) {
            transactionLimit = moneyTransactionLimit
            addTransaction("Transaction limit change", moneyTransactionLimit)
        },
        transferCredits: function (moneyTransfer, cardUser) {
            moneyTransfer *= 0.995
            if (!this.takeCredits(moneyTransfer)) {
                cardUser.putCredits(moneyTransfer)
            } else {
                console.log("Трансфер не выполнен")
            }
        }
    }
}

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = []
    }

    addCards() {
        if (this.cards.length < 3) {
            this.cards.push(userCard(this.cards.length + 1))
        } else {
            console.log(`Превышен лимит количества карт`)
        }
    }
    getCardByKey(numb) {
        if (numb < 1 || numb > 3) {
            console.log(`Нет карты с ключем ${numb}`)
        } else {
            return this.cards[numb - 1]
        }
    }
}

let user = new UserAccount('Bob');
user.addCards()
user.addCards()
let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(2);
card1.putCredits(500);
card1.setTransactionLimit(800);
card1.transferCredits(300, card2);
card2.takeCredits(50);
console.log(card1.getCardOptions());

//
// let card1 = userCard(1)
// card1.putCredits(1000)
// let card2 = userCard(2)
// card1.transferCredits(90, card2)
// card1.transferCredits(300, card2);
//
// console.log(card1.getCardOptions())
// console.log(card2.getCardOptions())