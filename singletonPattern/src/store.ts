//The only thing too learn here is how to introduce singletonPattern on top of classes

//ugly way
interface Game {
    id:string
    blackPlayer:string
    whitePlayer:string
    moves:string[]
}

export const games:Game[] = []