export interface Root {
    chess_daily?: ChessDaily
    chess960_daily?: Chess960Daily
    chess_rapid?: ChessRapid
    chess_bullet?: ChessBullet
    chess_blitz?: ChessBlitz
    fide: number
    tactics: Tactics
    puzzle_rush: PuzzleRush
  }
  
  export interface ChessDaily {
    last: Last
    best: Best
    record: Record
  }
  
  export interface Last {
    rating: number
    date: number
    rd: number
  }
  
  export interface Best {
    rating: number
    date: number
    game: string
  }
  
  export interface Record {
    win: number
    loss: number
    draw: number
    time_per_move: number
    timeout_percent: number
  }
  
  export interface Chess960Daily {
    last: Last2
    best: Best2
    record: Record2
  }
  
  export interface Last2 {
    rating: number
    date: number
    rd: number
  }
  
  export interface Best2 {
    rating: number
    date: number
    game: string
  }
  
  export interface Record2 {
    win: number
    loss: number
    draw: number
    time_per_move: number
    timeout_percent: number
  }
  
  export interface ChessRapid {
    last: Last3
    best: Best3
    record: Record3
  }
  
  export interface Last3 {
    rating: number
    date: number
    rd: number
  }
  
  export interface Best3 {
    rating: number
    date: number
    game: string
  }
  
  export interface Record3 {
    win: number
    loss: number
    draw: number
  }
  
  export interface ChessBullet {
    last: Last4
    best: Best4
    record: Record4
  }
  
  export interface Last4 {
    rating: number
    date: number
    rd: number
  }
  
  export interface Best4 {
    rating: number
    date: number
    game: string
  }
  
  export interface Record4 {
    win: number
    loss: number
    draw: number
  }
  
  export interface ChessBlitz {
    last: Last5
    best: Best5
    record: Record5
  }
  
  export interface Last5 {
    rating: number
    date: number
    rd: number
  }
  
  export interface Best5 {
    rating: number
    date: number
    game: string
  }
  
  export interface Record5 {
    win: number
    loss: number
    draw: number
  }
  
  export interface Tactics {
    highest: Highest
    lowest: Lowest
  }
  
  export interface Highest {
    rating: number
    date: number
  }
  
  export interface Lowest {
    rating: number
    date: number
  }
  
  export interface PuzzleRush {
    best: Best6
  }
  
  export interface Best6 {
    total_attempts: number
    score: number
  }
  