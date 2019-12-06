import Vue from 'vue';
import Vuex from 'vuex';

import logColor from './modules/logColor';
import lang from './modules/lang';
import device from './modules/device';

// import createLogger from '../plugins/logger'
// import createLogger from '../../../dist/logger'

// for 'export default {...}'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// for 'export const xxx = {...}'
// import { getters } from './getters'
// import { mutations } from './mutations'
// import { actions } from './actions'

// for 'export const xxx = ...'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

// const getters = {
//   list: state => {
//     return state.staffs.filter(staff => staff.employed === true)
//   },
//   num: (state, getters) => {
//     return getters.list.length
//   },
//   getById: (state) => (id) => {
//     return state.staffs.find(staff => staff.id === id)
//   }
// }

// const mutations = {
//   add: (state, payload) => {
//     state.staffs.push(payload);
//   }
// }

// const actions = {
//   addStaff: ({commit}, payload) => {
//     commit('add', payload);
//   }
// }

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    logColor,
    lang,
    device
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : [],

  // Root level state/getters/mutations/actions
  state() {
    return {
      activeIndex: '1'
    };
  },
  getters,
  mutations,
  actions
});

// if (module.hot) {
//   // 使 action 和 mutation 成为可热重载模块
//   module.hot.accept(['./getters', './mutations', './actions'], () => {
//     // 获取更新后的模块

//     // for 'export default {...}'
//     // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//     // 加载新模块
//     store.hotUpdate({
//       getters: require('./getters').default,
//       mutations: require('./mutations').default,
//       actions: require('./actions').default
//     });

//     // for 'export const xxx = {...}'
//     // store.hotUpdate({
//     //   getters: require('./getters').getters,
//     //   mutations: require('./mutations').mutations,
//     //   actions: require('./actions').actions
//     // })

//     // for 'export const xxx = ...'
//     // store.hotUpdate({
//     //   getters: require('./getters'),
//     //   mutations: require('./mutations'),
//     //   actions: require('./actions')
//     // })
//   });
// }

export default store;
