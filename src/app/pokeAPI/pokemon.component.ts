import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeapiService } from './pokeAPI.service';
import { SearchService } from '../Inputs/Search Bar/search.service';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  imports: [CommonModule, PaginatorComponent] 
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  displayedPokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPokemons: number = 0;
  searchSubscription: Subscription = new Subscription();

  constructor(
    private pokeapiService: PokeapiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.fetchAllPokemons();
    this.searchSubscription = this.searchService.currentSearchQuery.subscribe(query => {
      this.filterPokemons(query);
    });
  }

  async fetchAllPokemons() {
    try {
      const allPokemonNames = await this.pokeapiService.getAllPokemonNames();
      const requests = allPokemonNames.map(name => this.pokeapiService.getPokemon(name));
      this.pokemons = await Promise.all(requests);
      this.totalPokemons = this.pokemons.length;
      this.filterPokemons('');
    } catch (error) {
      console.error('Error fetching all Pokemon data', error);
    }
  }

  filterPokemons(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery) ||
      pokemon.types.some((type: string) => type.toLowerCase().includes(lowerCaseQuery))
    );
    this.updateDisplayedPokemons();
  }

  updateDisplayedPokemons(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedPokemons = this.filteredPokemons.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedPokemons();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
