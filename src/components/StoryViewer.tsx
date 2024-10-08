import React, { useState, useEffect } from 'react'
import { Scene } from '../core/types'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface StoryViewerProps {
  scenes: Scene[]
  onClose: () => void
}

const StoryViewer: React.FC<StoryViewerProps> = ({ scenes, onClose }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)

  const currentScene = scenes[currentSceneIndex]

  useEffect(() => {
    if (!currentScene) return

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(currentSceneIndex + 1)
            setCurrentDialogueIndex(0)
            return 0
          } else {
            clearInterval(timer)
            return 100
          }
        }
        return prevProgress + (100 / (currentScene.duration * 20))
      })
    }, 50)

    return () => clearInterval(timer)
  }, [currentSceneIndex, scenes.length, currentScene])

  useEffect(() => {
    if (!currentScene) return

    const dialogueTimer = setInterval(() => {
      if (currentDialogueIndex < currentScene.dialogues.length - 1) {
        setCurrentDialogueIndex(currentDialogueIndex + 1)
      }
    }, currentScene.dialogues[currentDialogueIndex]?.duration * 1000)

    return () => clearInterval(dialogueTimer)
  }, [currentDialogueIndex, currentScene])

  const handleNext = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1)
      setCurrentDialogueIndex(0)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1)
      setCurrentDialogueIndex(0)
      setProgress(0)
    }
  }

  if (!currentScene) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[80vh]">
        <img
          src={currentScene.background}
          alt={`Scene ${currentSceneIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
          <div
            className="h-full bg-white transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="absolute bottom-8 left-4 right-4 bg-black bg-opacity-50 p-4 rounded-lg">
          <p className="text-white text-lg font-semibold">
            {currentScene.dialogues[currentDialogueIndex]?.content}
          </p>
        </div>
        <div className="absolute top-4 left-4 flex space-x-2">
          {currentScene.characters.map((character) => (
            <div key={character.id} className="w-12 h-12 rounded-full overflow-hidden">
              <img src={character.portrait} alt={character.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white"
          disabled={currentSceneIndex === 0}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
        >
          <ChevronRight size={32} />
        </button>
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={24} />
        </button>
      </div>
    </div>
  )
}

export default StoryViewer