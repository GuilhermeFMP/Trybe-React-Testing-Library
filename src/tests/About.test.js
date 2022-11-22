import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testando o componente About', () => {
  it('Testando se a Pagina contém todas as informações da Pokedex', () => {
    renderWithRouter(<About />);
    const titleEl = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    const parag1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const parag2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(titleEl).toBeInTheDocument();
    expect(parag1).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  it('Teste se a pagina contem um Heading escrito About Pokedex', () => {
    renderWithRouter(<About />);
    const titleEl = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(titleEl).toBeInTheDocument();
  });

  it('Teste se a pagina contem dois paragrafos sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const parag1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const parag2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(parag1).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
  });

  it('Teste se a pagina contem uma imagem especifica', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    const linkImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', linkImage);
  });
});
