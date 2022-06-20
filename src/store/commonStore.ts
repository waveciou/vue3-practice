import { defineStore } from 'pinia';

interface ICommonStore {
  isLoading: boolean;
}

export const useCommonStore = defineStore({
  id: 'commonStore',
  state: (): ICommonStore => {
    return {
      isLoading: false,
    };
  },
  actions: {},
});
