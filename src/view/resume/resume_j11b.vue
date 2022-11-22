<template>
  <Tabs v-model="type" type="card" value="resume_j11b" @on-click="changeType">
    <TabPane label="飞机" name="plane">飞机未知</TabPane>
    <TabPane label="左发" name="engine_left">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="engineSummary"
             stripe :columns="engine_columns" :data="engine_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右发" name="engine_right">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="engineSummary"
             stripe :columns="engine_columns" :data="engine_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="左机匣" name="receiver_left">
      <Table stripe :columns="receiver_columns" :data="receiver_data" border show-summary
             :summary-method="receiverSummary">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id, 'right')">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右机匣" name="receiver_right">
      <Table stripe :columns="receiver_columns" :data="receiver_data" border show-summary
             :summary-method="receiverSummary">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>

    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" shape="circle" slot="extra" @click="saveRecord">保存</Button>
  </Tabs>
</template>
<style>
.ivu-table-cell {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<script>
import {addResume, deleteResume, addResumeEngineB} from "@/http/plane_system/base";
import {addTime} from "@/view/resume/addTime";
import {isEmpty} from "@/view/resume/isEmpty";
import {toMin, toMax, completeDate} from "@/view/resume/timeOperation";

export default {
  data() {
    return {
      type: 'engine_left',
      selectionC: null,

      engine_columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          key: 'selection'
        },
        {
          title: '日期',
          key: 'engine_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_data[params.index].engineDate,
                size: 'small'
              },
              on: {
                'on-change': (val) => {
                  this.engine_data[params.index].engineDate = val
                }
              },
            })
          }
        },
        {
          title: '发动机起动次数',
          key: 'engine_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.engine_data[params.index].engineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_data[params.index].engineStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '发动机地面和飞行工作持续时间 （h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSGroundFlight,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSGroundFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSpGroundFlight,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpGroundFlight = val
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
          title: '发动机飞行工作持续时间（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSFlight,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSpFlight,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpFlight = val
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
          title: '发动机中间+加力状态工作累计（地面中间+加力状态的工作按100%考虑（h，min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSStateWork,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'engine_ys_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineYsStateWork,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineYsStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSpStateWork,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpStateWork = val
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
          title: '发动机全部状态工作时间累计（h，min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSAllStateWork,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSAllStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSpAllStateWork,
                        format: "HH:mm",
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpAllStateWork = val
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
          title: '操作',
          slot: 'operation',
          align: 'center',
          key: 'operation'
        }
      ],
      engine_data: [],

      receiver_columns: [
        {
          title: '日期',
          key: 'receiver_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.receiver_data[params.index].receiverDate,
                size: 'small'
              },
              on: {
                'on-change': (val) => {
                  this.receiver_data[params.index].receiverDate = val
                }
              },
            })
          }
        },
        {
          title: '外置飞机附件传动机匣（JJX-1.00.1960）起动次数',
          key: 'receiver_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.receiver_data[params.index].receiverStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_data[params.index].receiverStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '外置飞机附件传动机匣（JJX-1.00.1960）工作总时间（h，min）',
          key: 'receiver_s_state_work',
          align: 'center',
          render: (h, params) => {
            return h('TimePicker', {
              props: {
                value: this.receiver_data[params.index].receiverSStateWork,
                format: "HH:mm",
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_data[params.index].receiverSStateWork = val
                }
              },
            })
          }
        },
        {
          title: '外置飞机附件传动机匣（JJX-1.00.1960）飞行中工作时间（h，min）',
          key: 'receiver_ys_state_work',
          align: 'center',
          render: (h, params) => {
            return h('TimePicker', {
              props: {
                value: this.receiver_data[params.index].receiverYsStateWork,
                format: "HH:mm",
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_data[params.index].receiverYsStateWork = val
                }
              },
            })
          }
        },
        {
          title: '外置飞机附件传动机匣（JJX-1.00.1960）地面工作时间（h，min）',
          key: 'receiver_sp_state_work',
          align: 'center',
          render: (h, params) => {
            return h('TimePicker', {
              props: {
                value: this.receiver_data[params.index].receiverSpStateWork,
                format: "HH:mm",
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_data[params.index].receiverSpStateWork = val
                }
              },
            })
          }
        }
      ],
      receiver_data: []
    }
  },

  created() {
    this.getData()
  },

  mounted() {
  },

  methods: {
    getData() {
      this.$get(`/plane/getResumeById/${this.$route.query['id']}/${this.type}`).then(res => {
        if (res) {
          if (this.type === "engine_left" || this.type === "engine_right") {
            this.engine_data = res.data
          } else if (this.type === "receiver_left" || this.type === "receiver_right") {
            this.receiver_data = res.data
          }
        } else {
          this.$Message.error('请求失败');
        }
      })
    },
    changeType(type) {
      this.engine_data = []
      this.receiver_data = []

      this.type = type
      this.getData()
    },
    deleteRecord(id) {
      deleteResume("/plane/deleteResume/" + id).then(res => {
        this.$Message.success('删除成功!')
        this.engine_data = []
        this.getData()
      })
    },
    addRecord() {
      if (this.type === "engine_left") {
        this.engine_data.push({
          type: 'left',
          planeId: this.$route.query['id'],
          engineStartTimes: null
        })
      } else if (this.type === "engine_right") {
        this.engine_right_data.push({
          type: 'right',
          planeId: this.$route.query['id'],
          engineStartTimes: null
        })
      } else if (this.type === "receiver_left") {
        this.receiver_data.push({
          type: 'left',
          planeId: this.$route.query['id'],
          receiverStartTimes: null
        })
      } else if (this.type === "receiver_right") {
        this.receiver_right_data.push({
          type: 'right',
          planeId: this.$route.query['id'],
          receiverStartTimes: null
        })
      } else if (this.type === "engine_s_left") {
        this.engine_s_left_data.push({
          type: 'left',
          planeId: this.$route.query['id'],
          sEngineStartTimes: null
        })
      } else if (this.type === "engine_s_right") {
        this.engine_s_right_data.push({
          type: 'right',
          planeId: this.$route.query['id'],
          sEngineStartTimes: null
        })
      }
    },
    saveRecord() {
      let data = []

      if (this.type === "engine_left" || this.type === "engine_right") {
        data = this.engine_data
        data[0].receiverSStateWork = data[0].engineSpGroundFlight
        data[0].receiverYsStateWork = data[0].engineSpFlight
        data[0].receiverSpStateWork = data[0].engineSpGroundFlight
        if (data.length > 0) {
          for (let i = 1; i < data.length; i++) {
            data[i].receiverSStateWork = addTime(data[i].engineSpGroundFlight, data[i - 1].receiverSStateWork)
            data[i].receiverYsStateWork = addTime(data[i].engineSpFlight, data[i - 1].receiverYsStateWork)
            data[i].receiverSpStateWork = data[i].engineSpGroundFlight
          }
        }
        addResumeEngineB(data).then(res => {
          this.$Message.success('添加成功!')
        })
      } else {
        data = this.receiver_data
        addResume(data).then(res => {
          this.$Message.success('添加成功!')
          this.engine_data = []
          this.getData()
        })
      }
    },
    selectionChange(selection) {
      this.selectionC = selection
    },
    engineSummary({columns, data}) {
      return this.addSelection();
    },
    receiverSummary({columns, data}) {
      let receiverStartTimes = 0
      let receiverSStateWork = 0
      let receiverYsStateWork = 0
      let receiverSpStateWork = 0

      for (let i = 0; i < this.receiver_data.length; i++) {
        if (completeDate(new Date(this.receiver_data[i].receiverDate), new Date())) {
          receiverStartTimes += this.receiver_data[i].receiverStartTimes
          receiverSStateWork += toMin(this.receiver_data[i].receiverSStateWork)
          receiverYsStateWork += toMin(this.receiver_data[i].receiverYsStateWork)
          receiverSpStateWork += toMin(this.receiver_data[i].receiverSpStateWork)
        }
      }

      return {
        receiver_date: {key: 'receiver_date', value: '月结'},
        receiver_start_times: {key: 'receiverStartTimes', value: receiverStartTimes},
        receiver_s_state_work: {key: 'receiverSStateWork', value: toMax(receiverSStateWork)},
        receiver_ys_state_work: {key: 'receiverYsStateWork', value: toMax(receiverYsStateWork)},
        receiver_sp_state_work: {key: 'receiverSpStateWork', value: toMax(receiverSpStateWork)},
      }
    },

    addSelection() {
      let selection = this.selectionC

      let engineStartTimes = 0
      let engineSGroundFlight = ''
      let engineSpGroundFlight = ''
      let engineSFlight = ''
      let engineSpFlight = ''
      let engineSStateWork = ''
      let engineYsStateWork = ''
      let engineSpStateWork = ''
      let engineSAllStateWork = ''
      let engineSpAllStateWork = ''

      if (!isEmpty(selection) && selection.length > 0) {
        let len_i = selection.length - 1
        engineSStateWork = selection[len_i].engineSStateWork
        engineYsStateWork = selection[len_i].engineYsStateWork
        engineSpStateWork = selection[len_i].engineSpStateWork
        engineSAllStateWork = selection[len_i].engineSAllStateWork
        engineSpAllStateWork = selection[len_i].engineSpAllStateWork
        for (let i = 0; i < selection.length; i++) {
          engineStartTimes += selection[i].engineStartTimes
          engineSGroundFlight = addTime(engineSGroundFlight, selection[i].engineSGroundFlight, 'hhmm')
          engineSpGroundFlight = addTime(engineSpGroundFlight, selection[i].engineSpGroundFlight, 'hhmm')
          engineSFlight = addTime(engineSFlight, selection[i].engineSFlight, 'hhmm')
          engineSpFlight = addTime(engineSpFlight, selection[i].engineSpFlight, 'hhmm')
        }
      }
      return {
        selection: {key: 'selection', value: ''},
        engine_date: {key: 'engine_date', value: '小结/总结'},
        operation: {key: 'operation', value: ''},
        sign: {key: 'sign', value: ''},
        engine_start_times: {key: 'engineStartTimes', value: engineStartTimes},
        engine_s_ground_flight: {key: 'engineSGroundFlight', value: engineSGroundFlight},
        engine_sp_ground_flight: {key: 'engineSpGroundFlight', value: engineSpGroundFlight},
        engine_s_flight: {key: 'engineSFlight', value: engineSFlight},
        engine_sp_flight: {key: 'engineSpFlight', value: engineSpFlight},
        engine_s_state_work: {key: 'engineSStateWork', value: engineSStateWork},
        engine_ys_state_work: {key: 'engineYsStateWork', value: engineYsStateWork},
        engine_sp_state_work: {key: 'engineSpStateWork', value: engineSpStateWork},
        engine_s_all_state_work: {key: 'engineSAllStateWork', value: engineSAllStateWork},
        engine_sp_all_state_work: {key: 'engineSpAllStateWork', value: engineSpAllStateWork}
      }
    }
  }
}
</script>
