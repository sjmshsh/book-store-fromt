<template>
  <div class="login-container">
    <template v-if="status ==='login'">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">欢迎光临 九号书城</h3>
        </div>
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="用户手机号"
            name="phone"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入用户密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <div class="operation">
          <el-button type="success" @click="handleToRegister">我去注册</el-button>
          <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">用户登录</el-button>
        </div>

      </el-form>
    </template>
    <template v-if="status === 'register'">
      <el-form ref="registerForm" label-width="90px" :model="registerForm" :rules="registerRules" class="login-form" label-position="left">
        <div class="title-container">
          <h3 class="title">用户注册</h3>
        </div>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入注册用户手机号"
            type="text"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="用户密码" prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="请输入密码"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="registerForm.nickName" placeholder="请输入用户名称" />
        </el-form-item>
        <!-- 用户地址 -->
        <el-form-item label="用户地址" prop="address">
          <el-input v-model="registerForm.address" placeholder="请输入用户地址" />
        </el-form-item>
        <div class="operation">
          <el-button :loading="loading" type="success" @click.native.prevent="handleToLogin">我去登录</el-button>
          <el-button type="primary" @click="handleRegister">立即注册</el-button>
        </div>
      </el-form>
    </template>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      status: 'login',
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入注册手机号 ' }],
        password: [{ required: true, trigger: 'blur', message: '请输入用户密码' }]
      },
      registerRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入注册手机号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入用户密码' }],
        nickName: [{ required: true, trigger: 'blur', message: '请输入用户昵称' }],
        address: [{ required: true, trigger: 'blur', message: '请输入用户收货地址' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      registerForm: {
        phone: '',
        nickName: '',
        password: '',
        address: ''
      },
      showRegisterDialog: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleToLogin() {
      this.status = 'login'
    },
    handleToRegister() {
      this.status = 'register'
    },
    handleRegister() {
      register(this.registerForm).then((response) => {
        console.log(response)
        this.$notify({
          message: '注册成功',
          type: 'success',
          title: '成功',
          duration: 1500
        })
        this.loginForm.phone = this.registerForm.phone
        this.loginForm.password = this.registerForm.password
        this.handleLogin()
      }).catch((err) => {
        this.$notify({
          message: '注册失败:' + err,
          type: 'error',
          title: '失败',
          duration: 1500
        })
      })
    }
  }
}
</script>

<style lang="scss" >
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;

/* reset element-ui css */
.login-container {
  background-image: url('../../assets/images/background.png');
   background-size: cover;
  background-position: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
  }
}
.operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button{
    width: 40%;
  }
}
</style>
