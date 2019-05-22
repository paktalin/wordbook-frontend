import {Word} from './Word';
import {Tag} from './Tag';

export class UserResponse {
  public message: string;
  public token: string;
  public word: Word;
  public tag: Tag;
  public wordList: Word[];
  public tagList: Tag[];
  constructor(message?: string, token?: string, word?: Word, tag?: Tag, wordList?: Word[], tagList?: Tag[]) {
    message ? this.message = message : this.message = null;
    token ? this.token = token : this.token = null;
    word ? this.word = word : this.word = null;
    tag ? this.tag = tag : this.tag = null;
    wordList ? this.wordList = wordList : this.wordList = null;
    tagList ? this.tagList = tagList : this.tagList = null;
  }
}
