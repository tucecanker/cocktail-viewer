import { useCallback } from 'react';

export function useHandleKeyDown(callback: () => void) {
  return useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        callback();
      }
    },
    [callback]
  );
}
