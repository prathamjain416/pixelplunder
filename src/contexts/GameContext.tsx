import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { LEVELS } from '@/config/levels';

// Types for our game elements
export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type PlayerState = {
  position: Position;
  velocity: Position;
  size: Size;
  isJumping: boolean;
  direction: 'left' | 'right';
};

export type PlatformState = {
  id: number;
  position: Position;
  size: Size;
};

export type CollectibleType = 'coin' | 'gem';

export type CollectibleState = {
  id: number;
  type: CollectibleType;
  position: Position;
  collected: boolean;
};

export type GameState = {
  player: PlayerState;
  platforms: PlatformState[];
  collectibles: CollectibleState[];
  score: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  currentLevel: number;
};

// Game configuration constants
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const MOVEMENT_SPEED = 5;
const GAME_HEIGHT = 480;
const GAME_WIDTH = 800;

// Update defaultGameState to include currentLevel
const defaultGameState: GameState = {
  player: {
    position: { x: LEVELS[0].playerStart.x, y: LEVELS[0].playerStart.y },
    velocity: { x: 0, y: 0 },
    size: { width: 40, height: 40 },
    isJumping: false,
    direction: 'right',
  },
  platforms: LEVELS[0].platforms.map((platform, index) => ({ ...platform, id: index + 1 })),
  collectibles: LEVELS[0].collectibles.map((collectible, index) => ({
    ...collectible,
    id: index + 1,
    collected: false,
  })),
  score: 0,
  isGameOver: false,
  isGameStarted: false,
  currentLevel: 0,
};

// Update GameContextType
type GameContextType = {
  gameState: GameState;
  startGame: () => void;
  resetGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  stopMovement: () => void;
  jump: () => void;
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  // Game controls
  const startGame = useCallback(() => {
    setGameState((prev) => ({ 
      ...defaultGameState,
      isGameStarted: true,
      currentLevel: 0
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      ...defaultGameState,
      isGameStarted: false,
      isGameOver: false,
      score: 0,
      currentLevel: 0
    });
  }, []);

  const moveLeft = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        velocity: { ...prev.player.velocity, x: -MOVEMENT_SPEED },
        direction: 'left',
      },
    }));
  }, []);

  const moveRight = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        velocity: { ...prev.player.velocity, x: MOVEMENT_SPEED },
        direction: 'right',
      },
    }));
  }, []);

  const stopMovement = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      player: {
        ...prev.player,
        velocity: { ...prev.player.velocity, x: 0 },
      },
    }));
  }, []);

  const jump = useCallback(() => {
    setGameState((prev) => {
      if (!prev.player.isJumping) {
        return {
          ...prev,
          player: {
            ...prev.player,
            velocity: { ...prev.player.velocity, y: JUMP_FORCE },
            isJumping: true,
          },
        };
      }
      return prev;
    });
  }, []);

  // Load next level
  const loadNextLevel = useCallback(() => {
    const nextLevel = gameState.currentLevel + 1;
    if (nextLevel < LEVELS.length) {
      setGameState((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          position: { ...LEVELS[nextLevel].playerStart },
          velocity: { x: 0, y: 0 },
          isJumping: false,
        },
        platforms: LEVELS[nextLevel].platforms.map((platform, index) => ({
          ...platform,
          id: index + 1,
        })),
        collectibles: LEVELS[nextLevel].collectibles.map((collectible, index) => ({
          ...collectible,
          id: index + 1,
          collected: false,
        })),
        currentLevel: nextLevel,
      }));
    } else {
      setGameState((prev) => ({ ...prev, isGameOver: true }));
    }
  }, [gameState.currentLevel]);

  // Game physics update loop
  useEffect(() => {
    if (!gameState.isGameStarted || gameState.isGameOver) return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        // Update player position based on velocity
        const newPlayerPosition = {
          x: prev.player.position.x + prev.player.velocity.x,
          y: prev.player.position.y + prev.player.velocity.y,
        };

        // Apply gravity
        let newVelocityY = prev.player.velocity.y + GRAVITY;

        // Screen boundaries check
        if (newPlayerPosition.x < 0) newPlayerPosition.x = 0;
        if (newPlayerPosition.x + prev.player.size.width > GAME_WIDTH) {
          newPlayerPosition.x = GAME_WIDTH - prev.player.size.width;
        }

        // Check for platform collisions
        let isOnPlatform = false;
        prev.platforms.forEach((platform) => {
          // Check if player is on a platform
          if (
            newPlayerPosition.x + prev.player.size.width > platform.position.x &&
            newPlayerPosition.x < platform.position.x + platform.size.width &&
            prev.player.position.y + prev.player.size.height <= platform.position.y &&
            newPlayerPosition.y + prev.player.size.height >= platform.position.y
          ) {
            newPlayerPosition.y = platform.position.y - prev.player.size.height;
            newVelocityY = 0;
            isOnPlatform = true;
          }
        });

        // Check for collectible collisions
        const newCollectibles = [...prev.collectibles];
        let newScore = prev.score;

        newCollectibles.forEach((collectible, index) => {
          if (!collectible.collected &&
              newPlayerPosition.x + prev.player.size.width > collectible.position.x &&
              newPlayerPosition.x < collectible.position.x + 20 &&
              newPlayerPosition.y + prev.player.size.height > collectible.position.y &&
              newPlayerPosition.y < collectible.position.y + 20) {
            
            newCollectibles[index].collected = true;
            newScore += collectible.type === 'coin' ? 10 : 50;
          }
        });

        // Game over if player falls off the screen
        const isGameOver = newPlayerPosition.y > GAME_HEIGHT;

        // Check if all collectibles are collected
        const allCollectiblesCollected = newCollectibles.every(
          (collectible) => collectible.collected
        );

        if (allCollectiblesCollected) {
          loadNextLevel();
        }

        return {
          ...prev,
          player: {
            ...prev.player,
            position: newPlayerPosition,
            velocity: { ...prev.player.velocity, y: newVelocityY },
            isJumping: !isOnPlatform,
          },
          collectibles: newCollectibles,
          score: newScore,
          isGameOver: isGameOver,
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.isGameStarted, gameState.isGameOver, loadNextLevel]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      setKeys((prev) => ({ ...prev, [e.key]: true }));

      if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        jump();
      }
      if (e.key === 'Enter' && !gameState.isGameStarted) {
        startGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => ({ ...prev, [e.key]: false }));

      if ((e.key === 'ArrowLeft' || e.key === 'a') && !keys['ArrowRight'] && !keys['d']) {
        stopMovement();
      }
      if ((e.key === 'ArrowRight' || e.key === 'd') && !keys['ArrowLeft'] && !keys['a']) {
        stopMovement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.isGameOver, gameState.isGameStarted, jump, keys, moveLeft, moveRight, startGame, stopMovement]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        resetGame,
        moveLeft,
        moveRight,
        stopMovement,
        jump,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
