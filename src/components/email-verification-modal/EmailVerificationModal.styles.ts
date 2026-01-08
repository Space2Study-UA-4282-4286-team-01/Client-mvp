import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    position: 'relative',
    width: '744px',
    height: '448px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    backgroundColor: palette.basic.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px',
    boxShadow: '0px 8px 24px rgba(0,0,0,0.12)'
  },
  closeButton: {
    position: 'absolute',
    top: '14px',
    right: '16px',
    width: '48px',
    height: '48px',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  imageWrapper: {
    width: '96px',
    height: '96px',
    marginBottom: '24px',
    marginTop: '10px'
  },
  title: {
    width: '449px',
    textAlign: 'center',
    marginBottom: '16px'
  },
  description: {
    width: '565px',
    textAlign: 'center',
    marginBottom: '60px'
  },
  actionButton: {
    backgroundColor: '#263238',
    color: '#FFFFFF',
    width: '86px',
    height: '56px',
    borderRadius: '4px',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: '#37474F'
    }
  }
}
