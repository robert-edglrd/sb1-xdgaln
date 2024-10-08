import React from 'react'
import { Download } from 'lucide-react'

interface ExportMenuProps {
  onExport: (type: 'current' | 'all-separately' | 'merge-all') => void
}

const ExportMenu: React.FC<ExportMenuProps> = ({ onExport }) => {
  const exportOptions = [
    { type: 'current', label: 'Export only the current scene' },
    { type: 'all-separately', label: 'Export all scenes separately' },
    { type: 'merge-all', label: 'Merge and export all scenes' },
  ]

  return (
    <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {exportOptions.map((option) => (
          <button
            key={option.type}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => onExport(option.type as 'current' | 'all-separately' | 'merge-all')}
          >
            <Download className="inline-block mr-2" size={16} />
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExportMenu