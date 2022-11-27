import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockList from './mockList.test';
import App from '../App';

describe('1- Testando o arquivo App', () => {
  test('1- Verifica se a API está sendo renderizada.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mockList) });
    render(<App />);
    const alderaan = await screen.findByText(/alderaan/i);
    expect(alderaan).toBeVisible();
  });

  test('2- Verifica se os botões de Filtro e Remover Filtros estão presentes na paǵina', ()=>{
    render(<App />)
    const buttonFilter = screen.getByRole('button', { name : /Filtro/i})
    expect(buttonFilter).toBeInTheDocument()
    const buttonRmvFilter = screen.getByRole('button', { name : /Remover Filtros/i})
    expect(buttonRmvFilter).toBeInTheDocument()
  })

  test('3- Verifica se o botão Filtro está habilitado', () => {
    render(<App />)
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);
    const operatorFilter = screen.getByText('maior que')
    expect(operatorFilter).toHaveTextContent('maior que')
  })
  });
