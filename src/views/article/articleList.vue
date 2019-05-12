<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header">
          <span>文章列表</span>
        </div>
        <div>
          <el-table :data="frontData"
                    style="width:100%">
            <!-- <el-table-column type="selection"
                             width="30">
            </el-table-column> -->
            <el-table-column type="index"
                             :index="indexMethod"
                             label="ID"
                             width="40">
            </el-table-column>
            <el-table-column prop="title"
                             label="文章"
                             width="180">
            </el-table-column>
            <el-table-column prop="desc"
                             label="描述">
            </el-table-column>
            <el-table-column prop="date"
                             label="发布日期"
                             width="100">
            </el-table-column>
            <el-table-column prop="operation"
                             width="120"
                             label="操作">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { frontList } from "@/api/article"

export default {
  name: "artlist",
  data () {
    return {
      frontData: [],
    }
  },
  methods: {
    indexMethod (index) {
      return index * 2;
    },
    async articleList (page) {
      try {
        let { data: { count, page } } = await frontList({})
      } catch (err) {
        this.$message.error(`${err}`);
      }
    }
  }
};
</script>

<style>
</style>
