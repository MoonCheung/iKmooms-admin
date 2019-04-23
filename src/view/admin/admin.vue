<template>
  <Layout>
    <Content style="admin-panel">
      <Row :gutter="16">
        <Col span="9">
        <Card>
          <p slot="title"
             style="card-header">服务器状态</p>
          <p>
            <span>运行状态:</span>
            <Tag type="dot"
                 color="success">{{constants}}</Tag>
          </p>
          <p>
            <span>服务器发行状态:</span>
            <Tag color="blue">{{release}}</Tag>
          </p>
          <p>
            <span>Node.js编译运行系统平台:</span>
            <Tag color="#515a6e">{{platform}}</Tag>
          </p>
        </Card>
        </Col>
        <Col span="15">
        <Card>
          <p slot="title"
             style="card-header">服务器信息</p>
          <p>
            <span>服务器主机名:</span>
            <Tag color="#515a6e">{{hostname}}</Tag>
          </p>
          <p>
            <span>操作系统:</span>
            <Tag color="primary">{{system}}</Tag>
          </p>
          <p>
            <span>服务器总内存数:</span>
            <Tag color="blue">{{totalmemory}}</Tag>
          </p>
          <p>
            <span>服务器可用内存数:</span>
            <Tag color="blue">{{Freememory}}</Tag>
          </p>
        </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
</template>

<script>
import { getSystemList } from '@/api/data'
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
      system: null,
      totalmemory: null,
      Freememory: null
    };
  },
  created() {
    this.init();
    console.log(process.env.NODE_ENV + "表示处于开发");
  },
  //该方法被混入vue实例里面
  methods: {
    init() {
      // this.$axios.post("/api/system").then(res => {
      //   console.log(this.data);
      // });

    getSystemList().then(res => {
      console.log(res.data)
      })
    }
  }
};
</script>
