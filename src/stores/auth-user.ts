import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  accessToken: string;
};

type Action = {
  setAccessToken: (accessToken: string) => void;
};

export const useAuthUser = create<State & Action>()(
  immer((set) => ({
    accessToken: "",
    setAccessToken: (accessToken: string) => set({ accessToken }),
  })),
);
