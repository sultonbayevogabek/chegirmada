import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProfileEmptyListComponent } from '../../profile-empty-list/profile-empty-list.component';
import { TabsComponent } from '../../../../core/components/tabs/tabs.component';
import { MatIcon } from '@angular/material/icon';
import { ProductHorizontalCardComponent } from '../../product-horizontal-card/product-horizontal-card.component';
import { UiButtonComponent } from '../../../../core/components/ui-button/ui-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS } from '../../../../core/constants/products';
import { MyAnnouncementsService } from '../../../../core/services/my-announcements.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Announcement } from '../../../../core/models/announcement.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SpinnerLoaderComponent } from '../../../../core/components/spinner-loader/spinner-loader.component';

@Component({
  selector: 'announcements-list',
  standalone: true,
  imports: [
    TabsComponent,
    ProfileEmptyListComponent,
    MatIcon,
    ProductHorizontalCardComponent,
    UiButtonComponent,
    TranslateModule,
    RouterLink,
    FormsModule,
    MatPaginator,
    SpinnerLoaderComponent
  ],
  templateUrl: 'announcements-list.component.html',
  styleUrl: 'announcements-list.component.scss',
  providers: [
    MyAnnouncementsService,
    ToasterService
  ]
})

export class AnnouncementsListComponent implements OnInit {
  params = {
    page_size: 5,
    page: 0,
    total: 0,
    search: '',
    is_active: true,
    status: 1
  };
  loading = true;
  tabs = [
    {
      routerLink: [ '../active' ],
      text: 'active'
    },
    {
      routerLink: [ '../pending' ],
      text: 'pending'
    },
    {
      routerLink: [ '../not-active' ],
      text: 'inactive'
    },
    {
      routerLink: [ '../rejected' ],
      text: 'rejected'
    }
  ];
  announcements: Announcement[] = [];
  products = PRODUCTS;

  private _myAnnouncementService = inject(MyAnnouncementsService);
  private _activatedRoute = inject(ActivatedRoute);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params: { status: string }) => {
        this.changeParamsByRoute(params?.status);
      });
  }

  changeParamsByRoute(status: string): void {
    this.params.page = 0;
    this.params.search = '';

    if (status === 'active') {
      this.params.status = 1;
      this.params.is_active = true;
    }

    if (status === 'pending') {
      this.params.status = 0;
      delete this.params.is_active;
    }

    if (status === 'not-active') {
      this.params.is_active = false;
      delete this.params.status;
    }

    if (status === 'rejected') {
      this.params.status = 2;
      delete this.params.is_active;
    }

    this.getMyAnnouncements();
  }

  searchAnnouncement(): void {
    this.params.page = 0;
    this.getMyAnnouncements();
  }

  getMyAnnouncements(): void {
    this._myAnnouncementService.getMyAnnouncements(this.params)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.loading = false;
        this.announcements = res.results;
        this.params.total = +res?.count;
      }, _ => {
        this.loading = false;
        this.announcements = [];
      });
  }

  onPageChange($event: PageEvent): void {
    this.params.page = $event.pageIndex;
    this.getMyAnnouncements();
  }
}
