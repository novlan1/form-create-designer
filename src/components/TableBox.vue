<template>
  <div class="tableArea">
    <div
      v-show="isShowTotal"
      class="total"
    >
      共计 {{ total }}个资源
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
    >
      <template v-for="(item, cIndex) in columnData">
        <el-table-column
          v-if="item.type == 'operation'"
          :key="item.field"
          :prop="item.field"
          :label="item.fieldName"
          :width="item.width"
          :fixed="item.fixedPosition"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button
              v-if="item.isOperation"
              type="text"
              size="small"
              class="btnView"
              @click="handleViewDetails(scope.row)"
            >
              {{ item.operationName }}
            </el-button>
            <span v-else>{{ item.operationName }} </span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type == 'url'"
          :key="item.field"
          :prop="item.field"
          :label="item.fieldName"
          :width="item.width"
          :fixed="item.fixedPosition"
          :resizable="false"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              <div v-if="isTextTooLong(scope.column, scope.row[item.field])">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  popper-class="popoverBackB"
                >
                  <div>
                    <a
                      style="color:#fff;text-decoration:underline;"
                      :href="scope.row[item.field]"
                      target="_blank"
                      v-html="keyRegExp(scope.row[item.field])"
                    />
                  </div>

                  <div slot="reference">
                    <a
                      :href="scope.row[item.field]"
                      class="twoLineText tableTxt"
                      target="_blank"
                      style="text-decoration:underline;"
                      v-html="keyRegExp(scope.row[item.field], searchKeyWord)"
                    />
                  </div>
                </el-popover>
              </div>
              <div v-else>
                <div>
                  <a
                    style="text-decoration:underline;"
                    :href="scope.row[item.field]"
                    target="_blank"
                    class="tableTxt twoLineText"
                    v-html="keyRegExp(scope.row[item.field], searchKeyWord)"
                  />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.children"
          :key="item.field"
          :prop="item.field"
          :label="item.fieldName"
          :fixed="item.fixedPosition"
          :width="item.width"
          :resizable="false"
        >
          <template v-for="(sub, subIndex) in item.children">
            <el-table-column
              v-if="sub.type == 'operation'"
              :key="subIndex"
              :prop="sub.field"
              :label="sub.fieldName"
              :width="sub.width"
              :fixed="sub.fixedPosition"
              :resizable="false"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="sub.isOperation"
                  type="text"
                  size="small"
                  class="btnView"
                  @click="handleViewDetails(scope.row)"
                >
                  {{ sub.operationName }}
                </el-button>
                <span v-else>{{ sub.operationName }} </span>
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="subIndex"
              :prop="sub.field"
              :label="sub.fieldName"
              :width="sub.width"
              :resizable="false"
            >
              <template slot-scope="scope">
                <div v-if="isTextTooLong(scope.column, scope.row[sub.field])">
                  <el-popover
                    placement="bottom"
                    trigger="hover"
                    popper-class="popoverBackB"
                  >
                    <div
                      v-html="keyRegExp(scope.row[sub.field], searchKeyWord)"
                    />
                    <div slot="reference">
                      <span
                        class="twoLineText tableTxt"
                        v-html="keyRegExp(scope.row[sub.field], searchKeyWord)"
                      />
                    </div>
                  </el-popover>
                </div>
                <div v-else>
                  <span
                    class="twoLineText tableTxt"
                    v-html="keyRegExp(scope.row[sub.field], searchKeyWord)"
                  />
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.fieldName"
          :fixed="item.fixedPosition"
          :width="item.width"
          :resizable="false"
        >
          <template slot-scope="scope">
            <slot
              v-if="item.isSlot"
              :scope="scope"
              :name="`${scope.$index}-${cIndex}`"
            >
            {{`${scope.$index}-${cIndex}`}}
            </slot>
            <div v-else-if="isTextTooLong(scope.column, scope.row[item.field])">
              <el-popover
                placement="bottom"
                trigger="hover"
                popper-class="popoverBackB"
              >
                <div
                  v-html="keyRegExp(scope.row[item.field], searchKeyWord)"
                />
                <div slot="reference">
                  <span
                    class="twoLineText tableTxt"
                    v-html="keyRegExp(scope.row[item.field], searchKeyWord)"
                  />
                </div>
              </el-popover>
            </div>
            <div v-else>
              <span
                class="tableTxt twoLineText"
                v-html="keyRegExp(scope.row[item.field], searchKeyWord)"
              />
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="flexEnd">
      <!-- <span>每页展示行：</span>
      <el-select
        v-model="pageSize"
        @change="handleSizeChange"
      >
        <el-option
          v-for="item in pageSizeOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
      <el-pagination
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
        <span>{{ start }}-{{ end }}/{{ total }}</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TableBox',
    props: {
        tableData: {
            type: Array,
            default: () => [],
        },
        columnData: {
            type: Array,
            default: () => [],
        },
        searchKeyWord: {
            type: String,
            default: '',
        },
        total: {
            type: Number,
            default: 0,
        },
        isShowTotal: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            pageSizeOptions: [10, 20, 30, 40, 50],
        };
    },
    computed: {
        start() {
            return (this.currentPage - 1) * this.pageSize + 1;
        },
        end() {
            if (this.currentPage * this.pageSize > this.total) {
                return this.total;
            }
            return this.currentPage * this.pageSize;
        },
    },
    mounted() {
    },
    methods: {
    // 表格检索文字的高亮显示
        keyRegExp(val, keyword) {
            if (val) {
                val = `${val}`;
                if (val.indexOf(keyword) !== -1 && keyword !== '') {
                    const values = val.split(keyword);
                    return values.join(`<font color="#526CFE">${keyword}</font>`);
                    // return val.replace(
                    //   keyword,
                    //   '<font color="#f00">' + keyword + "</font>"
                    // );
                }
                return val;
            }
            return val;
        },
        // 判断字段是否超出表头宽度
        isTextTooLong({realWidth, width}, name) {
            if (typeof name === 'string' && name.indexOf('\n') > 0) {
                return true;
            }
            if (width) {
                return width * 2 - 21 < this.getTextWidth(name);
            }
            return realWidth * 2 - 40 < this.getTextWidth(name);
        },
        // 获取单元格字段宽度
        getTextWidth(str) {
            let width = 0;
            const html = document.createElement('span');
            if (str) {
                html.innerText = str.toString()
                    .replace('\n', '');
            } else {
                html.innerText = str;
            }
            html.className = 'getTextWidth';
            document.querySelector('body')
                .appendChild(html);
            width = document.querySelector('.getTextWidth').offsetWidth;
            document.querySelector('.getTextWidth')
                .remove();
            return width;
        },
        resetCurrentPage() {
            this.currentPage = 1;
        },
        handleViewDetails(data) {
            this.$emit('handleViewDetails', data);
        },
        // 改变表格展示的数据条数
        handleSizeChange() {
            this.handleCurrentChange(1);
        },
        // 翻页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.$emit('handleCurrentChange', val, this.pageSize);
        },
        tableHeaderColor({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0) {
                return 'background-color: #E3ECFF;width: 88px;height: 32px;padding: 0;font-family: PingFangSC-Regular;font-size: 14px;color: #526CFE;text-align: left;line-height: 20px';
            }
            return 'width: 52px;height: 20px;font-family: PingFangSC-Regular;font-size: 13px;color: #8898AA;text-align: left;line-height: 20px;background:white';
        },
    },
};
</script>

<style scoped>
/* .tableArea {
  height: 100%;
  width: 100%;

  .total {
    // width: 137px;
    height: 13px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #868daa;
    text-align: left;
    line-height: 13px;
    margin: 11px 0 31px 9px;
  }

  .btnView {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4e5983;
    text-align: left;
    line-height: 13px;
    text-decoration: underline;
  }

  .twoLineText {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 45px;
  }

  .tableTxt {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #19193e;
    letter-spacing: 0;
    text-align: left;
    line-height: 21px;
  }

  .flexEnd {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #19193e;
    text-align: left;
    line-height: 13px;
    margin-top: 20px;

    ::v-deep.el-input__inner {
      border: 0px;
      width: 80px;
    }

    ::v-deep.el-icon-arrow-up:before {
      content: "\e78f";
    }

    ::v-deep.el-select {
      width: 100px;
    }
  }

  ::v-deep.el-table td.is-hidden > * {
    visibility: visible !important;
  }

  ::v-deep.el-table .cell {
    white-space: pre-line;
  }
} */
</style>
