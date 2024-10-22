import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableBasicExample } from './table/table.component';
import { PokemonComponent } from './pokeAPI/pokemon.component';
import { SearchBarComponent } from './Inputs/Search Bar/search.component';
import { PokeTitle } from './titles/pokemon/poketitle.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator/paginator.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableBasicExample, SearchBarComponent, PaginatorComponent, MatPaginatorModule, PokeTitle , PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
