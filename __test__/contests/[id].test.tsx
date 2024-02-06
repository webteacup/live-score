import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ContestPage from '../../pages/contests/[id]';
import { ContestType } from '../../interfaces';
import testData from '../../utils/sports.json';

// Mock useRouter
jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(),
  }));

// Mock useSWR
jest.mock('swr');

describe('ContestPage Component', () => {
  const mockData: ContestType = testData[0] as ContestType;

  it('renders loading state initially', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: mockData.id },
    });

    // Mock the initial state of useSWR
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
    });

    render(<ContestPage />);

    // Check if the loading message is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    // Mock the useRouter hook to provide query.id
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: mockData.id },
    });

    // Mock the useSWR hook to simulate an error
    const errorMessage = 'Failed to load';
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error(errorMessage),
      isLoading: false,
      isValidating: false,
    });

    render(<ContestPage />);

    // Wait for the component to render
    await waitFor(() => {
      // Check if the error message is rendered
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  it('renders contest details when data is available', async () => {
    // Mock the useRouter hook to provide query.id
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: mockData.id },
    });

    (useSWR as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      isValidating: false,
    });

    render(<ContestPage />);

    // Wait for the component to render
    await waitFor(() => {
      // Check if the contest details are rendered
      expect(screen.getByText(mockData.country)).toBeInTheDocument();
      expect(screen.getByText(mockData.name)).toBeInTheDocument();
      // Add more assertions based on your component structure
    });
  });
});
