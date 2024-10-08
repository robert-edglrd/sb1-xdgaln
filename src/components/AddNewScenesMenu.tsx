import React from 'react'
import { Plus } from 'lucide-react'

interface AddNewScenesMenuProps {
  onAddScene: (sceneType: string) => void
}

const AddNewScenesMenu: React.FC<AddNewScenesMenuProps> = ({ onAddScene }) => {
  const sceneTypes = [
    { type: 'dialogue', label: 'Dialogue Scene' },
    { type: 'monologue', label: 'Monologue scene' },
    { type: 'title', label: 'Title scene' },
    { type: 'custom', label: 'Custom scenes' },
  ]

  return (
    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {sceneTypes.map((scene) => (
          <button
            key={scene.type}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => onAddScene(scene.type)}
          >
            <Plus className="inline-block mr-2" size={16} />
            {scene.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AddNewScenesMenu