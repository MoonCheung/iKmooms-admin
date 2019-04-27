<template>
  <Layout>
    <Content style="admin-panel">
      <Row :gutter="16">
        <Col span="9">
        <Card>
          <p slot="title"
             style="card-header">服务器状态
            <!-- .prevent事件修饰符:提交事件不再重载页面 -->
            <a href="#"
               @click.prevent="changeInit">刷新</a>
          </p>
          <Row>
            <Col span="12">
            <p>
              <span>运行状态:</span>
              <Tag type="dot"
                   :color="Object.is(constants, '0')? 'success':'error'">{{Object.is(constants,'0')? '服务器正在运行':'服务器出现错误'}}</Tag>
            </p>
            <p>
              <span>服务器发行状态:</span>
              <Tag color="blue">{{release}}</Tag>
            </p>
            <p>
              <span>Node.js编译运行系统平台:</span>
              <Tag color="#515a6e">{{platform}}</Tag>
            </p>
            </Col>
            <Col span="12">
            <div style="text-align:center">
              <i-circle :percent="percentage"
                        :size="130"
                        :trail-width="2"
                        :stroke-width="2"
                        stroke-linecap="round"
                        stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                  <h1>内存使用率</h1>
                  <p>综合服务器内存占比</p>
                  <span>总占百分比:<i>{{percentage}}%</i>
                  </span>
                </div>
              </i-circle>
            </div>
            </Col>
          </Row>
        </Card>
        </Col>
        <Col span="15">
        <Card>
          <p slot="title"
             style="card-header">服务器信息</p>
          <Row>
            <Col span="8">
            <p>
              <span>服务器主机名:</span>
              <Tag color="#515a6e">{{hostname}}</Tag>
            </p>
            <p>
              <span>操作系统:</span>
              <Tag color="primary">{{type}}</Tag>
            </p>
            <p>
              <span>服务器总内存数:</span>
              <Tag color="blue">{{totalmemory}}</Tag>
            </p>
            <p>
              <span>服务器可用内存数:</span>
              <Tag color="blue">{{Freememory}}</Tag>
            </p>
            </Col>
            <Col span="16">
            <Table height="200"
                   border
                   stripe
                   :columns="columns"
                   :data="cpus"></Table>
            </Col>
          </Row>
        </Card>
        </Col>
      </Row>
      </Col>
      </Row>
    </Content>
  </Layout>
</template>

<script>
import { getSystemList } from "@/api/data";
import "./index.less";

export default {
  name: "admin",
  data() {
    return {
      // 服务器状态
      constants: null,
      release: null,
      platform: null,
      // 服务器信息
      hostname: null,
      type: null,
      totalmemory: null,
      Freememory: null,
      percentage: null,
      cpus: [],
      columns: [
        {
          title: "CPU内核模型",
          key: "model"
        },
        {
          title: "CPU频率(GHz)",
          key: "speed"
        }
      ]
    };
  },
  created() {
    this.init();
    console.log(process.env.NODE_ENV + "表示处于开发");
  },
  //该方法被混入vue实例里面
  methods: {
    init() {
      //如不用iview-admin自带axios封装就可按照这个方法是否可行呢
      // this.$axios.post("/api/system").then(res => {
      //   console.log(res.data);
      //   console.log(res.headers);
      // });
      getSystemList().then(res => {
        (this.constants = res.data.constants),
          (this.release = res.data.release),
          (this.platform = res.data.platform),
          (this.hostname = res.data.hostname),
          (this.type = res.data.type),
          (this.totalmemory = res.data.totalmemory),
          (this.Freememory = res.data.Freememory),
          (this.percentage = res.data.percentage),
          (this.cpus = res.data.cpus);
      });
    },
    changeInit() {
      this.init();
    }
  }
};
</script>
