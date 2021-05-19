import React from 'react';

import { Stage, Sprite, Text, Container } from '@inlet/react-pixi';
import { settings, SCALE_MODES, TextStyle} from 'pixi.js';
import { LevelData } from '../../types/LevelData';
import { sprites, tileSpriteEnumMap, turtleAngleDirMap } from './assets/sprites';

// Disable interpolation when scaling, will make texture be pixelated
settings.SCALE_MODE = SCALE_MODES.NEAREST;

interface StateProps {
  gameDisplay: LevelData
  hasGameEnded: boolean
  hasUserWon: boolean
}

const STAGE_WIDTH: number = 1200
const STAGE_HEIGHT: number = 800

const SPRITE_IMAGE_PX: number = 16

const CONTAINER_PADDING_X = 10
const CONTAINER_PADDING_Y = 10

const CONTAINER_WIDTH: number = STAGE_WIDTH - 2*CONTAINER_PADDING_X
const CONTAINER_HEIGHT: number = STAGE_HEIGHT - 2*CONTAINER_PADDING_Y

export default function GameCanvas(props:StateProps) {
  
  const levelHeight: number = props.gameDisplay.level.length
  if (levelHeight === 0){
    console.error('Level has no rows in it!')
  }
  const levelWidth: number = props.gameDisplay.level[0].length

  const tileScale = calcTileScale(levelHeight,levelWidth)
  const tileSizeInPx = SPRITE_IMAGE_PX * tileScale

  const [levelOffsetX, levelOffsetY] = calcLevelOffset(levelHeight,levelWidth,tileSizeInPx)
  // const [levelOffsetX, levelOffsetY] = [40,40]


  const tileSprites = props.gameDisplay.level.map((row,i) => {
    return row.map((tile,j) => {
      return <Sprite
        image = {tileSpriteEnumMap.get(tile)}
        scale = {tileScale}
        x = {j*tileSizeInPx+levelOffsetX}
        y = {i*tileSizeInPx+levelOffsetY}
        zIndex = {0}
        key = {`${i},${j}`}
      />
    })
  })

  const flagSprites = props.gameDisplay.flags ? props.gameDisplay.flags.map(flag => 
    <Sprite
      image = {sprites.flag}
      scale = {tileScale}
      x={flag.pos.x*tileSizeInPx+levelOffsetX}
      y={flag.pos.y*tileSizeInPx+levelOffsetY}
      zIndex = {5}
      key = {`${flag.pos.x},${flag.pos.y}`}
    />
  ) : null;

  // console.log(props.flags)
  // console.log(flagSprites)

  // pivot is required to rotate sprite around the center
  // pivot is placed in the center of the sprite before scaling
  // because pivot causes a offset in the sprite, a readjustment needs to be made to the x and y
  const turtleSprite = <Sprite
    image = {sprites.turtle}
    scale = {tileScale}
    x={(props.gameDisplay.player.pos.x*tileSizeInPx)+tileSizeInPx/2+levelOffsetX}
    y={(props.gameDisplay.player.pos.y*tileSizeInPx)+tileSizeInPx/2+levelOffsetY}
    pivot={[SPRITE_IMAGE_PX/2,SPRITE_IMAGE_PX/2]}
    angle={turtleAngleDirMap.get(props.gameDisplay.player.dir)}
    zIndex = {10}
  />

  let endText
  if(props.hasGameEnded){
    const endString: string = props.hasUserWon ? 'Test Passed!' : 'Try Again'
    endText = 
      <Text
        text={endString} 
        anchor={0.5}
        x={CONTAINER_WIDTH/2}
        y={CONTAINER_HEIGHT/2}
        zIndex={15}
        style={
          new TextStyle({
            align: 'center',
            fontFamily: '"Courier New", "Source Sans Pro", Helvetica, sans-serif',
            fontSize: 50,
            wordWrap: true,
            wordWrapWidth: 440,
            stroke: '#ffffff',
            strokeThickness: 1,
          })
        }
      />
  }
  return (
    <Stage className={'rounded'} width={STAGE_WIDTH} height={STAGE_HEIGHT} style={{ width: '100%' }} options={{ backgroundColor: 0xeef1f5}}>
      <Container position={[CONTAINER_PADDING_X,CONTAINER_PADDING_Y]}>
        {tileSprites}
        {flagSprites}
        {turtleSprite}
        {endText}
      </Container>
    </Stage>
  )
}

/**
 * Return the scale of the tiles.
 * This scale is the max scale that will fit within the container, or equal to 1, depending on which is largest
 * @param levelHeight 
 * @param levelWidth 
 */
function calcTileScale(levelHeight:number, levelWidth:number): number{
  return Math.max(1,
    Math.floor(Math.min(CONTAINER_WIDTH/levelWidth,CONTAINER_HEIGHT/levelHeight)/SPRITE_IMAGE_PX)
  )
}

function calcLevelOffset(levelHeight:number, levelWidth:number, tileSizeInPx: number): number[]{
  const yOffSet = (CONTAINER_HEIGHT-levelHeight*tileSizeInPx)/2
  const xOffSet = (CONTAINER_WIDTH-levelWidth*tileSizeInPx)/2
  // console.log([xOffSet,yOffSet])
  // console.log(levelHeight*tileSizeInPx)
  // console.log(CONTAINER_HEIGHT)
  return [xOffSet,yOffSet]
}