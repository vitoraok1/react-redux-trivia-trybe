import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Login from '../pages/Login';

const mockToken = {
  "response_code":0,
  "response_message":"Token Generated Successfully!",
  "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockToken),
  }));
};

describe('Testa o componente Login', () => {
  it('Verifca se existe um input de email e name', () => {
  renderWithRouterAndRedux(<Login />);
  
  const inputEmail = screen.getByTestId('input-player-name');
  expect(inputEmail).toBeInTheDocument();
  
  const inputName = screen.getByTestId('input-gravatar-email');
  expect(inputName).toBeInTheDocument();
  });
  
  it('Verifica se existe um button Play e seu estado é desabilitado', () => {
  renderWithRouterAndRedux(<Login />);
  
  const btnPlay = screen.getByRole('button', { name: /play/i });
  expect(btnPlay).toBeInTheDocument();
  expect(btnPlay.disabled).toBe(true);
  });
  
  it('Verifica se ao preencher o input de email e nome o botão é habilitado', () => {
  renderWithRouterAndRedux(<Login />);
  
  const inputEmail = screen.getByTestId('input-player-name');
  userEvent.type(inputEmail, 'wendell@wendell.com');
  
  const inputName = screen.getByTestId('input-gravatar-email');
  userEvent.type(inputName, 'Wendell');
  
  const playBtn = screen.getByTestId('btn-play');
  expect(playBtn).toBeInTheDocument();
  expect(playBtn.disabled).toBe(false);

  });

  it('Verifica se existe um botão "Configurações"', async () => {
    renderWithRouterAndRedux(<Login />);
    
    const btnSetting = screen.getByTestId('btn-settings');;
    expect(btnSetting).toBeInTheDocument();

  });

  it('Verifica se ao clicar no botão "Play" é redirecionado para página correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-player-name');
    const inputName = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(inputEmail, 'wendell@wendell.com');
    userEvent.type(inputName, 'Wendell');

    userEvent.click(playBtn);

    await waitFor(() => expect(history.location.pathname).toEqual('/game'));
  });

  it('Verifica se o fetch é feito ao clicar no botão "Play"', async () => {
    renderWithRouterAndRedux(<Login />);
    
    const inputEmail = screen.getByTestId('input-player-name');
    const inputName = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(inputEmail, 'wendell@wendell.com');
    userEvent.type(inputName, 'Wendell');

    userEvent.click(playBtn);

    expect(global.fetch).toHaveBeenCalled;
  });

  it('Verifica se ao clicar no botão "Configurações" é redirecionado para página correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSettings = screen.getByTestId('btn-settings');

    userEvent.click(btnSettings);

    expect(history.location.pathname).toEqual('/config');
  });
});