export class WordRecord {

  constructor(foreignWord: string, translatedWord: string) {
    console.log(foreignWord);
    console.log(translatedWord);
    this.foreignWord = foreignWord;
    this.translatedWord = translatedWord;
    // TODO set userId
    this.userId = 1;
  }


  public userId: number;
  public foreignWord: string;
  public translatedWord: string;
  public created: string;
  public id: number;
}
