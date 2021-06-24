<template>
	<div id="modal" class="modal">
		<div class="modal-content">
			<ul>
				<li>
					<h5>URL:</h5>
					{{ linkData.url }}
				</li>
				<li>
					<h5>shortened URL:</h5>
					{{ getShortenedUrl(linkData.hash) }}
				</li>
				<li>
					<h5>hash:</h5>
					{{ linkData.hash }}
				</li>
				<li>
					<h5>clicks:</h5>
					{{ linkData.clicks }}
				</li>
				<li>
					<h5>created:</h5>
					{{ formatDate(linkData.created) }}
				</li>
			</ul>
		</div>
		<div class="modal-footer">
			<button
				class="waves-effect waves-light btn-flat red white-text"
				@click="close()"
			>
				Close
			</button>
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	name: "linkModal",
	data: () => ({
		MaterialInstance: null,
		linkData: {},
	}),
	mounted() {
		this.MaterialInstance = M.Modal.init(this.$el, {});
	},
	beforeDestroy() {
		this.MaterialInstance.destroy();
	},
	methods: {
		formatDate(date) {
			return moment(date).format("MMMM Do YYYY, h:mm a");
		},
		getShortenedUrl(hash) {
			return window.location.origin + "/r/" + hash;
		},
		open(linkData) {
			this.linkData = linkData;
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
	ul {
		list-style: none;
	}
	.modal-footer {
		button {
			margin: 0 5px;
		}
	}
}
</style>
