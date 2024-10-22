import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  async getAllPokemonNames(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/pokemon?limit=1040`);
      return response.data.results.map((pokemon: any) => pokemon.name);
    } catch (error) {
      console.error('Error fetching Pokémon names from PokeAPI', error);
      throw error;
    }
  }

  async getPokemon(name: string) {
    try {
      const formattedName = name.toLowerCase(); 
      const response = await axios.get(`${this.apiUrl}/pokemon/${formattedName}`);
      const pokemonData = response.data;

      const types = pokemonData.types.map((typeInfo: any) => typeInfo.type.name);

      const speciesResponse = await axios.get(pokemonData.species.url);
      const color = speciesResponse.data.color.name;
      const colorHex = this.getColorHexFromColorName(color);

      const pokemonInfo = {
        id: pokemonData.id,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        base_experience: pokemonData.base_experience,
        sprites: pokemonData.sprites,
        types: types,
        color: color,
        colorHex: colorHex,
        colorHexLight: this.adjustColor(colorHex)
      };

      return pokemonInfo;
    } catch (error) {
      console.error('Error fetching data from PokeAPI', error);
      throw error;
    }
  }

  private getColorHexFromColorName(colorName: string): string {
    const tempElement = document.createElement('div');
    tempElement.style.color = colorName;
    document.body.appendChild(tempElement);
    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    const rgbArray = computedColor.match(/\d+/g)?.map(Number);
    if (rgbArray && rgbArray.length === 3) {
        return `#${rgbArray.map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    return '#FFFFFF';
  }

  private adjustColor(color: string): string {
    if (color.toLowerCase() === '#000000') {
      return this.lightenColor(color, 60); // Aclarar el negro
    }
  
    if (color.toLowerCase() === '#ffffff') {
      return this.lightenColor(color, -60); // Oscurecer el blanco
    }
  
    return this.lightenColor(color, 50); // los demas 50 mas claros
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
    
    return `#${(
      0x1000000 + 
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1)}`;
  }
}
