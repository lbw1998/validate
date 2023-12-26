<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    validateFirst
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="nameRule({trigger: 'blur'})"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="手机号"
      name="phone"
      :rules="phoneRule()"
    >
      <a-input v-model:value="formState.phone" />
    </a-form-item>

    <a-form-item
      label="邮箱"
      name="email"
      :rules="newEmailRule"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item
      label="邮箱"
      name="asyncEmail"
      :rules="emailRule()"
    >
      <a-input v-model:value="formState.asyncEmail" />
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
      :rules="passwordRule()"
    >
      <a-input v-model:value="formState.password" />
    </a-form-item>
    <!-- <a-form-item
      label="重复密码"
      name="repeatPassword"
      :rules="repeatPasswordRules"
    >
      <a-input v-model:value="formState.repeatPassword" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import  { i18n, requiredRule, nameRule, phoneRule, emailRule, passwordRule,  Required } from '../../../dist/virtai-validate.js'

const newEmailRule = emailRule({
  validator: {
    message: '邮箱名称不能为空',
    validator: (value) => {
      return value.trim() === ''
    }
  }
})
// const required = new Required()
// required.message = '游戏名称不能为空'
// const newEmailRule = emailRule({
//   validator: required
// })
// const rules = reactive({
//   username: [{ validator: format(a, b), trigger: 'change' }]
// })

interface FormState {
  username: string;
  phone: string;
  email: string;
  asyncEmail: string;
  password: string;
  repeatPassword: string;
}

const formState = reactive<FormState>({
  username: '',
  phone: '',
  email: '',
  asyncEmail: '',
  password: '',
  repeatPassword: '',
});

// 还有没有优化方案
// const repeatPasswordRules = useRepeatPasswordRules(toRef(formState,'password'))

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

</script>