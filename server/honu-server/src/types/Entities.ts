import { Position } from './Postion';
import { DirectionType, directionArray } from './Directions';

// Each class must only contain attributes as they need to be serialized and deserialized easily

export interface Player {
  dir: DirectionType
  pos: Position
}

export interface Flag {
  pos: Position
}