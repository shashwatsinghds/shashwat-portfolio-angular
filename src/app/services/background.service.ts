import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private nodes: Node[] = [];
  private animationId: number | null = null;
  private nodeCount = 60;
  private maxDistance = 150;

  constructor() {}

  initializeBackground(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    if (!this.ctx) return;

    this.resizeCanvas();
    this.createNodes();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createNodes(): void {
    this.nodes = [];
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push(new Node(this.canvas!));
    }
  }

  private animate(): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw nodes
    this.nodes.forEach(node => {
      node.update();
      node.draw(this.ctx!);
    });

    // Draw connections
    this.nodes.forEach(node => {
      node.findConnections(this.nodes, this.maxDistance);
      node.drawConnections(this.ctx!);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

class Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: Node[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 2 + 1.5;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#e6e600';
    ctx.fill();
  }

  findConnections(nodes: Node[], maxDistance: number): void {
    this.connections = [];
    nodes.forEach(node => {
      if (node !== this) {
        const distance = Math.sqrt(
          Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2)
        );
        if (distance < maxDistance) {
          this.connections.push(node);
        }
      }
    });
  }

  drawConnections(ctx: CanvasRenderingContext2D): void {
    this.connections.forEach(node => {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = 'rgba(230, 230, 0, 0.6)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });
  }
}