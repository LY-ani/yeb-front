<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">云E办</div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{ user.name }}
            <i>
              <img :src="user.userFace" />
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
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
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="this.$router.currentRoute.path != '/home'"
          >
            <el-breadcrumb-item :to="{ path: '/home' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{
              this.$router.currentRoute.name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div
            class="homeWelcome"
            v-if="this.$router.currentRoute.path == '/home'"
          >
            欢迎来到云E办系统!
          </div>
          <router-view class="homeRouterView"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// src="http://img02.liwushuo.com/image/181113/od1uky3lg.jpg-w720"
/*
 * 把菜单和路由数据统一起来，将路由数据动态渲染到菜单上
 * router/index.js： 将home路由配置的name改成‘导航一’,item.name用到
 *启用路由模式，就可以用index作为path去进行路由跳转
 *
 */
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  computed: {
    routes() {
      // vuex里的routes
      return this.$store.state.routes;
    },
  },
  methods: {
    commandHandler(command) {
      if (command == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 注销登录
            this.postRequest("./logout");
            // 清空用户信息
            window.sessionStorage.removeItem("tokenStr");
            window.sessionStorage.removeItem("user");
            // 清空菜单，因为登录的用户权限不一样，需要清空vuex里的保存的数据
            this.$store.commit("initRoutes", []);
            // 跳转到登录页
            this.$router.replace("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
  },
};
</script>

<style>
.homeHeader {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 楷体;
  color: #fff;
}
.homeHeader .userInfo {
  cursor: pointer;
}
.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}
.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 楷体;
  color: #409eff;
  padding-top: 50px;
}
.homeRouterView {
  margin-top: 10px;
}
</style>