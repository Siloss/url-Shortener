<template>
	<div class="collection">
		<div v-for="link in links" :key="link.url" class="collection-item row">
			<p class="col s9 m10 l11">
				<a :href="link.url">{{ link.url }}</a>
			</p>

			<div class="icons col s3 m2 l1">
				<i class="material-icons" @click="$emit('on-link-item-click', link)"
					>info</i
				>
				<i class="material-icons" @click="$emit('on-link-delete', link)"
					>delete</i
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "linksList",
	methods: {
		shortUrl(urlString) {
			const maxWidth = this.$el.querySelector("p");
		},
	},
	props: ["links"],
};
</script>

<style lang="scss" scoped>
.collection {
	.collection-item {
		position: relative;
		p {
			overflow: hidden;
		}
		.icons {
			i {
				margin-left: auto;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				z-index: 3;

				&:hover {
					cursor: pointer;
				}

				&:first-of-type {
					&:hover {
						color: green;
					}
				}
				&:last-of-type {
					right: 3px;

					&:hover {
						color: red;
					}
				}
			}
		}
	}
}
</style>
