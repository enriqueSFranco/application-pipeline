import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { closeModalAtom, modalDataAtom, modalStatusAtom } from "./modal.atom";
import { Button } from "../button/Button";
import { CloseIcon } from "../Icon";
import styles from "./Modal.module.css";
import clsx from "clsx";

export function Modal() {
  const wrapperRef = useRef(null);
  const isOpen = useAtomValue(modalStatusAtom);
  const modalData = useAtomValue(modalDataAtom);
  const closeModal = useSetAtom(closeModalAtom);
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(modalData);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (isOpen) {
      setIsMounted(true)
      setData(modalData);
      lockScroll();
      document.addEventListener("keydown", handleKeyDown);
      timeoutId = setTimeout(() => setShowModal(true), 20)
    } else {
      setShowModal(false)
    }
    return () => clearTimeout(timeoutId)
  }, [handleKeyDown, lockScroll, modalData, isOpen]);

  const handleTransitionEnd = useCallback(() => {
    if (!isOpen) {
      setIsMounted(false);
      unlockScroll();
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [unlockScroll, handleKeyDown, isOpen]);

  if (!isMounted) return null;

  return createPortal(
    <div
      aria-modal={true}
      role="dialog"
      onClick={closeModal}
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-end bg-black/40 transition-opacity duration-300 overflow-y-auto',
        showModal ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div
        ref={wrapperRef}
        onTransitionEnd={handleTransitionEnd}
        className={clsx(
          'relative right-0 my-auto w-11/12 min-h-full max-w-lg rounded-tl-lg bg-white p-4 transition-transform duration-300 ease-in-out',
          showModal ? 'translate-x-0' : 'translate-x-full'
        )}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between py-4 px-1.5">
          {data.data.title && (
            <h2 id="modal-title" className="font-bold text-black lg:text-xl">
              {data.data.title}
            </h2>
          )}
          <div className="justify-self-end">
            <Button icon={<CloseIcon />} variant="ghost" onClick={closeModal} />
          </div>
        </div>
        {data.data.content}
        {data.data.footer && <div className="self-end-safe h-24">{data.data.footer}</div>}
      </div>
    </div>,
    document.body
  );
}
