<template>
  <div>
    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        size="small"
        v-model="role.nameZh"
        placeholder="请输入角色中文名"
        @keydown.enter.native="doAddRole"
      >
      </el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="doAddRole"
      >
        添加角色
      </el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item
          :title="r.nameZh"
          :name="r.id"
          v-for="(r, index) in roles"
          :key="index"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button
                style="float: right; padding: 3px 0; color: #ff0000"
                type="text"
                icon="el-icon-delete"
                @click="doDeleteRole(r)"
              ></el-button>
            </div>
            <div>
              <el-tree
                ref="tree"
                :key="index"
                show-checkbox
                :data="allMenus"
                :props="defaultProps"
                :default-checked-keys="selectedMenus"
                node-key="id"
              ></el-tree>
              <div style="display: flex; justify-content: flex-end">
                <el-button size="mini" @click="cancelUpdate"
                  >取消修改</el-button
                >
                <el-button
                  size="mini"
                  type="primary"
                  @click="doUpdate(r.id, index)"
                >
                  确认修改
                </el-button>
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
  data() {
    return {
      role: {
        name: "",
        nameZh: "",
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      selectedMenus: [],
      activeName: -1,
    };
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    doDeleteRole(role) {
      this.$confirm(
        "此操作将永久删除[" + role.nameZh + "]角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest(
            "/system/basic/permission/delete?id=" + role.id
          ).then((res) => {
            if (res) {
              this.initRoles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    doAddRole() {
      if (this.role.name && this.role.name) {
        this.postRequest("/system/basic/permission/add", this.role).then(
          (res) => {
            if (res) {
              this.initRoles();
              this.role.name = "";
              this.role.nameZh = "";
            }
          }
        );
      } else {
        this.$message.error("所有字段不能为空");
      }
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      // if (selectedKeys == false) selectedKeys = [0];
      // console.log(selectedKeys);
      let url = "/system/basic/permission/updatemenus?rid=" + rid;
      selectedKeys.forEach((key) => {
        url += "&mids=" + key;
      });
      this.putRequest(url).then((res) => {
        if (res) {
          this.activeName = -1;
        }
      });
    },
    change(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    initSelectedMenus(rid) {
      this.getRequest("/system/basic/permission/mid/?rid=" + rid).then(
        (res) => {
          if (res) {
            this.selectedMenus = res;
          }
        }
      );
    },
    initAllMenus() {
      this.getRequest("/system/basic/permission/menus").then((res) => {
        if (res) {
          this.allMenus = res;
        }
      });
    },
    initRoles() {
      this.getRequest("/system/basic/permission/list").then((res) => {
        if (res) {
          this.roles = res;
        }
      });
    },
  },
};
</script>

<style>
.permissManaTool {
  display: flex;
}
.permissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}
.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>