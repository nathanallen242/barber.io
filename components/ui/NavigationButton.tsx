import { StyleProp, ViewStyle } from 'react-native';
import { router, Route } from 'expo-router';
import { Button } from '@/components/ui/Button';

interface NavigationButtonProps {
  to: Route;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function NavigationButton({ to, variant, children, style }: NavigationButtonProps) {
  return (
    <Button
      variant={variant}
      style={style}
      onPress={() => router.push(to)}
    >
      {children}
    </Button>
  );
} 