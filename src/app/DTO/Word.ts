export class Word {
  constructor(foreignWord: string, translatedWord: string, userId?: number, wordId?: number, tagIds?: number[]) {
    this.foreignWord = foreignWord;
    this.translatedWord = translatedWord;
    userId ? this.userId = userId : this.userId = null;
    wordId ? this.id = wordId : this.id = null;
    tagIds ? this.tagIds = tagIds : this.tagIds = [];
  }

  public userId: number;
  public foreignWord: string;
  public translatedWord: string;
  public created: string;
  public id: number;
  public tagIds: number[];
}
