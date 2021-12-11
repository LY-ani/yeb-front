<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 启用路由模式 -->
          <el-menu router unique-opened>
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in routes"
              :key="index"
              v-if="!item.hidden"
            >
              <template slot="title">
                <i
                  :class="item.iconCls"
                  style="color: skyblue; margin-right: 5px"
                ></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="children.path"
                v-for="(children, indexJ) in item.children"
                :key="indexJ"
              >
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
/*
 * 把菜单和路由数据统一起来，将路由数据动态渲染到菜单上
 * router/index.js： 将home路由配置的name改成‘导航一’,item.name用到
 *启用路由模式，就可以用index作为path去进行路由跳转
 *
 */
export default {
  name: "Home",
  computed: {
    routes() {
      // vuex里的routes
      return this.$store.state.routes;
    },
  },
};
</script>

<style>
</style>