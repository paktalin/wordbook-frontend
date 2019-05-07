export class WordRecord {

/*  constructor(foreignWord: string, translatedWord: string) {
    console.log(foreignWord);
    console.log(translatedWord);
    this.foreignWord = foreignWord;
    this.translatedWord = translatedWord;
    // TODO set userId
    this.userId = 1;
  }*/
  constructor(foreignWord: string, translatedWord: string, userId?: number, wordId?: number) {
    this.foreignWord = foreignWord;
    this.translatedWord = translatedWord;
    if (userId) { this.userId = userId;
    } else { this.userId = 1; }
    if (wordId) { this.id = wordId;
    } else { this.id = null; }
  }

  public userId: number;
  public foreignWord: string;
  public translatedWord: string;
  public created: string;
  public id: number;
}
