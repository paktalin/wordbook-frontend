export class WordRecord {

/*  constructor(foreign_word: string, translated_word: string) {
    console.log(foreign_word);
    console.log(translated_word);
    this.foreign_word = foreign_word;
    this.translated_word = translated_word;
    // TODO set user_id
    this.user_id = 1;
  }*/
  constructor(foreign_word: string, translated_word: string, user_id?: number, word_id?: number) {
    this.foreign_word = foreign_word;
    this.translated_word = translated_word;
    if (user_id) { this.user_id = user_id;
    } else { this.user_id = 1; }
    if (word_id) { this.id = word_id;
    } else { this.id = null; }
  }

  public user_id: number;
  public foreign_word: string;
  public translated_word: string;
  public created: string;
  public id: number;
}
