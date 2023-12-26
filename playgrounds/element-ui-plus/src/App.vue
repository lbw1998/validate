<template>
  ele
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Username" prop="username" >
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <el-form-item label="Text" prop="text">
      <el-input v-model="ruleForm.text" />
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { i18n, requiredRule, nameRule, phoneRule, emailRule, passwordRule, useRepeatPasswordRules, Required, LengthMinMax, createValidator } from '../../../dist/virtai-validate.js'


const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  pass: '',
  email: '',
  text: '',
  checkPass: '',
  age: '',
})

const newEmailRule = emailRule({
  validator: {
    message: '邮箱名称不能等于奥特曼',
    validator: (value) => {
      if (value === '奥特曼') {
        return true
      } else if (value === '迪迦') {
        return true
      }
    }
  }
})

const noReGanMian = {
  message: '必须包含热干面',
  validator: (value) => {
    return !value.includes('热干面')
  }
}

const required = new Required()
required.message = '游戏名称不能为空'
const newEmailRule = emailRule({
  validator: required
})
const repeatPasswordRules = useRepeatPasswordRules(toRef(ruleForm,'pass'))

const rules = reactive<FormRules<typeof ruleForm>>({
  username: nameRule(),
  pass: passwordRule(),
  email: newEmailRule,
  text: [{validator: createValidator(new Required(), new LengthMinMax(4, 8), noReGanMian), trigger: 'blur'}],
  checkPass: repeatPasswordRules,
  // age: [{ validator: checkAge, trigger: 'blur' }],
})


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
