<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-card class="conf-card">
            <el-tabs tab-position="left">
              <el-tab-pane label="个人设置">
                <el-row>
                  <el-col :span="24">
                    <h3 class="conf-header"><span>个人设置</span></h3>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-form ref="userform"
                           label-position="top"
                           label-width="80px"
                           :model="userform"
                           :rules="userRules">
                    <el-col :span="12">
                      <el-form-item prop="username"
                                    label="昵称">
                        <el-input v-model="userform.username"
                                  placeholder="昵称"></el-input>
                      </el-form-item>
                      <el-form-item prop="oldPwd"
                                    label="密码">
                        <el-input type="password"
                                  v-model="userform.oldPwd"
                                  autocomplete="off"
                                  placeholder="原来密码"></el-input>
                      </el-form-item>
                      <el-form-item prop="newPwd"
                                    label="新的密码">
                        <el-input type="password"
                                  v-model="userform.newPwd"
                                  autocomplete="off"
                                  placeholder="新的密码"></el-input>
                      </el-form-item>
                      <el-form-item prop="checkPwd"
                                    label="确认密码">
                        <el-input type="password"
                                  v-model="userform.checkPwd"
                                  autocomplete="off"
                                  placeholder="确认密码"></el-input>
                      </el-form-item>
                      <el-form-item prop="intro"
                                    label="个人签名">
                        <el-input type="textarea"
                                  v-model="userform.intro"
                                  placeholder="个人签名"></el-input>
                      </el-form-item>
                      <el-form-item prop="email"
                                    label="邮箱">
                        <el-input type="email"
                                  v-model="userform.email"
                                  placeholder="邮箱"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary"
                                   @click="submitUserForm('userform')">更新信息</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item prop="imageUrl"
                                    label="头像">
                        <el-input type="hidden"
                                  v-model="userform.imageUrl"
                                  style="display: none" />
                        <el-upload class="avatar-uploader"
                                   :action="regionUrl"
                                   :show-file-list="false"
                                   :http-request="uploadImg"
                                   :before-upload="beforeUpload">
                          <img v-if="userform.imageUrl"
                               :src="userform.imageUrl"
                               class="avatar">
                          <i v-else
                             class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="站点设置">
                <el-row>
                  <el-col :span="24">
                    <h3 class="conf-header"><span>站点设置</span></h3>
                  </el-col>
                  <el-col :span="24">
                    <el-form class="el-siteform"
                             ref="siteform"
                             label-position="top"
                             label-width="100px"
                             :model="siteform"
                             :rules="siteRules">
                      <el-form-item class="el-inputform"
                                    prop="sitename"
                                    label="站点标题">
                        <el-input v-model="siteform.sitename"></el-input>
                      </el-form-item>
                      <el-form-item class="el-inputform"
                                    prop="subhead"
                                    label="副标题">
                        <el-input v-model="siteform.subhead"></el-input>
                      </el-form-item>
                      <el-form-item class="el-inputform"
                                    prop="keyword"
                                    label="关键词">
                        <el-input v-model="siteform.keyword"></el-input>
                      </el-form-item>
                      <el-form-item class="el-inputform"
                                    prop="sitedesc"
                                    label="站点描述">
                        <el-input type="textarea"
                                  v-model="siteform.sitedesc"></el-input>
                      </el-form-item>
                      <el-form-item class="el-inputform"
                                    prop="ICPNo"
                                    label="ICP备案号">
                        <el-input v-model="siteform.ICPNo"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary"
                                   @click="submitSiteForm('siteform')">立即创建</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getQNToken } from '@/api/qiniu'
import { mapGetters } from 'vuex'
import axios from 'axios'
import md5 from 'md5'
import './index.scss'

export default {
  name: 'Config',
  data () {
    let validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userform.checkPwd !== '') {
          this.$refs.userform.validateField('checkPwd');
        }
        callback();
      }
    };
    let validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userform.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      //个人设置
      userform: {
        username: '',
        oldPwd: '',
        newPwd: '',
        checkPwd: '',
        intro: '',
        email: '',
        imageUrl: ''
      },
      // 站点设置
      siteform: {
        sitename: '',
        subhead: '',
        keyword: '',
        sitedesc: '',
        ICPNo: ''
      },
      regionUrl: 'https://upload-z2.qiniup.com', // 七牛云的上传地址，我这里是华南区
      qiniulink: 'https://img.ikmoons.com/',     // 这是七牛云空间的外链默认域名
      userRules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '请输入原来密码', trigger: 'blur' },
        ],
        newPwd: [
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        checkPwd: [
          { validator: validateCheckPwd, trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ]
      },
      siteRules: {
        sitename: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        subhead: [
          { required: true, message: '请输入副标题', trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ],
        sitedesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        ICPNo: [
          { required: true, message: '请输入备案号', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性被混入实例当中，且有缓存的
  computed: {
    ...mapGetters({
      id: 'id',
      name: 'name'
    })
  },
  methods: {
    //将图片上传七牛云
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
      const keyname =
        this.name + '_' +
        new Date().getTime() +
        Math.floor(Math.random() * 100) +
        '.' + filetype;
      getQNToken().then(res => {
        const formdata = new FormData() // 打印出空对象
        // 利用append的内置方式
        formdata.append('file', req.file)
        formdata.append('token', res.data.result.token)
        formdata.append('key', keyname)
        // 使用axios封装函数直接上传七牛云引发报错,等上线之后就更改是否顺利成功
        // uploadToQN(this.regionUrl, formdata).then(res => {
        //   this.userform.imageUrl  = this.qiniulink + res.data.key
        //   // console.log(this.userform.imageUrl);
        // })
        // 暂时使用引入axios，通过post方式请求获得数据返回的
        axios.post(this.regionUrl, formdata, config).then(res => {
          this.userform.imageUrl = this.qiniulink + res.data.key
        })
      }).catch(err => {
        console.error(err)
      })
    },
    //上传图片之前校验
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
    },
    // 更新站点信息
    submitUserForm () {
      let param = {
        id: this.id,
        username: this.userform.username,
        oldPwd: md5(this.userform.oldPwd),
        newPwd: md5(this.userform.newPwd),
        intro: this.userform.intro,
        email: this.userform.email,
        avatar: this.userform.imageUrl
      }
      this.$refs.userform.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/updateUserInfo', param).then(res => {
            console.log(res);
          })
        }
      })
    }
  }
}
</script>
