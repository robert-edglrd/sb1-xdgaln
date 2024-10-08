export interface Scene {
  id: string
  name: string
  duration: number
  background: string
  dialogues: Dialogue[]
  characters: Character[]
  type: string // Add this line to include the scene type
}

export interface Dialogue {
  id: string
  character: string
  content: string
  startTime: number
  duration: number
}

export interface Character {
  id: string
  name: string
  portrait: string
}

export interface Template {
  id: string
  name: string
  scenes: Scene[]
}

export interface Element {
  id: string
  type: 'text' | 'image' | 'animated' | 'video' | 'graphic'
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
}