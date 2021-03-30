import "es6-promise/auto";
import { createStore } from "vuex";
import { queryList } from "../api";

const store = createStore({
  state() {
    return {
      count: 0,
      list: [],
    };
  },
  mutations: {
    increment(state, payload) {
      state.list.push(payload);
    },
    decrement(state, payload) {
      state.list.splice(payload, 1);
    },
    setList(state, payload) {
      state.list = payload;
    },
    modify(state, { index, title }) {
      debugger;
      state.list.splice(index, 1, { title });
    },
  },
  actions: {
    queryList(context) {
      return queryList().then((res) => {
        context.commit("setList", res);
      });
    },
    increment(context, payload) {
      setTimeout(() => {
        context.commit("increment", payload);
      });
    },
    decrement(context, payload) {
      setTimeout(() => {
        context.commit("decrement", payload);
      });
    },
    modify(context, payload) {
      setTimeout(() => {
        context.commit("modify", payload);
      });
    },
  },
});

export default store;
