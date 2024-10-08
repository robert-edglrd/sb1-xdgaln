import React from 'react'
import { Plus } from 'lucide-react'

interface NewElementsMenuProps {
  onAddElement: (elementType: string) => void
}

const NewElementsMenu: React.FC<NewElementsMenuProps> = ({ onAddElement }) => {
  const elementTypes = [
    { type: 'text', label: 'Text elements' },
    { type: 'image', label: 'Image Elements' },
    { type: 'animated', label: 'Animated elements' },
    { type: 'video', label: 'Video element' },
    { type: 'graphic', label: 'Graphic elements' },
  ]

  return (
    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {elementTypes.map((element) => (
          <button
            key={element.type}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => onAddElement(element.type)}
          >
            <Plus className="inline-block mr-2" size={16} />
            {element.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NewElementsMenu