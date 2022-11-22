import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  it('Testa se o componente possui um Heading', () => {
    renderWithRouter(<App />);
    const headEl = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(headEl).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo pokemon na lista', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    const pikachuSprite = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuSprite).toBeInTheDocument();

    userEvent.click(buttonNext);

    const charmanderSprite = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(charmanderSprite).toBeInTheDocument();

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    const dragonairSprite = screen.getByRole('img', {
      name: /dragonair sprite/i,
    });
    expect(dragonairSprite).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(pikachuSprite).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokemon', () => {
    renderWithRouter(<App />);
    const oneRender = screen.getAllByRole('img');

    expect(oneRender).toHaveLength(1);
  });

  it('Testa os botões de filtragem', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(buttons).toHaveLength(7);

    const electricType = buttons[0];
    const fireType = buttons[1];
    const bugType = buttons[2];
    const poisonType = buttons[3];
    const psychicType = buttons[4];
    const normalType = buttons[5];
    const dragonType = buttons[6];

    expect(electricType).toHaveTextContent('Electric');
    expect(fireType).toHaveTextContent('Fire');
    expect(bugType).toHaveTextContent('Bug');
    expect(poisonType).toHaveTextContent('Poison');
    expect(psychicType).toHaveTextContent('Psychic');
    expect(normalType).toHaveTextContent('Normal');
    expect(dragonType).toHaveTextContent('Dragon');

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(psychicType);

    const alakazam = screen.getByRole('img', {
      name: /alakazam sprite/i,
    });

    expect(alakazam).toBeInTheDocument();

    userEvent.click(buttonNext);

    const mew = screen.getByRole('img', {
      name: /mew sprite/i,
    });

    expect(mew).toBeInTheDocument();
  });

  it('Testa o botão All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toHaveTextContent('All');
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();

    const pikachuSprite = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuSprite).toBeInTheDocument();

    userEvent.click(buttonNext);

    const charmanderSprite = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(charmanderSprite).toBeInTheDocument();

    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);

    const dragonairSprite = screen.getByRole('img', {
      name: /dragonair sprite/i,
    });
    expect(dragonairSprite).toBeInTheDocument();
  });
});
