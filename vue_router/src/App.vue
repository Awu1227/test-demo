<template>
	<div class="flex">
		<main class="left">
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				深入浅出 Vue——router
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/">
					<el-button>Home</el-button>
				</router-link>
				<router-link to="/page1">
					<el-button>Page1</el-button>
				</router-link>
			</div>
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				动态路由匹配
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/user/10001">
					<el-button>/user/10001</el-button>
				</router-link>
				<router-link to="/user/10002">
					<el-button>/user/10002</el-button>
				</router-link>
			</div>
			<header class="relative  py-4 border border-gray-400  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center text-2xl text-white font-bold">
				捕获所有路由或404 Not Found
			</header>
			<div class="navigation flex justify-center m-4">
				<router-link to="/userrrrrrrr">
					<el-button>404 Not Found</el-button>
				</router-link>
				<router-link to="/user-1999-12-27">
					<el-button>捕获所有以user-开头的路由</el-button>
				</router-link>
			</div>
		</main>
		<main class="right p-4">
			<router-view></router-view>
		</main>
	</div>
</template>

<script setup>

</script>

<style scoped>
.left {
	width:48%
}
.right {
	width: 48%;
}
</style>