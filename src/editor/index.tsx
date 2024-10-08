import React from 'react'
import SceneEditor from './components/SceneEditor'
import SceneList from './components/SceneList'
import { Scene } from '../core/types'

interface EditorProps {
  scenes: Scene[]
  selectedSceneId: string | null
  onSelectScene: (sceneId: string) => void
  onAddScene: (scene: Scene) => void
  onUpdateScene: (scene: Scene) => void
  onDeleteScene: (sceneId: string) => void
}

const Editor: React.FC<EditorProps> = ({
  scenes,
  selectedSceneId,
  onSelectScene,
  onAddScene,
  onUpdateScene,
  onDeleteScene,
}) => {
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">
        <SceneList
          scenes={scenes}
          selectedSceneId={selectedSceneId}
          onSelectScene={onSelectScene}
          onAddScene={onAddScene}
          onDeleteScene={onDeleteScene}
        />
      </div>
      <div className="w-3/4">
        {selectedSceneId && (
          <SceneEditor
            scene={scenes.find(scene => scene.id === selectedSceneId)!}
            onUpdateScene={onUpdateScene}
          />
        )}
      </div>
    </div>
  )
}

export default Editor