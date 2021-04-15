import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ListState } from './list.reducer';

export const selectListState = createFeatureSelector<ListState>('list');

export const selectListEntites = createSelector(
  selectListState,
  (state: ListState) => state.entities
);

export const selectListLoading = createSelector(
  selectListState,
  (state: ListState) => state.loading
);

export const selectListLoadingMore = createSelector(
  selectListState,
  (state: ListState) => state.loadingMore
);

export const selectListError = createSelector(
  selectListState,
  (state: ListState) => state.error
);

export const selectListPage = createSelector(
  selectListState,
  (state: ListState) => state.page
);
