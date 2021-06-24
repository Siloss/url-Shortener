<template>
	<div id="modal" class="modal">
		<div class="modal-content">
			<label for="url">URL: </label>
			<input id="url" type="text" v-model="url" />
		</div>
		<div class="modal-footer">
			<button
				class="waves-effect waves-light btn-flat red lighten-3 white-text"
				@click="close()"
			>
				Cancel
			</button>
			<button
				class="waves-effect waves-light btn green lighten-1 white-text"
				:class="{ disabled: isSent }"
				@click="generateLink()"
			>
				Generate
			</button>
		</div>
	</div>
</template>

<script>
import Api from "../../api/api";
export default {
	name: "newLinkModal",
	data: () => ({
		MaterialInstance: null,
		url: "https://",
		isSent: false,
	}),
	mounted() {
		this.MaterialInstance = M.Modal.init(this.$el, {});
	},
	beforeDestroy() {
		this.MaterialInstance.destroy();
	},
	methods: {
		async generateLink() {
			try {
				this.isSent = true;

				const api = new Api(
					"/api/link/new",
					"Bearer " + localStorage.getItem("jwt")
				);

				const res = await api.POST({
					url: this.url,
				});

				M.toast({ html: res.message });
				this.$emit("on-link-created", {
					url: res.url,
					hash: res.hash,
					clicks: res.clicks,
				});

				this.isSent = false;
				this.close();
			} catch (e) {
				this.isSent = false;

				M.toast({ html: "Smth went wrong! Try later." });
			}
		},
		open() {
			this.MaterialInstance.open();
		},
		close() {
			this.url = "https://";
			this.MaterialInstance.close();
		},
		destroy() {
			this.MaterialInstance.destroy();
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	.modal-footer {
		button {
			margin: 0 5px;
		}
	}
}
</style>
