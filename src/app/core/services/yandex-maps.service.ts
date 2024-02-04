import { YaApiLoaderService } from 'angular8-yandex-maps';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class YandexMapsService {
  private _map: ymaps.Map;
  private _yandexApiLoaderService = inject(YaApiLoaderService);

  _points = [
    [ 41.297865, 69.249339 ],
    [ 41.301983, 69.286716 ],
    [ 41.325948, 69.254544 ],
    [ 41.311171, 69.328623 ],
    [ 41.306766, 69.3380719 ],
    [ 41.295693, 69.275240 ],
    [ 41.301983, 69.286716 ],
    [ 41.277278, 69.287222 ]
  ];

  initMap(id: string): void {
    console.log(id);
    this._yandexApiLoaderService.load()
      .subscribe( _ => {
        this._map = new ymaps.Map(id, {
          // The map center coordinates.
          // Default order: «latitude, longitude».
          // To not manually determine the map center coordinates,
          // use the Coordinate detection tool.
          center: [ 41.311171, 69.328623 ],
          // Zoom level. Acceptable values:
          // from 0 (the entire world) to 19.
          zoom: 12,
          controls: [ 'geolocationControl' ],
        }, {
        });

        this._points.forEach(async point => {
          const myPlaceMark = new ymaps.Placemark(
            point,
            {
              balloonContent: `
                <div class="balloon">
                  <div class="balloon-brand">BroStore Мирабад</div>
                  <div class="balloon-work-time">Du - Yak | 09:00 - 18:00</div>
                </div>
              `
            },
            {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: '/assets/icons/location.svg',
              // Размеры метки.
              iconImageSize: [ 30, 36.67 ],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [ -15, 0 ],
              balloonCloseButton: false,
              hideIconOnBalloonOpen: false
            });

          this._map.geoObjects.add(myPlaceMark)
        });
      });
  }
}
