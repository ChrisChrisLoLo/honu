import React, { useState } from 'react';

import { Stage, Sprite, Container } from '@inlet/react-pixi';
import { settings, SCALE_MODES } from 'pixi.js';
import { sprites, tileSpriteEnumMap, turtleAngleDirMap } from './assets/sprites';
import { TileType } from '../../types/TileType';
import { TestCase } from '../../types/TestCase';

import './GameCanvas.css';
import { LevelData } from '../../types/LevelData';
import { EntityType } from '../../types/EntityType';

// Disable interpolation when scaling, will make texture be pixelated
settings.SCALE_MODE = SCALE_MODES.NEAREST;

interface StateProps {
  readOnly: boolean
  selectedDrawType: TileType | EntityType 
  testCase: TestCase
  setTestCase: Function
  isExpectedOutput: boolean
}

const STAGE_WIDTH: number = 600
const STAGE_HEIGHT: number = 400

const SPRITE_IMAGE_PX: number = 16

const CONTAINER_PADDING_X = 10
const CONTAINER_PADDING_Y = 10

const CONTAINER_WIDTH: number = STAGE_WIDTH - 2 * CONTAINER_PADDING_X
const CONTAINER_HEIGHT: number = STAGE_HEIGHT - 2 * CONTAINER_PADDING_Y

export default function GameCanvas(props: StateProps) {

  function updateTileType(i: number, j: number) {
    if (props.readOnly){
      return
    }

    const newTestCase = { ...props.testCase }
    if (Object.values(TileType).includes(props.selectedDrawType as TileType)) {
      const tile = props.selectedDrawType as TileType
      if (props.isExpectedOutput) {
        newTestCase.expectedLevel[i][j] = tile
      } else {
        newTestCase.levelData.level[i][j] = tile
      }
    } else if (Object.values(EntityType).includes(props.selectedDrawType as EntityType)) {
      const entity = props.selectedDrawType as EntityType
      if (entity == EntityType.TURTLE) {
        newTestCase.levelData.player.pos.y = i
        newTestCase.levelData.player.pos.x = j
      } else if (entity == EntityType.FLAG) {
        const existingFlags = newTestCase.levelData.flags.filter(flag => flag.pos.y == i && flag.pos.x == j)
        if (existingFlags.length > 0) {
          newTestCase.levelData.flags = newTestCase.levelData.flags.filter(flag => flag != existingFlags[0])
        } else {
          newTestCase.levelData.flags.push({pos:{x:j, y:i}})
        }
      } else {
        throw Error(`${entity} is not a recognizable entity type!`)
      }
    } else {
      throw Error(`${props.selectedDrawType} is not a recognizable tile or entity type!`)
    }

    props.setTestCase(newTestCase)
  }

  let gameDisplay: LevelData = props.testCase.levelData
  if (props.isExpectedOutput) {
    gameDisplay = { ...gameDisplay, level: props.testCase.expectedLevel }
  }

  const levelHeight: number = gameDisplay.level.length
  if (levelHeight === 0) {
    console.error('Level has no rows in it!')
  }
  const levelWidth: number = gameDisplay.level[0].length

  const tileScale = calcTileScale(levelHeight, levelWidth)
  const tileSizeInPx = SPRITE_IMAGE_PX * tileScale

  const [levelOffsetX, levelOffsetY] = calcLevelOffset(levelHeight, levelWidth, tileSizeInPx)


  const tileSprites = gameDisplay.level.map((row, i) => {
    return row.map((tile, j) => {
      return <Sprite
        interactive={true}
        image={tileSpriteEnumMap.get(tile)}
        scale={tileScale}
        x={j * tileSizeInPx + levelOffsetX}
        y={i * tileSizeInPx + levelOffsetY}
        zIndex={0}
        key={`${i},${j}`}
        pointerdown={() => {
          updateTileType(i, j)
        }}
      />
    })
  })

  const flagSprites = gameDisplay.flags ? gameDisplay.flags.map(flag =>
    <Sprite
      image={sprites.flag}
      scale={tileScale}
      x={flag.pos.x * tileSizeInPx + levelOffsetX}
      y={flag.pos.y * tileSizeInPx + levelOffsetY}
      zIndex={5}
      key={`${flag.pos.x},${flag.pos.y}`}
    />
  ) : null;

  // pivot is required to rotate sprite around the center
  // pivot is placed in the center of the sprite before scaling
  // because pivot causes a offset in the sprite, a readjustment needs to be made to the x and y
  const turtleSprite = <Sprite
    image={sprites.turtle}
    scale={tileScale}
    x={(gameDisplay.player.pos.x * tileSizeInPx) + tileSizeInPx / 2 + levelOffsetX}
    y={(gameDisplay.player.pos.y * tileSizeInPx) + tileSizeInPx / 2 + levelOffsetY}
    pivot={[SPRITE_IMAGE_PX / 2, SPRITE_IMAGE_PX / 2]}
    angle={turtleAngleDirMap.get(gameDisplay.player.dir)}
    zIndex={10}
  />

  return (
    <div className={'checkerboard'} style={{ width: STAGE_WIDTH }}>
      <Stage className={'rounded'} width={STAGE_WIDTH} height={STAGE_HEIGHT} style={{ width: '100%' }} options={{ transparent: true }}>
        <Container position={[CONTAINER_PADDING_X, CONTAINER_PADDING_Y]}>
          {tileSprites}
          {flagSprites}
          {turtleSprite}
        </Container>
      </Stage>
    </div>
  )
}

/**
 * Return the scale of the tiles.
 * This scale is the max scale that will fit within the container, or equal to 1, depending on which is largest
 * @param levelHeight 
 * @param levelWidth 
 */
function calcTileScale(levelHeight: number, levelWidth: number): number {
  return Math.max(1,
    Math.floor(Math.min(CONTAINER_WIDTH / levelWidth, CONTAINER_HEIGHT / levelHeight) / SPRITE_IMAGE_PX)
  )
}

function calcLevelOffset(levelHeight: number, levelWidth: number, tileSizeInPx: number): number[] {
  const yOffSet = (CONTAINER_HEIGHT - levelHeight * tileSizeInPx) / 2
  const xOffSet = (CONTAINER_WIDTH - levelWidth * tileSizeInPx) / 2
  return [xOffSet, yOffSet]
}