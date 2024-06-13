<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <LockClosedIcon class="mx-auto h-10 w-10 text-indigo-600" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
            >Username</label
          >
          <div class="mt-2">
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-pink-500 after:ml-0.5"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            @click="goSignIn"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}
        <span
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
          @click="goSignUp"
          >SignUp</span
        >
      </p>
    </div>
  </div>

  <Alert :data="alertData" :isOpen="isOpen" @close="closeModal" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { LockClosedIcon } from "@heroicons/vue/24/solid";
import Alert from "@/components/Alert.vue";
import { login } from "@/api";
import { setCookie } from "@/helper";

const router = useRouter();
const username = ref("");
const password = ref("");
const isOpen = ref(false);
const alertData = reactive({
  title: "Information",
  msg: "Form input belum lengkap!",
  type: "Notif",
});

const closeModal = () => {
  isOpen.value = false;
};
const goSignIn = () => {
  const params = { username: username.value, password: password.value };
  if (username.value == "" || password.value == "") {
    alertData.msg = "Email and Password must be filled out";
    isOpen.value = true;
  } else {
    login(params)
      .then((response) => {
        if (response.data.status) {
          const info = JSON.stringify(response.data.user);
          setCookie("user", info, 1);
          setCookie("token", response.data.token);
          router.push({ name: "home" });
        }
      })
      .catch((err) => {
        alertData.msg = err.response.data.message;
        isOpen.value = true;
      });
  }
};
const goSignUp = () => {
  router.push({ name: "register" });
};

onMounted(() => {});
</script>
