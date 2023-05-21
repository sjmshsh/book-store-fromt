<template>
  <div>
    <div class="title">
      <h2><li class="el-icon-goods" /> 购物车</h2>
      <el-button type="success" size="medium" style="height:40px" @click="handleCreateOrder">清空购物车</el-button>
    </div>
    <div style="padding:10px">
      <el-table
        v-loading="loading"
        :data="shopCartList"
        border
        style="width: 100%"
        element-loading-text="购物车加载中"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="120">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="bookInfo.name"
          label="书名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="bookInfo.price"
          label="价格"
          align="center"
          width="60px"
        />
        <el-table-column
          prop="num"
          label="数量"
          width="180"
          align="center"
        >
          <template slot-scope="scope" style="display:flex;justify-content: space-between;">
            <el-button
              type="primary"
              circle
              icon="el-icon-circle-plus-outline"
              size="mini"
              @click="scope.row.num++"
            />
          &ensp;&ensp;
            <span style="font-size:18px;width:50px">{{ scope.row.num }}</span>
          &ensp;&ensp;
            <el-button type="primary" circle size="mini" icon="el-icon-remove-outline" @click="shopNumDown(scope)" />
          </template>
        </el-table-column>

        <el-table-column
          prop="createAt"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="updateAt"
          label="更新时间"
          align="center"
        />
        <el-table-column
          prop="total"
          label="总价"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.num*scope.row.bookInfo.price }}
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="order_id"
          label="订单状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row. }}
          </template>
        </el-table-column> -->

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <div class="operation">
              <el-button type="primary" size="mini" @click="updateShopCart(scope.row)">更新</el-button>
              <el-button type="danger" size="mini" @click="deleteShopCartInfo(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getShoCartList, updateShopCart, deleteShopCart } from '@/api/shopcart'
import { createOrder } from '@/api/order'
export default {
  data() {
    return {
      shopCartList: [],
      total: 0,
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getShoCartList(this.pagination.pageNo, this.pagination.pageSize).then((response) => {
        console.log(response)
        this.shopCartList = response.data.list
        this.total = response.data.total
        this.loading = false
      })
    },

    shopNumDown(info) {
      if (info.row.num - 1 === 0) {
        return
      }
      info.row.num--
    },
    updateShopCart(info) {
      console.log(info)
      updateShopCart(info.id, { num: info.num }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: info.bookInfo.name,
          message: '更新成功,数量' + info.num,
          duration: 1000
        })
        setTimeout(() => {
          this.flushData()
        }, 1000)
      }).catch((err) => {
        this.$notify({
          type: 'fail',
          title: info.bookInfo.name,
          message: '更新失败' + err,
          duration: 1000
        })
      })
    },
    flushData() {
      this.pagination.pageNo = 1
      this.pagination.pageSize = 10
      this.getData()
    },
    deleteShopCartInfo(info) {
      deleteShopCart(info.id).then((response) => {
        this.$notify({
          type: 'success',
          title: info.bookInfo.name,
          message: '删除成功',
          duration: 1000
        })
        setTimeout(() => {
          this.flushData()
        }, 1000)
      })
    },
    handleCreateOrder() {
      createOrder().then((response) => {
        console.log(response)
        const div = document.createElement('div')
        div.innerHTML = response.data.content
        document.body.appendChild(div)
        document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
        document.forms[0].submit()
        this.$notify({
          type: 'success',
          message: '订单创建成功,总共: ' + response.data.total + '元',
          title: '成功'
        })
        this.getData()
      }).catch((err) => {
        this.$notify({
          type: 'error',
          message: '创建订单失败:' + err,
          title: '失败'
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.operation{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
