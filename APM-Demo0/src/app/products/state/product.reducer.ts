import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "../../state/app.state";
import * as ProdcuctActions from "./product.actions";

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product,
    products: Product[]
}

const initialState = <ProductState>{
    showProductCode: true,
    currentProduct: null,
    products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProdcuts = createSelector(
    getProductFeatureState,
    state => state.products);

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProdcuctActions.toggleProductCode, state => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProdcuctActions.setCurrentProduct, (state, change) => {
        return {
            ...state,
            currentProduct: change.product
        }
    }),
    on(ProdcuctActions.clearCurrentProduct, state => {
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProdcuctActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                description: '',
                id: 0,
                productCode: 'New',
                starRating: 0,
                productName: ''
            }
        }
    }),
    on(ProdcuctActions.loadProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products
        }
    })
);