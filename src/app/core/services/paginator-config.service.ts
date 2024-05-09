import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
	private _destroyRef = inject(DestroyRef);
	private _translateService = inject(TranslateService);

	constructor() {
		super();
    this.getAndInitTranslations();
	}

	getAndInitTranslations(): void {
		this._translateService
			.get(['items.per.page', 'next.page', 'previous.page', 'first.page', 'last.page'])
			.pipe(
				takeUntilDestroyed(this._destroyRef),
				map((translations) => {
					this.itemsPerPageLabel = translations['items.per.page'];
					this.nextPageLabel = translations['next.page'];
					this.previousPageLabel = translations['previous.page'];
					this.firstPageLabel = translations['first.page'];
					this.lastPageLabel = translations['last.page'];
					this.changes.next();
				}),
			)
			.subscribe();
	}

	override getRangeLabel = (page: number, pageSize: number, length: number): string => {
		if (length === 0 || pageSize === 0) {
			return `0 / ${length}`;
		}
		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
		return `${startIndex + 1} - ${endIndex} / ${length}`;
	};
}
