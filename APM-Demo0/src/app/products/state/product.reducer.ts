import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "../../state/app.state";
import * as ProdcuctActions from "./product.actions";

export interface State extends AppState.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean,
    currentProductId: number | null,
    products: Product[],
    error: string
}

const initialState = <ProductState>{
    showProductCode: true,
    currentProductId: 0,
    products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode);

export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, id) => {
        if (id !== 0) {
            return id ? state.products.find(product => product.id == state.currentProductId) : null;
        }

        return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
        };
    });

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
            currentProductId: change.currentProductId
        }
    }),
    on(ProdcuctActions.clearCurrentProduct, state => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProdcuctActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        }
    }),
    on(ProdcuctActions.loadProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products
        }
    }),
    on(ProdcuctActions.updateProductSuccess, (state, action): ProductState => {
        const products = state.products.map(product => product.id == action.product.id ? action.product : product);
        return {
            ...state,
            products,
            error: ''
        }
    }),
    on(ProdcuctActions.updateProductError, (state, action) => {
        return {
            ...state,
            error: action.error
        }
    })
);