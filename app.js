let text = document.getElementById('text')
let bgTop = document.getElementById('bg-top')
let bgBottom = document.getElementById('bg')
let randomButton = document.getElementById('random-button')
let logo = document.getElementById('logo')
let ok = document.getElementById('ok')
let modal = document.getElementById('modal')
let textarea = document.getElementById('textarea')

let award = new Audio('./sounds/award.mp4')
let pop = new Audio('./sounds/pop.mp4')

let isRunning = false

const duration = 8 * 1000

let answers = [
  'HEALTH',
  'FINANCE',
  'ENVIRONMENT',
  'EDUCATION',
  'TRANSPORTATION',
  'AGRICULTURE',
  'HEALTH',
  'FINANCE',
  'ENVIRONMENT',
  'EDUCATION',
  'TRANSPORTATION',
  'AGRICULTURE'
]

// let answers = [
//   '05MIPSBasicArch.pdf',
//   'develop(er) drop java',
//   'Fallup zerotohundred',
//   'Insomnia',
//   'PleaseWork',
//   'Uhack my heart',
//   'Unreal Production',
//   'Veronica',
//   'YEET',
//   'เจ้าแมงกินฟันกัดมันเลยลูก',
//   'นั่งเล่น',
//   'น้ำมะเหนียก'
// ]

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
const thai = 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'

const letters = _.shuffle(eng.replace(/\s+/g, '').split('')).join('')

text.innerText = 'UHACK KASETSART'

const randomInt = (max = 1) => {
  return parseInt(Math.random() * max)
}

const randomBoolean = () => {
  return Math.random() > 0.5
}

const addLetter = () => {
  changeBg()
  // const letter = letters[randomInt(letters.length)]
  const ls = answers.join('')
  const letter = ls[randomInt(ls.length)]
  // text.innerText += randomBoolean() ? letter : letter.toUpperCase()
  text.innerText += letter.toUpperCase()
}

const changeLetter = () => {
  changeBg()
  // const letter = letters[parseInt(randomInt(letters.length))]
  const ls = answers.join('')
  const letter = ls[randomInt(ls.length)].toUpperCase()

  const index = parseInt(randomInt(text.innerText.length))
  text.innerText =
    text.innerText.substring(0, index) +
    letter +
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

  let index = 0
  let loop = setInterval(() => {
    playPop()
    if (text.innerText === answer) {
      const found = answers.indexOf(answer)
      if (found > -1) {
        answers.splice(found, 1)
      }
      isRunning = false
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
        answer[index] +
        text.innerText.substring(index + 1, text.innerText.length)
      index++
    }
  }, 200)
}

const changeBg = () => {
  bgTop.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bgTop.style.backgroundImage = `url('./images/template-bg${randomInt(
    13
  )}.png')`
  bg.style.backgroundPosition = `${randomInt(100)}vw ${randomInt(20)}vh`
  bg.style.backgroundImage = `url('./images/template-bg${randomInt(13)}.png')`
}

const playPop = () => {
  pop = new Audio('./sounds/pop.mp4')
  pop.play()
}

const onRandom = () => {
  let counter = 0
  isRunning = true
  award.play()

  randomButton.classList.remove('is-error')
  randomButton.classList.add('is-disabled')
  randomButton.disabled = true

  logo.classList.add('is-spining')

  let interval = setInterval(() => {
    counter += 1 % 2
    if (counter % 2 === 0) {
      playPop()
    }

    if (text.innerText.length > 20) {
      return removeLetter(5)
    }
    if (text.innerText.length < 5) {
      return addLetter()
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
  if (e.key === 'Enter' && modal.style.display !== 'flex' && !isRunning) {
    onRandom()
  }
})
