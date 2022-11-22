<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="部门管理" name="depmana"><DepMana/></el-tab-pane>
    <el-tab-pane label="职位管理" name="posmana"><PosMana/></el-tab-pane>
    <el-tab-pane label="职称管理" name="joblevelmana"><JobLevelMana/></el-tab-pane>
    <el-tab-pane label="奖惩规则" name="bcmana"><BcMana/></el-tab-pane>
    <el-tab-pane label="权限组" name="permissmana"><PermissMana/></el-tab-pane>
  </el-tabs>
</template>

<script>
import DepMana from "../../components/sys/base/DepMana";
import PosMana from "../../components/sys/base/PosMana";
import JobLevelMana from "../../components/sys/base/JobLevelMana";
import BcMana from "../../components/sys/base/BcMana";
import PermissMana from "../../components/sys/base/PermissMana";

export default {
  name: "SysBasic",
  data() {
    return {
      activeName:'joblevelmana'
    }
  },
  components:{
    DepMana,
    PosMana,
    JobLevelMana,
    BcMana,
    PermissMana
  }
}
</script>

<style>

</style>
