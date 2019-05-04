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
            <el-radio-group v-model="radio"
                            @change="changeRadio">
              <el-radio label="front">
                <span class="radio-first">前端开发</span>
              </el-radio>
              <el-radio label="diary">
                <span class="radio-two">生活日记</span>
              </el-radio>
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

export default {
  name: "articlePub",
  components: {
    vQuillEditor
  },
  data() {
    return {
      form: {
        title: "",
        desc: ""
      },
      htmlContent: "",
      radio: "front",
      curdate: FormatDate(new Date())
    };
  },
  created() {
    console.log("处于开发状态：" + process.env.VUE_APP_BASE_API);
    console.log("处于开发状态：" + process.env.NODE_ENV);
  },
  //计算属性被混入实例当中，且有缓存的
  computed: {
    editor() {
      return this.$refs.myeditor.content;
    }
  },
  //该方法被混入实例当中...
  methods: {
    submitArticle() {
      this.changeRadio();
    },
    changeRadio() {
      let param = {
        title: this.form.title,
        desc: this.form.desc,
        htmlContent: this.editor,
        date: this.curdate,
        radio: this.radio
      };
      insertArticle(this.radio, param).then(res => {
        console.log(res.data);
      });
    }
  },
  mounted() {}
};

// 封装格式化日期
function FormatDate(strTime) {
  let mydate = new Date(strTime);
  return `${mydate.getFullYear()}年${mydate.getMonth() +
    1}月${mydate.getDate()}日`;
}
</script>

<style lang="scss" scoped>
.el-formtable{
  .el-forminput {
    min-width: 80%;
    width: 80%;
  }
}
</style>
