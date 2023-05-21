<template>
  <div>
    <div style="padding:10px">
      <h2> <li
        class="el-icon-s-order"
      /> 历史订单页</h2>
    </div>

    <div class="table">
      <el-table
        v-loading="loading"
        :data="orderList"
        border
        style="width: 100%"
        element-loading-text="订单加载中"
        fit
        highlight-current-row
        :row-click="handleRowClick"
      >
        <!-- 序号 -->
        <el-table-column align="center" label="ID" width="120">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>

        <!-- 订单ID -->
        <el-table-column label="订单序号" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createAt }}
          </template>
        </el-table-column>
        <!-- 订单电话 -->
        <el-table-column label="订单电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <!-- 总金额 -->
        <el-table-column label="总金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.total }}
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <h1>订单详情</h1>
            <el-table
              :data="scope.row.shopCartInfoList"
              border
              style="width: 100%"
              fit
              highlight-current-row
            >
              <el-table-column label="序号" align="center">
                <template slot-scope="prop">
                  {{ prop.$index+1 }}
                </template>
              </el-table-column>
              <!-- 书名 -->
              <el-table-column label="书名" align="center">
                <template slot-scope="prop">
                  {{ prop.row.bookInfo.name }}
                </template>
              </el-table-column>
              <!-- 数量 -->
              <el-table-column label="数量" align="center">
                <template slot-scope="prop">
                  {{ prop.row.num }}
                </template>
              </el-table-column>
              <!-- 总价 -->
              <el-table-column label="总价" align="center">
                <template slot-scope="prop">
                  {{ prop.row.total }}
                </template>
              </el-table-column>
              <!-- 创建时间 -->
              <el-table-column label="创建时间" align="center">
                <template slot-scope="prop">
                  {{ prop.row.bookInfo.createAt }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import { getUserOrderList } from '@/api/order'
export default {
  data() {
    return {
      orderList: [],
      total: 0,
      loading: false,
      detailLoading: false,
      userInfo: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getUserOrderList().then((response) => {
        console.log(response)
        this.orderList = response.data.list
        this.total = response.data.total
        this.userInfo = response.data.userInfo
      }).catch((err) => {
        this.$notify({
          type: 'error',
          message: '获取用户订单信息失败:' + err,
          title: '失败'
        })
      })
      this.loading = false
    },
    handleRowClick(row) {
      console.log(1111)
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  padding: 10px;
}
</style>
