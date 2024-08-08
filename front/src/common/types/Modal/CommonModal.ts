type CModal = {
  title: string;
  content: string | React.ReactNode;
  customBtn: boolean | false;
  closeBtn: boolean | false;
  isOpen: boolean | false;
  onClose: () => void;
};

export type commonModal = {
  CModal: CModal;
};
