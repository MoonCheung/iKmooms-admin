<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header"
                 class="art-header">
              <span>文章列表</span>
            </div>
            <div>
              <el-table :data="artListData"
                        style="width:100%"
                        v-loading="listLoading">
                <el-table-column type="expand">
                  <template v-slot="props">
                    <el-form label-position="right"
                             inline
                             class="art-table-expand">
                      <el-form-item label="标签">
                        <el-tag v-for="(item, index) in props.row.tag"
                                :key="index"
                                style="margin-right: 5px;">
                          <span>{{ item }}</span>
                        </el-tag>
                      </el-form-item>
                      <el-form-item label="文章描述">
                        <span>{{ props.row.desc }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column type="index"
                                 label="ID"
                                 width="40">
                </el-table-column>
                <el-table-column prop="title"
                                 label="标题"
                                 header-align="center">
                </el-table-column>
                <el-table-column prop="catg"
                                 label="所属分类"
                                 width="120"
                                 header-align="center"
                                 align="center">
                </el-table-column>
                <el-table-column prop="cdate"
                                 label="发布日期"
                                 width="150"
                                 header-align="center"
                                 align="center">
                </el-table-column>
                <el-table-column label="状态"
                                 width="80"
                                 header-align="center"
                                 align="center">
                  <template v-slot="props">
                    {{ props.row.status == 0 ? '私密' : '公开' }}
                  </template>
                </el-table-column>
                <el-table-column width="220"
                                 label="操作"
                                 header-align="center">
                  <template v-slot="scope">
                    <el-button type="primary"
                               size="small"
                               @click.native.prevent="editArt(scope.row)">编辑</el-button>
                    <el-button type="info"
                               size="small"
                               @click.native.prevent="chgArt(scope.row)">{{ scope.row.status == 0 ? '公开' : '私密' }}</el-button>
                    <el-button type="danger"
                               size="small"
                               @click.native.prevent="delArt(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <v-pagination v-show="total > 0"
                        style="padding-top:10px;"
                        :total="total"
                        :page.sync="currentPage"
                        :limit.sync="limit"
                        @pagination="getArtList" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {
  articleList,
  delArticle,
  chgArtStatus
} from '@/api/article'
import vPagination from '@/components/Pagination'

import './index.scss'

export default {
  name: 'ArtList',
  components: {
    vPagination
  },
  data () {
    return {
      // 表单数据
      artListData: [],
      // 分页数据
      currentPage: 1,
      limit: 10,
      total: 1,
      listLoading: true
    }
  },
  created () {
    this.getArtList()
  },
  methods: {
    // 编辑文章
    editArt (param) {
      this.$confirm('此操作确定重新编辑文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 带有查询参数
          this.$router.push({
            name: 'articlePub',
            query: {
              id: param.id,
              method: 'edit'
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消编辑'
          })
        })
    },
    // 改变文章状态
    chgArt (param) {
      let sts
      param.status === 0 ? (sts = 1) : (sts = 0)
      const data = {
        id: param.id,
        status: sts
      }
      this.$confirm('确认要改变该文章状态?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '返回'
      })
        .then(() => {
          chgArtStatus(data).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 再次获取文章列表
              this.getArtList()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message:
              action === 'cancel' ? '放弃改变并离开页面' : '停留在当前页面'
          })
        })
    },
    // 删除文章
    delArt (param) {
      this.$confirm('确认要删除该文章?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '返回'
      })
        .then(() => {
          delArticle(param).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 再次获取文章列表
              this.getArtList()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message:
              action === 'cancel' ? '放弃删除并离开页面' : '停留在当前页面'
          })
        })
    },
    // 获取文章列表
    getArtList () {
      this.listLoading = true
      const param = {
        curPage: this.currentPage,
        limit: this.limit
      }
      articleList(param)
        .then(res => {
          if (res.data.code === 1) {
            this.artListData = res.data.artData
            this.total = res.data.total
          }
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 500)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
