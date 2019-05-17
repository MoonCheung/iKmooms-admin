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
              <el-form-item label="文章标题"
                            prop="title">
                <el-input v-model="form.title"
                          class="el-forminput"
                          placeholder="请输入文章标题"></el-input>
              </el-form-item>
              <el-form-item label="文章描述"
                            prop="desc">
                <el-input v-model="form.desc"
                          class="el-forminput"
                          placeholder="请输入文章描述"></el-input>
              </el-form-item>
              <el-form-item label="缩略图"
                            prop="banner">
                <el-input v-model="form.banner"
                          style="display:none" />
                <el-upload class="el-formupload"
                           ref="upload"
                           list-type="picture-card"
                           :action="regionUrl"
                           :http-request="uploadImg"
                           :before-upload="beforeUpload"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="文章标签"
                            prop="tag">
                <el-select v-model="form.tag"
                           multiple
                           filterable
                           default-first-option
                           style="width: 500px;"
                           placeholder="请选择文章标签">
                  <el-option v-for="item in tagList"
                             :key="item._id"
                             :label="item.tagname"
                             :value="item.tagname">
                  </el-option>
                </el-select>
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
              <el-form-item label="文章内容"
                            prop="content">
                <!-- 引入自定义富文本组件这里 -->
                <v-quill-editor ref="myEditor"
                                v-model="form.content"
                                :domain="regionUrl"
                                :baseUrl="qiniulink"></v-quill-editor>
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
            <el-select v-model="catg"
                       placeholder="请选择">
              <el-option v-for="item in catgList"
                         :key="item._id"
                         :label="item.categoryname"
                         :value="item.categoryname">
              </el-option>
            </el-select>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import vQuillEditor from "@/components/quill-editor";
import { getQNToken, uploadToQN } from "@/api/qiniu";
import { insertArticle } from "@/api/article";
import { getAllCatgs } from "@/api/category";
import { getAllTags } from "@/api/tag";
import { Notification } from 'element-ui';
import axios from 'axios';
import './index.scss'

export default {
  name: "artpub",
  components: {
    vQuillEditor
  },
  data () {
    return {
      form: {
        title: "",
        desc: "",
        thumbnail: "",
        tag: "",
        content: ""
      },
      catg: "",
      tagList: [
        // { _id: "1", tagname: "javascript" },
        // { _id: "2", tagname: "nodejs", },
        // { _id: "3", tagname: "前端" }
      ],
      catgList: [
        // { _id: "1", categoryname: '测试分类1' },
        // { _id: "2", categoryname: '测试分类2' },
        // { _id: "3", categoryname: '测试分类3' }
      ],
      //七牛云配置
      token: '',
      regionUrl: 'https://upload-z2.qiniup.com', // 七牛云的上传地址，我这里是华南区
      qiniulink: 'http://prk2mqfev.bkt.clouddn.com/',     // 这是七牛云空间的外链默认域名
      // curdate: FormatDate(new Date())
    };
  },
  created () {
    console.log("处于开发状态：" + process.env.VUE_APP_BASE_API);
    console.log("处于开发状态：" + process.env.NODE_ENV);
  },
  //计算属性被混入实例当中，且有缓存的
  computed: {
    editor () {
      return this.$refs.myEditor.content;
    }
  },
  //该方法被混入实例当中...
  methods: {
    submitArticle () {
      let param = {
        title: this.form.title,
        desc: this.form.desc,
        banner: this.form.banner,
        tag: this.form.tag,
        content: this.form.content,
        catg: this.catg
      };
      if (Object.is(this.form.title, "")) {
        this.$message({
          message: '此文章标题不得为空，请输入标题',
          type: 'warning'
        });
      } else {
        insertArticle(param).then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.$router.push({
              name: 'articleList'
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        });
      }
    },
    //获取标签列表
    getAllTagsList () {
      getAllTags().then((res) => {
        if (res.data.code == 1) {
          this.tagList = res.data.result
        }
      })
    },
    //获取分类列表
    getAllCatgList () {
      getAllCatgs().then((res) => {
        if (res.data.code == 1) {
          this.catgList = res.data.result
        }
      })
    },
    //删除缩略图
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    //放大缩略图
    handlePreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传缩略图
    uploadImg (req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'blogs/image/' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
      getQNToken().then(res => {
        const formdata = new FormData() // 打印出空对象
        // 利用append的内置方式
        formdata.append('file', req.file)
        formdata.append('token', res.data.result.token)
        formdata.append('key', keyname)
        // 使用axios封装函数直接上传七牛云引发报错,等上线之后就改的
        // uploadToQN(this.regionUrl, formdata).then(res => {
        //   this.imageUrl = 'http://' + this.qiniulink + '/' + res.data.key
        //   // console.log(this.imageUrl);
        // })
        // 暂时使用引入axios，通过post方式请求获得数据返回的 
        axios.post(this.regionUrl, formdata).then(res => {
          this.form.banner = this.qiniulink + res.data.key
        })
      }).catch(err => {
        console.error(err);
      })
    },
    //上传图片之前验证文件合法性
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  mounted () {
    this.getAllTagsList();
    this.getAllCatgList();
  }
};

// // 封装格式化日期
// function FormatDate (strTime) {
//   let mydate = new Date(strTime);
//   return `${mydate.getFullYear()}年${mydate.getMonth() +
//     1}月${mydate.getDate()}日`;
// }
</script>
