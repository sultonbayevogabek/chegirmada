import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'video-player',
  templateUrl: 'youtube-player.component.html',
  styleUrl: 'youtube-player.component.scss',
  imports: [
    YouTubePlayerModule
  ],
  standalone: true
})

export class YoutubePlayer implements OnInit, AfterViewInit {
  @ViewChild('youTubePlayer') youTubePlayer: ElementRef<HTMLDivElement>;
  @Input('videoID') videoID: string;

  videoHeight: number | undefined;
  videoWidth: number | undefined;
  private _changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.videoWidth = Math.min(
      this.youTubePlayer.nativeElement.clientWidth,
      1200
    );

    this.videoHeight = this.videoWidth * 9 / 16;
    this._changeDetectorRef.detectChanges();
  }
}
