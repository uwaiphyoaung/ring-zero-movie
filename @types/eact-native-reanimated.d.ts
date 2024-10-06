declare module 'react-native-reanimated' {
    export const Easing: {
      linear: any;
    };
  
    export function useSharedValue<T>(initialValue: T): { value: T };
    export function useDerivedValue<T>(fn: () => T, dependencies?: any[]): { value: T };
  
  }
  