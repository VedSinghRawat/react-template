import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { StateCreator, create } from 'zustand'

export type RootState = {}

export const useAppStore = create<RootState>()(immer(devtools((...api) => ({}))))

export type StateSlice<T> = StateCreator<RootState, [['zustand/immer', never]], [['zustand/devtools', never]], T>
