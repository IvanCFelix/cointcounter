// Palette from the CointCounter coolors image.
export const colors = {
  bg: '#272F42',
  surface: '#323B52',
  raised: '#3B4560', // surface one step up: inputs and rows inside cards
  muted: '#A2ACAF',
  primary: '#F0BA07',
  danger: '#C33C54',
  accent: '#7A431A',
  text: '#FFFFFF',
  onPrimary: '#272F42',
};

/** Same colour at ~15% alpha, for tinted pills and icon tiles. */
export const tint = (hex: string) => `${hex}26`;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 10, md: 14, lg: 22, pill: 999 };
export const font = { caption: 12, body: 15, title: 20, hero: 34 };

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.28,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 10 },
  elevation: 8,
};
