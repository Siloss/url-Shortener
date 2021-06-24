<template>
  <div class="statistics">
    <stats-chart></stats-chart>
  </div>
</template>

<script>
import statsChart from "../components/statsChart";

export default {
  components: {
    "stats-chart": statsChart,
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  bar-chart {
    max-height: 20px;
  }
}
</style>