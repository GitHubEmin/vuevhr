<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="部门管理" name="first">
      部门管理
    </el-tab-pane>
    <el-tab-pane label="职位管理" name="second">
      <PosMana/>
    </el-tab-pane>
    <el-tab-pane label="职称管理" name="third">职称管理</el-tab-pane>
    <el-tab-pane label="奖惩规则" name="fourth">奖惩规则</el-tab-pane>
    <el-tab-pane label="权限组" name="fiveth">权限组</el-tab-pane>
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
      activeName:'first'
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
