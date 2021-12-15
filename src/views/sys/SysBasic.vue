<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana"
        ><dep-mana></dep-mana>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"
        ><pos-mana></pos-mana>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="JoblevelMana">
        <joblevel-mana></joblevel-mana>
      </el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana">
        <ec-mana></ec-mana>
      </el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana">
        <permiss-mana></permiss-mana>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../components/sys/basic/DepMana.vue";
import EcMana from "../../components/sys/basic/EcMana.vue";
import JoblevelMana from "../../components/sys/basic/JoblevelMana.vue";
import PermissMana from "../../components/sys/basic/PermissMana.vue";
import PosMana from "../../components/sys/basic/PosMana.vue";

export default {
  name: "SysBasic",
  data() {
    return {
      activeName: "JoblevelMana",
    };
  },
  components: {
    DepMana,
    EcMana,
    JoblevelMana,
    PermissMana,
    PosMana,
  },
};
</script>

<style>
</style>