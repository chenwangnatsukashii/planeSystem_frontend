<template>
  <div>
    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" style="" shape="circle" slot="extra" @click="saveRecord">保存</Button>
    <Table @on-selection-change="selectionChange" stripe :columns="resume_j9_columns" :data="resume_j9_data" border
           height="1000">
      <template slot-scope="{ row, index }" slot="operation">
        <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import {addResumeNine, deleteResumeNine} from "@/http/plane_system/base";

export default {
  data() {
    return {
      resume_j9_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
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
                        input: (val) => {
                          this.resume_j9_data[params.index].nineDate = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAllHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAllMinute = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundBigHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundBigMinute = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAddHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].groundAddMinute = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAllHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAllMinute = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airBigHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airBigMinute = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAddHour = val
                        }
                      },
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
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.resume_j9_data[params.index].airAddMinute = val
                        }
                      },
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
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j9_data[params.index].totalTimeHour = val
                    }
                  },
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
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.resume_j9_data[params.index].totalTimeMinute = val
                    }
                  },
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
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.resume_j9_data[params.index].startTime = val
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
      resume_j9_data: []
    }
  },

  created() {
    this.getData()
  },

  mounted() {
  },

  methods: {
    getData() {
      this.$get(`/plane/getResumeNineById/${this.$route.query['id']}`).then(res => {
        if (res) {
          this.resume_j9_data = res.data
        } else {
          this.$Message.error('请求失败');
        }
      })
    },
    deleteRecord(id) {
      deleteResumeNine(id).then(res => {
        this.$Message.success('删除成功!')
        this.resume_j9_data = []
        this.getData()
      })
    },
    addRecord() {
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
    saveRecord() {
      addResumeNine(this.resume_j9_data).then(res => {
        this.$Message.success('添加成功!')
        this.resume_j9_data = []
        this.getData()
      })
    },
    selectionChange(selection) {
      console.log(selection.length)
    }
  }
}
</script>
