import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 3 }, // Зменшили gap з 4 до 3
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    p: { xs: 0, md: 0 }, // Прибрали внутрішній padding контейнера
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
      // Зробили картинку ще компактнішою
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
    pb: { xs: 8, md: 0 } // Відступ знизу тільки для телефону
  },
  title: {
    // 👇 КРИТИЧНО: Змінили h4 на h5, щоб заголовок не займав пів екрану
    typography: 'h5',
    fontWeight: 600,
    mb: 1, // Зменшили відступ знизу (було 3)
    color: 'primary.900'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 1 // Зменшили gap між інпутами (було 2 або 1.5)
  },
  helperText: {
    mt: 0.5, // Мінімальний відступ
    textAlign: 'left',
    color: 'text.secondary',
    typography: 'caption',
    fontSize: '0.7rem' // Трохи менший шрифт
  }
}
