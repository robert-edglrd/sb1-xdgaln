import React, { useState, useEffect } from 'react'
import { Scene, Dialogue, Character } from '../App'
import { Upload, Plus, Trash } from 'lucide-react'

interface SceneEditorProps {
  scene: Scene
  onUpdateScene: (scene: Scene) => void
}

const SceneEditor: React.FC<SceneEditorProps> = ({ scene, onUpdateScene }) => {
  const [name, setName] = useState(scene.name)
  const [duration, setDuration] = useState(scene.duration)
  const [background, setBackground] = useState(scene.background)
  const [dialogues, setDialogues] = useState(scene.dialogues)
  const [characters, setCharacters] = useState(scene.characters)

  useEffect(() => {
    onUpdateScene({
      ...scene,
      name,
      duration,
      background,
      dialogues,
      characters,
    })
  }, [name, duration, background, dialogues, characters])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setter(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addDialogue = () => {
    const newDialogue: Dialogue = {
      id: Date.now().toString(),
      character: '',
      content: '',
      startTime: 0,
      duration: 1,
    }
    setDialogues([...dialogues, newDialogue])
  }

  const updateDialogue = (index: number, field: keyof Dialogue, value: string | number) => {
    const updatedDialogues = [...dialogues]
    updatedDialogues[index] = { ...updatedDialogues[index], [field]: value }
    setDialogues(updatedDialogues)
  }

  const removeDialogue = (index: number) => {
    setDialogues(dialogues.filter((_, i) => i !== index))
  }

  const addCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: '',
      portrait: '',
    }
    setCharacters([...characters, newCharacter])
  }

  const updateCharacter = (index: number, field: keyof Character, value: string) => {
    const updatedCharacters = [...characters]
    updatedCharacters[index] = { ...updatedCharacters[index], [field]: value }
    setCharacters(updatedCharacters)
  }

  const removeCharacter = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Scene Editor</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Scene Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (seconds)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            {background ? (
              <img src={background} alt="Background" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageUpload(e, setBackground)}
              accept="image/*"
            />
          </label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Dialogues</h3>
        {dialogues.map((dialogue, index) => (
          <div key={dialogue.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Dialogue {index + 1}</h4>
              <button onClick={() => removeDialogue(index)} className="text-red-500">
                <Trash size={16} />
              </button>
            </div>
            <input
              type="text"
              value={dialogue.character}
              onChange={(e) => updateDialogue(index, 'character', e.target.value)}
              placeholder="Character"
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={dialogue.content}
              onChange={(e) => updateDialogue(index, 'content', e.target.value)}
              placeholder="Dialogue content"
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                value={dialogue.startTime}
                onChange={(e) => updateDialogue(index, 'startTime', Number(e.target.value))}
                placeholder="Start time"
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={dialogue.duration}
                onChange={(e) => updateDialogue(index, 'duration', Number(e.target.value))}
                placeholder="Duration"
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        <button
          onClick={addDialogue}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" /> Add Dialogue
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Characters</h3>
        {characters.map((character, index) => (
          <div key={character.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Character {index + 1}</h4>
              <button onClick={() => removeCharacter(index)} className="text-red-500">
                <Trash size={16} />
              </button>
            </div>
            <input
              type="text"
              value={character.name}
              onChange={(e) => updateCharacter(index, 'name', e.target.value)}
              placeholder="Character name"
              className="w-full px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-center w-full mb-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {character.portrait ? (
                  <img src={character.portrait} alt="Character portrait" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="text-xs text-gray-500">Upload portrait</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, (value) => updateCharacter(index, 'portrait', value))}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        ))}
        <button
          onClick={addCharacter}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" /> Add Character
        </button>
      </div>
    </div>
  )
}

export default SceneEditor