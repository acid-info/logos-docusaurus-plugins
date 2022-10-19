import produce from 'immer'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { updateArray } from '../array.utils'
import { Hook } from './Hook'

type SetState<S = any> = (value: S | ((currentState: S) => void)) => void

type StoreType<S = any, D = any> = {
  state: S
  setState: SetState<S>

  dispatch: D
}

type Dispatch<T> = (payload: T) => void

type DispatchActions<T = any> = {
  [key: string]: Dispatch<T>
}

type StoreActions<
  S,
  A extends DispatchActions<any>,
  I extends Array<any> = [],
> = {
  [K in keyof A]: (
    payload: Parameters<A[K]>[0],
    state: S,
    setState: SetState<S>,
    dispatch: A,
    ...injected: I
  ) => void
}

export class Store<
  S = {},
  A extends DispatchActions<any> = {},
  I extends any[] | [] = [],
> {
  stateRef: React.MutableRefObject<S>
  setStateRef: React.MutableRefObject<SetState<S>>
  injectedRef: React.MutableRefObject<Array<any>>

  private context: React.Context<StoreType<S, A>>

  constructor(
    private actions: () => StoreActions<S, A, I>,
    private inject: any[] = [],
  ) {}

  public useCreateStore = (initialState: S): StoreType<S> => {
    const [state, _setState] = useState(initialState)

    const setState: SetState = (value) =>
      typeof value === 'function'
        ? _setState(produce<S>(value))
        : _setState(value)

    const dispatch = useMemo(() => this.createDispatch(), [])

    return { state, setState, dispatch }
  }

  public Provider: React.FC<React.PropsWithChildren<{ store: StoreType<S> }>> =
    ({ children, store }) => {
      this.stateRef = useRef(store.state)
      this.setStateRef = useRef(store.setState)
      this.injectedRef = useRef(this.inject.map((hook) => null))

      if (!this.context) {
        this.context = React.createContext(null as any)
      }

      const P = this.context.Provider

      this.stateRef.current = store.state
      this.setStateRef.current = store.setState

      return (
        <P value={store}>
          {children}

          {this.inject.map((hook, index) => (
            <Hook
              key={index}
              hook={hook}
              onChange={(value) => {
                this.injectedRef.current = updateArray(
                  this.injectedRef.current,
                  index,
                  index,
                  () => value,
                )
              }}
            />
          ))}
        </P>
      )
    }

  public useStore = () => {
    return useContext(this.context)
  }

  public useDispatch = () => this.useStore().dispatch

  useSelector<T = any>(selector: (state: S) => T): T {
    const { state } = this.useStore()
    const value = selector(state)

    return useMemo<T>(() => value, [value])
  }

  selector<T = any>(selector: (state: S) => T) {
    return selector
  }

  private createDispatch = (): A => {
    const dispatch = Object.fromEntries(
      Object.entries(this.actions()).map(([name, func]) => [
        name,
        (payload: any) => {
          const set = (args: any) => this.setStateRef.current(args)
          func(
            payload,
            this.stateRef.current,
            set,
            dispatch,
            ...this.injectedRef.current,
          )
        },
      ]),
    )

    return dispatch as A
  }
}
