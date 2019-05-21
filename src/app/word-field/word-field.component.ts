import {Component, Input, OnInit} from '@angular/core';
import {Word} from '../Word';
import {State} from '../State';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WordlistComponent} from '../wordlist/wordlist.component';
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'app-word-field',
  templateUrl: './word-field.component.html',
  styleUrls: ['./word-field.component.css']
})
export class WordFieldComponent implements OnInit {
  constructor(private http: HttpClient,
              private alertService: AlertService) {
  }
  @Input() word: Word;
  @Input() wordListRef: WordlistComponent;
  private state: State = State.None;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  closeDropdownMenu() {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  ngOnInit() {
  }

  enableEditing(foreignWord: HTMLInputElement, translatedWord: HTMLInputElement, submitBlock: HTMLDivElement) {
    if (this.state === State.None) {
      this.state = State.Edit;
      this.closeDropdownMenu();
      foreignWord.disabled = false;
      translatedWord.disabled = false;
      submitBlock.style.display = 'block';
    }
  }

  finishEditing(foreignField: HTMLInputElement, translatedField: HTMLInputElement, submitBlock: HTMLDivElement) {
    foreignField.disabled = true;
    translatedField.disabled = true;
    submitBlock.style.display = 'none';
    this.state = State.None;
  }

  openDropdownMenu(menuDropdown: HTMLDivElement) {
    menuDropdown.classList.toggle('show');
  }

  submitEdits(foreignField: HTMLInputElement, translatedField: HTMLInputElement, submitBlock: HTMLDivElement) {
    this.word.foreignWord = foreignField.value;
    this.word.translatedWord = translatedField.value;
    this.http.put<any>('api/update_word', this.word, this.httpOptions).subscribe(result => {
      this.alertService.success(result.message);
    }, error => {
      this.alertService.error(error.error.message);
    });
    this.finishEditing(foreignField, translatedField, submitBlock);
  }

  cancelEdits(foreignField: HTMLInputElement, translatedField: HTMLInputElement, submitBlock: HTMLDivElement) {
    foreignField.value = this.word.foreignWord;
    translatedField.value = this.word.translatedWord;
    this.finishEditing(foreignField, translatedField, submitBlock);
  }

  deleteWord() {
    this.http.delete<any>('api/delete_word?word_id=' + this.word.id).subscribe(result => {
      this.alertService.success(result.message);
      this.wordListRef.deleteWord(this.word);
    }, error => {
      this.alertService.error(error.error.message);
    });
  }

  addTag(tagsDropdown: HTMLDivElement) {
    tagsDropdown.classList.toggle('show');
  }

  getTags() {
    return this.wordListRef.getTags();
  }
}
