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
}