import React from 'react'
import { Scene } from '../../core/types'
import { Plus, Trash } from 'lucide-react'

interface SceneListProps {
  scenes: Scene[]
  selectedSceneId: string | null
  onSelectScene: (sceneId: string) => void
  onAddScene: (scene: Scene) => void
  onDeleteScene: (sceneId: string) => void
}

const SceneList: React.FC<SceneListProps> = ({
  scenes,
  selectedSceneId,
  onSelectScene,
  onAddScene,
  onDeleteScene,
}) => {
  const addNewScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      name: `Scene ${scenes.length + 1}`,
      duration: 5,
      background: '',
      dialogues: [],
      characters: [],
    }
    onAddScene(newScene)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Scene List</h2>
      <ul className="space-y-2">
        {scenes.map((scene) => (
          <li
            key={scene.id}
            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
              selectedSceneId === scene.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectScene(scene.id)}
          >
            <span>{scene.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteScene(scene.id)
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={addNewScene}
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" /> Add New Scene
      </button>
    </div>
  )
}

export default SceneList