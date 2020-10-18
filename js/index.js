var balanceView
balanceView = (function() {
    var Income = function(id, description, amount) {
        this.id = id
        this.description = description
        this.amount = amount
    }
    var Expenses = function(id, description, amount) {
        this.id = id
        this.description = description
        this.amount = amount
    }
    var storedData
    storedData = {
        allEntry: {
            income: [],
            expenses: []
        },
        allAvailable: {
            income: 0,
            expenses: 0
        }
    }
    return {
        addData: function(tType, descr, val) {
            var newData
            var ID

            if (storedData.allEntry[tType].length > 0) {
                ID = storedData.allEntry[tType][storedData.allEntry[tType].length - 1].id + 1
            } else {
                ID = 0
            }

            if (tType === 'expenses') {
                newData = new Expenses(ID, descr, val)
            } else if (tType === 'income') {
                newData = new Income(ID, descr, val)
            }

            storedData.allEntry[tType].push(newData)
            return newData
        },
        // test: function() {
        //     console.log(storedData)
        // }
    }
})()

var designView
designView = (function() {

    var classLinks = {
        transaction: '.transaction-type',
        description: '.add-description',
        amount: '.add-amount',
        button: '.add-button',
        incomeRoom: '.income-div',
        expenseRoom: '.expense-div'
    }

    return {
        userInput: function() {
            return {
                transaction_type: document.querySelector(classLinks.transaction).value,
                description: document.querySelector(classLinks.description).value,
                amount: document.querySelector(classLinks.amount).value
            }
        },
        addData: function(obj, transaction_type) {
            var ourHtml
            var ourNewHtml
            var element
            if (transaction_type === "income") {
                element = classLinks.incomeRoom
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-success">Income</h4><div class="income-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span> <span class="my-amount">%amount%</span></div></div></div><div class="col-6"><h4 class="text-danger">Expenses</h4><div class="expenses-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span><span class="my-amount">%amount%</span></div></div></div></div></div></section>'
            } else if (transaction_type === "expenses") {
                element = classLinks.expenseRoom
                ourHtml = '<section class="entry-section"><div class="container"><div class="row"><div class="col-6"><h4 class="text-success">Expenses</h4><div class="expenses-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span> <span class="my-amount">%amount%</span></div></div></div><div class="col-6"><h4 class="text-danger">Expenses</h4><div class="expenses-table" id="%id%"><div class="detail-container"><span class="my-description">%description%</span><span class="my-amount">%amount%</span></div></div></div></div></div></section>'
            }
            ourNewHtml = ourHtml.replace("%id%", obj.id)
            ourNewHtml = ourNewHtml.replace("%description%", obj.description)
            ourNewHtml = ourNewHtml.replace("%amount%", obj.amount)

            var htmlObject = document.createElement('div')
            htmlObject.innerHTML = ourNewHtml
            document.querySelector(element).insertAdjacentElement('beforeend', htmlObject)
        },
        cLink: function() {
            return classLinks
        }
    }
})()

var globalView
globalView = (function(bView, dView) {
    var addBalance = function() {
        var ourInput = dView.userInput()
        var newNew = bView.addData(ourInput.transaction_type, ourInput.description, ourInput.amount)
        dView.addData(newNew, ourInput.transaction_type)
    }

    var eventMatters = function() {
        var DOMLink = dView.cLink()
        var btn = document.querySelector(DOMLink.button)
        btn.addEventListener('click', function(event) {
            event.preventDefault()
            addBalance()
        })

        var keyEvent = document
        keyEvent.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addBalance()
            }
        })
    }



    return {
        init: function() {
            eventMatters()
        }
    }


})(balanceView, designView)
globalView.init()