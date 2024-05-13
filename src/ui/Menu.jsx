import { useContext, useState } from "react";
import { createContext } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { createPortal } from "react-dom";

const MenuContext = createContext();

export default function Menu({
  children,
  alignment = "right",
  size = "sm",
  fixedPosition = false,
}) {
  const [openName, setOpenName] = useState(false);
  const [position, setPosition] = useState({});
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <MenuContext.Provider
      value={{
        open,
        close,
        position,
        openName,
        setPosition,
        alignment,
        size,
        fixedPosition,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ children, name }) {
  const { close, open, setPosition, openName } = useMenu();
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - (rect.right + rect.left) / 2,
      y: rect.height + rect.y + 8,
    });
    name == openName ? close() : open(name);
  }
  return <button onClick={handleClick}>{children}</button>;
}
function List({ children, name }) {
  const { close, position, openName, alignment, size, fixedPosition } =
    useMenu();
  const ref = useClickOutside("click", close, false);
  if (name != openName) return null;
  return createPortal(
    <ul
      onScroll={(e) => e.stopPropagation}
      ref={ref}
      style={{
        top: `${position.y}px`,
        right: `${position.x}px`,
      }}
      className={` ${fixedPosition ? "fixed" : "absolute"}  z-10 bg-secondary-background ${size == "sm" ? "w-64" : size == "md" ? "w-96" : "w-[250px]"} ${alignment == "right" ? "translate-x-[100%]" : alignment == "center" ? "translate-x-[50%]" : ""} max-h-[300px] divide-y divide-text-color/20 overflow-y-scroll rounded-lg drop-shadow-md`}
    >
      {children}
    </ul>,
    document.body,
  );
}
function Item({ children, icon, onClick }) {
  const { close } = useMenu();
  return (
    <li
      onClick={() => {
        onClick?.();
        close();
      }}
      className={`grid cursor-pointer ${icon ? "grid-cols-[30px,1fr]" : "grid-cols-1"} line-clamp-2 items-center gap-3 text-small hover:backdrop-brightness-90`}
    >
      {icon && (
        <span className="m-auto self-center justify-self-start">{icon}</span>
      )}
      <p
        className={`h-full w-full max-w-full ${icon ? "" : "px-6"} py-6 transition-all duration-100 ease-in-out`}
      >
        {children}
      </p>
    </li>
  );
}
Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;

function useMenu() {
  const {
    open,
    close,
    position,
    setPosition,
    openName,
    alignment,
    withIcons,
    size,
    fixedPosition,
  } = useContext(MenuContext);
  return {
    open,
    close,
    position,
    setPosition,
    openName,
    alignment,
    withIcons,
    size,
    fixedPosition,
  };
}
