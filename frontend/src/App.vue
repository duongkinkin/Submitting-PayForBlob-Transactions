<template>
  <div>
    <div class="img">
      <img
        src="https://s3-eu-west-1.amazonaws.com/assets.knack-eu.com/assets/63984cd450ecd300240895a0/logos/finalfinal.png"
        alt=""
      />
    </div>
    <div class="container">
      <h1>PayForBlob transaction</h1>
      <div class="namespaceId">
        <div class="distance">Namespace Id</div>
        <input v-model="namespace_id" class="input" />
      </div>
      <div class="base">
        <div class="distance">Data</div>
        <input v-model="data" class="input" />
      </div>
      <div class="base">
        <div class="distance">Gas Limit</div>
        <input v-model="gas_limit" class="input" />
      </div>
      <div class="base">
        <div class="distance">Fee</div>
        <input v-model="fee" class="input" />
      </div>
      <button type="button" class="btn" @click="submit">Submit</button>
      <div v-if="message === 'Transaction is pending!'" class="pedding">
        {{ message }}
      </div>
      <div v-if="message === 'Success!'" class="success">
        <div>{{ message }}</div>
        <div>THash: {{ txHash }}</div>
      </div>
      <div v-if="message === 'Something went wrong!'" class="error">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, toRefs, ref } from "vue";

const HOST_CORE = "http://78.46.91.221:30000";

export default {
  name: "App",
  setup() {
    const isShow = ref(false);
    const message = ref("");
    const txHash = ref("")
    const params = reactive({
      namespace_id: "",
      data: "",
      gas_limit: "",
      fee: "",
    });

    const submit = async () => {
      try {
        isShow.value = true;
        message.value = "Transaction is pending!";
        const { data } = await axios.post(`${HOST_CORE}/create`, params);
        if (data.height) {
          txHash.value = data.txhash;
          message.value = "Success!";
        } else {
          message.value = "Something went wrong!";
        }
      } catch (error) {
        message.value = "Something went wrong!";
      }
    };

    return {
      isShow,
      submit,
      message,
      txHash,
      ...toRefs(params),
    };
  },
};
</script>

<style scoped>
.img {
  background-color: blueviolet;
}

img {
  margin-left: 20%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.base {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.distance {
  width: 300px;
  height: 32px;
  font-weight: 600;
  font-size: 14px;
}

.none {
  opacity: 0.7;
}

input {
  height: 26px;
  background-color: #fcfcfc;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  padding-left: 10px;
}

input:focus {
  outline: none;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

h1 {
  margin-bottom: 40px;
}

.btnBase {
  height: 32px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
  background-color: #7b2bf9;
}

.namespaceId {
  display: flex;
}

.namespaceId > div:nth-child(2) {
  font-size: 14px;
  width: 300px;
}

.btn {
  margin-top: 60px;
  border-radius: 10px;
  height: 48px;
  width: 150px;
  font-size: 16px;
  font-weight: 600;
  background-color: green;
  color: white;
}

.pedding {
  margin-top: 50px;
  width: 500px;
  width: 500px;
  font-size: 20px;
  font-weight: 600;
  color: blue;
}

.success div:first-child {
  margin-top: 50px;
  width: 500px;
  width: 500px;
  font-size: 20px;
  font-weight: 600;
  color: green;
}

.success div:last-child {
  margin-top: 10px;
  width: 500px;
  width: 500px;
  font-size: 20px;
  font-weight: 600;
}

.error {
  margin-top: 50px;
  width: 500px;
  width: 500px;
  font-size: 20px;
  font-weight: 600;
  color: red;
}

.alert {
  margin-top: 60px;
}
</style>
