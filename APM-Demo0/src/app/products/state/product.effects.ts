import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
        private productService: ProductService) { }

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(() => this.productService.getProducts()),
        map(products => ProductActions.loadProductSuccess({products}))
    ));

    updateProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        concatMap((product) => this.productService.updateProduct(product.product)),
        map(newProduct => ProductActions.updateProductSuccess({product: newProduct})),
        catchError(error => of(ProductActions.updateProductError({error: error})))
    ));

    createProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.createProduct),
        concatMap(product => this.productService.createProduct(product.product)),
        map(newProduct => ProductActions.createProductSuccess({product: newProduct}))
    ));

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.deleteProduct),
        concatMap(product => this.productService.deleteProduct(product.productId).pipe(
            map(() => ProductActions.deleteProductSuccess({productId: product.productId})
    )))));
}