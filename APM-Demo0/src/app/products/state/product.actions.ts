import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction('[Product] Set Current Product',
    props<{ currentProductId: number }>());

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
);

export const loadProducts = createAction('[Product] Load');

export const loadProductSuccess = createAction(
    '[Product] Load Success',
    props<{products: Product[]}>()
);

// Not used, because the concept is pretty simple. Can't be bothered.
export const loadProductFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>());

export const updateProduct = createAction('[Product] Update', props<{product: Product}>());

export const updateProductSuccess = createAction('[Product] Update Success', props<{product: Product}>());

export const updateProductError = createAction('[Product] Update Error', props<{error: string}>());