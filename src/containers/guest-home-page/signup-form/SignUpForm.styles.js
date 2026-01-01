export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  userName: {
    display: 'flex',
    gap: '16px'
  },
  label: {
    display: 'flex',
    gap: '4px',
    cursor: 'default'
  },
  underlineText: {
    fontWeight: '500',
    color: 'primary.900',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  input: {
    maxWidth: '343px'
  },
  signupButton: {
    width: '100%',
    py: '14px'
  },
  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    },
    mb: '20px',
    alignSelf: 'end'
  }
}
