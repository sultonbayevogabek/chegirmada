import { FormControl, ValidationErrors } from '@angular/forms';
export function youtubeVideoURL(control: FormControl): ValidationErrors | null {
  const value: string = control?.value?.trim();

  const YOUTUBE_VIDEO_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;

  if (value.match(YOUTUBE_VIDEO_REGEX)?.length && value.match(YOUTUBE_VIDEO_REGEX)[1].length === 11 || !value.length) {
    return null;
  }

  return { invalidURL: true };
}
