import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testando o componente FavoritePokemon', () => {
  it('Testa se é exibido a mensagem No Favorite Pokemon Found', () => {
    const { history } = renderWithRouter(<FavoritePokemon />);
    act(() => {
      history.push('./favorites');
    });
    const notPokemon = screen.getByText(/no favorite pokémon found/i);

    expect(notPokemon).toBeInTheDocument();
  });
});
