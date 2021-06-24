<template>
	<form @submit.prevent="onSubmit">
		<div class="input-field">
			<input v-model="email" id="email" type="email" class="validate" />
			<label for="email">Email</label>
		</div>
		<div class="input-field">
			<input
				v-model="password"
				id="password"
				type="password"
				class="validate"
			/>
			<label for="password">Password</label>
		</div>
		<button :class="{ disabled: isSent }" type="submit" class="btn green">
			Login
		</button>
	</form>
</template>

<script>
import Api from "../api/api";
export default {
	data: () => ({
		email: "",
		password: "",
		isSent: false,
	}),
	methods: {
		async onSubmit() {
			try {
				this.isSent = true;

				const api = new Api("/api/auth/login");
				const res = await api.POST({
					email: this.email,
					password: this.password,
				});
				M.toast({ html: res.message });
				if (res.token) {
					localStorage.setItem("jwt", res.token);
					this.$router.push("Stats");
				}
				this.isSent = false;
			} catch (e) {
				this.isSent = true;
				M.toast({ html: "Smth went wrong! Try later." });
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	text-align: center;
}
</style>
