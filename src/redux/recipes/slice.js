import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from './operations.js';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    loading: false,
    error: null,
    total: 0,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // --- ЛОГУВАННЯ ДЛЯ ДІАГНОСТИКИ ---
        console.log('Recipes Slice: fetchRecipes.fulfilled triggered!');
        console.log('Full Action Payload:', action.payload);
        console.log('Type of Action Payload:', typeof action.payload);
        console.log(
          'Action Payload .data (expected recipes array):',
          action.payload?.data
        );
        console.log(
          'Action Payload .totalItems (expected total):',
          action.payload?.totalItems
        );
        // --- КІНЕЦЬ ЛОГУВАННЯ ---

        // Змінюємо доступ: припускаємо, що action.payload вже є тим об'єктом, що містить 'data' та 'totalItems'
        let receivedRecipes = [];
        let totalItems = 0;

        if (action.payload && typeof action.payload === 'object') {
          receivedRecipes = Array.isArray(action.payload.data) // Тепер recipes - це action.payload.data
            ? action.payload.data
            : [];
          totalItems =
            typeof action.payload.totalItems === 'number' // Тепер totalItems - це action.payload.totalItems
              ? action.payload.totalItems
              : 0;
        } else {
          console.error(
            'Unexpected payload structure. Payload is not an object:',
            action.payload
          );
          state.items = [];
          state.total = 0;
          state.error = 'Unexpected data format from server.';
          return; // Вийти, якщо payload не відповідає очікуванням
        }

        if (action.meta.arg.page === 1) {
          state.items = receivedRecipes;
        } else {
          state.items = [...state.items, ...receivedRecipes];
        }

        state.total = totalItems; // Встановлюємо загальну кількість
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
