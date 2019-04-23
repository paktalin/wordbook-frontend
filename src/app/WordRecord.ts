export class WordRecord {

  constructor(foreign_word: string, translated_word: string) {
    console.log(foreign_word);
    console.log(translated_word);
    this.foreign_word = foreign_word;
    this.translated_word = translated_word;
    // TODO set user_id
    this.user_id = 1;
  }


  public user_id: number;
  public foreign_word: string;
  public translated_word: string;
  public created: string;
  public id: number;
}
