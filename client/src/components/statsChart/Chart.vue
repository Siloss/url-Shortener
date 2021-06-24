<template>
	<transition name="fade" v-on:afterLeave="afterLeave">
		<div class="wrapper" v-show="show">
			<canvas ref="canvas"></canvas>
		</div>
	</transition>
</template>

<script>
import { Bar, mixins, Line } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
	extends: Line,
	data: () => ({
		show: true,
		options: {
			maintainAspectRatio: true,
			animation: {
				duration: 2500,
			},
			scales: {
				xAxes: [
					{
						display: true,
						type: "time",
						time: {
							parser: "MM/DD/YYYY",
							tooltipFormat: "ll",
							displayFormats: {
								day: "MM/DD/YYYY",
							},
						},
					},
				],
			},
		},
	}),
	mounted() {
		// Overwriting base render method with actual data.
		this.renderChart(
			{
				datasets: this.datasets,
			},
			this.options
		);
	},
	watch: {
		datasets() {
			this.show = false;
			this.renderChart(
				{
					labels: this.labels,
					datasets: this.datasets,
				},
				this.options
			);
		},
	},
	methods: {
		afterLeave() {
			this.show = true;
		},
	},
	props: ["datasets"],
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
	transition: opacity 0.5s;
}
.fade-leave-active {
	animation: fade 0.5s;
	//transition: 20s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

@keyframes fade {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

.wrapper {
	height: 400px;
}
</style>
