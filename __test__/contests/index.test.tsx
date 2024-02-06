import { render, screen, waitFor } from '@testing-library/react';
import Contests from '@/pages/contests';
import { ContestType } from '../../interfaces';
import contestData from "../../utils/sports.json";
import useSWR from 'swr'; // Import useSWR

// Mock the useSWR hook
jest.mock('swr');

describe('Contests Component', () => {
  it('renders loading state initially', async () => {
    // Mock the initial state of useSWR
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isValidating: true,
    });

    render(<Contests />);

    // Check if the loading message is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders contests when data is available', async () => {
    // Mock the useSWR hook to return mock data
    const mockData: ContestType[] = contestData as ContestType[];
    (useSWR as jest.Mock).mockReturnValue({
      data: mockData.slice(0, 10),
      error: undefined,
      isValidating: false,
    });

    render(<Contests />);

    expect(screen.getByText(/contests/i)).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    // Mock the useSWR hook to simulate an error
    const errorMessage = 'Failed to load';
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error(errorMessage),
      isValidating: false,
    });

    render(<Contests />);

    // Wait for the component to render
    await waitFor(() => {
      // Check if the error message is rendered
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });
});
