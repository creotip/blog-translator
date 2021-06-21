import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import generalReducer from './reducers/general'

const generalPersistConfig = {
  key: 'general',
  storage,
  blacklist: ['locale', 'posts', 'translatedPosts'],
}

const appReducer = combineReducers({
  general: persistReducer<any, any>(generalPersistConfig, generalReducer),
})

export const rootReducer = (state: any, action: any) => {
  return appReducer(state, action)
}

composeWithDevTools(applyMiddleware(thunk))

export type RootState = ReturnType<typeof appReducer>
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { persistor, store }
