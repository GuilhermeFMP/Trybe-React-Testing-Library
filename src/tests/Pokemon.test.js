import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const pokemons = pokemonList;

describe('Testando o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do Pokemon', () => {
    renderWithRouter(<App />);

    const dragonbtn = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(dragonbtn);

    const dragonair = pokemons[8];
    const { name, type, averageWeight: { value, measurementUnit }, image } = dragonair;

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemontype = screen.getByTestId('pokemon-type');
    const pokemonAver = screen.getByTestId('pokemon-weight');
    const pokemonimage = screen.getByRole('img', {
      name: `${name} sprite`,
    });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemontype).toHaveTextContent(type);
    expect(pokemonAver).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonimage).toBeInTheDocument();
    expect(pokemonimage).toHaveAttribute('src', image);
    expect(pokemonimage).toHaveAttribute('alt', `${name} sprite`);
  });

  it('Testa se o card do pokemon tem um link para os detalhes do mesmo', () => {
    renderWithRouter(<App />);

    const dragonbtn = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(dragonbtn);

    const dragonair = pokemons[8];
    const { id } = dragonair;

    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(pokemonLink).toHaveAttribute('href', `/pokemon/${id}`);
  });

  it('Testa se ao clicar no link vai pra pagina de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const dragonbtn = screen.getByRole('button', {
      name: /dragon/i,
    });

    userEvent.click(dragonbtn);

    const dragonair = pokemons[8];
    const { id } = dragonair;
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonLink).toBeInTheDocument();

    userEvent.click(pokemonLink);

    const path = `/pokemon/${id}`;
    expect(history.location.pathname).toBe(path);
  });

  it('Verifica se o pokemon possui uma estrela caso favoritado', () => {
    renderWithRouter(<App />);
    const pikachu = pokemonList[0];
    const { name } = pikachu;
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonLink);

    const check = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(check);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);

    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    const atribute = `${name} is marked as favorite`;
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', atribute);
  });
});
