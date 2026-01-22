import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  cardContainer: {
    display: 'flex',
    gap: 2,
    padding: 4,
    borderRadius: 1,
    width: '360px',
    boxShadow: commonShadow
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWrapper: (bgColor: string) => ({
    display: 'flex',
    backgroundColor: bgColor,
    fontSize: 40,
    padding: 2,
    borderRadius: '6px'
  }),
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    justifyContent: 'center',
    mt: 1
  },
  categoryName: { fontWeight: 500, fontSize: 20, textTransform: 'capitalize' },
  total: { color: 'text.secondary' }
}
