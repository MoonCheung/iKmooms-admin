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
                     label-width="80px">
              <el-form-item label="文章标题">
                <el-input v-model="form.name"
                          placeholder="请描写文章标题"></el-input>
              </el-form-item>
              <el-form-item label="文章描述">
                <el-input v-model="form.desc"
                          placeholder="请描写文章描述"></el-input>
              </el-form-item>
              <el-form-item label="文章内容">
                <!-- 自行下载安装富文本组件引入这里 -->
                <v-quill-editor></v-quill-editor>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header">
              <span>发布日期</span>
            </div>
            <div>Content of card</div>
            <div>Content of card</div>
            <div>Content of card</div>
          </el-card>
          <el-card>
            <div slot="header">
              <span>分类目录</span>
            </div>
            <div>Content of card</div>
            <div>Content of card</div>
            <div>Content of card</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import vQuillEditor from "@/components/quill-editor";

export default {
  name: "articlePub",
  components: {
    vQuillEditor
  },

  data() {
    return {
      form: {
        name: "",
        desc: "",
        content: "hello quill 富文本子组件"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style>
</style>
