<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-card class="conf-card">
            <el-tabs tab-position="left"
                     class="conf-head">
              <el-tab-pane label="个人设置">
                <el-row>
                  <el-col :span="24">
                    <h3 class="conf-header">
                      <span>个人设置</span>
                    </h3>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-form ref="userform"
                           :model="userform"
                           :rules="userRules"
                           label-position="top"
                           label-width="80px">
                    <el-col :span="10">
                      <el-form-item prop="nickname"
                                    label="昵称">
                        <el-input v-model="userform.nickname"
                                  placeholder="昵称" />
                      </el-form-item>
                      <el-form-item prop="oldPwd"
                                    label="密码">
                        <el-input v-model="userform.oldPwd"
                                  type="password"
                                  autocomplete="off"
                                  show-password
                                  placeholder="原来密码" />
                      </el-form-item>
                      <el-form-item prop="newPwd"
                                    label="新的密码">
                        <el-input v-model="userform.newPwd"
                                  type="password"
                                  autocomplete="off"
                                  show-password
                                  placeholder="新的密码" />
                      </el-form-item>
                      <el-form-item prop="checkPwd"
                                    label="确认密码">
                        <el-input v-model="userform.checkPwd"
                                  type="password"
                                  autocomplete="off"
                                  show-password
                                  placeholder="确认密码" />
                      </el-form-item>
                      <el-form-item prop="intro"
                                    label="个人签名">
                        <el-input v-model="userform.intro"
                                  type="textarea"
                                  placeholder="个人签名" />
                      </el-form-item>
                      <el-form-item prop="email"
                                    label="邮箱">
                        <el-input v-model="userform.email"
                                  type="email"
                                  placeholder="邮箱" />
                      </el-form-item>
                      <el-form-item>
                        <el-button :loading="confLoading"
                                   type="primary"
                                   @click.native.prevent="submitUserForm('userform')">
                          更新信息
                        </el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14">
                      <el-form-item prop="imageUrl"
                                    label="头像">
                        <el-input v-model="userform.imageUrl"
                                  type="hidden"
                                  style="display: none" />
                        <el-upload :action="regionUrl"
                                   :show-file-list="false"
                                   :http-request="uploadImg"
                                   :before-upload="beforeUpload"
                                   class="avatar-uploader">
                          <img v-if="userform.imageUrl"
                               :src="userform.imageUrl"
                               class="avatar">
                          <i v-else
                             class="el-icon-plus avatar-uploader-icon" />
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="站点设置">
                <el-row>
                  <el-col :span="24">
                    <h3 class="conf-header">
                      <span>站点设置</span>
                    </h3>
                  </el-col>
                  <el-col :span="24">
                    <el-form ref="siteform"
                             :model="siteform"
                             :rules="siteRules"
                             class="el-siteform"
                             label-position="top"
                             label-width="100px">
                      <el-form-item prop="sitename"
                                    label="站点标题">
                        <el-input v-model="siteform.sitename"
                                  class="el-inputform" />
                      </el-form-item>
                      <el-form-item prop="subhead"
                                    label="副标题">
                        <el-input v-model="siteform.subhead"
                                  class="el-inputform" />
                      </el-form-item>
                      <el-form-item prop="keyword"
                                    label="关键词">
                        <el-input v-model="siteform.keyword"
                                  class="el-inputform" />
                      </el-form-item>
                      <el-form-item prop="sitedesc"
                                    label="站点描述">
                        <el-input v-model="siteform.sitedesc"
                                  type="textarea"
                                  class="el-inputform" />
                      </el-form-item>
                      <el-form-item prop="ICPNo"
                                    label="ICP备案号">
                        <el-input v-model="siteform.ICPNo"
                                  class="el-inputform" />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary"
                                   @click="submitSiteForm('siteform')">
                          立即创建
                        </el-button>
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
import { getQNToken } from '@/api/qiniu';
import { mapGetters } from 'vuex';
import axios from 'axios';
import md5 from 'md5';
import './index.scss';

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
        nickname: '',
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
      confLoading: false,
      regionUrl: 'https://upload-z2.qiniup.com', // 七牛云的上传地址，我这里是华南区
      qiniulink: 'https://img.ikmoons.com/', // 这是七牛云空间的外链默认域名
      userRules: {
        nickname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        oldPwd: [
          { required: true, message: '请输入原来密码', trigger: 'blur' }
        ],
        newPwd: [{ validator: validateNewPwd, trigger: 'blur' }],
        checkPwd: [{ validator: validateCheckPwd, trigger: 'blur' }],
        intro: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }]
      },
      siteRules: {
        sitename: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        subhead: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
        keyword: [{ required: true, message: '请输入关键词', trigger: 'blur' }],
        sitedesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        ICPNo: [{ required: true, message: '请输入备案号', trigger: 'blur' }]
      }
    };
  },
  // 计算属性被混入实例当中，且有缓存的
  computed: {
    ...mapGetters({
      id: 'id',
      name: 'name'
    })
  },
  methods: {
    initForm () {
      let self = this;
      (self.userform.nickname = ''),
        (self.userform.oldPwd = ''),
        (self.userform.newPwd = ''),
        (self.userform.checkPwd = ''),
        (self.userform.intro = ''),
        (self.userform.email = ''),
        (self.userform.imageUrl = '');
    },
    //将图片上传七牛云
    uploadImg (req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      let filetype = '';
      if (req.file.type === 'image/png') {
        filetype = 'png';
      } else {
        filetype = 'jpg';
      }
      // 重命名要上传的文件
      const keyname =
        this.name +
        '_' +
        new Date().getTime() +
        Math.floor(Math.random() * 100) +
        '.' +
        filetype;
      getQNToken()
        .then(res => {
          const formdata = new FormData(); // 打印出空对象
          // 利用append的内置方式
          formdata.append('file', req.file);
          formdata.append('token', res.data.result.token);
          formdata.append('key', keyname);
          // 使用axios封装函数直接上传七牛云引发报错,等上线之后就更改是否顺利成功
          // uploadToQN(this.regionUrl, formdata).then(res => {
          //   this.userform.imageUrl  = this.qiniulink + res.data.key
          //   // console.log(this.userform.imageUrl);
          // })
          // 暂时使用引入axios，通过post方式请求获得数据返回的
          axios.post(this.regionUrl, formdata, config).then(res => {
            this.userform.imageUrl = this.qiniulink + res.data.key;
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    //上传图片之前校验
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 更新站点信息
    submitUserForm () {
      let param = {
        id: this.id,
        nickname: this.userform.nickname,
        oldPwd: md5(this.userform.oldPwd),
        newPwd: md5(this.userform.newPwd),
        intro: this.userform.intro,
        email: this.userform.email,
        avatar: this.userform.imageUrl
      };
      this.$refs.userform.validate(valid => {
        this.confLoading = true;
        if (valid) {
          this.$store.dispatch('user/updateUserInfo', param).then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.initForm();
              this.confLoading = false;
            } else if (res.data.error === 1) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
              this.confLoading = false;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
              this.confLoading = false;
            }
          });
        }
      });
    }
  }
};
</script>
