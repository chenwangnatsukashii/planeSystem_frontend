<template>
  <div>
    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" style="" shape="circle" slot="extra" @click="saveRecord">保存</Button>
    <Table stripe :columns="resume_j8_columns" :data="resume_j8_data" border height="1000">
      <template slot-scope="{ row, index }" slot="operation">
        <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<style>
.ivu-table-cell {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<script>
import {addResumeEight, deleteResumeEight} from "@/http/plane_system/base";
import {addTime} from './addTime'

export default {
  data() {
    return {
      resume_j8_columns: [
        {
          title: '年月日',
          key: 'eight_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.resume_j8_data[params.index].eightDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.resume_j8_data[params.index].eightDate = val
                }
              },
            })
          }
        },
        {
          title: '当日启动次数',
          key: 'today_start_times',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.resume_j8_data[params.index].todayStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.resume_j8_data[params.index].todayStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '当日地面工作时间',
          align: 'center',
          children: [
            {
              title: '起飞状态时：分',
              key: 'ground_fly',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].groundFly,
                    format: "HH:mm",
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundFly = val
                      this.resume_j8_data[params.index].totalFly = addTime(val, this.resume_j8_data[params.index].airFly, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalFly = addTime(this.resume_j8_data[params.index - 1].totalFly, this.resume_j8_data[params.index].totalFly, 'hhmm')
                      }
                    }
                  },
                })
              }
            },
            {
              title: '额定状态时：分',
              key: 'ground_rated',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].groundRated,
                    format: "HH:mm",
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundRated = val
                    }
                  },
                })
              }
            },
            {
              title: '共计时：分',
              key: 'ground_total',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].groundTotal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundTotal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '当日空中工作时间',
          align: 'center',
          children: [
            {
              title: '起飞状态时：分',
              key: 'air_fly',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].airFly,
                    format: "HH:mm",
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].airFly = val
                      this.resume_j8_data[params.index].totalFly = addTime(this.resume_j8_data[params.index].groundFly, val, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalFly = addTime(this.resume_j8_data[params.index - 1].totalFly, this.resume_j8_data[params.index].totalFly, 'hhmm')
                      }
                    }
                  },
                })
              }
            },
            {
              title: '额定状态时：分',
              key: 'air_rated',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].airRated,
                    format: "HH:mm",
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].airRated = val
                    }
                  },
                })
              }
            },
            {
              title: '共计时：分',
              key: 'air_total',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].airTotal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].airTotal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '当日20%地面+空中工作时间',
          align: 'center',
          children: [
            {
              title: '起飞状态时：分',
              key: 'ground_air_fly',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].groundAirFly,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundAirFly = val
                    }
                  },
                })
              }
            },
            {
              title: '额定状态时：分',
              key: 'ground_air_rated',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].groundAirRated,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundAirRated = val
                    }
                  },
                })
              }
            },
            {
              title: '共计时：分',
              key: 'ground_air_total',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].groundAirTotal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundAirTotal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '累计工作时间',
          align: 'center',
          children: [
            {
              title: '起飞状态时：分',
              key: 'total_fly',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].totalFly,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].totalFly = val
                    }
                  },
                })
              }
            },
            {
              title: '额定状态时：分',
              key: 'total_rated',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].totalRated,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].totalRated = val
                    }
                  },
                })
              }
            },
            {
              title: '共计时：分',
              key: 'total_total',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.resume_j8_data[params.index].totalTotal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].totalTotal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '累计启动次数',
          key: 'total_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.resume_j8_data[params.index].totalStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.resume_j8_data[params.index].totalStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ],
      resume_j8_data: []
    }
  },

  created() {
    this.getData()
  },

  mounted() {
  },

  methods: {
    getData() {
      this.$get(`/plane/getResumeEightById/${this.$route.query['id']}`).then(res => {
        if (res) {
          this.resume_j8_data = res.data
        } else {
          this.$Message.error('请求失败');
        }
      })
    },
    deleteRecord(id) {
      deleteResumeEight(id).then(res => {
        this.$Message.success('删除成功!')
        this.resume_j8_data = []
        this.getData()
      })
    },
    addRecord() {
      this.resume_j8_data.push({
        planeId: this.$route.query['id'],
        todayStartTimes: null,
        totalStartTimes: null,
        totalFly: ''
      })
    },
    saveRecord() {
      addResumeEight(this.resume_j8_data).then(res => {
        this.$Message.success('添加成功!')
        this.resume_j8_data = []
        this.getData()
      })
    }
  }
}
</script>
