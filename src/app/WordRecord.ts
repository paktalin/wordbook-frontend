export class WordRecord {
  constructor(foreignWord: string, translatedWord: string, userId?: number, wordId?: number) {
    this.foreignWord = foreignWord;
    this.translatedWord = translatedWord;
    if (userId) { this.userId = userId;
    } else { this.userId = null; }
    if (wordId) { this.id = wordId;
    } else { this.id = null; }
  }

  public userId: number;
  public foreignWord: string;
  public translatedWord: string;
  public created: string;
  public id: number;
}
