import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";
import useKeystroke from "../hooks/useKeystorke";
import useScreenType from "../hooks/useScreenType";
import BottomSheetModal from "./BottomSheetModal";
import XIcon from "../icons/XIcon";

const ModalContext = createContext();

export default function Modal({
  children,
  bottomSheetScreens = ["mobile"],
  modalCloseScreenSize = [],
}) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
        bottomSheetScreens,
        modalCloseScreenSize,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openWindowName) });
}
function Window({ name, children }) {
  const { openName, close, bottomSheetScreens, modalCloseScreenSize } =
    useContext(ModalContext);
  const ref = useClickOutside("click", close);
  useKeystroke("Escape", close);
  const screen = useScreenType();
  if (openName != name) return null;
  if (modalCloseScreenSize?.includes(screen)) close();
  if (bottomSheetScreens?.includes(screen))
    return (
      <BottomSheetModal onClose={close} isOpen={openName == name}>
        {children}
      </BottomSheetModal>
    );
  return createPortal(
    // modal overlay
    <div className="fixed left-0 top-0 z-[999] min-h-full min-w-full bg-text-color/10 backdrop-blur-[2px] transition-all duration-[0.5s]">
      {/* modal */}
      <div
        ref={ref}
        // h-full
        className="fixed left-1/2 top-1/2 w-full translate-x-[-50%] translate-y-[-50%]  overflow-x-hidden overflow-y-scroll rounded-lg bg-primary-background px-16 pb-5  sm:max-h-[80%] sm:w-auto sm:min-w-[500px]"
      >
        <button className=" absolute right-4 top-4 p-2" onClick={close}>
          <XIcon />
        </button>
        {/* style={{ height: "inherit" }}  */}
        <div className="w-full py-4">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
Modal.Window = Window;
Modal.Open = Open;
