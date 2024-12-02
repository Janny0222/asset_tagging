import { ModalProps } from "@/lib/definition";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";

const MainModal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setModalOpen(false);
    }
    return (
      <>
        <Transition show={modalOpen} as={Fragment} appear>
          <Dialog
            open={modalOpen}
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto text-center"
            initialFocus={cancelButtonRef}
            onClose={() => null}
          >
            <div className="min-h-screen px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-[300ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-25" />
              </Transition.Child>
  
              <span className="inline-block text-white h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
  
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in scale-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 scale-95"
              >
                
                  {children}
                
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  };
  
  export default MainModal;