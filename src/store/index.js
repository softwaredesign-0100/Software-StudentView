import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        account: '',
        sidebar_disabled: false,
        identify: 'student',
        map_week: {
            '1': '第1周',
            '2': '第2周',
            '3': '第3周',
            '4': '第4周',
            '5': '第5周',
            '6': '第6周',
            '7': '第7周',
            '8': '第8周',
            '9': '第9周',
            '10': '第10周',
            '11': '第11周',
            '12': '第12周',
            '13': '第13周',
            '14': '第14周',
            '15': '第15周',
            '16': '第16周',
            '17': '第17周',
            '18': '第18周',
        },

        map_segment: {
            '1': '8:00 ~ 8:30',
            '2': '8:30 ~ 9:00',
            '3': '9:00 ~ 9:30',
            '4': '9:30 ~ 10:00',
            '5': '10:00 ~ 10:30',
            '6': '10:30 ~ 11:00',

            '7': '14:00 ~ 14:30',
            '8': '14:30 ~ 15:00',
            '9': '15:00 ~ 15:30',
            '10': '15:30 ~ 16:00',
            '11': '16:00 ~ 16:30',
            '12': '16:30 ~ 17:00'
        },

        map_weekday: {
            '1': '星期一',
            '2': "星期二",
            '3': '星期三',
            '4': '星期四',
            '5': '星期五',
            '6': '星期六',
            '7': '星期日'
        }
    },

    mutations: {
        get_account(state, payload) {
            state.account = payload.account
        },
        sidebar_disabled (state, payload){
            state.sidebar_disabled = payload['sidebar_disabled']
        }
    }
})
