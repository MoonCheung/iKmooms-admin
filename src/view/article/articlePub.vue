<template>
  <Layout>
    <Content>
      <Row :gutter="16">
        <Col span="18">
        <Card>
          <p slot="title">撰写新文章</p>
          <p>
            <label for="title">文章标题：</label>
            <Input name="title"
                   v-model="title"
                   style="width: 300px"
                   placeholder="请描写文章标题" /></p>
          <p>
            <label for="describe">文章描述：</label>
            <Input name="describe"
                   v-model="describe"
                   style="width: 300px"
                   placeholder="请描写文章标题" /></p>
          <p>
            <label for="describe">文章标签：</label>

          </p>
          <p>
            <label for="describe">文章内容：</label>
            <v-editor />
          </p>
          <button></button>
        </Card>
        </Col>
        <Col span="6">
        <Card>
          <p slot="title">发布日期</p>
          <p>Content of card</p>
          <p>Content of card</p>
          <p>Content of card</p>
        </Card>
        <Card>
          <p slot="title">分类目录</p>
          <p>Content of card</p>
          <p>Content of card</p>
          <p>Content of card</p>
        </Card>
        </Col>
      </Row>
    </Content>
  </Layout>
</template>

<script>
import vEditor from "@/components/editor";
export default {
  name: "articlePub",
  components: {
    vEditor
  }
};
</script>

<style>
</style>
