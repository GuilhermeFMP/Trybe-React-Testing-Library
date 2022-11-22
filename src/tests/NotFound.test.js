import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testando o componente NotFound', () => {
  it('Testa se a página contem um Heading Page Request Not Found', () => {
    renderWithRouter(<NotFound />);
    const headEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(headEl).toBeInTheDocument();
  });

  it('Testa se a página contem uma imagem específica de erro', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', link);
  });
});
