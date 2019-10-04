<template>
  <div id="edit">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title" :maxlength='20'></el-input>
    <p class="msg">限{{textLimit}}/20个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" v-model="description" :autosize={minRows:2,maxRows:6} :maxlength='140'></el-input>
    <p class="msg">限{{descriptionLimit}}/140个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" v-model="content" :autosize={minRows:4,maxRows:30}></el-input>
    <p>
      <label >是否展示在首页</label>
      <el-switch v-model="atIndex" active-color='#13ce66' inactive-color='#ff4949'></el-switch>
    </p>
    <el-button class="confirmBtn" @click="onCreate">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog'

export default {
    name:'Create',
  data() {
    return {
      atIndex:false,
      title:'',
      description:'',
      content:'',
    }
  },
  computed:{
    textLimit(){
      return this.title.length
    },
    descriptionLimit(){
      return this.description.length
    }
  },
  methods:{
    onCreate(){
      blog.createBlog({title:this.title, content:this.content, description:this.description, atIndex:this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({path:`/detail/${res.data.id}`})
        })
    }
  },
  components: {

  }
}
</script>

<style scoped>
.msg{
  float: right;
}
.confirmBtn{
  margin: 20px 0 30px;
}
h3{
  padding-top: 20px;
}
</style>
