<template>
  <div class="mark-editor">
    <div class="editor-toolbar">
      <ul class="menus">
        <li class="bold"
            @click="toggleBold">粗体</li>
        <li class="italic"
            @click="toggleItalic">斜体</li>
        <li class="quote"
            @click="drawQuote">引用</li>
        <li class="code"
            @click="drawCode">代码</li>
        <li class="link"
            @click="drawLink">链接</li>
        <li class="image"
            @click="drawImage">图片</li>
        <li class="-h3"
            @click="drawH3Title">H3</li>
        <li class="file">
          <el-upload class="uploadFile"
                     :action="regions"
                     :http-request="onUploadFile"
                     :show-file-list="false">
            文件
          </el-upload>
        </li>
        <li class="save"
            @click="saveAsMarkdown">保存</li>
      </ul>
    </div>
    <div class="in">
      <textarea id="code"
                ref="code"></textarea>
    </div>
    <div class="out">
      <div ref="parseBody"
           class="markdown-body parseBody"></div>
    </div>
  </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";
import md from '@/utils/markdown';
// codemirror 脚本
import "codemirror/addon/edit/continuelist";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/mode/markdown/markdown";
import "codemirror/keymap/sublime";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/comment/comment";
import "codemirror/addon/wrap/hardwrap";
// codemirror 样式
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/theme/material.css";
import 'highlight.js/styles/monokai-sublime.css';
// github markdown 样式
import 'github-markdown-css/github-markdown.css';
// 七牛SDK
import { getQNToken } from '@/api/qiniu';
import * as qiniu from 'qiniu-js';

export default {
  name: 'MarkEditor',
  data () {
    return {
      content: '',
    }
  },
  props: {
    regions: {
      type: String,
      default: ''
    }
  },
  // 计算属性被混入实例当中，且有缓存的
  computed: {},
  // 侦听器
  watch: {
    // 通过$emit方式子组件传递给父组件
    content: function (newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  mounted () {
    this.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      // 语言模式
      mode: 'markdown',
      // 主题
      theme: "material",
      // 行号
      lineNumbers: true,
      // 自动验证错误
      matchBrackets: true,
      // 自动补全括号
      autoCloseBrackets: true,
      // 自动闭合标签
      autoCloseTags: true,
      // 选择活动时会绘制光标
      showCursorWhenSelecting: true,
      // 长句子折行
      lineWrapping: true,
      // 点击高亮正行
      styleActiveLine: true,
      keyMap: 'sublime',
      // 制表符的宽度
      tabSize: 2,
      // 回车键自动补全上一步格式
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList"
      },
      // 自动对焦
      autofocus: true
    });
    this.editor.setSize('auto', '600');
    // 当用户输入发生更改时会触发
    this.editor.on('change', (cm, co) => {
      const parseBody = this.$refs.parseBody;
      this.content = cm.getValue();
      parseBody.innerHTML = md.render(cm.getValue());
    });
  },
  methods: {
    // 粗体
    toggleBold () {
      const codemirror = this.editor;
      const start = "**";
      const end = "**";
      this.replaceSelection(codemirror, start, end);
    },
    // 斜体
    toggleItalic () {
      const codemirror = this.editor;
      const start = "*";
      const end = "*";
      this.replaceSelection(codemirror, start, end);
    },
    // 引用
    drawQuote () {
      const codemirror = this.editor;
      const start = '> ';
      this.replaceSelection(codemirror, start);
    },
    // 代码
    drawCode () {
      const codemirror = this.editor;
      const start = '```\n';
      const end = '```';
      this.replaceSelection(codemirror, start, end);
    },
    // 链接
    drawLink () {
      const codemirror = this.editor;
      const start = '[';
      const end = ']()';
      this.replaceSelection(codemirror, start, end);
    },
    // 图像
    drawImage () {
      const codemirror = this.editor;
      const start = '![';
      const end = ']()';
      this.replaceSelection(codemirror, start, end);
    },
    // H3标题
    drawH3Title () {
      const codemirror = this.editor;
      const start = '### ';
      this.replaceSelection(codemirror, start);
    },
    // 上传文件
    onUploadFile (req) {
      const { file } = req;
      const key = 'blogs/media/' +
        new Date().getTime() +
        Math.floor(Math.random() * 100) + '.' +
        file.name.split('.')[1];
      const mediaType = ["video/mp4", "video/webm", "video/ogg"];
      /*
      * fname: string，文件原文件名.
      * params: object，用来放置自定义变量;
      * mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；
      * 限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      */
      const putExtra = {
        fname: file.name,
        params: {},
        mimeType: ["video/mp4", "video/webm", "video/ogg", "audio/ogg", "audio/mpeg", "audio/wav"]
      };
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2 // 华南
      };
      getQNToken().then(res => {
        const self = this;
        const getToken = res.data.result.token;
        const observable = qiniu.upload(file, key, getToken, putExtra, config)
        observable.subscribe({
          next (res) {
            // 提示文件进度
            let totalPercent = 0;
            totalPercent += res.total.percent;
            const h = self.$createElement;
            if (Object.is(totalPercent, 100)) {
              self.$notify({
                title: '上传成功',
                message: h('div', { style: 'display:flex; flex-flow:column wrap; justify-content:flex-start; align-content:center;' }, [
                  h('span', null, `当前上传进度:${totalPercent}%`),
                  h('span', null, `已上传大小，单位为字节:${res.total.loaded}`),
                  h('span', null, `本次上传的总量控制信息:${res.total.size}`),
                ]),
                type: 'success'
              })
            }
          },
          error (err) {
            // 提示错误
            self.$message({
              message: err,
              type: 'error'
            });
          },
          complete (res) {
            // 完成后的操作
            // 上传成功以后会返回key 和 hash，key就是文件名了！
            const codemirror = self.editor;
            if (mediaType.includes(file.type)) {
              const start = `<video id="video" controls="" preload="none">\r  <source id="${res.key.split('.')[1]}" src="https://static.ikmoons.com/${res.key}" type="video/mp4">\r  <p>您的浏览器不支持HTML5视频元素</p>\r</video><br/>`;
              const end = '\n';
              self.replaceHTMLSelection(codemirror, start, end);
            } else {
              const start = `<audio id="audio" controls="" preload="none">\r  <source id="${res.key.split('.')[1]}" src="https://static.ikmoons.com/${res.key}" type="video/mp4">\r  <p>您的浏览器不支持HTML5音频元素</p>\r</audio><br/>`;
              const end = '\n';
              self.replaceHTMLSelection(codemirror, start, end);
            }
          }
        })
      }).catch(err => {
        console.error(err)
      })
    },
    // 保存markdown
    saveAsMarkdown () {
      if (this.content == '') return false;
      const now = new Date();
      const data = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      this.saveFile(this.content, `${data + time}.md`);
    },
    // 替换光标选中项内容
    replaceSelection (cm, start, end = "\n") {
      const startPoint = cm.getCursor('start');
      const endPoint = cm.getCursor('end');
      const text = cm.getSelection();
      cm.replaceSelection(start + text + end);
      startPoint.ch += start.length;
      endPoint.ch += end.length;
      cm.setSelection(startPoint, endPoint);
      cm.focus();
    },
    // 替换光标选中项HTML内容
    replaceHTMLSelection (cm, start, end) {
      const startPoint = cm.getCursor('start');
      const endPoint = cm.getCursor('end');
      const text = cm.getSelection();
      startPoint.ch += start.length;
      endPoint.ch += end.length;
      cm.setSelection(startPoint, endPoint);
      cm.replaceSelection(start + text + end);
      cm.focus();
    },
    // 保存文件
    saveFile (code, name) {
      const blob = new Blob([code], { type: 'text/plain' });
      // window.navigator.msSaveBlob：以本地方式保存文件
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, name);
      } else {
        // 创建新的URL表示指定的File对象或者Blob对象
        const URL = window.URL || window.webkitURL;
        const objectURL = URL.createObjectURL(blob);
        // 创建a标签用于跳转至下载链接
        const link = document.createElement('a');
        link.setAttribute('href', objectURL);
        link.setAttribute('download', name);
        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
      }
    },
    // 编辑文件
    saveEditorMark (cont) {
      const codemirror = this.editor;
      const parseBody = this.$refs.parseBody;
      this.$nextTick(function () {
        // DOM 更新
        codemirror.setValue(cont);
        parseBody.innerHTML = md.render(cont);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mark-editor {
  overflow: hidden;
  padding: 12px 0;

  .editor-toolbar {
    display: flex;
    width: 100%;
    height: 2.8rem;
    padding: 0.1em;
    justify-content: space-between;
    color: $markColor;
    background-color: $markBgColor;

    ul {
      display: block;
      margin: 0;
      padding: 0;
      flex-direction: column;

      li {
        float: left;
        cursor: pointer;
        height: 2.65rem;
        padding: 0 1rem;
        line-height: 2.8rem;
        text-align: center;
        display: block;

        &.save,
        &.fullscreen {
          display: inline-flex;
          align-items: center;

          .icon {
            color: black;
            font-size: 1.5em;
          }
        }

        &:hover {
          color: $markColor;
          background-color: $markDarkColor;
        }
      }
    }
  }

  .in {
    float: left;
    width: 50%;
    height: 100%;

    /deep/ .CodeMirror {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .out {
    float: left;
    width: 50%;
    height: 100%;
    overflow: auto;

    /deep/ .markdown-body pre {
      background-color: #23241f;
    }

    .parseBody {
      box-sizing: border-box;
      width: 100%;
      height: 600px;
      max-width: 980px;
      padding: 0 15px;
      font-size: 14px;

      .parseBody ul > li {
        list-style-type: disc;
      }
      .parseBody ol > li {
        list-style-type: lower-roman;
      }
    }
  }
}
</style>
