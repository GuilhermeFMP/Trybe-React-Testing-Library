import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const pokemons = pokemonList;

describe('Testando a página PokemonDetails', () => {
  it('Testa se as informações do pokemon são renderizadas na tela', () => {
    renderWithRouter(<App />);
    const pikachu = pokemons[0];
    const { name } = pikachu;
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonLink);

    const headEL = screen.getByRole('heading', {
      name: `${name} Details`,
    });

    const details = screen.getByRole('heading', {
      name: /summary/i,
    });

    const p = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(headEL).toHaveTextContent(`${name} Details`);
    expect(pokemonLink).not.toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });

  it('testa se na tela é exibida os mapas do pokemon', async () => {
    renderWithRouter(<App />);
    const pikachu = pokemons[0];
    const { name } = pikachu;
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonLink);

    const headEl = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
    });

    const imgs = await screen.findAllByRole('img');

    const maps = pikachu.foundAt;
    const { map } = maps[0];

    expect(headEl).toHaveTextContent(`Game Locations of ${name}`);
    expect(imgs.length).toBe(maps.length + 1);
    expect(imgs[1]).toHaveAttribute('src', map);
    expect(imgs[1]).toHaveAttribute('alt', `${name} location`);
  });

  it('Testa se pode favoritar um pokemon e remove-lo', () => {
    renderWithRouter(<App />);

    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonLink);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const label = screen.getByText(/pokémon favoritado\?/i);

    expect(check).toBeInTheDocument();
    expect(label).toBeInTheDocument();

    userEvent.click(check);

    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(star).toBeInTheDocument();

    userEvent.click(check);

    expect(star).not.toBeInTheDocument();
  });
});
