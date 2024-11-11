import { useCallback, useState } from 'react';

type IconCard = {
  patient?: string;
  setPatient: (patient: string) => void;
  setShoot: (shoot: string) => void;
  isOpen: boolean;
  // openModal: () => void;
  openModal: (buttonType: string) => void;
  buttonType: string;
  closeModal: () => void;
  modalStage: boolean;
  modalStageAnalysis: boolean;
};

const useIconCard = (): IconCard => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonType, setButtonType] = useState<string>('');
  const [patient, _setPatient] = useState<string>();
  const [_shoot, _setShoot] = useState<string>();
  const [modalStage, setModalStage] = useState(false);
  const [modalStageAnalysis, setModalStageAnalysis] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalStage(false);
    setModalStageAnalysis(false);
    setButtonType('');
    _setPatient(undefined);
  }, []);

  const setPatient = useCallback((patient: string) => {
    if (patient) setModalStage(true);
    _setPatient(patient);
    if (patient) setModalStageAnalysis(true);
    _setPatient(patient);
  }, []);

  const setShoot = useCallback((shoot: string) => {
    _setShoot(shoot);
  }, []);

  // const openModal = () => setIsOpen(true);
  const openModal = (buttonType: string) => {
    // ボタンの種類に応じてモーダルの内容を設定
    if (buttonType === 'camera') {
      setButtonType('camera');
    } else if (buttonType === 'repo') {
      setButtonType('repo');
    }
    setIsOpen(true);
  };
  1;
  return {
    patient,
    setPatient,
    setShoot,
    isOpen,
    openModal,
    buttonType,
    closeModal,
    modalStage,
    modalStageAnalysis,
  };
};

export default useIconCard;
