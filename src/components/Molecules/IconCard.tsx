/* eslint-disable tailwindcss/no-custom-classname */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { ButtonIcon } from '@/components/atoms/TopIcon';
import { PatientTable } from '@/components/Molecules/PatientTable';
import { ShootTable } from '@/components/Molecules/ShootTable';
import { ShootDataSelect } from '@/components/Organisms/ShootDataSelect';
import useIconCard from '@/hooks/useIconCard';

export const IconCard = (): JSX.Element => {
  const {
    patient,
    setPatient,
    setShoot,
    isOpen,
    openModal,
    buttonType,
    closeModal,
    modalStage,
    modalStageAnalysis,
  } = useIconCard();
  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="grid  grid-cols-2 gap-24">
        <ButtonIcon variant="camera" onClick={() => openModal('camera')} />
        <ButtonIcon variant="repo" onClick={() => openModal('repo')} />
        <ButtonIcon variant="patient" />
        <ButtonIcon variant="list" />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 text-slate-700">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-h-[90vh] w-full max-w-3xl touch-none rounded-2xl bg-white/90 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 border-b-2 pb-2 text-2xl font-medium leading-6 "
                  >
                    {buttonType === 'camera' && (!modalStage ? '患者選択' : '撮影選択')}
                    {buttonType === 'repo' && (!modalStageAnalysis ? '患者選択' : 'データ選択')}
                  </Dialog.Title>
                  {buttonType === 'camera' &&
                    (!modalStage ? (
                      <PatientTable setPatient={setPatient} />
                    ) : (
                      <ShootTable setShoot={setShoot} patient={patient} />
                    ))}
                  {buttonType === 'repo' &&
                    (!modalStageAnalysis ? (
                      <PatientTable setPatient={setPatient} />
                    ) : (
                      <ShootDataSelect patient={patient} />
                    ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
