import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ContactForm = () => {
  const [data, setData] = useState();
  const [success, setSuccess] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setData(data);
  };

  useEffect(() => {
    if (data) {
      axios
        .post('https://reqres.in/api/users', data)
        .then((res) => {
          setSuccess(true);
        })
        .then((err) => console.log(err));
    }
  }, [data]);

  return (
    <div className='App'>
      <form data-testid='form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='firstName'>First Name*</label>
          <input
            data-testid='firstName-input'
            name='firstName'
            placeholder=''
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p data-testid='first-name-error'>
              Looks like there was an error: {errors.firstName.type}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='lastName'>Last Name*</label>
          <input
            data-testid='lastName-input'
            name='lastName'
            placeholder=''
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p data-testid='last-name-error'>
              Looks like there was an error: {errors.lastName.type}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='email' placeholder='bluebill1049@hotmail.com'>
            Email*
          </label>
          <input
            data-testid='email-input'
            name='email'
            ref={register({ required: true })}
          />
          {errors.email && (
            <p data-testid='email-error'>
              Looks like there was an error: {errors.email.type}
            </p>
          )}
        </div>
        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            data-testid='message-input'
            name='message'
            ref={register({ required: false })}
          />
        </div>
        {success && (
          <h6 data-testid='sent' style={{ textAlign: 'left', color: 'white' }}>
            Message Sent!
          </h6>
        )}

        {data && (
          <pre data-testid='data' style={{ textAlign: 'left', color: 'white' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input data-testid='submit-button' type='submit' />
      </form>
    </div>
  );
};

export default ContactForm;