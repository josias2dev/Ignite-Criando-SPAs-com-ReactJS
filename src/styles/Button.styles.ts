import styled from 'styled-components'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: '#00d26e',
  secondary: 'purple',
  danger: 'red',
  success: 'green',
  warning: 'yellow',
  info: 'blue',
  light: 'white',
  dark: 'black',
  link: 'blue',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;
  border-radius: 4px;
  border: none;
  margin: 4px;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  /* ${(props) => {
    return `background-color: ${buttonVariants[props.variant]}`
  }} */
`
