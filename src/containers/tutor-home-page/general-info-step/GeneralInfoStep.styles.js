import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 3 },
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xs: 0, md: 0 },
    ...fadeAnimation
  },
  imgContainer: {
    flex: 1,
    display: { xs: 'flex', sm: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: { xs: '10px', md: 0 },

    '& img': {
      width: '100%',
      maxWidth: { xs: '180px', md: '280px' },
      height: 'auto',
      objectFit: 'contain'
    }
  },
  contentBox: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    pb: { xs: 8, md: 0 }
  },
  title: {
    typography: 'h5',
    fontWeight: 600,
    mb: 1,
    color: 'primary.900'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1
  },
  helperText: {
    mt: 0.5,
    textAlign: 'left',
    color: 'text.secondary',
    typography: 'caption',
    fontSize: '0.7rem'
  }
}
