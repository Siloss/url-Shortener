<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>
import Authorization_layout from "./layouts/Authorization_layout";
import Main_layout from "./layouts/Main_layout";
export default {
  name: "App",
  computed: {
    layout() {
      //refactor
      return this.$route.meta.layout;
    }
  },
  components: { Authorization_layout, Main_layout }
};
</script>
