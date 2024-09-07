import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Player = 'X' | 'O' | null

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function Triki() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState(false)

  useEffect(() => {
    checkWinner()
  }, [board])

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a])
        return
      }
    }
    if (board.every((cell) => cell !== null)) {
      setIsDraw(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setIsDraw(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-800">Triki</h1>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className="w-24 h-24 bg-white rounded-lg shadow-md text-4xl font-bold text-purple-800 focus:outline-none"
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cell}
          </motion.button>
        ))}
      </div>
      {(winner || isDraw) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-4 text-purple-800"
        >
          {winner ? `¡${winner} ha ganado!` : 'Empate'}
        </motion.div>
      )}
      <motion.button
        className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md font-semibold"
        onClick={resetGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reiniciar juego
      </motion.button>
    </div>
  )
}