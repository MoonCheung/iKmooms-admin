<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-list">
              <svg-icon icon-class="list"
                        class-name="card-panel-icon" />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站文章数
              </div>
              <div class="card-panel-num">
                {{ artNum }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-tags">
              <svg-icon icon-class="md-pricetags"
                        class-name="card-panel-icon" />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站标签数
              </div>
              <div class="card-panel-num">
                {{ tagNum }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-eye">
              <svg-icon icon-class="eye-open"
                        class-name="card-panel-icon" />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站阅读数
              </div>
              <div class="card-panel-num">
                {{ pvNum }}
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always"
                   class="card-panel">
            <div class="card-panel-icon-wrapper icon-textsms">
              <svg-icon icon-class="md-text"
                        class-name="card-panel-icon" />
            </div>
            <div class="card-panel-desc">
              <div class="card-panel-text">
                全站评论数
              </div>
              <div class="card-panel-num">
                {{cmtNum}}
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix card-header">
              <span>最近发布文章</span>
            </div>
            <div>
              <el-table :data="artData"
                        style="width: 100%"
                        max-height="228">
                <el-table-column prop="uid"
                                 type="index"
                                 label="ID"
                                 width="50">
                  <template v-slot="props">
                    {{ props.row.uid }}
                  </template>
                </el-table-column>
                <el-table-column prop="title"
                                 label="标题" />
                <el-table-column fixed="right"
                                 prop="cdate"
                                 label="发布时间"
                                 width="150"
                                 header-align="center" />
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header"
                 class="clearfix card-header">
              <span>本机统计数据</span>
              <el-button style="float: right; padding: 0"
                         type="text"
                         @click.prevent="changeInit">
                刷新
              </el-button>
            </div>
            <el-row>
              <el-col :span="12">
                <div class="card-status">
                  <div>
                    <span>运行状态：</span>
                    <el-tag :type="Object.is(constants, '0') ? 'success' : 'danger'"
                            size="small">
                      {{
                      Object.is(constants, '0')
                      ? '服务器正在运行'
                      : '服务器出现错误'
                      }}
                    </el-tag>
                  </div>
                  <div>
                    <span>操作系统：</span>
                    <el-tag color="#495060"
                            size="small"
                            class="card-tag">
                      {{ type }}
                    </el-tag>
                  </div>
                  <div>
                    <span>服务器主机名：</span>
                    <el-tag color="#409EFF"
                            size="small"
                            class="card-tag">
                      {{ hostname }}
                    </el-tag>
                  </div>
                  <div>
                    <span>Nodejs编译系统：</span>
                    <el-tag color="#4CBE63"
                            size="small"
                            class="card-tag">
                      {{ platform }}
                    </el-tag>
                  </div>
                  <div>
                    <span>服务器发行版本：</span>
                    <el-tag color="#495060"
                            size="small"
                            class="card-tag">
                      {{ release }}
                    </el-tag>
                  </div>
                  <div>
                    <span>服务器总内存数：</span>
                    <el-tag color="#409EFF"
                            size="small"
                            class="card-tag">
                      {{ totalmemory }}
                    </el-tag>
                  </div>
                  <div>
                    <span>服务器可用内存数：</span>
                    <el-tag color="#409EFF"
                            size="small"
                            class="card-tag">
                      {{ freememory }}
                    </el-tag>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="card-progress">
                  <el-progress :percentage="percentage"
                               :width="220"
                               type="circle"
                               status="text">
                    <div class="card-progress-text">
                      <h1>内存使用率</h1>
                      <p>综合服务器内存占比</p>
                      <span>总占百分比:<i>{{ percentage }}%</i></span>
                    </div>
                  </el-progress>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSystemList } from '@/api/system';
import { artAllLists, getPvTotals } from '@/api/article';
import { getAllCmts } from '@/api/comment';
import { getTagTotals } from '@/api/tag';
import './index.scss';

export default {
  name: 'Admin',
  data () {
    return {
      constants: null,
      type: null,
      release: null,
      platform: null,
      hostname: null,
      totalmemory: null,
      freememory: null,
      percentage: 0,
      // 表单数据
      artData: [],
      // 文章数
      artNum: 0,
      // 标签数
      tagNum: 0,
      // 阅读数
      pvNum: 0,
      // 评论数
      cmtNum: 0
    };
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  created () {
    this.initSystem();
    this.artAllList();
    this.tagAllTotal();
    this.pvAllTotal();
    this.cmtAllTotal();
  },
  methods: {
    initSystem () {
      getSystemList().then(res => {
        if (res.data.code === 1) {
          (this.constants = res.data.constants),
            (this.release = res.data.release),
            (this.platform = res.data.platform),
            (this.hostname = res.data.hostname),
            (this.type = res.data.type),
            (this.totalmemory = res.data.totalmemory),
            (this.percentage = res.data.percentage),
            (this.freememory = res.data.Freememory);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    changeInit () {
      this.initSystem();
    },
    artAllList () {
      artAllLists().then(res => {
        if (res.data.code === 1) {
          this.artData = res.data.artListData;
          this.artNum = res.data.artTotalData;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    tagAllTotal () {
      getTagTotals().then(res => {
        if (res.data.code === 1) {
          this.tagNum = res.data.tagTotalData;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    pvAllTotal () {
      getPvTotals().then(res => {
        if (res.data.code === 1) {
          this.pvNum = res.data.result['0'].pv_count;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    cmtAllTotal () {
      getAllCmts().then(res => {
        if (res.data.code === 1) {
          this.cmtNum = res.data.result;
        }
      }).catch(err => {
        console.error(err);
      })
    }
  }
};
</script>
