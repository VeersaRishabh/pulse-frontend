import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import pendingFeedbacksReducer from './slices/pending-feedbacks/pendingFeedbacksSlice';
import myFeedbacksReducers from './slices/my-feedbacks/myFeedbackSlice';
import userReducer from './slices/user-slice/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pendingFeedbacks', 'myFeedbacks', 'user'],
};

const rootReducer = combineReducers({
  myFeedbacks: myFeedbacksReducers,
  pendingFeedbacks: pendingFeedbacksReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
