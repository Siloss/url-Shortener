<template>
	<div class="outer-container">
		<div class="container">
			<div class="tabs green">
				<router-link to="Stats" tag="li" class="tab">
					<a>Stats</a>
				</router-link>
				<router-link to="Links" tag="li" class="tab">
					<a>Links</a>
				</router-link>
			</div>
			<router-view></router-view>
		</div>
		<button
			class="sign-out-button waves-effect waves-light btn red"
			@click="signOut()"
		>
			SIGN OUT
		</button>
	</div>
</template>

<script>
export default {
	name: "Main_layout",
	data: () => ({
		MaterialInstance: null,
	}),
	mounted() {
		//init Materialize tabs and add scopeId to dynamically added element
		this.MaterialInstance = M.Tabs.init(this.$el.querySelector(".tabs"));
		this.$el
			.querySelector(".indicator")
			.setAttribute(this.$options._scopeId, "");

		//update tab indicator
		this.$el.querySelector(".router-link-active > a").click();
	},
	beforeDestroy() {
		this.MaterialInstance.destroy();
	},
	methods: {
		signOut() {
			localStorage.setItem("jwt", "");
			this.$router.push("/login");
		},
	},
};
</script>

<style lang="scss" scoped>
.outer-container {
	width: 80%;
	margin: auto;
	position: relative;

	.tabs {
		display: flex;
		.tab {
			flex-grow: 1;
			a {
				color: #fff;
			}
		}
		.indicator {
			background: #fff;
		}
	}

	.sign-out-button {
		position: absolute;
		top: 5px;
		right: 0;
	}
}
</style>
