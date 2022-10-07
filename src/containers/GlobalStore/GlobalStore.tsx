import { Store as StoreBase } from '@site/src/lib/store'

export namespace GlobalStore {
  export type State = {
    hiddenSidebar: boolean
  }

  export type Actions = {
    setHiddenSidebar: (payload: any) => void
  }

  export class Store extends StoreBase<State, Actions, []> {}
}

export const globalStore = new GlobalStore.Store(() => {
  return {
    setHiddenSidebar: (payload, state, setState, dispatch) => {
      setState((state) => {
        state.hiddenSidebar =
          typeof payload === 'function' ? payload(state.hiddenSidebar) : payload
      })
    },
  }
}, [])

export const selectHiddenSidebar = globalStore.selector(
  (state) => state.hiddenSidebar,
)
