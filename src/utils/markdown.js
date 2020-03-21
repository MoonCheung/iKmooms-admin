/*
 * @Description: 解析markdown
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2020-03-02 00:44:05
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-21 23:56:19
 */

import MarkdownIt from 'markdown-it';
import abbr from 'markdown-it-abbr';
import deflist from 'markdown-it-deflist';
import emoji from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';
import imagesPreview from 'markdown-it-images-preview';
import ins from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import taskLists from 'markdown-it-task-lists';
import toc from 'markdown-it-toc';
import hljs from './highlight';

const config = {
  html: true,
  breaks: false,
  linkify: false,
  injected: true,
  xhtmlOut: true,
  langPrefix: 'md-',
  quotes: '“”‘’',
  // 高亮显示
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }
    // 如果没有语言设置，则显示为纯文本
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
}

const md = new MarkdownIt(config).use(abbr)
  .use(deflist)
  .use(emoji)
  .use(footnote)
  .use(imagesPreview)
  .use(ins)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(taskLists)
  .use(toc)

export default md;
