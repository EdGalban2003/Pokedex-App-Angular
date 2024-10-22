import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service'; 

@Component({
  selector: 'search-bar',
  styleUrls: ['search.component.css'],
  templateUrl: 'search.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = '';
  filteredOptions: string[] = [];
  pokemonOptions: string[] = ['deoxys-normal', 'deoxys-attack', 'deoxys-defense', 'deoxys-speed'];
  isOpen: boolean = false; 

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.filteredOptions = [...this.pokemonOptions]; 
  }

  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  filterOptions() {
    this.filteredOptions = this.pokemonOptions.filter(option =>
      option.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleSearch() {
    this.isOpen = !this.isOpen;

    const inputElement = document.querySelector(".search-container input") as HTMLElement;
    const imgElement = document.querySelector(".search-container img") as HTMLElement;
    const pElements = document.querySelectorAll(".search-container p") as NodeListOf<HTMLElement>;

    if (this.isOpen) {
      inputElement.style.width = "120%";
      inputElement.style.opacity = "1";
      imgElement.style.right = "30px";
      imgElement.style.transform = "rotate(360deg)";
      pElements.forEach((e) => {
        e.style.opacity = "0";
      });
    } else {
      inputElement.style.width = "0%";
      inputElement.style.opacity = "0";
      imgElement.style.transform = "rotate(0deg)";
      pElements.forEach((e) => {
        e.style.opacity = "1";
      });
    }
  }
}

