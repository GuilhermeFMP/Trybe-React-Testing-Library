import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('Testando se possui os links Home, About e Favorite Pokemon', () => {
    renderWithRouter(<App />);
    const navigationBar = screen.getByRole('navigation');
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(navigationBar).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testando se a Aplicação vai para o caminho "/" quando clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('Testando se a Aplicação vai para o caminho "/about" quando clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('Testando se a Aplicação vai para o caminho "/favorites" quando clicar em Favorito', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testando se a Aplicação vai para a pagina NotFound', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/123123');
    });
    const notFound = await screen.findByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
