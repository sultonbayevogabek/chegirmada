import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { YoutubePlayer } from '../../core/components/youtube-player/youtube-player.component';

@Component({
  selector: 'webview-player',
  templateUrl: 'webview-player.component.html',
  styleUrl: 'webview-player.component.scss',
  imports: [
    YoutubePlayer
  ],
  standalone: true
})

export class WebviewPlayerComponent implements OnInit {
  videoURL: string;
  aspectRatio: number = 1;
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((queryParams: Params) => {
        if (queryParams && queryParams['url']) {
          this.videoURL = queryParams['url'];
        }
        if (queryParams && queryParams['aspect_ratio']) {
          this.aspectRatio= queryParams['aspect_ratio'];
        }

        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 0);
      })
  }
}

