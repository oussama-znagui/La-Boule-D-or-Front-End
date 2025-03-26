import { Player } from "./player"

export interface Match {
    id: number,
    duration: string,
    winner: Player
    player1: Player,
    player2: Player,
    
}
