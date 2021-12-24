<template>
  <div>
    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" shape="circle" slot="extra" @click="saveRecord">保存</Button>
    <Table @on-selection-change="selectionChange" show-summary :summary-method="handleSummary" stripe
           :columns="resume_j8_columns" :data="resume_j8_data" border>
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
import {addResumeEight, deleteResumeEight} from '@/http/plane_system/base'
import {addTime} from './addTime'
import {isEmpty} from '@/view/resume/isEmpty'
import {toMin, toMax} from './timeOperation'

export default {
  data () {
    return {
      selectionC: null,
      resume_j8_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          key: 'selection'
        },
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
                'on-change': (val) => {
                  this.resume_j8_data[params.index].eightDate = val
                }
              }
            })
          }
        },
        {
          title: '当日启动次数',
          key: 'today_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.resume_j8_data[params.index].todayStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.resume_j8_data[params.index].todayStartTimes = val
                  this.resume_j8_data[params.index].totalStartTimes = val
                  if (params.index > 0) {
                    this.resume_j8_data[params.index].totalStartTimes = this.resume_j8_data[params.index - 1].totalStartTimes + this.resume_j8_data[params.index].totalStartTimes
                  }
                }
              }
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
                    format: 'HH:mm',
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
                  }
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
                    format: 'HH:mm',
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundRated = val
                      this.resume_j8_data[params.index].totalRated = addTime(val, this.resume_j8_data[params.index].airRated, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalRated = addTime(this.resume_j8_data[params.index - 1].totalRated, this.resume_j8_data[params.index].totalRated, 'hhmm')
                      }
                    }
                  }
                })
              }
            },
            {
              title: '共计时：分',
              key: 'ground_total',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].groundTotal,
                    format: 'HH:mm',
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].groundTotal = val
                      this.resume_j8_data[params.index].totalTotal = addTime(val, this.resume_j8_data[params.index].airTotal, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalTotal = addTime(this.resume_j8_data[params.index - 1].totalTotal, this.resume_j8_data[params.index].totalTotal, 'hhmm')
                      }
                    }
                  }
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
                    format: 'HH:mm',
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
                  }
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
                    format: 'HH:mm',
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].airRated = val
                      this.resume_j8_data[params.index].totalRated = addTime(this.resume_j8_data[params.index].groundRated, val, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalRated = addTime(this.resume_j8_data[params.index - 1].totalRated, this.resume_j8_data[params.index].totalRated, 'hhmm')
                      }
                    }
                  }
                })
              }
            },
            {
              title: '共计时：分',
              key: 'air_total',
              align: 'center',
              render: (h, params) => {
                return h('TimePicker', {
                  props: {
                    value: this.resume_j8_data[params.index].airTotal,
                    format: 'HH:mm',
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j8_data[params.index].airTotal = val
                      this.resume_j8_data[params.index].totalTotal = addTime(this.resume_j8_data[params.index].groundTotal, val, 'hhmm')
                      if (params.index > 0) {
                        this.resume_j8_data[params.index].totalTotal = addTime(this.resume_j8_data[params.index - 1].totalTotal, this.resume_j8_data[params.index].totalTotal, 'hhmm')
                      }
                    }
                  }
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
                  }
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
                  }
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
                  }
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
                  }
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
                  }
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
                  }
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
              }
            })
          }
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center',
          key: 'operation'
        }
      ],
      resume_j8_data: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$get(`/plane/getResumeEightById/${this.$route.query['id']}`).then(res => {
        if (res) {
          this.resume_j8_data = res.data
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    deleteRecord (id) {
      deleteResumeEight(id).then(res => {
        this.$Message.success('删除成功!')
        this.resume_j8_data = []
        this.getData()
      })
    },
    addRecord () {
      this.resume_j8_data.push({
        planeId: this.$route.query['id'],
        todayStartTimes: null,
        totalStartTimes: null,
        totalFly: '',
        totalRated: '',
        totalTotal: ''
      })
    },
    saveRecord () {
      addResumeEight(this.resume_j8_data).then(res => {
        this.$Message.success('添加成功!')
        this.resume_j8_data = []
        this.getData()
      })
    },
    selectionChange (selection) {
      this.selectionC = selection
    },
    handleSummary ({columns, data}) {
      let selection = this.selectionC

      let todayStartTimes = 0

      let groundFly = 0
      let groundRated = 0
      let groundTotal = 0

      let airFly = 0
      let airRated = 0
      let airTotal = 0

      let groundAirFly = 0
      let groundAirRated = 0
      let groundAirTotal = 0

      let totalFly = 0
      let totalRated = 0
      let totalTotal = 0

      let totalStartTimes = 0

      if (!isEmpty(selection) && selection.length > 0) {
        for (let i = 0; i < selection.length; i++) {
          todayStartTimes += selection[i].todayStartTimes
          groundFly += toMin(selection[i].groundFly)
          groundRated += toMin(selection[i].groundRated)
          groundTotal += toMin(selection[i].groundTotal)
          airFly += toMin(selection[i].airFly)
          airRated += toMin(selection[i].airRated)
          airTotal += toMin(selection[i].airTotal)
          groundAirFly += toMin(selection[i].groundAirFly)
          groundAirRated += toMin(selection[i].groundAirRated)
          groundAirTotal += toMin(selection[i].groundAirTotal)
          totalFly += toMin(selection[i].totalFly)
          totalRated += toMin(selection[i].totalRated)
          totalTotal += toMin(selection[i].totalTotal)

          totalStartTimes += selection[i].totalStartTimes
        }
      }

      return {
        selection: {key: 'selection', value: ''},
        eight_date: {key: 'eight_date', value: '月结'},
        operation: {key: 'operation', value: ''},
        today_start_times: {key: 'todayStartTimes', value: todayStartTimes},

        ground_fly: {key: 'groundFly', value: toMax(groundFly)},
        ground_rated: {key: 'groundRated', value: toMax(groundRated)},
        ground_total: {key: 'groundTotal', value: toMax(groundTotal)},
        air_fly: {key: 'airFly', value: toMax(airFly)},
        air_rated: {key: 'airRated', value: toMax(airRated)},
        air_total: {key: 'airTotal', value: toMax(airTotal)},
        ground_air_fly: {key: 'groundAirFly', value: toMax(groundAirFly)},
        ground_air_rated: {key: 'groundAirRated', value: toMax(groundAirRated)},
        ground_air_total: {key: 'groundAirTotal', value: toMax(groundAirTotal)},
        total_fly: {key: 'totalFly', value: toMax(totalFly)},
        total_rated: {key: 'totalRated', value: toMax(totalRated)},
        total_total: {key: 'totalTotal', value: toMax(totalTotal)},

        total_start_times: {key: 'totalStartTimes', value: totalStartTimes}
      }
    }
  }
}
</script>
