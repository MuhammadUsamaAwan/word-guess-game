import { useState, useEffect } from 'react'
import useEventListener from './useEventListener'
import words from './words.json'

const solution = words[Math.round(Math.random() * 635)].toUpperCase()

const App = () => {
  const [start, setStart] = useState(1)
  const [win, setWin] = useState(false)

  useEffect(() => {
    console.log('The solution is::', solution)
  }, [])

  useEventListener('keydown', e => {
    if (start <= 26 || win) {
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 95 && e.keyCode <= 122)
      ) {
        for (let i = start; i < start + 5; i++) {
          if (document.getElementById(i.toString()).value === '') {
            document.getElementById(i.toString()).value = e.key.toUpperCase()
            break
          }
        }
      }
      if (e.keyCode === 13) {
        let canSubmit = true
        for (let i = start; i < start + 5; i++) {
          if (document.getElementById(i.toString()).value === '')
            canSubmit = false
        }
        if (canSubmit) {
          let index = 0
          let correct = 0
          for (let i = start; i < start + 5; i++) {
            console.log(
              document.getElementById(i.toString()).value === solution[index]
            )
            if (
              document.getElementById(i.toString()).value === solution[index]
            ) {
              document.getElementById(i.toString()).classList.add('green')
              correct++
            } else if (
              solution.includes(document.getElementById(i.toString()).value)
            )
              document.getElementById(i.toString()).classList.add('yellow')
            else document.getElementById(i.toString()).classList.add('gray')
            index++
          }
          if (correct === 5) setWin(true)
          setStart(prev => prev + 5)
        }
      }
      if (e.keyCode === 8) {
        for (let i = start + 5; i >= start; i--) {
          if (document.getElementById(i.toString()).value !== '') {
            document.getElementById(i.toString()).value = ''
            break
          }
        }
      }
    }
  })

  const getInput = id => (
    <input
      className='border-2 w-16 h-16 focus:outline-0 text-2xl font-semibold text-center bg-white'
      maxLength={1}
      disabled
      id={id}
    />
  )

  const getWordField = arr => (
    <div className='flex items-center justify-center gap-1 mb-2'>
      {arr.map(item => getInput(item))}
    </div>
  )

  return (
    <main className='p-5 mt-10'>
      <h1 className='text-center mb-5 font-semibold text-3xl uppercase'>
        Guess the Word!
      </h1>
      <section>
        {getWordField([1, 2, 3, 4, 5])}
        {getWordField([6, 7, 8, 9, 10])}
        {getWordField([11, 12, 13, 14, 15])}
        {getWordField([16, 17, 18, 19, 20])}
        {getWordField([21, 22, 23, 24, 25])}
        {getWordField([26, 27, 28, 29, 30])}
        <p
          className='text-center cursor-pointer'
          onClick={() => window.location.reload()}
        >
          {win && 'Congratulations you won! Click to play again!'}
          {start > 26 &&
            `You Lose! The word was ${solution.toLowerCase()}! Click to play again!`}
        </p>
      </section>
    </main>
  )
}

export default App
