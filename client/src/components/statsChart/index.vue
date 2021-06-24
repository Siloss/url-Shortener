<template>
	<div>
		<div class="chart-wrapper">
			<chart :datasets="datasets"></chart>
			<range class="range" v-on:change="computeData"></range>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import Api from "../../api/api";
import ChartVue from "./Chart.vue";
export default {
	name: "statschart",
	data: () => ({
		links: [],
		clicks: [],
	}),
	methods: {
		async computeData(date) {
			const api = new Api(
				"/api/click/getCounts",
				"Bearer " + localStorage.getItem("jwt")
			);

			Promise.all([
				api.GET("/api/link/" + date[0] + "|" + date[1]),
				api.POST({
					startDate: date[0],
					endDate: date[1],
				}),
			]).then((_) => {
				(this.links = _[0]), (this.clicks = _[1]);
			});
		},
	},
	computed: {
		datasets() {
			try {
				const data1 = [];
				const data2 = [];

				this.clicks.forEach((_) => {
					data2.push({ x: moment(_.date).format("MM/DD/YYYY"), y: _.clicks });
				});

				const linksCreated = new Map();

				this.links.forEach((_) => {
					const key = moment(_.created).format("MM/DD/YYYY");
					const value = linksCreated.get(key);
					if (value) {
						linksCreated.set(key, value + 1);
					} else {
						linksCreated.set(key, 1);
					}
				});

				for (let [k, v] of linksCreated) {
					data1.push({ x: k, y: v });
				}

				return [
					{
						label: "Links Created",
						borderColor: "blue",
						backgroundColor: "rgba(0, 0, 255, 0.7)",
						data: data1,
					},
					{
						label: "Clicks",
						borderColor: "red",
						backgroundColor: "rgba(255, 0, 0, 0.7)",
						data: data2,
					},
				];
			} catch (e) {
				M.toast({ html: "Smth went wrong! Try later." });
			}
		},
	},
	components: {
		chart: ChartVue,
		range: () => import("./Range.vue"),
	},
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
	width: 100%;

	.range {
		width: fit-content;
		margin: 20px auto;
	}
}
</style>
