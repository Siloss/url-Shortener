<template>
	<div class="links">
		<links-list
			:links="links"
			v-on:on-link-item-click="openLinkModal"
			v-on:on-link-delete="deleteLink"
		></links-list>
		<div class="fixed-wrapper">
			<button
				class="add btn-floating btn-large waves-effect waves-light red"
				@click="openNewLinkModal()"
			>
				<i class="material-icons">add</i>
			</button>
		</div>
		<new-link-modal
			ref="newLinkModal"
			v-on:on-link-created="addLink"
		></new-link-modal>
		<link-modal ref="linkModal"></link-modal>
	</div>
</template>

<script>
import Api from "../api/api";
export default {
	name: "Links",
	data: () => ({
		links: [],
	}),
	async mounted() {
		try {
			const api = new Api(
				"/api/link/",
				"Bearer " + localStorage.getItem("jwt")
			);
			this.links = await api.GET();
		} catch (e) {
			M.toast({ html: "Smth went wrong! Try later." });
		}
	},
	methods: {
		openNewLinkModal() {
			this.$refs.newLinkModal.open();
		},
		openLinkModal(linkData) {
			this.$refs.linkModal.open(linkData);
		},
		addLink(link) {
			this.links.push(link);
		},
		async deleteLink(link) {
			try {
				const api = new Api("", "Bearer " + localStorage.getItem("jwt"));

				await api.DELETE({}, "/api/link/remove/" + link.hash);
				this.links = this.links.filter((_) => {
					return _.hash != link.hash;
				});
			} catch (e) {
				M.toast({ html: "Smth went wrong! Try Later" });
			}
		},
	},
	components: {
		linksList: () => import("../components/linksList"),
		newLinkModal: async () => import("../components/newLinkModal"),
		linkModal: async () => import("../components/linkModal"),
	},
};
</script>

<style lang="scss" scoped>
.links {
	position: relative;

	.fixed-wrapper {
		position: absolute;
		width: 56px;
		height: 56px;
		right: -50px;
		top: calc(100vh - 118px);

		.add {
			position: fixed;
		}
	}
}
</style>
