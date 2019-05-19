import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor() { }
  @Input() tag: Tag;

  ngOnInit() {
  }

}
