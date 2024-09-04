import { YaApiLoaderService } from 'angular8-yandex-maps';
import { ElementRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable()
export class YandexMapsService {
  private _map: ymaps.Map;
  private _yandexApiLoaderService: YaApiLoaderService = inject(YaApiLoaderService);
  private _toaster = inject(ToasterService);
  private _elementRef = inject(ElementRef);
  private _tashkent = [ 41.311151, 69.279737 ];

  public coordinatesAndAddress$ = new BehaviorSubject<{ coordinates: number[]; address: string }>({ coordinates: this._tashkent, address: '' });

  setMultipleLocationPoints(
    mapContainerId: string,
    points: {
      coordinates: number[],
      title: string;
      workingDayStart: number;
      workingDayEnd: number;
      workingTimeStart: string;
      workingTimeEnd: string;
    }[]
  ): void {
    this._yandexApiLoaderService.load()
      .subscribe(_ => {
        this._map = new ymaps.Map(mapContainerId, {
          center: points[0]?.coordinates,
          zoom: 10,
          controls: [ 'geolocationControl' ]
        });

        points.forEach(point => {
          const placeMark = new ymaps.Placemark(
            point.coordinates,
            {
              balloonContent: `
                <div class="balloon">
                  <div class="balloon-brand">${ point.title }</div>
                  <div class="balloon-work-time">${ point.workingDayStart } - ${ point.workingDayEnd } | ${ point.workingTimeStart } - ${ point.workingTimeEnd }</div>
                </div>
              `
            },
            {
              iconLayout: 'default#image',
              iconImageHref: '/assets/icons/location.svg',
              iconImageSize: [ 30, 36.67 ],
              iconImageOffset: [ -15, 0 ],
              balloonCloseButton: false,
              hideIconOnBalloonOpen: false
            });

          this._map.geoObjects.add(placeMark);
        });

        const bounds = this._map.geoObjects.getBounds();

        if (bounds) {
          const { clientWidth, clientHeight } = this._elementRef.nativeElement.querySelector('#' + mapContainerId);
          const { center, zoom }: { center?: number[], zoom?: number } = ymaps.util.bounds.getCenterAndZoom(
            bounds, [ clientWidth, clientHeight ]
          );
          this._map.setCenter(center);

          if (points.length > 1) {
            this._map.setZoom(zoom);
          } else {
            this._map.setZoom(18);
          }
        }
      });
  }

  setSingleLocationPoint(mapContainerId: string, currentPoint?: number[]): void {
    this._yandexApiLoaderService.load()
      .subscribe(_ => {
        this._map = new ymaps.Map(mapContainerId, {
          center: currentPoint || this._tashkent,
          zoom: 17,
          controls: []
        }, {});

        // Placemark
        const placeMark = new ymaps.Placemark(
          currentPoint || this._tashkent,
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: '/assets/icons/location.svg',
            iconImageSize: [ 40, 47.5 ],
            iconImageOffset: [ -20, -47.5 ],
            balloonCloseButton: false,
            hideIconOnBalloonOpen: false,
            draggable: true,
            hasBalloon: false
          });

        placeMark.events.add('dragend', e => {
          const coordinates = e.get('target').geometry.getCoordinates();
          this.setCoordinatesAndEmit(placeMark, coordinates, this._map);
          this._map.setCenter(coordinates);
        });

        this._map.geoObjects.add(placeMark);

        // Geo location control
        const geolocationControl = new ymaps.control.GeolocationControl({
          options: {
            float: 'right',
            floatIndex: 100,
            noPlacemark: false
          },
          data: {
            image: '/assets/icons/location.svg'
          }
        });

        geolocationControl.events.add('locationchange', e => {
          const coordinates: number[] = e.get('position');

          if (this._tashkent.toString() === coordinates.toString()) {
            this.getUserGeoLocation()
              .subscribe(res => {
                console.log(res);
              });
            this._toaster.open({
              type: 'warning',
              title: 'Внимание',
              message: 'Вы не разрешили определять ваше местоположение'
            });
            return;
          }
          this.setCoordinatesAndEmit(placeMark, coordinates, this._map);
        });

        this._map.controls.add(geolocationControl);

        // Search control
        const searchControl = new ymaps.control.SearchControl({
          options: {
            float: 'left',
            noPlacemark: true,
            size: 'large',
            provider: 'yandex#search',
            noSuggestPanel: true,
            noCentering: false
          }
        });
        searchControl.events.add('load', e => {
          const results = e.get('target').getResultsArray();
          if (results.length) {
            this.setCoordinatesAndEmit(placeMark, results[0].geometry.getCoordinates(), this._map, false);
          }
        });
        searchControl.events.add('resultselect', resultSelected => {
          resultSelected.stopImmediatePropagation();
          const index = resultSelected.get('index');
          searchControl.getResult(index).then(res => {
            const coordinates = res.geometry.getCoordinates();
            this.setCoordinatesAndEmit(placeMark, coordinates, this._map);
          });
        });

        // Click event
        this._map.events.add('click',e => {
          this.setCoordinatesAndEmit(placeMark, e.get('coords'), this._map);
        });

        this._map.controls.add(searchControl);
      });
  }

  setCoordinatesAndEmit(placeMark: ymaps.Placemark, coordinates: number[], map: ymaps.Map, withAddress = true): void {
    placeMark.geometry.setCoordinates(coordinates);
    map.setCenter(coordinates);
    map.setZoom(17);
    ymaps.geocode(coordinates, { kind: 'house' }).then((res: any): void => {
      this.coordinatesAndAddress$.next({
        coordinates,
        address: withAddress ? res.geoObjects.get(0).properties._data.text : ''
      });
    })
  }

  getUserGeoLocation(): Observable<string | number[]> {
    if (!('geolocations' in navigator)) {
      return of('Ваше устройство не имеет возможности определять вашу геолокацию.');
    }

    return of([ 2 ]);
  }
}
