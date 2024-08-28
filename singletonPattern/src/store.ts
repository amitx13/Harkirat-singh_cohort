//The only thing too learn here is how to introduce singletonPattern on top of classes

//ugly way
interface Game {
    id:string
    blackPlayer:string
    whitePlayer:string
    moves:string[]
}

// export const games:Game[] = []

// The Singleton pattern is a design pattern used in software engineering to ensure that a class has only one instance and provides a global point of access to that instance.
// This means that no matter how many times you try to create an instance of the class, you will always get the same instance.

export class GameManager{
    games:Game[] = []

    private static instance:GameManager //to make sure only one instance of the class is created

    private constructor(){ //to make sure the class can't be instantiated from outside
        this.games = []
    }

    //static methods are called on the class itself, not on the instances of the class
    static getInstance(){ //to make sure only one instance of the class is created
        if(GameManager.instance){
            return GameManager.instance
        }
        GameManager.instance = new GameManager()
        return GameManager.instance
    }

    addMove(gameId:string,move:string){
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move)
    }

    addGame(gameId:string){
        const game = {
            id:gameId,
            blackPlayer:"nigga",
            whitePlayer:"honky",
            moves:[]
        }

        this.games.push(game)
    }

    log(){
        console.log(this.games)
    }
}