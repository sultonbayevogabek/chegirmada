import { AfterViewInit, Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';
import { max } from 'rxjs';

@Component({
  selector: 'confetti-alert',
  templateUrl: 'confetti-alert.component.html',
  styleUrl: 'confetti-alert.component.scss',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class ConfettiAlertComponent implements AfterViewInit {
  @Inject(MAT_DIALOG_DATA) data: {
    text: string
  } = inject(MAT_DIALOG_DATA);

  ngAfterViewInit() {
    let W = window.innerWidth;
    let H = document.getElementById('confetti').clientHeight;
    const canvas = document.getElementById('confetti');
    const context = (canvas as HTMLCanvasElement).getContext('2d');
    const maxConfetti = 60;
    const particles: any[] = [];

    const possibleColors = [
      '#56B8A5A6',
      '#FDA5A599',
      '#FDA5A573',
      '#ECB43C99',
      '#ECB43CD9',
      '#ff7336',
      '#f9e038',
      '#02cca4',
      '#383082',
      '#fed3f5',
      '#b1245a',
      '#f2733f'
    ];

    function randomFromTo(from: number, to: number) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle(): void {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.r = randomFromTo(0, 20);
      this.d = Math.random() * maxConfetti + 11;
      this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }

    function Draw() {
      const results = [];
      requestAnimationFrame(Draw);
      context.clearRect(0, 0, W, window.innerHeight);
      for (let i = 0; i < maxConfetti; i++) {
        results.push(particles[i].draw());
      }

      let particle: {
        tiltAngle?: number;
        tiltAngleIncremental?: number;
        x?: number;
        y?: number;
        d?: number;
        r?: number;
        tilt?: number;
      } = {};
      let remainingFlakes = 0;
      for (let i = 0; i < maxConfetti; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
        if (particle.y <= H) remainingFlakes++;
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
      return results;
    }

    for (let i = 0; i < maxConfetti; i++) {
      particles.push(new confettiParticle());
    }

    (canvas as HTMLCanvasElement).width = W;
    (canvas as HTMLCanvasElement).height = H;
    Draw();
  }
}
