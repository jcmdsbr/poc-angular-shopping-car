import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() data: Observable<any[]>

  constructor() { }

  ngOnInit() {
  }

}
