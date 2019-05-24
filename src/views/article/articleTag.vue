<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-card class="art-card">
            <div slot="header"
                 class="tags-header">
              <span>文章标签</span>
            </div>
            <div class="clearfix">
              <el-button style="float: right;"
                         type="primary"
                         @click="addTag">创建</el-button>
            </div>
            <el-table :data="tagsData"
                      style="width: 100%"
                      v-loading="listLoading">
              <el-table-column type="index"
                               width="50"> </el-table-column>
              <el-table-column prop="tagname"
                               label="标签名称">
              </el-table-column>
              <el-table-column prop="tagdesc"
                               label="标签描述">
              </el-table-column>
              <el-table-column prop="cdate"
                               label="创建日期"> </el-table-column>
              <el-table-column label="操作"
                               width="160">
                <template v-slot="scope">
                  <el-button type="primary"
                             size="small"
                             @click.native.prevent="editTag(scope.row)">编辑</el-button>
                  <el-button type="danger"
                             size="small"
                             @click.native.prevent="delTag(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
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
                        @pagination="getTagList" />
        </el-col>
      </el-row>
      <!-- 对话框 -->
      <el-dialog title="创建标签"
                 :visible.sync="dialogFormVisible"
                 width="40%">
        <el-form label-position="right"
                 label-width="80px"
                 :model="tagsForm"
                 ref="tagsForm"
                 :rules="tagsformRules">
          <el-form-item label="标签名称"
                        prop="tagname">
            <el-input v-model="tagsForm.tagname"
                      placeholder="请输入标签名称"></el-input>
          </el-form-item>
          <el-form-item label="标签描述"
                        prop="tagdesc">
            <el-input type="textarea"
                      v-model="tagsForm.tagdesc"
                      placeholder="请输入标签描述"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取&nbsp;消</el-button>
          <el-button type="primary"
                     @click="submitData('tagsForm')">确&nbsp;定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { addTags, getTags, editTags, delTags } from '@/api/tag'
import vPagination from '@/components/Pagination'
import './index.scss'

export default {
  name: 'ArtTag',
  components: {
    vPagination
  },
  data () {
    return {
      // 分页数据
      currentPage: 1,
      limit: 10,
      total: 1,
      // 表单数据
      tagsData: [],
      dialogFormVisible: false,
      // 对话框
      tagsForm: {
        id: '',
        tagname: '',
        tagdesc: ''
      },
      tagsformRules: {
        tagname: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        tagdesc: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
      },
      todo: '',
      listLoading: true
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    // 创建新表单
    initForm () {
      this.tagsForm.tagname = ''
      this.tagsForm.tagdesc = ''
    },
    // 添加标签
    addTag () {
      const _self = this
      _self.todo = 'add'
      _self.initForm()
      _self.dialogFormVisible = true
    },
    // 编辑标签
    editTag (param) {
      const _self = this
      _self.todo = 'edit'
      _self.dialogFormVisible = true
      _self.tagsForm = param
    },
    // 删除标签
    delTag (param) {
      this.$confirm('确认要删除该标签?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '返回'
      })
        .then(() => {
          delTags(param).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 再次获取分类列表
              this.getTagList()
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
    // 向服务器提交数据
    submitData (tagsForm) {
      this.$refs.tagsForm.validate(valid => {
        if (valid) {
          if (this.todo === 'add') {
            addTags(this.tagsForm)
              .then(res => {
                if (res.data.code === 1) {
                  this.dialogFormVisible = false
                  this.getTagList()
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            editTags(this.tagsForm)
              .then(res => {
                if (res.data.code === 1) {
                  this.dialogFormVisible = false
                  this.getTagList()
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(err => {
                console.error(err)
              })
          }
        }
      })
    },
    // 获取标签列表
    getTagList () {
      this.listLoading = true
      const param = {
        curPage: this.currentPage,
        limit: this.limit
      }
      getTags(param).then(res => {
        this.tagsData = res.data.tagsData
        if (res.data.tagsData.length > 0) {
          this.total = res.data.total
        }
        this.listLoading = false
      })
    }
  },
  mounted () { }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
