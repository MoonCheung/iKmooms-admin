<template>
  <div class="v-quill-editor">
    <quill-editor ref="myQuillEditor"
                  v-model="content"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"></quill-editor>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { getQNToken, uploadToQN } from '@/api/qiniu'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import 'highlight.js/styles/monokai-sublime.css'
import { Message } from 'element-ui'
import axios from 'axios'
Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

// 自定义Quill编辑器
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video']
]

const qiniu = {
  token: ''
}

const getToken = function () {
  getQNToken().then(res => {
    qiniu.token = res.data.result.token
  })
}
getToken()

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    domain: String, // 七牛云上传的域地址,类型为String 比如自己所在地区选择，而这里是华南
    baseUrl: String // 从七牛云上拿到自己的上传地址,类型为String,
  },
  data () {
    return {
      content: '',
      editorOption: {
        placeholder: '请输入文章内容...',
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          ImageExtend: {
            name: 'file',
            size: 2, // 单位为M, 1M = 1024KB
            action: this.domain,
            headers: xhr => { },
            response: res => {
              return this.baseUrl + res.key
            },
            start: () => { },
            end: () => {
              getToken()
            },
            error: () => { },
            change: (xhr, formData) => {
              // 跟随form 提交必要参数
              const file = formData.get('file')
              const suffix = file.name.split('.')
              const ext = suffix.splice(suffix.length - 1, 1)[0]
              //  文件名称
              formData.append(
                'key',
                `blogs/image/${suffix.join('.')}_${new Date() +
                Math.floor(Math.random() * 100)}.${ext}`
              )
              formData.append('token', qiniu.token)
            }
          }
        }
      }
    }
  },
  watch: {
    // 通过$emit方式子组件向父组件通信
    content (newVal, oldVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    onEditorBlur (editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus (editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady (editor) {
      // console.log("editor ready!", editor);
    }
  }
}
</script>

<style lang="sass">
.quill-editor
  min-height: 500px
  .ql-container
    min-height: 500px
.ql-snow .ql-editor img
  max-width: 480px
.ql-editor .ql-video
  max-width: 480px
</style>
