import { atom } from "jotai";

export const logAtom = atom<boolean>(false); // atom은 프로토타입이 제너릭으로 선언되어 있어서
