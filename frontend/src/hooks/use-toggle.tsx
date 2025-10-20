/*
POR QUE {}
Serve para o caso de você chamar o hook sem nenhum argumento:
{ initial = false }
Isso é destructuring com valor default.
Significa: "pegue a prop initial do objeto passado; se não vier, use false".
Nesse caso, se não tivesse = {}, o destructuring tentaria fazer:
const { initial = false } = UNDEFINED; // 💥 erro
Com = {}, vira:
const { initial = false } = {}; // ✅ ok, initial = false
*/

import { FC, useState } from "react";

interface IUseToggleProps {
  initial?: boolean;
}
//
export const useToggle = ({ initial = false }: IUseToggleProps = {}) => {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = () => {
    setValue(!value);
  };

  return {
    value,
    setValue,
    toggle,
  };
};