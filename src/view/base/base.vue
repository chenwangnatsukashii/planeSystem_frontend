<template>
  <div>
    <div style="margin-bottom: 5px;">
      <Button type="primary" shape="circle" @click="operation('baseInfo')">基本信息</Button>
      <Button style="margin-left: 10px;" type="primary" shape="circle" @click="operation('resumeInfo')">履历本</Button>
      <Button style="margin-left: 10px;" type="primary" shape="circle" @click="operation('inspection')">定期检查</Button>
      <Button style="margin-left: 10px;" type="primary" shape="circle" @click="operation('delete')">删除</Button>
    </div>
    <div style="margin-bottom: 10px;">
      派工号：<Input clearable v-model="searchData.workNumber" placeholder="请输入派工号" style="width: 150px;"/>
      机型：
      <Select v-model="searchData.planeType" clearable placeholder="请选择机型" style="width: 150px;">
        <Option v-for="item in planeList" :value="item.value" :key="item.value">{{ item.planeName }}</Option>
      </Select>
      部队：<Input clearable v-model="searchData.unitNumber" placeholder="请输入部队" style="width: 150px;"/>
      飞机号：<Input clearable v-model="searchData.planeNum" placeholder="请输入飞机号" style="width: 150px;"/>
      提醒信息：<Input clearable placeholder="请输入提醒信息" style="width: 150px;"/>

      <Button style="float: right; margin-left: 10px;" type="primary" shape="circle" icon="ios-add" @click="newDataShow = true">新建</Button>
      <Button style="float: right; margin-left: 10px;" type="warning" shape="circle" icon="ios-refresh" @click="clearSearch">重置</Button>
      <Button style="float: right;" type="primary" shape="circle" icon="ios-search" @click="searchPlane">查询</Button>
    </div>
    <Table stripe border :columns="base_columns" :data="base_data">
      <template slot-scope="{row, index}" slot="action">
        <Dropdown style="margin-left: 20px" v-show="row.warningInfo.length>0">
          <Button type="warning">
            请查看
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-for="item in row.warningInfo" :key=item>{{ item }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Badge :count="row.warningInfo.length" v-show="row.warningInfo.length>0">
        </Badge>
      </template>
    </Table>
    <Modal
      v-model="newDataShow"
      title="新增飞机基本信息"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel">

      <Form ref="newData" :model="newData" :rules="newDataRule" :label-width="80">
        <FormItem label="派工号" prop="workNumber">
          <Input clearable v-model="newData.workNumber" placeholder="请输入派工号"></Input>
        </FormItem>
        <FormItem label="机型" prop="planeType">
          <Select v-model="newData.planeType" placeholder="请选择机型">
            <Option v-for="item in planeList" :value="item.value" :key="item.value">{{ item.planeName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="部队" prop="unitNumber">
          <Input clearable v-model="newData.unitNumber" placeholder="请输入部队"></Input>
        </FormItem>
        <FormItem label="飞机号" prop="planeNum">
          <Input clearable v-model="newData.planeNum" placeholder="请输入飞机号"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<style scoped>
.ivu-badge{
  margin-bottom: 10px;
  margin-left: -5px;
}
</style>
<script>

import {addPlane, deleteAnyPlane} from '@/http/plane_system/base'

export default {
  data () {
    return {
      currentChoose: '',
      newDataShow: false,
      loading: true,

      searchData: {
        workNumber: '',
        planeType: '',
        unitNumber: '',
        planeNum: ''
      },

      newData: {
        workNumber: '',
        planeType: '',
        unitNumber: '',
        planeNum: ''
      },

      planeList: [
        {
          value: 'J11',
          planeName: '歼-11'
        },
        {
          value: 'J11B',
          planeName: '歼-11B'
        },
        {
          value: 'JJ9',
          planeName: '歼教-9'
        },
        {
          value: 'J8',
          planeName: '教-8'
        }
      ],

      newDataRule: {
        workNumber: [
          {required: true, message: '派工号不能为空', trigger: 'blur'}
        ],
        planeType: [
          {required: true, message: '机型不能为空', trigger: 'change'}
        ],
        unitNumber: [
          {required: true, message: '部队不能为空', trigger: 'blur'}
        ],
        planeNum: [
          {required: true, message: '飞机号不能为空', trigger: 'blur'}
        ]
      },

      base_columns: [
        {
          title: '选择',
          key: 'id',
          width: 70,
          align: 'center',
          render: (h, params) => {
            let id = params.row
            let flag = false
            if (this.currentChoose === id) {
              flag = true
            }

            return h('div', [
              h('Radio', {
                props: {
                  value: flag
                },
                on: {
                  'on-change': () => {
                    this.currentChoose = id
                  }
                }
              })
            ])
          }
        },
        {
          title: '派工号',
          align: 'center',
          key: 'workNumber'
        },
        {
          title: '机型',
          align: 'center',
          key: 'planeType'
        },
        {
          title: '部队',
          align: 'center',
          key: 'unitNumber'
        },
        {
          title: '飞机号',
          align: 'center',
          key: 'planeNum'
        },
        {
          title: '提醒信息',
          align: 'center',
          key: 'promptingMessage',
          slot: 'action'
        }
      ],
      base_data: []
    }
  },

  created: function () {
    this.searchPlane()
  },

  methods: {
    searchPlane () {
      this.searchData.workNumber = this.searchData.workNumber.trim()
      this.searchData.unitNumber = this.searchData.unitNumber.trim()
      this.searchData.planeNum = this.searchData.planeNum.trim()
      this.$getWithParams('/plane/getAllPlanes', this.searchData).then(res => {
        if (res) {
          this.base_data = res.data
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    clearSearch () {
      this.searchData.workNumber = ''
      this.searchData.planeType = ''
      this.searchData.unitNumber = ''
      this.searchData.planeNum = ''
      this.searchPlane()
    },
    showBase (id) {
      this.$router.push({
        path: '/base/base-add',
        meta: {title: '修改', icon: 'ios-book'},
        query: {
          id: id
        }
      })
    },
    showResume (id, type) {
      let path = ''
      if (type === '歼-11') {
        path = '/resume/resume-j11'
      } else if (type === '歼-11B') {
        path = '/resume/resume-j11b'
      } else if (type === '歼教-9') {
        path = '/resume/resume-j9'
      } else {
        path = '/resume/resume-j8'
      }
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })
    },

    deleteRecord (id) {
      deleteAnyPlane(id).then(res => {
        this.$Message.success('删除成功!')
        this.searchPlane()
      })
    },

    operation (name) {
      if (this.currentChoose === '') {
        this.$Message.warning('请选择飞机')
        return
      }
      if (name === 'baseInfo') {
        this.showBase(this.currentChoose.id)
      } else if (name === 'resumeInfo') {
        this.showResume(this.currentChoose.id, this.currentChoose.planeType)
      } else if (name === 'delete') {
        this.deleteRecord(this.currentChoose.id)
      } else {
        this.$Message.warning('定期检查功能还未上线')
      }
    },
    ok () {
      this.$refs['newData'].validate((valid) => {
        if (valid) {
          addPlane(this.newData).then(res => {
            this.$Message.success('添加成功!')
            this.newDataShow = false
            this.cancel()
            this.searchPlane()
          })
        } else {
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }, 1000)
          this.$Message.error('非空字段不能为空!')
        }
      })
    },
    cancel () {
      this.$refs['newData'].resetFields()
    }
  }

}
</script>
