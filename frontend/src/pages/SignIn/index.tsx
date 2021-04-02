import React, { useRef, useCallback}  from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório.')
          .email('E-mail não é válido.'),
        password: Yup.string()
          .min(6, 'Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={Logo} alt='logo e-sam' />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Entrar</h1>

          <Input name='email' placeholder='E-mail' />
          <Input name='password' placeholder='Senha' type='password' />

          <Button type='submit'>Entrar</Button>

          <a>Esqueci minha senha</a>
          <a href='login'>
            Criar conta
          </a>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
