<!--
このコンポーネントは
nameとinitCountを親から受け取りcountを増加させる
-->
<template>
    <div class="counter">
        <p>{{name}}</p>
        <p>Count: {{count}}</p>
        <button @click="increment">+1</button>
    </div>
</template>

<script>
export default {
     // 親コンポーネントから
     // nameとinitCountプロパティを受け取る
     // インターフェース
     props: {
        name: String,
        initCount: Number
    },
    data(){
        return{
            // Vueでの初期化のテクニック
            // dataへの代入はコンポーネントマウント時に一度だけ行われる
            count: this.initCount 
        }
    },
    methods:{
        increment(){
            this.count++;
            // Vue.$emit()メソッドを使ってeventを子から親に伝える
            // ここでは"emitUp"カスタムイベントを親コンポーネントに上げる
            //  第２引数の{name, counted}という値を持って通知
            this.$emit("emitUp", {name: this.name, counted: this.count })
        }
    }
}
</script>

<style lang="scss" scoped>
.counter{
    width: 200px;
}
</style>