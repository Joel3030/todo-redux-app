import { createAction, props } from '@ngrx/store';

export type validFilter = 'all' | 'completed' | 'active';

export const setFilter = createAction(
  '[Filter] set Filter',
  props<{ filter: validFilter }>()
);
