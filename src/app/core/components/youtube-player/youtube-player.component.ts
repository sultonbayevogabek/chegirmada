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
  @Input({
    alias: 'videoURL',
    transform: (url: string): string => {
      const YOUTUBE_VIDEO_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;

      if (url.match(YOUTUBE_VIDEO_REGEX)?.length) {
        return url.match(YOUTUBE_VIDEO_REGEX)[1];
      }

      return ''
    }
  }) videoID: string;
  @Input() aspectRatio?: number = 9 / 16;
  @Input() rounded = true;

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

    this.videoHeight = this.videoWidth * this.aspectRatio
  }
}


