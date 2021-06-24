<template>
	<div>
		<date-picker
			v-model="dateRange"
			range
			v-on:change="$emit('change', dateRange)"
			placeholder="Select shown interval"
		></date-picker>
	</div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
	name: "range",
	data: () => ({
		dateRange: null,
	}),
	components: { DatePicker },
};
</script>
