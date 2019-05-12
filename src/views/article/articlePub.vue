<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-card>
            <div slot="header">
              <span>撰写新文章</span>
            </div>
            <el-form ref="form"
                     :model="form"
                     label-width="100px"
                     class="el-formtable">
              <el-form-item label="文章标题">
                <el-input v-model="form.title"
                          class="el-forminput"
                          placeholder="请描写文章标题"></el-input>
              </el-form-item>
              <el-form-item label="文章描述">
                <el-input v-model="form.desc"
                          class="el-forminput"
                          placeholder="请描写文章描述"></el-input>
              </el-form-item>
              <!-- <el-form-item label="发布日期">
                <el-date-picker @change="changeDate"
                                v-model="form.curdate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item> -->
              <el-form-item label="文章内容">
                <!-- 引入自定义富文本组件这里 -->
                <v-quill-editor ref="myeditor"></v-quill-editor>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitArticle">发布文章</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span>分类目录</span>
            </div>
            <el-radio-group v-model="radio">
              <div class="radio-first">
                <el-radio label="front"
                          @click.native.prevent="clickitem('front')">
                  <span>前端开发</span>
                </el-radio>
              </div>
              <div class="radio-two">
                <el-radio label="diary"
                          @click.native.prevent="clickitem('diary')">
                  <span>生活日记</span>
                </el-radio>
              </div>
              <div class="radio-three">
                <el-radio label="code"
                          @click.native.prevent="clickitem('code')">
                  <span>CODE</span>
                </el-radio>
              </div>
            </el-radio-group>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import vQuillEditor from "@/components/quill-editor";
import { insertArticle } from "@/api/article";
import { Notification } from 'element-ui';

export default {
  name: "artpub",
  components: {
    vQuillEditor
  },
  data () {
    return {
      form: {
        title: "",
        desc: ""
      },
      htmlContent: "",
      list: "",
      radio: "",
      curdate: FormatDate(new Date()),
    };
  },
  created () {
    console.log("处于开发状态：" + process.env.VUE_APP_BASE_API);
    console.log("处于开发状态：" + process.env.NODE_ENV);
  },
  //计算属性被混入实例当中，且有缓存的
  computed: {
    editor () {
      return this.$refs.myeditor.content;
    }
  },
  //该方法被混入实例当中...
  methods: {
    clickitem (event) {
      return this.list = event === this.radio ?
        this.radio = '' :
        this.radio = event
    },
    submitArticle () {
      let param = {
        title: this.form.title,
        desc: this.form.desc,
        htmlContent: this.editor,
        date: this.curdate,
        list: this.list
      };
      if (Object.is(this.form.title, "")) {
        this.$message({
          message: '此文章标题不得为空，请输入标题',
          type: 'warning'
        });
      } else {
        insertArticle(this.radio, param).then(res => {
          let { error } = res.data;
          if (Object.is(error, 0)) {
            this.$message({
              message: '发布文章成功',
              type: 'success'
            });
            [this.form.title, this.form.desc] = [""];
            this.$refs.myeditor.content = "";
          } else {
            this.$message({
              message: '发布文章失败',
              type: 'error'
            })
          }
        });
      }
    }
  },
  mounted () { }
};

// 封装格式化日期
function FormatDate (strTime) {
  let mydate = new Date(strTime);
  return `${mydate.getFullYear()}年${mydate.getMonth() +
    1}月${mydate.getDate()}日`;
}
</script>

<style lang="scss" scoped>
.el-formtable {
  .el-forminput {
    min-width: 80%;
    width: 80%;
  }
}
</style>
