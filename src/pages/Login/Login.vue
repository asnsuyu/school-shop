<script setup>
	// 直接使用「按需导入」会覆盖「自定义引入的样式文件」（如果自己的样式文件对官方组件样式进行了修改覆盖的话）
	// 因此需要对这部分组件进行「手动导入」样式
	// 需要导入的样式在官方给出的「源代码css.ts」中可以找到
	import { ElMessage } from 'element-plus'
	import 'element-plus/theme-chalk/el-message.css'
	// 下面这种是官方的手动导入方式, 但查看源代码会发现导入的这个文件中包含了「多个css」
	// 这种导入会额外又导入一次「官方的样式初始化文件」，这会覆盖掉「自定义的样式文件」
	// import 'element-plus/es/components/message/styles/css'

	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '@/stores/userStore.js'

	// 控制form-item的规则对象，在el-form上通过:model绑定
	const ruleForm = ref({
		account: 'xiaotuxian001',
		password: '123456',
		agree: true,
	})
	// 控制form-item的校验规则对象，在el-form上通过:rules绑定
	// el-form-item的prop属性与ruleForm的字段一一对应
	// 同时需要给form-item内的具体元素通过v-model绑定ruleForm的对应字段
	const validatePass = (rule, value, callback) => {
		if (value) {
			callback()
		} else {
			callback(new Error('请勾选同意条款'))
		}
	}
	const rules = {
		account: [
			{ required: true, message: '用户名不能为空', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '密码不能为空', trigger: 'blur' },
			{ min: 6, max: 14, message: '密码长度要求6-14个字符', trigger: 'blur' },
		],
		agree: [
			{ validator: validatePass },
		],
	}

	const router = useRouter()
	const userStore = useUserStore()

	// 点击登录按钮时需要对所有表单元素进行一次统一校验
	// 通过调用表单对象自带的方法触发所有表单元素的校验操作
	const formRef = ref(null)
	const doLogin = () => {
		const { account, password } = ruleForm.value
		formRef.value.validate(async (valid) => {
			// valid: 所有表单元素都通过校验时, 返回 true , 否则为 false
			if (valid) {
				await userStore.getUserInfo({ account, password })
				// 登录接口调用成功, 则提示用户并跳转路由
				ElMessage({
					message: '登录成功',
					type: 'success',
					plain: true,
				})
				router.replace('/')  // 使用 replace , 防止用户频繁返回登录页
				// 登录接口调用失败, 则提示用户, 这部分放在响应拦截器中进行
			}
		})
	}
</script>

<template>
	<div>
		<header class='login-header'>
			<div class='container m-top-20'>
				<h1 class='logo'>
					<!-- <RouterLink to="">小兔鲜</RouterLink> -->
				</h1>
				<RouterLink class='entry' to='/'>
					进入网站首页
					<i class='iconfont icon-angle-right'></i>
					<i class='iconfont icon-angle-right'></i>
				</RouterLink>
			</div>
		</header>

		<section class='login-section'>
			<div class='wrapper'>
				<nav>
					<a href='javascript:'>账户登录</a>
				</nav>
				<div class='account-box'>
					<div class='form'>
						<el-form
							ref='formRef'
							:model='ruleForm'
							:rules='rules'
							label-position='right'
							label-width='60px'
							status-icon
						>
							<el-form-item label='账户' prop='account'>
								<el-input v-model='ruleForm.account' />
							</el-form-item>
							<el-form-item label='密码' prop='password'>
								<el-input v-model='ruleForm.password' />
							</el-form-item>
							<el-form-item label-width='40px' prop='agree'>
								<el-checkbox v-model='ruleForm.agree' size='large' class='code'>
									我已同意隐私条款和服务条款
								</el-checkbox>
							</el-form-item>
							<el-button
								class='subBtn'
								size='large'
								@click='doLogin'
							>
								点击登录
							</el-button>
						</el-form>
					</div>
				</div>
			</div>
		</section>

		<footer class='login-footer'>
			<div class='container'>
				<p>
					<a href='javascript:'>关于我们</a>
					<a href='javascript:'>帮助中心</a>
					<a href='javascript:'>售后服务</a>
					<a href='javascript:'>商务合作</a>
					<a href='javascript:'>友情链接</a>
				</p>
				<p>CopyRight &copy; 2024</p>
			</div>
		</footer>
	</div>
</template>

<style scoped lang='scss'>
	.login-header {
		background: #fff;

		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.logo {
			width: 200px;

			a {
				display: block;
				height: 132px;
				width: 100%;
				text-indent: -9999px;
				background: url("") no-repeat center 18px / contain;
			}
		}

		.entry {
			width: 120px;
			margin-top: 38px;
			margin-bottom: 38px;
			font-size: 16px;

			i {
				font-size: 14px;
				color: $xtxColor;
				letter-spacing: -5px;
			}
		}
	}

	.login-section {
		background: url('@/assets/images/login-bg.png') no-repeat center / cover;
		background-color: #5bad9f;
		height: 488px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.wrapper {
			position: absolute;
			left: 50%;
			width: 380px;
			background: #fff;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
			transform: translate3d(100px, 0, 0);

			nav {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				padding: 0 40px;
				height: 55px;
				font-size: 14px;

				a {
					flex: 1;
					font-size: 18px;
					text-align: center;
				}
			}

			.account-box {
				.form {
					padding: 0 20px 20px 20px;
				}

				.subBtn {
					width: 100%;
					color: #fff;
					background: $xtxColor;
				}
			}
		}
	}

	.login-footer {
		padding: 30px 0;
		background: #fff;

		p {
			padding-top: 20px;
			color: #999;
			text-align: center;

			a {
				padding: 0 10px;
				color: #999;
				line-height: 1;

				~ a {
					border-left: 1px solid #ccc;
				}
			}
		}
	}
</style>