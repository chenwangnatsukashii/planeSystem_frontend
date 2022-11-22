<template>
  <div>
    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" shape="circle" slot="extra" @click="saveRecord">保存</Button>
    <Table @on-selection-change="selectionChange" show-summary :summary-method="handleSummary" stripe
           :columns="resume_j9_columns" :data="resume_j9_data" border>
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
import {addResumeNine, deleteResumeNine} from '@/http/plane_system/base'
import {isEmpty} from './isEmpty'

export default {
  data () {
    return {
      selectionC: null,
      resume_j9_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          key: 'selection'
        },
        {
          title: '日期',
          align: 'center',
          children: [
            {
              title: ' ',
              align: 'center',
              children: [
                {
                  title: ' ',
                  key: 'nine_date',
                  width: 140,
                  render: (h, params) => {
                    return h('DatePicker', {
                      props: {
                        value: this.resume_j9_data[params.index].nineDate,
                        size: 'small'
                      },
                      on: {
                        'on-change': (val) => {
                          this.resume_j9_data[params.index].nineDate = val
                        }
                      }
                    })
                  }
                }
              ]
            }
          ]
        },
        {
          title: '地面持续工作时间',
          align: 'center',
          children: [
            {
              title: '全部时间',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'ground_all_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundAllHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAllHour = val
                          this.addGroundAir(params.index)
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'ground_all_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundAllMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAllMinute = val
                          this.addGroundAir(params.index)
                        }
                      }
                    })
                  }
                }
              ]
            },
            {
              title: '最大状态',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'ground_big_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundBigHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundBigHour = val
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'ground_big_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundBigMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundBigMinute = val
                        }
                      }
                    })
                  }
                }
              ]
            },
            {
              title: '加力状态',
              key: 'age',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'ground_add_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundAddHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAddHour = val
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'ground_add_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].groundAddMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAddMinute = val
                        }
                      }
                    })
                  }
                }
              ]
            }
          ]
        },
        {
          title: '空中持续工作时间',
          align: 'center',
          children: [
            {
              title: '全部时间',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'air_all_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airAllHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAllHour = val
                          this.addGroundAir(params.index)
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'air_all_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airAllMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAllMinute = val
                          this.addGroundAir(params.index)
                        }
                      }
                    })
                  }
                }
              ]
            },
            {
              title: '最大状态',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'air_big_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airBigHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airBigHour = val
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'air_big_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airBigMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airBigMinute = val
                        }
                      }
                    })
                  }
                }
              ]
            },
            {
              title: '加力状态',
              align: 'center',
              children: [
                {
                  title: '小时',
                  align: 'center',
                  key: 'air_add_hour',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airAddHour,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAddHour = val
                        }
                      }
                    })
                  }
                },
                {
                  title: '分',
                  align: 'center',
                  key: 'air_add_minute',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.resume_j9_data[params.index].airAddMinute,
                        size: 'small',
                        min: 0
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAddMinute = val
                        }
                      }
                    })
                  }
                }
              ]
            }
          ]
        },
        {
          title: '累计时间',
          align: 'center',
          children: [
            {
              title: '小时',
              align: 'center',
              key: 'total_time_hour',
              render: (h, params) => {
                return h('InputNumber', {
                  props: {
                    value: this.resume_j9_data[params.index].totalTimeHour,
                    size: 'small',
                    min: 0
                  },
                  on: {
                    input: (val) => {
                      this.resume_j9_data[params.index].totalTimeHour = val
                    }
                  }
                })
              }
            },
            {
              title: '分',
              align: 'center',
              key: 'total_time_minute',
              render: (h, params) => {
                return h('InputNumber', {
                  props: {
                    value: this.resume_j9_data[params.index].totalTimeMinute,
                    size: 'small',
                    min: 0
                  },
                  on: {
                    input: (val) => {
                      this.resume_j9_data[params.index].totalTimeMinute = val
                    }
                  }
                })
              }
            }
          ]
        },
        {
          title: '启动次数',
          key: 'start_time',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.resume_j9_data[params.index].startTime,
                size: 'small',
                min: 0
              },
              on: {
                input: (val) => {
                  this.resume_j9_data[params.index].startTime = val
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
      resume_j9_data: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$get(`/plane/getResumeNineById/${this.$route.query['id']}`).then(res => {
        if (res) {
          this.resume_j9_data = res.data
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    deleteRecord (id) {
      deleteResumeNine(id).then(res => {
        this.$Message.success('删除成功!')
        this.resume_j9_data = []
        this.getData()
      })
    },
    addRecord () {
      this.resume_j9_data.push({
        planeId: this.$route.query['id'],
        groundAllHour: null,
        groundAllMinute: null,
        groundBigHour: null,
        groundBigMinute: null,
        groundAddHour: null,
        groundAddMinute: null,
        airAllHour: null,
        airAllMinute: null,
        airBigHour: null,
        airBigMinute: null,
        airAddHour: null,
        airAddMinute: null,
        totalTimeHour: null,
        totalTimeMinute: null,
        startTime: null
      })
    },
    saveRecord () {
      addResumeNine(this.resume_j9_data).then(res => {
        this.$Message.success('添加成功!')
        this.resume_j9_data = []
        this.getData()
      })
    },
    addSelection () {
      let selection = this.selectionC

      let groundAllHour = 0
      let groundAllMinute = 0
      let groundBigHour = 0
      let groundBigMinute = 0
      let groundAddHour = 0
      let groundAddMinute = 0
      let airAllHour = 0
      let airAllMinute = 0
      let airBigHour = 0
      let airBigMinute = 0
      let airAddHour = 0
      let airAddMinute = 0
      let startTime = 0

      if (!isEmpty(selection) && selection.length > 0) {
        for (let i = 0; i < selection.length; i++) {
          groundAllHour += selection[i].groundAllHour
          groundAllMinute += selection[i].groundAllMinute
          groundBigHour += selection[i].groundBigHour
          groundBigMinute += selection[i].groundBigMinute
          groundAddHour += selection[i].groundAddHour
          groundAddMinute += selection[i].groundAddMinute
          airAllHour += selection[i].airAllHour
          airAllMinute += selection[i].airAllMinute
          airBigHour += selection[i].airBigHour
          airBigMinute += selection[i].airBigMinute
          airAddHour += selection[i].airAddHour
          airAddMinute += selection[i].airAddMinute
          startTime += selection[i].startTime
        }
      }
      return {
        selection: {key: 'selection', value: ''},
        nine_date: {key: 'nine_date', value: '月结'},
        operation: {key: 'operation', value: ''},
        ground_all_hour: {key: 'groundAllHour', value: groundAllHour},
        ground_all_minute: {key: 'groundAllMinute', value: groundAllMinute},
        ground_big_hour: {key: 'groundBigHour', value: groundBigHour},
        ground_big_minute: {key: 'groundBigMinute', value: groundBigMinute},
        ground_add_hour: {key: 'groundAddHour', value: groundAddHour},
        ground_add_minute: {key: 'groundAddMinute', value: groundAddMinute},
        air_all_hour: {key: 'airAllHour', value: airAllHour},
        air_all_minute: {key: 'airAllMinute', value: airAllMinute},
        air_big_hour: {key: 'airBigHour', value: airBigHour},
        air_big_minute: {key: 'airBigMinute', value: airBigMinute},
        air_add_hour: {key: 'airAddHour', value: airAddHour},
        air_add_minute: {key: 'airAddMinute', value: airAddMinute},
        total_time_hour: {key: 'totalTimeHour', value: isEmpty(selection) || selection.length === 0 ? 0 : selection[selection.length - 1].totalTimeHour},
        total_time_minute: {key: 'totalTimeMinute', value: isEmpty(selection) || selection.length === 0 ? 0 : selection[selection.length - 1].totalTimeMinute},
        start_time: {key: 'startTime', value: startTime}
      }
    },
    selectionChange (selection) {
      this.selectionC = selection
    },
    addGroundAir (index) {
      let groundHour = isEmpty(this.resume_j9_data[index].groundAllHour) ? 0 : this.resume_j9_data[index].groundAllHour
      let groundMinute = isEmpty(this.resume_j9_data[index].groundAllMinute) ? 0 : this.resume_j9_data[index].groundAllMinute
      let airHour = isEmpty(this.resume_j9_data[index].airAllHour) ? 0 : this.resume_j9_data[index].airAllHour
      let airMinute = isEmpty(this.resume_j9_data[index].airAllMinute) ? 0 : this.resume_j9_data[index].airAllMinute
      groundHour = groundHour > 60 ? 60 : groundHour

      let totalTime = Math.floor((groundHour * 60 + groundMinute) / 5) + airHour * 60 + airMinute
      this.resume_j9_data[index].totalTimeHour = Math.floor(totalTime / 60)
      this.resume_j9_data[index].totalTimeMinute = totalTime % 60
      if (index > 0) {
        let oldNew = this.resume_j9_data[index - 1].totalTimeHour * 60 + this.resume_j9_data[index - 1].totalTimeMinute + totalTime
        this.resume_j9_data[index].totalTimeHour = Math.floor(oldNew / 60)
        this.resume_j9_data[index].totalTimeMinute = oldNew % 60
      }
    },
    handleSummary ({columns, data}) {
      return this.addSelection()
    }
  }
}
</script>
