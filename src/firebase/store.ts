import { createStore } from 'vuex'
export const useStore = createStore({
  state: {
    user: { 
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
/*wip*/