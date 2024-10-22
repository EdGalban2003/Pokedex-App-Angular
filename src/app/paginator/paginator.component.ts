import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator', standalone: true,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 8;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
