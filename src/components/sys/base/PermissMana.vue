<template>
  <div>
    <div class="permissManaTool">
        <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
          <template slot="prepend">ROLE_</template>
        </el-input>
      <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh"></el-input>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addRole">添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse accordion @change="change" v-model="activeName">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0;color:#f00" icon="el-icon-delete" type="text" @click="deleteRole(r)"></el-button>
            </div>
            <div>
              <el-tree
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  :key="index"
                  :default-checked-keys="selectedMenus"
                  :data="allMenus" :props="defaultProps" ></el-tree>
              <div style="display: flex;justify-content: flex-end">
                <el-button @click="cancelUpdate()">取消修改</el-button>
                <el-button type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data(){
      return{
        role:{
            name:'',
            nameZh:''
        },
        activeName:-1,
        roles:[],
        allMenus:[],
        selectedMenus:[],
        defaultProps:{
          children:'children',
          label:'name'
        }
      }
  },
  mounted() {
    this.initRoles()
  },
  methods:{
    deleteRole(role){
      this.$confirm('此操作将永久删除【'+role.nameZh+'】角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       this.deleteRequest("/system/basic/permiss/role/"+role.id).then(resp=>{
         if (resp){
           this.initRoles();
         }
       })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addRole(){
      if (this.role.name && this.role.nameZh){
        this.postRequest("/system/basic/permiss/role",this.role).then(resp=>{
          if (resp){
            this.role.name ='';
            this.role.nameZh ='';
            this.initRoles();
          }
        })
      } else {
        this.$message.error("数据不可以为空！")
      }
    },
    cancelUpdate(){
      this.activeName=-1
    },
    doUpdate(rid,index){

      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      let url ='/system/basic/permiss/?rid='+rid;
      selectedKeys.forEach(key=>{
        url += '&mids='+key
      })
      this.putRequest(url).then(resp=>{
        if (resp) {
          this.activeName=-1;
        }
      })

    },
    change(rid){
      if (rid){
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    initSelectedMenus(rid){
      this.getRequest("/system/basic/permiss/mids/"+rid).then(resp=>{
        if (resp){
          this.selectedMenus = resp;
        }
      })
    },
    initAllMenus(){
      this.getRequest("/system/basic/permiss/menus").then(resp=>{
        if (resp){
          this.allMenus = resp;
        }
      })
    },
    initRoles(){
      this.getRequest('/system/basic/permiss/').then(resp=>{
        if (resp){
          this.roles = resp
        }
      })
    }
  }
}
</script>

<style scoped>
    .permissManaTool{
      display: flex;
      justify-content: flex-start;
    }
    .permissManaTool .el-input{
      width: 300px;
      margin-right: 6px;
    }
    .permissManaMain{
      margin-top: 10px;
      width: 700px
    }
</style>
