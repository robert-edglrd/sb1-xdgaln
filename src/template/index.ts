import { Template } from '../core/types'

export const templates: Template[] = [
  {
    id: '1',
    name: 'Basic Story',
    scenes: [
      {
        id: '1',
        name: 'Introduction',
        duration: 5,
        background: 'https://source.unsplash.com/random/800x600?landscape',
        dialogues: [
          {
            id: '1',
            character: 'Narrator',
            content: 'Once upon a time...',
            startTime: 0,
            duration: 3,
          },
        ],
        characters: [
          {
            id: '1',
            name: 'Narrator',
            portrait: 'https://source.unsplash.com/random/100x100?face',
          },
        ],
      },
      // Add more predefined scenes here
    ],
  },
  // Add more templates here
]

export function getTemplate(id: string): Template | undefined {
  return templates.find(template => template.id === id)
}