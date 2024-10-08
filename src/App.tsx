import React, { useState } from 'react'
import { Play, Download } from 'lucide-react'
import Editor from './editor'
import StoryViewer from './components/StoryViewer'
import NewElementsMenu from './components/NewElementsMenu'
import AddNewScenesMenu from './components/AddNewScenesMenu'
import PreviewMenu from './components/PreviewMenu'
import ExportMenu from './components/ExportMenu'
import { Scene } from './core/types'
import { Renderer } from './core/renderer'
import { templates } from './template'

function App() {
  const [scenes, setScenes] = useState<Scene[]>(templates[0].scenes)
  const [isViewing, setIsViewing] = useState(false)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [showNewElementsMenu, setShowNewElementsMenu] = useState(false)
  const [showAddNewScenesMenu, setShowAddNewScenesMenu] = useState(false)
  const [showPreviewMenu, setShowPreviewMenu] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const addScene = (sceneType: string) => {
    const newScene: Scene = {
      id: Date.now().toString(),
      name: `New ${sceneType} Scene`,
      duration: 5,
      background: '',
      dialogues: [],
      characters: [],
      type: sceneType,
    }
    setScenes([...scenes, newScene])
    setSelectedSceneId(newScene.id)
    setShowAddNewScenesMenu(false)
  }

  const updateScene = (updatedScene: Scene) => {
    setScenes(scenes.map(scene => scene.id === updatedScene.id ? updatedScene : scene))
  }

  const deleteScene = (sceneId: string) => {
    setScenes(scenes.filter(scene => scene.id !== sceneId))
    if (selectedSceneId === sceneId) {
      setSelectedSceneId(scenes.length > 1 ? scenes[0].id : null)
    }
  }

  const handleAddElement = (elementType: string) => {
    console.log(`Adding new ${elementType} element`)
    // Implement the logic to add the new element to the current scene
    setShowNewElementsMenu(false)
  }

  const handlePreview = (type: 'current' | 'from-current' | 'all') => {
    console.log(`Previewing: ${type}`)
    // Implement the preview logic based on the type
    setIsViewing(true)
    setShowPreviewMenu(false)
  }

  const handleExport = (type: 'current' | 'all-separately' | 'merge-all') => {
    console.log(`Exporting: ${type}`)
    // Implement the export logic based on the type
    const renderer = new Renderer(scenes)
    renderer.renderToVideo().then((videoBlob) => {
      const url = URL.createObjectURL(videoBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `story_${type}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
    setShowExportMenu(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">VNVE-inspired Video Story Builder</h1>
      {isViewing ? (
        <StoryViewer scenes={scenes} onClose={() => setIsViewing(false)} />
      ) : (
        <Editor
          scenes={scenes}
          selectedSceneId={selectedSceneId}
          onSelectScene={setSelectedSceneId}
          onUpdateScene={updateScene}
          onDeleteScene={deleteScene}
        />
      )}
      <div className="mt-8 flex space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowAddNewScenesMenu(!showAddNewScenesMenu)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            Add new scenes
          </button>
          {showAddNewScenesMenu && <AddNewScenesMenu onAddScene={addScene} />}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNewElementsMenu(!showNewElementsMenu)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            New elements
          </button>
          {showNewElementsMenu && <NewElementsMenu onAddElement={handleAddElement} />}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowPreviewMenu(!showPreviewMenu)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Play size={20} className="mr-2" /> Preview
          </button>
          {showPreviewMenu && <PreviewMenu onPreview={handlePreview} />}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Download size={20} className="mr-2" /> Export
          </button>
          {showExportMenu && <ExportMenu onExport={handleExport} />}
        </div>
      </div>
    </div>
  )
}

export default App