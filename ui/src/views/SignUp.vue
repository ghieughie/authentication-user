<template>
  <div class="max-w-sm mx-auto my-5 p-5 border rounded-lg shadow-lg">
    <div>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2
            class="text-center text-base font-semibold leading-7 text-gray-900"
          >
            Register User
          </h2>
          <!--          <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what-->
          <!--            you share.</p>-->

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
                >Name</label
              >
              <div class="mt-2">
                <input
                  v-model="user.name"
                  type="text"
                  name="name"
                  id="name"
                  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
                >Username</label
              >
              <div class="mt-2">
                <input
                  v-model="user.username"
                  id="username"
                  name="username"
                  type="text"
                  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
                >Password</label
              >
              <div class="mt-2">
                <input
                  v-model="user.password"
                  type="password"
                  name="password"
                  id="password"
                  class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="back"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="onRegister"
        >
          Save
        </button>
      </div>
    </div>
  </div>

  <Alert :data="alertData" :isOpen="isOpen" @close="closeModal" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import { register } from "@/api.js";

const router = useRouter();
const user = ref({
  name: "",
  username: "",
  password: "",
});
const isOpen = ref(false);
const alertData = reactive({
  title: "Information",
  msg: "Form input belum lengkap!",
  type: "Notif",
});

const closeModal = () => {
  isOpen.value = false;
};
const back = () => {
  router.push({ name: "login" });
};
const validate = (obj) => {
  if (obj.name == "" || obj.email == "" || obj.password == "") {
    alertData.msg = "Name, Username and Password must be filled out";
    return false;
  } else {
    return true;
  }
};
const onRegister = () => {
  const val = validate(user.value);
  if (val) {
    register(user.value)
      .then((response) => {
        if (response.data.status) {
          back();
        }
      })
      .catch((err) => {
        alertData.msg = err.response.data.message;
        isOpen.value = true;
      });
  } else {
    isOpen.value = true;
  }
};

onMounted(async () => {});
</script>
