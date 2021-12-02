<template>
  <Tabs v-model="type" type="card" value="resume_j11" @on-click="changeType">
    <TabPane label="飞机" name="plane">飞机未知</TabPane>
    <TabPane label="左发" name="engine_left">
      <Table stripe :columns="engine_left_columns" :data="engine_left_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右发" name="engine_right">
      <Table stripe :columns="engine_right_columns" :data="engine_right_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="左机匣" name="receiver_left">
      <Table stripe :columns="receiver_left_columns" :data="receiver_left_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id, 'right')">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右机匣" name="receiver_right">
      <Table stripe :columns="receiver_right_columns" :data="receiver_right_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="左小发" name="engine_s_left">
      <Table stripe :columns="engine_s_left_columns" :data="engine_s_left_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右小发" name="engine_s_right">
      <Table stripe :columns="engine_s_right_columns" :data="engine_s_right_data" border height="1000">
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="随机时间" name="random_time">随机时间未知</TabPane>

    <Button type="primary" style="margin-right: 5px;" shape="circle" slot="extra" @click="addRecord">添加</Button>
    <Button type="primary" shape="circle" slot="extra" @click="saveRecord">保存</Button>
  </Tabs>
</template>
<script>
import {addResume, deleteResume} from "@/http/plane_system/base";

export default {
  data() {
    return {
      type: 'engine_left',

      engine_left_columns: [
        {
          title: '日期',
          key: 'engine_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_left_data[params.index].engineDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_left_data[params.index].engineDate = val
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
                value: this.engine_left_data[params.index].engineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_left_data[params.index].engineStartTimes = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSGroundFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSpGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSpGroundFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSpFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSpFlight = val
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
          title: '发动机м+ф状态工作累计（地面м+ф状态工作按100％考虑）（h,min,s）',
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineYsStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineYsStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSpStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSpStateWork = val
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
          title: '发动机全部状态工作累计（地面工作按20％考虑）（h,min）',
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSAllStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_left_data[params.index].engineSpAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSpAllStateWork = val
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
          title: '主循环次数（0-M-0）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_main_cycle',
                  align: 'center',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.engine_left_data[params.index].engineSMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSMainCycle = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_main_cycle',
                  align: 'center',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.engine_left_data[params.index].engineSpMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_left_data[params.index].engineSpMainCycle = val
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
          title: '履历本主管签字',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ],
      engine_left_data: [],
      engine_right_columns: [
        {
          title: '日期',
          key: 'engine_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_right_data[params.index].engineDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_right_data[params.index].engineDate = val
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
                value: this.engine_right_data[params.index].engineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_right_data[params.index].engineStartTimes = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSGroundFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSpGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSpGroundFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSFlight = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSpFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSpFlight = val
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
          title: '发动机м+ф状态工作累计（地面м+ф状态工作按100％考虑）（h,min,s）',
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineYsStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineYsStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSpStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSpStateWork = val
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
          title: '发动机全部状态工作累计（地面工作按20％考虑）（h,min）',
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSAllStateWork = val
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
                    return h('Input', {
                      props: {
                        value: this.engine_right_data[params.index].engineSpAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSpAllStateWork = val
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
          title: '主循环次数（0-M-0）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_main_cycle',
                  align: 'center',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.engine_right_data[params.index].engineSMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSMainCycle = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_main_cycle',
                  align: 'center',
                  render: (h, params) => {
                    return h('InputNumber', {
                      props: {
                        value: this.engine_right_data[params.index].engineSpMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_right_data[params.index].engineSpMainCycle = val
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
          title: '履历本主管签字',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ],
      engine_right_data: [],

      receiver_left_columns: [
        {
          title: '日期',
          key: 'receiver_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.receiver_left_data[params.index].receiverDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_left_data[params.index].receiverDate = val
                }
              },
            })
          }
        },
        {
          title: '外置机匣起动次数',
          key: 'receiver_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.receiver_left_data[params.index].receiverStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_left_data[params.index].receiverStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '外置机匣地面和飞行工作持续时间（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSGroundFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSpGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSpGroundFlight = val
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
          title: '外置机匣飞行工作持续时间（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSpFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSpFlight = val
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
          title: '外置机匣м+ф状态工作累计（地面м+ф状态工作按100％考虑）（h,min,s）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'receiver_ys_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverYsStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverYsStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSpStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSpStateWork = val
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
          title: '外置机匣全部状态工作累计（地面工作按20％考虑）（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSAllStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_left_data[params.index].receiverSpAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_left_data[params.index].receiverSpAllStateWork = val
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
          align: 'center'
        }
      ],
      receiver_left_data: [],
      receiver_right_columns: [
        {
          title: '日期',
          key: 'receiver_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.receiver_right_data[params.index].receiverDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_right_data[params.index].receiverDate = val
                }
              },
            })
          }
        },
        {
          title: '外置机匣起动次数',
          key: 'receiver_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.receiver_right_data[params.index].receiverStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_right_data[params.index].receiverStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '外置机匣地面和飞行工作持续时间（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSGroundFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSpGroundFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSpGroundFlight = val
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
          title: '外置机匣飞行工作持续时间（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSFlight = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSpFlight,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSpFlight = val
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
          title: '外置机匣м+ф状态工作累计（地面м+ф状态工作按100％考虑）（h,min,s）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'receiver_ys_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverYsStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverYsStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSpStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSpStateWork = val
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
          title: '外置机匣全部状态工作累计（地面工作按20％考虑）（h,min）',
          align: 'center',
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'receiver_s_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSAllStateWork = val
                        }
                      },
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('Input', {
                      props: {
                        value: this.receiver_right_data[params.index].receiverSpAllStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_right_data[params.index].receiverSpAllStateWork = val
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
          align: 'center'
        }
      ],
      receiver_right_data: [],

      engine_s_left_columns: [
        {
          title: '日期',
          key: 's_engine_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_s_left_data[params.index].SEngineDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_s_left_data[params.index].SEngineDate = val
                }
              },
            })
          }
        },
        {
          title: '小发起动次数',
          key: 's_engine_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.engine_s_left_data[params.index].sEngineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_s_left_data[params.index].sEngineStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '最后修理之后',
          align: 'center',
          children: [
            {
              title: '起动次数',
              key: 's_engine_last_repair',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_left_data[params.index].sEngineLastRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_left_data[params.index].sEngineLastRepair = val
                    }
                  },
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_last_oil_seal_repair',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_left_data[params.index].sEngineLastOilSealRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_left_data[params.index].sEngineLastOilSealRepair = val
                    }
                  },
                })
              }
            }

          ]
        },
        {
          title: '从开始使用总和',
          align: 'center',
          children: [
            {
              title: '起动次数',
              key: 's_engine_all_start',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_left_data[params.index].sEngineAllStart,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_left_data[params.index].sEngineAllStart = val
                    }
                  },
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_all_oil_seal',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_left_data[params.index].sEngineAllOilSeal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_left_data[params.index].sEngineAllOilSeal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ],
      engine_s_left_data: [],
      engine_s_right_columns: [
        {
          title: '日期',
          key: 's_engine_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_s_right_data[params.index].SEngineDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_s_right_data[params.index].SEngineDate = val
                }
              },
            })
          }
        },
        {
          title: '小发起动次数',
          key: 's_engine_start_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: this.engine_s_right_data[params.index].sEngineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_s_right_data[params.index].sEngineStartTimes = val
                }
              },
            })
          }
        },
        {
          title: '最后修理之后',
          align: 'center',
          children: [
            {
              title: '起动次数',
              key: 's_engine_last_repair',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_right_data[params.index].sEngineLastRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_right_data[params.index].sEngineLastRepair = val
                    }
                  },
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_last_oil_seal_repair',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_right_data[params.index].sEngineLastOilSealRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_right_data[params.index].sEngineLastOilSealRepair = val
                    }
                  },
                })
              }
            }

          ]
        },
        {
          title: '从开始使用总和',
          align: 'center',
          children: [
            {
              title: '起动次数',
              key: 's_engine_all_start',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_right_data[params.index].sEngineAllStart,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_right_data[params.index].sEngineAllStart = val
                    }
                  },
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_all_oil_seal',
              align: 'center',
              render: (h, params) => {
                return h('Input', {
                  props: {
                    value: this.engine_s_right_data[params.index].sEngineAllOilSeal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_right_data[params.index].sEngineAllOilSeal = val
                    }
                  },
                })
              }
            }
          ]
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        }
      ],
      engine_s_right_data: []
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
          if (this.type === "engine_left") {
            this.engine_left_data = res.data
          } else if (this.type === "engine_right") {
            this.engine_right_data = res.data
          } else if (this.type === "receiver_left") {
            this.receiver_left_data = res.data
          } else if (this.type === "receiver_right") {
            this.receiver_right_data = res.data
          } else if (this.type === "engine_s_left") {
            this.engine_s_left_data = res.data
          } else if (this.type === "engine_s_right") {
            this.engine_s_right_data = res.data
          }
        } else {
          this.$Message.error('请求失败');
        }
      })
    },
    changeType(type) {
      this.type = type
      this.getData()
    },
    deleteRecord(id) {
      deleteResume("/plane/deleteResume/" + id).then(res => {
        this.$Message.success('删除成功!')
        this.engine_left_data = []
        this.getData()
      })
    },
    addRecord() {
      if (this.type === "engine_left") {
        this.engine_left_data.push({
          type: 'left',
          planeId: this.$route.query['id'],
          engineStartTimes: null,
          engineSMainCycle: null,
          engineSpMainCycle: null
        })
      } else if (this.type === "engine_right") {
        this.engine_right_data.push({
          type: 'right',
          planeId: this.$route.query['id'],
          engineStartTimes: null,
          engineSMainCycle: null,
          engineSpMainCycle: null
        })
      } else if (this.type === "receiver_left") {
        this.receiver_left_data.push({
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

      if (this.type === "engine_left") {
        data = this.engine_left_data
      } else if (this.type === "engine_right") {
        data = this.engine_right_data
      } else if (this.type === "receiver_left") {
        data = this.receiver_left_data
      } else if (this.type === "receiver_right") {
        data = this.receiver_right_data
      } else if (this.type === "engine_s_left") {
        data = this.engine_s_left_data
      } else if (this.type === "engine_s_right") {
        data = this.engine_s_right_data
      }
      addResume(data).then(res => {
        this.$Message.success('添加成功!')
        this.engine_left_data = []
        this.getData()
      })
    }
  }
}
</script>
