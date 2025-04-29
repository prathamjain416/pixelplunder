
import { PlatformState, CollectibleState } from '@/contexts/GameContext';

export interface LevelConfig {
  platforms: Omit<PlatformState, 'id'>[];
  collectibles: Omit<CollectibleState, 'id' | 'collected'>[];
  playerStart: { x: number; y: number };
}

export const LEVELS: LevelConfig[] = [
  // Level 1 - Tutorial level
  {
    playerStart: { x: 50, y: 300 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 800, height: 20 } },
      { position: { x: 200, y: 300 }, size: { width: 100, height: 20 } },
      { position: { x: 400, y: 250 }, size: { width: 100, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 230, y: 270 } },
      { type: 'gem', position: { x: 450, y: 220 } },
    ],
  },
  // Level 2 - Stepping stones
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 150, height: 20 } },
      { position: { x: 200, y: 350 }, size: { width: 100, height: 20 } },
      { position: { x: 350, y: 300 }, size: { width: 100, height: 20 } },
      { position: { x: 500, y: 250 }, size: { width: 100, height: 20 } },
      { position: { x: 650, y: 200 }, size: { width: 150, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 220, y: 320 } },
      { type: 'coin', position: { x: 370, y: 270 } },
      { type: 'gem', position: { x: 700, y: 170 } },
    ],
  },
  // Level 3 - Vertical challenge
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 150, height: 20 } },
      { position: { x: 200, y: 350 }, size: { width: 80, height: 20 } },
      { position: { x: 350, y: 280 }, size: { width: 80, height: 20 } },
      { position: { x: 200, y: 200 }, size: { width: 80, height: 20 } },
      { position: { x: 350, y: 120 }, size: { width: 80, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 220, y: 320 } },
      { type: 'coin', position: { x: 370, y: 250 } },
      { type: 'gem', position: { x: 370, y: 90 } },
    ],
  },
  // Level 4 - Zigzag path
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 120, height: 20 } },
      { position: { x: 180, y: 350 }, size: { width: 100, height: 20 } },
      { position: { x: 340, y: 300 }, size: { width: 100, height: 20 } },
      { position: { x: 500, y: 250 }, size: { width: 100, height: 20 } },
      { position: { x: 660, y: 200 }, size: { width: 140, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 200, y: 320 } },
      { type: 'coin', position: { x: 360, y: 270 } },
      { type: 'coin', position: { x: 520, y: 220 } },
      { type: 'gem', position: { x: 700, y: 170 } },
    ],
  },
  // Level 5 - Platform maze
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 100, height: 20 } },
      { position: { x: 150, y: 350 }, size: { width: 80, height: 20 } },
      { position: { x: 300, y: 300 }, size: { width: 80, height: 20 } },
      { position: { x: 450, y: 250 }, size: { width: 80, height: 20 } },
      { position: { x: 600, y: 200 }, size: { width: 80, height: 20 } },
      { position: { x: 700, y: 150 }, size: { width: 100, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 170, y: 320 } },
      { type: 'coin', position: { x: 320, y: 270 } },
      { type: 'gem', position: { x: 740, y: 120 } },
    ],
  },
  // Level 6 - Double jump challenge
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 120, height: 20 } },
      { position: { x: 200, y: 320 }, size: { width: 80, height: 20 } },
      { position: { x: 360, y: 240 }, size: { width: 80, height: 20 } },
      { position: { x: 520, y: 160 }, size: { width: 80, height: 20 } },
      { position: { x: 680, y: 80 }, size: { width: 120, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 220, y: 290 } },
      { type: 'coin', position: { x: 380, y: 210 } },
      { type: 'coin', position: { x: 540, y: 130 } },
      { type: 'gem', position: { x: 720, y: 50 } },
    ],
  },
  // Level 7 - Floating islands
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 100, height: 20 } },
      { position: { x: 180, y: 350 }, size: { width: 120, height: 20 } },
      { position: { x: 380, y: 300 }, size: { width: 120, height: 20 } },
      { position: { x: 580, y: 250 }, size: { width: 120, height: 20 } },
      { position: { x: 380, y: 200 }, size: { width: 120, height: 20 } },
      { position: { x: 180, y: 150 }, size: { width: 120, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 220, y: 320 } },
      { type: 'coin', position: { x: 420, y: 270 } },
      { type: 'coin', position: { x: 620, y: 220 } },
      { type: 'gem', position: { x: 220, y: 120 } },
    ],
  },
  // Level 8 - Speed run
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 800, height: 20 } },
      { position: { x: 200, y: 300 }, size: { width: 60, height: 20 } },
      { position: { x: 320, y: 300 }, size: { width: 60, height: 20 } },
      { position: { x: 440, y: 300 }, size: { width: 60, height: 20 } },
      { position: { x: 560, y: 300 }, size: { width: 60, height: 20 } },
      { position: { x: 680, y: 300 }, size: { width: 60, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 220, y: 270 } },
      { type: 'coin', position: { x: 340, y: 270 } },
      { type: 'coin', position: { x: 460, y: 270 } },
      { type: 'coin', position: { x: 580, y: 270 } },
      { type: 'gem', position: { x: 700, y: 270 } },
    ],
  },
  // Level 9 - Precision jumps
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 100, height: 20 } },
      { position: { x: 160, y: 360 }, size: { width: 60, height: 20 } },
      { position: { x: 280, y: 320 }, size: { width: 60, height: 20 } },
      { position: { x: 400, y: 280 }, size: { width: 60, height: 20 } },
      { position: { x: 520, y: 240 }, size: { width: 60, height: 20 } },
      { position: { x: 640, y: 200 }, size: { width: 160, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 180, y: 330 } },
      { type: 'coin', position: { x: 300, y: 290 } },
      { type: 'coin', position: { x: 420, y: 250 } },
      { type: 'coin', position: { x: 540, y: 210 } },
      { type: 'gem', position: { x: 700, y: 170 } },
    ],
  },
  // Level 10 - Final challenge
  {
    playerStart: { x: 50, y: 350 },
    platforms: [
      { position: { x: 0, y: 400 }, size: { width: 100, height: 20 } },
      { position: { x: 160, y: 350 }, size: { width: 80, height: 20 } },
      { position: { x: 300, y: 300 }, size: { width: 80, height: 20 } },
      { position: { x: 440, y: 250 }, size: { width: 80, height: 20 } },
      { position: { x: 580, y: 200 }, size: { width: 80, height: 20 } },
      { position: { x: 440, y: 150 }, size: { width: 80, height: 20 } },
      { position: { x: 300, y: 100 }, size: { width: 80, height: 20 } },
      { position: { x: 160, y: 50 }, size: { width: 80, height: 20 } },
    ],
    collectibles: [
      { type: 'coin', position: { x: 180, y: 320 } },
      { type: 'coin', position: { x: 320, y: 270 } },
      { type: 'coin', position: { x: 460, y: 220 } },
      { type: 'coin', position: { x: 600, y: 170 } },
      { type: 'gem', position: { x: 180, y: 20 } },
    ],
  },
];
