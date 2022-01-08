// /////////////////結帳區變數/////////////////
// 選取按鈕面板*2、按鈕*4
const stepperControllers = document.querySelectorAll('.stepper-control')
const preBtns = document.querySelectorAll('.btn-previous')
const nextBtns = document.querySelectorAll('.btn-next')
//選取步驟面板
const steps = document.querySelectorAll('.step')
const formParts = document.querySelectorAll('.part')
//狀態紀錄
let step = 0
// /////////////////購物籃變數/////////////////
const itemsPanel = document.querySelector('.shopping-items')
const totalCost = document.querySelector('.total-cost').children[1]
const itemList = [
  {
    id: 1,
    title: "破壞補丁修身牛仔褲",
    quantity: 1,
    price: 3999
  },
  {
    id: 2,
    title: "刷色直筒牛仔褲",
    quantity: 1,
    price: 1299
  }
]

// /////////////////導覽列變數/////////////////
const navBtn = document.querySelector('.nav-btn')
const navbar = document.querySelector('.nav-group')
const main = document.querySelector('main')

// /////////////////結帳區步驟函式/////////////////
function stepperControlClicked(event) {
  event.preventDefault()
  const target = event.target
  const nowStep = steps[step].children[0] //面板:目前數字
  
  if (target.matches('.btn-next') && target.children[0].innerText === '下一步') {
    const nextStep = steps[step + 1].children[0]
    
    nowStep.innerHTML = '&#10003' // now打勾
    nowStep.classList.remove('step-active') // now取消黑邊
    nowStep.classList.add('checked') // now背景反黑
    nextStep.classList.add('step-active') // next黑邊

    if (steps[step + 1].nextElementSibling) {
      const nextStepLine = steps[step + 1].nextElementSibling
      nextStepLine.classList.add('line-active')
    }

    formPartsToggled(step, step + 1)
    step += 1
  }
  else if (event.target.matches('.btn-previous')) {
    const preStep = steps[step - 1].children[0]
    nowStep.classList.remove('step-active')
    preStep.innerText = step
    preStep.classList.add('step-active')
    preStep.classList.remove('checked')
    if (steps[step].nextElementSibling) {
      const stepLine = steps[step].nextElementSibling
      stepLine.classList.remove('line-active')
    }
    formPartsToggled(step, step - 1)
    step -= 1
  }
  stepBtnControll(step)
}

// 表格轉換
function formPartsToggled(step1, step2) {
  formParts[step1].classList.toggle('d-none')
  formParts[step2].classList.toggle('d-none')
}
// 上下一步，按鈕轉換
function stepBtnControll(step) {
  preBtns.forEach(btn => {
    if (step > 0) btn.disabled = false
    else btn.disabled = true
  })
  nextBtns.forEach(btn => {
    if (step === 2) btn.children[0].innerText = '確認下單'
    else btn.children[0].innerText = '下一步'
  })
}
// /////////////////購物籃變數/////////////////
function itemsPanelClicked(event) {
  if (!event.target.matches('.minus') && !event.target.matches('.plus')) return
  const itemId = event.target.parentElement.dataset.id //取出id
  const index = itemList.findIndex(item => item.id === Number(itemId)) //number
  
  itemListHandler(event, index)
  itemsPanelRendered(event, index, itemList)
  totalCostRendered(itemList)

}
// 修改後台(itemList)儲存之購買數量
function itemListHandler(event, index) {
  if (event.target.matches('.minus')) {
    if (itemList[index].quantity === 0) return
    itemList[index].quantity -= 1
  } else if (event.target.matches('.plus')) {
    itemList[index].quantity += 1
  }
}
// 單一項目：渲染畫面
function itemsPanelRendered(event, index, list) {
  //數量
  const quantity = event.target.parentElement.children[1]
  quantity.innerText = list[index].quantity
  //價格
  const itemCost = event.target.parentElement.nextElementSibling
  let itemCostHTML = '$'
  itemCostHTML += list[index].quantity * list[index].price
  itemCost.innerText = itemCostHTML
}
// 總價：渲染畫面
function totalCostRendered(list) {
  let totalCostHTML = 0
  list.forEach(item => {
    totalCostHTML += item.quantity * item.price
  })
  totalCost.innerText = '$' + totalCostHTML
}


totalCost
// /////////////////導覽列函式/////////////////
function navBtnClicked(event) {
  navbar.classList.toggle('d-none')
}

// /////////////////監聽器/////////////////
// 兩個按鈕controller
stepperControllers.forEach(controller => {
  controller.addEventListener('click', stepperControlClicked)
})
// 購物籃
itemsPanel.addEventListener('click', itemsPanelClicked)
// navbar
navBtn.addEventListener('click', navBtnClicked)