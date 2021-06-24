<template>
  <div class="bg">
    <div class="central-container">
      <div class="row">
        <div class="col s12">
          <ul class="tabs green">
            <router-link tag="li" to="Login" class="tab">
              <a>Login</a>
            </router-link>
            <router-link tag="li" to="Register" class="tab">
              <a>Register</a>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorization_layout",
  data: () => ({
    MaterialInstance: null
  }),
  mounted() {
    //init Materialize tabs and add scopeId to dynamically added element
    this.MaterialInstance = M.Tabs.init(this.$el.querySelector(".tabs"));
    this.$el
      .querySelector(".indicator")
      .setAttribute(this.$options._scopeId, "");

    //update tab indicator
    this.$el.querySelector(".router-link-exact-active > a").click();
  },
  beforeDestroy() {
    this.MaterialInstance.destroy();
  }
};
</script>




<style lang="scss" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: rgb(235, 235, 235);

  .central-container {
    width: 400px;
    //background: red;
    position: relative;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

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
  }

  .container {
    width: 92%;
  }
}

@media screen and (max-width: 360px) {
  .bg {
    .central-container {
      width: 95%;
    }
  }
}

@media screen and (max-width: 640px) {
  .bg {
    .central-container {
      width: 75%;
    }
  }
}
</style>
