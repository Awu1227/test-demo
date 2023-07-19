<template>
	<div class="flex">
		<main class="left">
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				深入浅出 Vue——router
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/">
					<el-tooltip content="path: '/'" effect="customized">
						<el-button>Home</el-button>
					</el-tooltip>
				</router-link>
				<router-link to="/page1">
					<el-tooltip content="path: '/page1'" effect="customized">
						<el-button>Page1</el-button>
					</el-tooltip>
				</router-link>
			</div>
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				动态路由匹配
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/user/10001">
					<el-tooltip content="path: '/user/:id'" effect="customized">
						<el-button>/user/10001</el-button>
					</el-tooltip>
					
				</router-link>
				<router-link to="/user/10002">
					<el-tooltip content="path: '/user/:id'" effect="customized">
						<el-button>/user/10002</el-button>
					</el-tooltip>
				</router-link>
			</div>
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				捕获所有路由或404 Not Found
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/userrrrrrrr">
					<el-tooltip content="path: '/:pathMatch(.*)*'" effect="customized">
						<el-button>404 Not Found</el-button>
					</el-tooltip>
				</router-link>
				<router-link to="/user-1999-12-27">
					<el-tooltip content="path: '/user-:pathMatch(.*)'" effect="customized">
						<el-button>捕获所有以user-开头的路由</el-button>
					</el-tooltip>
				</router-link>
			</div>
		</main>
		<main class="right p-4 border ml-4">
			<router-view></router-view>
		</main>
	</div>
</template>

<script setup>

</script>

<style>
.left {
	width:48%
}
.right {
	width: 48%;
}
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>