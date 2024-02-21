import { AfterViewInit, Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confetti-alert',
  templateUrl: 'confetti-alert.component.html',
  styleUrl: 'confetti-alert.component.scss',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class ConfettiComponent implements AfterViewInit {
  @Inject(MAT_DIALOG_DATA) data: { text: string } = inject(MAT_DIALOG_DATA);
  @ViewChild('confettiCanvas') confettiCanvas: ElementRef<HTMLCanvasElement>;

  private W: number;
  private H: number;
  private context: CanvasRenderingContext2D;
  private maxConfetti = 70;
  private particles: {
    x: number,
    y: number,
    r: number,
    d: number,
    color: string,
    tilt: number,
    tiltAngleIncremental: number,
    tiltAngle: number,
    draw: () => void
  }[] = [];
  private possibleColors = [
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

  ngAfterViewInit() {
    this.W = window.innerWidth;
    this.H = this.confettiCanvas.nativeElement.clientHeight;
    this.context = this.confettiCanvas.nativeElement.getContext('2d');

    this.confettiCanvas.nativeElement.width = this.W;
    this.confettiCanvas.nativeElement.height = this.H;

    for (let i = 0; i < this.maxConfetti; i++) {
      this.particles.push(this.createConfettiParticle());
    }

    this.draw();
  }

  private createConfettiParticle(): any {
    const element = {
      x: Math.random() * this.W,
      y: Math.random() * this.H - this.H,
      r: this.randomFromTo(0, 30),
      d: Math.random() * this.maxConfetti + 11,
      color: this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)],
      tilt: Math.floor(Math.random() * 33) - 11,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,

      draw: () => {
        this.context.beginPath();
        this.context.lineWidth = element.r / 2;
        this.context.strokeStyle = element.color;
        this.context.moveTo(element.x + element.tilt + element.r / 3, element.y);
        this.context.lineTo(element.x + element.tilt, element.y + element.tilt + element.r / 5);
        this.context.stroke();
      }
    };
    return element;
  }

  private randomFromTo(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  private draw() {
    requestAnimationFrame(() => {
      this.draw();
    });
    this.context.clearRect(0, 0, this.W, window.innerHeight);

    for (let i = 0; i < this.maxConfetti; i++) {
      this.particles[i].draw();
    }

    let remainingFlakes = 0;
    for (let i = 0; i < this.maxConfetti; i++) {
      const particle = this.particles[i];

      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
      particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

      if (particle.y <= this.H) remainingFlakes++;
      if (particle.x > this.W + 30 || particle.x < -30 || particle.y > this.H) {
        particle.x = Math.random() * this.W;
        particle.y = -30;
        particle.tilt = this.randomFromTo(10, -20);
      }
    }
  }
}
