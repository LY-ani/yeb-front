<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input
          style="width: 300px; margin-right: 10px"
          prefix-icon="el-icon-search"
          v-model="empName"
          @keydown.enter.native="initEmps"
          clearable
          @clear="initEmps"
          placeholder="请输入员工名进行搜索"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="initEmps">
          搜索
        </el-button>

        <el-button type="primary">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success">
          <i class="fa fa-level-up" aria-hidden="true"></i>导入数据
        </el-button>
        <el-button type="success">
          <i class="fa fa-level-down" aria-hidden="true"></i>导入数据出
        </el-button>
        <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="emps"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" algin="left" width="90" fixed>
        </el-table-column>
        <el-table-column prop="workID" label="工号" align="left" width="85">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="left" width="50">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          align="left"
          width="95"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号码"
          align="left"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="wedlock"
          label="婚姻状况"
          align="left"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="nation.name"
          label="民族"
          align="left"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="nativePlace"
          label="籍贯"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="politicsStatus.name"
          label="政治面貌"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="email" label="电子邮件" align="left" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" align="left" width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系地址"
          align="left"
          width="270"
        >
        </el-table-column>
        <el-table-column
          prop="department.name"
          label="所属部门"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="joblevel.name"
          label="职称"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="position.name"
          label="职位"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="engageForm"
          label="聘用形式"
          align="left"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="tiptopDegree"
          label="最高学历"
          align="left"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="school"
          label="毕业院校"
          align="left"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="specialty" label="专业" align="left" width="150">
        </el-table-column>
        <el-table-column
          prop="workState"
          label="在职状态"
          align="left"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="beginDate"
          label="入职日期"
          align="left"
          width="95"
        >
        </el-table-column>
        <el-table-column
          prop="conversionTime"
          label="转正日期"
          align="left"
          width="95"
        >
        </el-table-column>
        <el-table-column
          prop="beginContract"
          label="合同起始日期"
          align="left"
          width="95"
        >
        </el-table-column>
        <el-table-column
          prop="endContract"
          label="合同截止日期"
          align="left"
          width="95"
        >
        </el-table-column>
        <el-table-column label="合同期限" align="left" width="95">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.contractTerm }}</el-tag
            >年
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="">
            <el-button style="padding: 3px" size="mini">编辑</el-button>
            <el-button style="padding: 3px" size="mini" type="primary"
              >查看高级资料</el-button
            >
            <el-button style="padding: 3px" size="mini" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          @current-change="currentChange"
          @size-change="sizeChange"
          background
          layout="sizes, prev, pager, next, jumper, ->, total"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      emps: [],
      loading: false,
      total: 0,
      currentPage: 1,
      size: 10,
      empName: "",
    };
  },
  mounted() {
    this.initEmps();
  },
  methods: {
    sizeChange(size) {
      this.size = size;
      this.initEmps();
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initEmps();
    },
    initEmps() {
      this.loading = true;
      this.getRequest(
        "/employee/basic/list?currentPage=" +
          this.currentPage +
          "&size=" +
          this.size +
          "&name=" +
          this.empName
      ).then((res) => {
        this.loading = false;
        if (res) {
          console.log(res);
          this.emps = res.date;
          this.total = res.total;
        }
      });
    },
  },
};
</script>

<style>
</style>