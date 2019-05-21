import {Component, Input, OnInit} from '@angular/core';
import {Word} from '../Word';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  @Input() wordList: Word[];
  isCollapsed: boolean;
  sortByDate() {
    this.wordList.sort((w1, w2) => w2.id - w1.id);
  }

  sortByForeign() {
    this.wordList.sort((w1, w2) => w1.foreignWord.localeCompare(w2.foreignWord));
  }

  sortByTranslated() {
    this.wordList.sort((w1, w2) => w1.translatedWord.localeCompare(w2.translatedWord));
  }

  sortByTagName() {
    this.isCollapsed = !this.isCollapsed;
  }

  addTag(word: Word, tagField: HTMLInputElement, addTagBtn: HTMLButtonElement) {
    tagField.style.display = 'inline';
    addTagBtn.innerHTML = 'Save tag';
  }

}
