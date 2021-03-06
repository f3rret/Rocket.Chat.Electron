import { useEffect, useRef, Ref } from 'react';

export const useDialog = (
  visible: boolean,
  onClose = (): void => undefined
): Ref<HTMLDialogElement> => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef<() => void>();

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const onClose = onCloseRef.current;

    if (!dialog) {
      return;
    }

    if (!visible) {
      dialog.close();
      return;
    }

    dialog.showModal();

    dialog.onclose = () => {
      dialog.close();
      onClose?.();
    };

    dialog.onclick = ({ clientX, clientY }) => {
      try{
        const { left, top, width, height } = dialog.getBoundingClientRect();
        const isInDialog =
          top <= clientY &&
          clientY <= top + height &&
          left <= clientX &&
          clientX <= left + width;
        if (!isInDialog) {
          dialog.close();
        }
      }
      catch{}
    };
  }, [visible]);

  return dialogRef;
};
