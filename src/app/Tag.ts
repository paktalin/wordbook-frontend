import {User} from './User';
import {Word} from './Word';

export class Tag {
  constructor(name: string, id?: number, description?: string, color?: string, user?: User, words?: Word[]) {
    this.name = name;
    this.id = (id === undefined) ? null : id;
    this.description = (description === undefined) ? null : description;
    this.color = (color === undefined) ? null : color;
    this.user = (user === undefined) ? null : user;
    this.words = (words === undefined) ? null : words;
  }

  public id?: number;
  public name: string;
  public description?: string;
  public color?: string;
  public user?: User;
  public words?: Word[];
}
