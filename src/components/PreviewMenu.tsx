import React from 'react'
import { Play } from 'lucide-react'

interface PreviewMenuProps {
  onPreview: (type: 'current' | 'from-current' | 'all') => void
}

const PreviewMenu: React.FC<PreviewMenuProps> = ({ onPreview }) => {
  const previewOptions = [
    { type: 'current', label: 'Preview only the current scene' },
    { type: 'from-current', label: 'Start preview from current scene' },
    { type: 'all', label: 'Preview all scenes' },
  ]

  return (
    <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {previewOptions.map((option) => (
          <button
            key={option.type}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => onPreview(option.type as 'current' | 'from-current' | 'all')}
          >
            <Play className="inline-block mr-2" size={16} />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PreviewMenu