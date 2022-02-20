import {
  render,
  screen,
  waitFor,
  act,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import * as misc from '../misc';
import App from './app';
import type { Company } from '@cosuno/api-interfaces';
import API from './api';

let window: jest.SpyInstance;

describe('App', () => {
  beforeEach(() => {
    const companies: Company[] = [
      {
        id: 1,
        name: 'Company LLC',
        logo: 'https://placekitten.com/200/300',
        city: 'London',
        specialties: ['Building'],
      },
      {
        id: 2,
        name: 'Builind Spa',
        logo: 'https://placekitten.com/200/300',
        city: 'Milan',
        specialties: ['Building', 'Electrical'],
      },
      {
        id: 3,
        name: 'Company LLC',
        logo: 'https://placekitten.com/200/300',
        city: 'Munch',
        specialties: ['Excavation', 'Insulation', 'Plumbing'],
      },
    ];
    mockFetch(200, companies);
  });

  afterEach(cleanup);

  it('should render successfully', async () => {
    render(<App />);
    await waitFor(() => {
      const heading = screen.getByText('Find a company');
      expect(heading).toBeDefined();
    });
  });

  it('should render a search bar', async () => {
    render(<App />);
    await waitFor(() => {
      const searchBar = screen.getByTestId('search-bar');
      expect(searchBar).toBeDefined();
    });
  });

  it('should render a specialties combobox', async () => {
    render(<App />);
    await waitFor(() => {
      const filter = screen.getByTestId('specialties-filter');
      expect(filter).toBeDefined();
    });
  });

  it('should render a card for any company', async () => {
    render(<App />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('company-card');
      expect(cards.length).toBe(3);
    });
  });

  describe('behaviours', () => {
    let api: jest.SpyInstance;

    beforeEach(() => {
      // mock function
      api = jest.spyOn(API, 'getCompanies');
    });

    afterEach(() => {
      // restore mock function
      api.mockRestore();
    });

    it('should call api with the filter parameter', async () => {
      render(<App />);
      const searchBar = screen.getByTestId('search-bar');
      fireEvent.change(searchBar, { target: { value: 'llc' } });
      await waitFor(async () => {
        const cards = await screen.getAllByTestId('company-card');
        expect(api).toHaveBeenCalledTimes(2);
        expect(api).toHaveBeenCalledWith({ q: '', s: [] });
        expect(api).toHaveBeenCalledWith({ q: 'llc', s: [] });
      });
    });

    it('should call api with specialty', async () => {
      render(<App />);
      const specialty = screen.getByText('Electrical');
      specialty.click();

      await waitFor(async () => {
        const cards = await screen.getAllByTestId('company-card');
        expect(api).toHaveBeenCalledTimes(2);
        expect(api).toHaveBeenCalledWith({ q: '', s: [] });
        expect(api).toHaveBeenCalledWith({ q: '', s: ['Electrical'] });
      });
    });
  });
});

function mockFetch<T>(status: number, data?: T) {
  const response = { status, json: () => Promise.resolve(data) };

  window = jest.spyOn(misc, 'getGlobalObject');
  window.mockReturnValue({ fetch: () => Promise.resolve(response) });
}
