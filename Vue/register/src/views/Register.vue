<!--
  src\views\ 下に配置すること

-->
<template>
  <div class="outerFrame">
    <h1>This is a "Register" page</h1>

    <div class="register">
      <!-- <p>{{ profile }}</p> -->

      <!-- form submit button の実装例-->
<!--      <form @submit="onSubmit" action="/" method="POST">
 -->       <p>Name: <br /><input type="text" v-model="name" /></p>
        <br />
        <p>
          Select:<br />
          <select id="registerSelect" v-model="select">
            <option selected value="ABCD">ABCD</option>
            <option value="EFGH">EFGH</option>
            <option value="IJKL">IJKL</option>
            <option value="MNOP">MNOP</option>
            <option value="QRST">QRST</option>
          </select>
        </p>
        <br />
        <p>
          Comments: <br /><textarea
            v-model="comments"
            cols="20"
            rows="5"
          ></textarea>
          <br />
        </p>

        <p><input type="button" value="Register" id="buttonRegister" /></p>
        <!-- <p><button type="submit" value="Register">Register</button></p> -->
 <!--     </form>
-->
      <p>
        <button v-on:click="locate" class="buttonClear">Clear</button>
      </p>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props: ["url_edit"],
  data: function () {
    return {
      url_edit_id: "/registerCompleted",
    };
  },
  methods: {
    locate: function () {
      location.href = this.url_edit_id;
    },

    // form-POSTコールでもPOSTされないで内部処理するサンプル
    // onSubmit(event) {
    //   window.alert('onSubmit')
    //   event.preventDefault()
    // }
  },

  // mountedライフサイクルを使って呼び出される
  mounted() {},

  computed: {
    // ...mapState(["profile"]),
  },
};
</script>

<style>
div.outerFrame {
  text-align: center;
  width: 100%;
}

div.register {
  text-align: left;
  margin: 0px auto;
  width: 200px;
}
</style>