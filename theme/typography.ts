import { Typography } from "./typography.types";

export const typography: Typography = {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    fonts: {
      light: 'Poppins_300Light',
      regular: 'Poppins_400Regular',
      medium: 'Poppins_500Medium',
      semiBold: 'Poppins_600SemiBold',
      bold: 'Poppins_700Bold',
    },
  } as const;
  