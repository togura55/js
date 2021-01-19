//
// アプリ共通のデータストアとして使うVueインスタンス
//
import Vue from 'vue'
const primitiveStore = new Vue({  
    data(){
        return {
            globalCount: 0,
        };
    },
});


export default primitiveStore
