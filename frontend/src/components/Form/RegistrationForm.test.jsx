import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';

// Mock the toast function
const mockToast = jest.fn();
jest.mock('@chakra-ui/react', () => {
    const originalModule = jest.requireActual('@chakra-ui/react');
    return {
        ...originalModule,
        useToast: () => mockToast,
    };
});

describe('RegistrationForm', () => {
    beforeEach(() => {
        render(
            <ChakraProvider>
                <RegistrationForm />
            </ChakraProvider>
        );
    });

    test('renders all form fields', () => {
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/profile picture url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    });

    test('shows password when toggle is clicked', () => {
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toHaveAttribute('type', 'password');

        const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
        fireEvent.click(toggleButton);

        expect(passwordInput).toHaveAttribute('type', 'text');
    });

    test('submits form with all fields filled', async () => {
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/profile picture url/i), { target: { value: 'https://example.com/pic.jpg' } });
        fireEvent.change(screen.getByLabelText(/birth date/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/street/i), { target: { value: '123 Main St' } });
        fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Anytown' } });
        fireEvent.change(screen.getByLabelText(/state/i), { target: { value: 'CA' } });
        fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'USA' } });
        fireEvent.change(screen.getByLabelText(/zip code/i), { target: { value: '12345' } });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
                title: "Account created.",
                status: "success",
            }));
        });
    });

    test('shows error for empty required fields', async () => {
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(screen.getAllByRole('alert')).toHaveLength(10); // 10 required fields
        });
    });
});