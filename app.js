let text = document.getElementById('text')
let bgTop = document.getElementById('bg-top')
let bgBottom = document.getElementById('bg')
let randomButton = document.getElementById('random-button')
let logo = document.getElementById('logo')
let ok = document.getElementById('ok')
let modal = document.getElementById('modal')
let textarea = document.getElementById('textarea')

const duration = 5 * 1000

let answers = [
  'สาธารณะสุข',
  'การศึกษา',
  'คมนาคม',
  'การเงิน',
  'การเกษตร',
  'การท่องเที่ยว'
]

const eng = 'abcdefghijklmnopqrstuvwxyz'
const vowel = `ะ
ั
็
าาาาาา
ิ
่
ํ
"
ุ
ู
เ
ใ
ไ
โ`
const thai = 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ' + vowel + eng

const letters = _.shuffle(
  (thai + eng + vowel).replace(/\s+/g, '').split('')
).join('')

text.innerText = 'UHACK KASETSART'

const randomInt = (max = 1) => {
  return parseInt(Math.random() * max)
}

const randomBoolean = () => {
  return Math.random() > 0.5
}

const addLetter = () => {
  changeBg()
  const letter = letters[randomInt(letters.length)]
  text.innerText += Math.random() > 0.5 ? letter : letter.toUpperCase()
}

const changeLetter = () => {
  changeBg()
  const index = parseInt(randomInt(text.innerText.length))
  text.innerText =
    text.innerText.substring(0, index) +
    letters[parseInt(randomInt(letters.length))] +
    text.innerText.substring(index + 1, text.innerText.length)
}

const removeLetter = (amount = 1) => {
  changeBg()
  const index = parseInt(randomInt(text.innerText.length))

  text.innerText =
    text.innerText.substring(0, index) +
    text.innerText.substring(index + amount, text.innerText.length)
}

const complete = () => {
  if (answers.length <= 0) {
    logo.classList.remove('is-spining')
    return (text.innerText = 'สุ่มหมดละจ้า')
  }

  const answer = answers[randomInt(answers.length)]

  const found = answers.indexOf(answer)
  if (found > -1) {
    answers.splice(found, 1)
  }

  let index = 0
  let loop = setInterval(() => {
    if (text.innerText === answer) {
      clearInterval(loop)
      logo.classList.remove('is-spining')
      randomButton.classList.add('is-error')
      randomButton.classList.remove('is-disabled')
      randomButton.disabled = false
      return
    }
    if (text.innerText.length < answer.length) {
      addLetter()
    } else if (text.innerText.length > answer.length) {
      removeLetter()
    } else {
      text.innerText =
        text.innerText.substring(0, index) +
        answer[index++] +
        text.innerText.substring(index + 1, text.innerText.length)
    }
  }, 200)
}

const changeBg = () => {
  bgTop.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bgTop.style.backgroundImage = `url('./images/template-bg${randomInt(11) +
    1}.png')`
  bg.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bg.style.backgroundImage = `url('./images/template-bg${randomInt(11) +
    1}.png')`
}

const onRandom = () => {
  randomButton.classList.remove('is-error')
  randomButton.classList.add('is-disabled')
  randomButton.disabled = true

  logo.classList.add('is-spining')

  let interval = setInterval(() => {
    if (text.innerText.length > 20) {
      return removeLetter(5)
    }
    const random = Math.random()
    if (random < 1 / 3) {
      changeLetter()
    } else if (random < 2 / 3) {
      addLetter()
    } else {
      removeLetter()
    }
  }, 60)

  setTimeout(() => {
    clearInterval(interval)
    complete()
  }, duration)
}

randomButton.addEventListener('click', onRandom)

logo.addEventListener('click', () => {
  textarea.value = answers.join('\n')
  modal.style.display = 'flex'
})

ok.addEventListener('click', () => {
  const list = textarea.value.trim()
  answers = list === '' ? [] : list.split('\n')
  modal.style.display = 'none'
})

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    onRandom()
  }
})
