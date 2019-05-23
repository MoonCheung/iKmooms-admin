<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-list">
              <svg-icon icon-class="list"
                        class-name='card-panel-icon' />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站文章数
              </div>
              <div class="card-panel-num">无数据</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-tags">
              <svg-icon icon-class="md-pricetags"
                        class-name='card-panel-icon' />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站标签数
              </div>
              <div class="card-panel-num">无数据</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-eye">
              <svg-icon icon-class="eye-open"
                        class-name='card-panel-icon' />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站阅读数
              </div>
              <div class="card-panel-num">无数据</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-textsms">
              <svg-icon icon-class="md-text"
                        class-name='card-panel-icon' />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站评论数
              </div>
              <div class="card-panel-num">无数据</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>最近发布文章</span>
            </div>
            <div>文章内容</div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix">
              <span>本机统计数据</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text">刷新</el-button>
            </div>
            <div class="card-data">
              本机数据
            </div>
            <div class="card-progress">
              <el-progress type="circle"
                           :percentage="100"
                           status="text">Done</el-progress>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSystemList } from '@/api/system'
import './index.scss'

export default {
  name: 'Admin',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
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
          console.log(res.data)
        })
        .catch(err => {
          console.log('Catch报错:' + err)
        })
    }
  }
}
</script>
