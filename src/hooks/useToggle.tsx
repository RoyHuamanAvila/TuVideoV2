import { useState } from "react";


const useToggle = () => {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = () => {
    setActive(!active);
  }

  const handleActive = (value: boolean) => {
    setActive(value);
  }

  return { active, toggleActive, handleActive }
}

export default useToggle
