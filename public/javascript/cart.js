// /////////////////購物車變數/////////////////
// 選取按鈕面板*2、按鈕*4
const stepperControllers = document.querySelectorAll('.stepper-control')
const preBtns = document.querySelectorAll('.btn-previous')
const nextBtns = document.querySelectorAll('.btn-next')
//選取步驟面板
const steps = document.querySelectorAll('.step')
const formParts = document.querySelectorAll('.part')
//狀態紀錄
let step = 0
// /////////////////導覽列變數/////////////////
const navBtn = document.querySelector('.nav-btn')
const navbar = document.querySelector('.nav-group')
const main = document.querySelector('main')

// /////////////////購物車步驟函式/////////////////
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

// /////////////////導覽列函式/////////////////
function navBtnClicked(event) {
  navbar.classList.toggle('d-none')
}

// /////////////////監聽器/////////////////
// 兩個按鈕controller
stepperControllers.forEach(controller => {
  controller.addEventListener('click', stepperControlClicked)
})
// navbar
navBtn.addEventListener('click', navBtnClicked)