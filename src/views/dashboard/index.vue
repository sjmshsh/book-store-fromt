<template>
  <div class="dashboard-container">
    <div class="search-nav">
      <span>书名：</span>
      <el-input v-model="searchBookName" placeholder="请输入要搜索的书名" />
      <el-button style="margin-left:5px" type="primary" @click="searchBook">
        <li class="el-icon-zoom-in" />
        搜索
      </el-button>
      <el-button style="margin-left:5px" type="primary" @click="refresh">
        <li class="el-icon-refresh" />
      </el-button>
    </div>
    <div class="book-list">
      <template v-for="(item) in bookList">
        <el-card :key="item.id" class="book-card" shadow="hover">
          <div class="book-info">
            <div class="book-card-image">
              <el-image style="width:140px;height:180px" :src="item.imageUrl" />
            </div>
            <div class="book-card-basic">
              <div>
                <h2>书名:{{ item.name }}</h2>
                <h2>作者:{{ item.author }}</h2>
                <h3>出版日期:{{ item.publishTime }}</h3>
                <h3>简介:{{ item.info }}</h3>
              </div>
            </div>
            <div class="book-card-score">
              <div>评分: <span style="font-size:60px">{{ item.score }}</span></div>
              <div>分类:{{ item.type }}</div>
            </div>

            <div class="book-card-price">
              <div>价格: <span style="font-size:32px;color:red">{{ item.price }}</span></div>
            </div>

            <div class="book-card-operation">
              <div>
                <el-button size="medium" style="margin-bottom:5px" type="primary" @click="addToShopCart(item)">加入购物车</el-button>
                <!-- <div style="display:flex;justify-content:space-around;align-items:center">
                  <el-tag type="success" @click="handleNumAdd(item)">
                    <li
                      class="el-icon-plus"
                    />
                  </el-tag>
                  <span>{{ item.num }}</span>
                  <el-tag type="success" @click="item.num--">
                    <li class="el-icon-minus" />
                  </el-tag>
                </div> -->
              </div>
            </div>
          </div>
        </el-card>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="pagination.pageNo"
        :page-sizes="[10, 25, 20, 25]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-backtop />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBookList, addShopCart } from '@/api/book'
export default {
  name: 'Dashboard',
  data() {
    return {
      bookList: [],
      total: 0,
      searchBookName: '',
      pagination: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  beforeMount() {
    this.getBookTableList()
  },
  methods: {
    getBookTableList() {
      getBookList(this.searchBookName, this.pagination.pageNo, this.pagination.pageSize).then((response) => {
        console.log(1111)
        console.log(response)
        this.bookList = response.data.list
        this.total = response.data.total
      })
    },
    addToShopCart(bookInfo) {
      console.log(bookInfo)
      addShopCart({ bookId: bookInfo.id, num: 1 }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: bookInfo.name,
          message: '已加入购物车',
          duration: 1000
        })
      }).catch((err) => [
        this.$notify({
          type: 'error',
          title: bookInfo.name,
          message: '添加失败' + err,
          duration: 1000
        })
      ])
    },
    handleNumAdd(i) {
    },
    handleNumSub(i) {
    },
    searchBook() {
      this.getBookTableList()
    },
    refresh() {
      this.searchBookName = ''
      this.pagination.pageNo = 1
      this.pagination.pageSize = 10
      this.getBookTableList()
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.getBookTableList()
    },
    handleCurrentChange(page) {
      this.pagination.pageNo = page
      this.getBookTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  overflow: scroll;
}
.book-list{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.book-card{
  width: 80%;
  height: 200px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
.info{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.book_operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-info{
  width: 100%;
  display: flex;
  position: relative;
  .book-card-image{
  width: 200px;
}
.book-card-basic{
  width: 400px;
}
.book-card-score{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 300px;
}
.book-card-operation{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 200px;
  margin: auto 0;
}
.book-card-price{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
}
.search-nav{
  margin: 0 auto;
   width: 80%;
   display: flex;
   justify-content: left;
   align-items: center;
   span{
    width: 70px;
   }
   padding-top: 10px;
   .el-input{
    width: 300px;
   }
}
.pagination{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: right;
}
</style>
