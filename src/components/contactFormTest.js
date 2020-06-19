import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders ContactForm without crashing', () => {
  render(<ContactForm />);
});
test('verify firstName input placeholder text is an empty string', () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstName = container.getByTestId(/firstName-input/i);
  // Act
  // Assert
  expect(firstName.placeholder).toBe('');
});

test('verify lastName input placeholder text is an empty string', () => {
  // Arrange
  const container = render(<ContactForm />);
  const lastName = container.getByTestId(/lastName-input/i);
  // Act
  // Assert
  expect(lastName.placeholder).toBe('');
});

test('can add text to first name input', () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'john' } });
  // Assert
  expect(firstNameInput.value).toBe('john');
});

test('can add text to last name input', () => {
  // Arrange
  const container = render(<ContactForm />);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  // Act
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  // Assert
  expect(lastNameInput.value).toBe('doe');
});

test('can add text to email input', () => {
  // Arrange
  const container = render(<ContactForm />);
  const emailInput = container.getByTestId(/email-input/i);
  // Act
  fireEvent.change(emailInput, { target: { value: 'myemail' } });
  // Assert
  expect(emailInput.value).toBe('myemail');
});

test('can add text to message input', () => {
  // Arrange
  const container = render(<ContactForm />);
  const messageInput = container.getByTestId(/message-input/i);
  // Act
  fireEvent.change(messageInput, { target: { value: 'message' } });
  // Assert
  expect(messageInput.value).toBe('message');
});

test('can not enter first name longer than 3 characters', async () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  const emailInput = container.getByTestId(/email-input/i);
  const messageInput = container.getByTestId(/message-input/i);

  const form = container.getByTestId(/form/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'john' } });
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  fireEvent.change(emailInput, { target: { value: 'myemail' } });
  fireEvent.change(messageInput, { target: { value: 'message' } });

  fireEvent.submit(form);
  // Assert
  await waitFor(() => {
    const error = container.getByTestId(/first-name-error/i);
    expect(error).toBeInTheDocument();
  });
});

test('error if no last name', async () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  const form = container.getByTestId(/form/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'joe' } });
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  fireEvent.change(lastNameInput, { target: { value: '' } });

  fireEvent.submit(form);
  // Assert
  await waitFor(() => {
    const error = container.getByTestId(/last-name-error/i);
    expect(error).toBeInTheDocument();
  });
});

test('error if no email', async () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  const emailInput = container.getByTestId(/email-input/i);
  const messageInput = container.getByTestId(/message-input/i);

  const form = container.getByTestId(/form/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'joe' } });
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  fireEvent.change(emailInput, { target: { value: 'myemail' } });
  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.submit(form);
  // Assert
  await waitFor(() => {
    const error = container.getByTestId(/email-error/i);
    expect(error).toBeInTheDocument();
  });
});

test('display data on form submit', async () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  const emailInput = container.getByTestId(/email-input/i);
  const messageInput = container.getByTestId(/message-input/i);

  const form = container.getByTestId(/form/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'joe' } });
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  fireEvent.change(emailInput, { target: { value: 'myemail' } });
  fireEvent.change(messageInput, { target: { value: 'message' } });
  fireEvent.submit(form);
  // Assert
  await waitFor(() => {
    const data = container.getByTestId(/data/i);
    expect(data).toBeInTheDocument();
  });
});

test('display sent confirmation after axios.post', async () => {
  // Arrange
  const container = render(<ContactForm />);
  const firstNameInput = container.getByTestId(/firstName-input/i);
  const lastNameInput = container.getByTestId(/lastName-input/i);
  const emailInput = container.getByTestId(/email-input/i);
  const messageInput = container.getByTestId(/message-input/i);

  const form = container.getByTestId(/form/i);
  // Act
  fireEvent.change(firstNameInput, { target: { value: 'joe' } });
  fireEvent.change(lastNameInput, { target: { value: 'doe' } });
  fireEvent.change(emailInput, { target: { value: 'myemail' } });
  fireEvent.change(messageInput, { target: { value: 'message' } });
  fireEvent.submit(form);
  // Assert
  await waitFor(() => {
    const sent = container.getByTestId(/sent/i);
    expect(sent).toBeInTheDocument();
  });
});