import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import locale from 'element-ui/lib/locale';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapseItem,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  Loading,
  MessageBox,
  Message,
  Option,
  Pagination,
  Radio,
  RadioGroup,
  Row,
  Main,
  Select,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Tree,
  Upload,
  Progress,
  Tabs,
  TabPane,
  Container,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Scrollbar
} from 'element-ui';

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/permission'; // 权限控制

Vue.config.productionTip = false;

// 设置语言CN
locale.use(lang);
// 按需引入部分组件
Vue.use(Alert);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Col);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Row);
Vue.use(Main);
Vue.use(Select);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Container);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Scrollbar);

Vue.use(quillEditor);

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
});
