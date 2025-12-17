import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon } from 'lucide-react'

const App = () => {
  const [countdown, setCountdown] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setCountdown(0)
    setIsRunning(false)
  }

  const handleCountdown = () => {
    if (countdown > 0) {
      setCountdown(countdown - 1)
    } else {
      setIsRunning(false)
    }
  }

  React.useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(handleCountdown, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, countdown])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-300 to-pink-500">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-lg"
      >
        <ClockIcon className="text-pink-500 w-16 h-16 mb-4" />
        <h1 className="text-6xl font-bold text-pink-500">{countdown}</h1>
      </motion.div>
      <div className="mt-8 space-x-4">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isRunning
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
          onClick={isRunning ? handleStop : handleStart}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default App