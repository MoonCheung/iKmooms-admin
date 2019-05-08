<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles"
            :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSystemList } from "@/api/system";

export default {
  name: "admin",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getSystemList()
        .then(res => {
          // (this.constants = res.data.constants),
          //   (this.release = res.data.release),
          //   (this.platform = res.data.platform),
          //   (this.hostname = res.data.hostname),
          //   (this.type = res.data.type),
          //   (this.totalmemory = res.data.totalmemory),
          //   (this.Freememory = res.data.Freememory),
          //   (this.percentage = res.data.percentage),
          //   (this.cpus = res.data.cpus);
          console.log(res.data);
        })
        .catch(err => {
          console.log("Catch报错:" + err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
