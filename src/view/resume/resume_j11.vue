<template>
  <Tabs v-model="type" type="card" value="resume_j11" @on-click="changeType">
    <TabPane label="飞机" name="plane">飞机未知</TabPane>
    <TabPane label="左发" name="engine_left">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="engineSummary" stripe
             :columns="engine_columns" :data="engine_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
      <Button type="primary" style="margin-left: 88.5%;" shape="circle" @click="addBelow">添加</Button>
      <Button type="primary" style="margin-left: 5px;" shape="circle" @click="saveAndClean">保存并清空</Button>
      <Table :show-header="false" stripe :columns="engine_columns_below" :data="engine_data_below" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteBelow(index)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右发" name="engine_right">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="engineSummary" stripe
             :columns="engine_columns" :data="engine_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
      <Button type="primary" style="margin-left: 88.5%;" shape="circle" @click="addBelow">添加</Button>
      <Button type="primary" style="margin-left: 5px;" shape="circle" @click="saveAndClean">保存并清空</Button>
      <Table :show-header="false" stripe :columns="engine_columns_below" :data="engine_data_below" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteBelow(index)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="左机匣" name="receiver_left">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="receiverSummary" stripe
             :columns="receiver_columns" :data="receiver_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右机匣" name="receiver_right">
      <Table @on-selection-change="selectionChange" show-summary :summary-method="receiverSummary" stripe
             :columns="receiver_columns" :data="receiver_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="左小发" name="engine_s_left">
      <Table stripe :columns="engine_s_columns" :data="engine_s_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="右小发" name="engine_s_right">
      <Table stripe :columns="engine_s_columns" :data="engine_s_data" border>
        <template slot-scope="{ row, index }" slot="operation">
          <Button type="error" size="small" @click="deleteRecord(row.id)">删除</Button>
        </template>
      </Table>
    </TabPane>
    <TabPane label="随机时间" name="random_time">随机时间未知</TabPane>

    <Dropdown slot="extra" @on-click="formulaMode" style="margin-right: 5px;">
      <Button type="primary" shape="circle">
        {{ typeName }}
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem name="type1">
          <Poptip trigger="hover" placement="left" content="除五四舍五入">
            <Button>第一种</Button>
          </Poptip>
        </DropdownItem>
        <DropdownItem name="type2">
          <Poptip trigger="hover" placement="left" content="右上角余数">
            <Button>第二种</Button>
          </Poptip>
        </DropdownItem>
        <DropdownItem name="type3">
          <Poptip trigger="hover" placement="left" content="取整法">
            <Button>第三种</Button>
          </Poptip>
        </DropdownItem>
        <DropdownItem name="type4">
          <Poptip trigger="hover" placement="left" content="精确到分钟">
            <Button>第四种</Button>
          </Poptip>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
import {addResume, deleteResume, addResumeEngine} from '@/http/plane_system/base'
import {addTime} from './addTime'
import {isEmpty} from '@/view/resume/isEmpty'
import {toMin, toMax, hms, hm} from './timeOperation'
import _ from 'lodash'

export default {
  data () {
    return {
      type: 'engine_left',
      adjustOld: 0,
      adjustNew: 0,
      typeName: '计算方式',
      selectionC: null,
      formatZTGZ: hms,
      formulaType: '',

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
          width: 130,
          tree: true,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_data[params.index].engineDate,
                size: 'small',
                placement: 'right'
              },
              on: {
                'on-change': (val) => {
                  this.engine_data[params.index].engineDate = val
                }
              }
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
              }
            })
          }
        },
        {
          align: 'center',
          renderHeader: (h, params) => {
            let text = '发动机地面和飞行工作持续时间<br/>（h,min）'
            return h('div', {
              domProps: {
                innerHTML: text
              }
            })
          },
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
                    return h('div', [
                      h('Badge', {
                        style: {
                          float: 'right'
                        },
                        props: {
                          type: 'info',
                          count: Object.is(this.engine_data[params.index].leftMod, undefined) ? 0 : this.engine_data[params.index].leftMod
                        }
                      }),
                      h('TimePicker', {
                        props: {
                          value: this.engine_data[params.index].engineSGroundFlight,
                          format: hm,
                          size: 'small'
                        },
                        on: {
                          input: (val) => {
                            this.engine_data[params.index].engineSGroundFlight = val
                            if (this.formulaType === 'type1' || this.formulaType === 'type4') {
                              this.sGFAndUpdate(params.index)
                            } else if (this.formulaType === 'type2') {
                              this.sGFAndUpdateFor2(params.index)
                            }
                          }
                        }
                      })
                    ])
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Badge', {
                        style: {
                          float: 'right'
                        },
                        props: {
                          type: 'info',
                          count: Object.is(this.engine_data[params.index].rightMod, undefined) ? 0 : this.engine_data[params.index].rightMod
                        }
                      }),
                      h('TimePicker', {
                        props: {
                          value: this.engine_data[params.index].engineSpGroundFlight,
                          format: hm,
                          size: 'small'
                        },
                        on: {
                          input: (val) => {
                            this.engine_data[params.index].engineSpGroundFlight = val
                            if (this.formulaType === 'type1' || this.formulaType === 'type4') {
                              this.spGFAndUpdate(params.index)
                            } else if (this.formulaType === 'type2') {
                              this.spGFAndUpdateFor2(params.index)
                            }
                          }
                        }
                      })
                    ])
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
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSFlight = val
                          if (this.formulaType === 'type1' || this.formulaType === 'type4') {
                            this.sGFAndUpdate(params.index)
                          }
                        }
                      }
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
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpFlight = val
                          if (this.formulaType === 'type1' || this.formulaType === 'type4') {
                            this.spGFAndUpdate(params.index)
                          }
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
          align: 'center',
          renderHeader: (h, params) => {
            let text = '发动机м+ф状态工作累计<br/>（地面м+ф状态工作按100％考虑）<br/>（h,min,s）'
            return h('div', {
              domProps: {
                innerHTML: text
              }
            })
          },
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSStateWork,
                        format: this.formatZTGZ,
                        size: 'small'
                      },
                      on: {
                        // 如果值的变化需要动态计算
                        input: (val) => {
                          this.engine_data[params.index].engineSStateWork = val
                          this.engine_data[params.index].engineSpStateWork = toMax(toMin(val) + toMin(this.engine_data[params.index].engineYsStateWork), this.formatZTGZ)
                        }
                      }
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'engine_ys_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineYsStateWork,
                        format: this.formatZTGZ,
                        size: 'small'
                      },
                      on: {
                        // 如果值的变化需要动态计算
                        input: (val) => {
                          this.engine_data[params.index].engineYsStateWork = val
                          this.engine_data[params.index].engineSpStateWork = toMax(toMin(val) + toMin(this.engine_data[params.index].engineSStateWork), this.formatZTGZ)
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data[params.index].engineSpStateWork,
                        format: this.formatZTGZ,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpStateWork = val
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
          align: 'center',
          renderHeader: (h, params) => {
            let text = '发动机全部状态工作累计<br/>（地面工作按20％考虑）<br/>（h,min）'
            return h('div', {
              domProps: {
                innerHTML: text
              }
            })
          },
          title: '',
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
                        format: hm,
                        size: 'small'
                      }
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
                        format: hm,
                        size: 'small'
                      }
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
                        value: this.engine_data[params.index].engineSMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSMainCycle = val
                        },
                        'on-focus': () => {
                          // 聚焦时记录旧值
                          if (params.index === 0) {
                            this.adjustOld = this.engine_data[params.index].engineSMainCycle
                          } else {
                            this.adjustOld = this.engine_data[params.index].engineSMainCycle - this.engine_data[params.index - 1].engineSMainCycle
                          }
                        },
                        'on-blur': () => {
                          // 失焦时记录新值
                          this.adjustNew = this.engine_data[params.index].engineSMainCycle
                          // 如果没有改变则不更新
                          if (this.adjustOld === this.adjustNew) {
                            return
                          }
                          // 如果不是第一个则需要加上上面的值
                          if (params.index > 0) {
                            this.engine_data[params.index].engineSMainCycle += this.engine_data[params.index - 1].engineSMainCycle
                          }
                          // 变更值的时候需要动态计算下面的值
                          this.adjustBelow12(params.index)
                        }
                      }
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
                        value: this.engine_data[params.index].engineSpMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpMainCycle = val
                        },
                        'on-focus': () => {
                          // 聚焦时记录旧值
                          if (params.index === 0) {
                            this.adjustOld = this.engine_data[params.index].engineSpMainCycle
                          } else {
                            this.adjustOld = this.engine_data[params.index].engineSpMainCycle - this.engine_data[params.index - 1].engineSpMainCycle
                          }
                        },
                        'on-blur': () => {
                          // 失焦时记录新值
                          this.adjustNew = this.engine_data[params.index].engineSpMainCycle
                          // 如果没有改变则不更新
                          if (this.adjustOld === this.adjustNew) {
                            return
                          }
                          // 如果不是第一个则需要加上上面的值
                          if (params.index > 0) {
                            this.engine_data[params.index].engineSpMainCycle += this.engine_data[params.index - 1].engineSpMainCycle
                          }
                          // 变更值的时候需要动态计算下面的值
                          this.adjustBelow13(params.index)
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
          title: '履历本主管签字',
          align: 'center',
          key: 'sign'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center',
          key: 'operation'
        }
      ],
      engine_data: [],
      engine_data_tmp: [],

      engine_columns_below: [
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
          width: 130,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_data_below[params.index].engineDate,
                size: 'small',
                placement: 'top'
              },
              on: {
                'on-change': (val) => {
                  this.engine_data_below[params.index].engineDate = val
                }
              }
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
                value: this.engine_data_below[params.index].engineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_data_below[params.index].engineStartTimes = val
                }
              }
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
                    return h('div', [
                      h('Badge', {
                        style: {
                          float: 'right'
                        },
                        props: {
                          count: Object.is(this.engine_data_below[params.index].leftMod, undefined) ? 0 : this.engine_data_below[params.index].leftMod
                        }
                      }),
                      h('TimePicker', {
                        props: {
                          value: this.engine_data_below[params.index].engineSGroundFlight,
                          format: hm,
                          size: 'small',
                          placement: 'top'
                        },
                        on: {
                          input: (val) => {
                            this.engine_data_below[params.index].engineSGroundFlight = val
                          }
                        }
                      })
                    ])
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Badge', {
                        style: {
                          float: 'right'
                        },
                        props: {
                          count: Object.is(this.engine_data_below[params.index].rightMod, undefined) ? 0 : this.engine_data_below[params.index].rightMod
                        }
                      }),
                      h('TimePicker', {
                        props: {
                          value: this.engine_data_below[params.index].engineSpGroundFlight,
                          format: hm,
                          size: 'small',
                          placement: 'top'
                        },
                        on: {
                          input: (val) => {
                            this.engine_data_below[params.index].engineSpGroundFlight = val
                          }
                        }
                      })
                    ])
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
                        value: this.engine_data_below[params.index].engineSFlight,
                        format: hm,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSFlight = val
                        }
                      }
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
                        value: this.engine_data_below[params.index].engineSpFlight,
                        format: hm,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSpFlight = val
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
          align: 'center',
          renderHeader: (h, params) => {
            let text = '发动机м+ф状态工作累计<br/>（地面м+ф状态工作按100％考虑）<br/>（h,min,s）'
            return h('div', {
              domProps: {
                innerHTML: text
              }
            })
          },
          children: [
            {
              title: '状态',
              align: 'center',
              children: [
                {
                  title: 'Б',
                  key: 'engine_s_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data_below[params.index].engineSStateWork,
                        format: this.formatZTGZ,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSStateWork = val
                          // 如果值的变化需要动态计算
                          if (this.formatZTGZ === hms) {
                            this.engine_data_below[params.index].engineSpStateWork = toMax(toMin(val) + toMin(this.engine_data_below[params.index].engineYsStateWork), 'hhmmss')
                          }
                        }
                      }
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'engine_ys_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data_below[params.index].engineYsStateWork,
                        format: this.formatZTGZ,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineYsStateWork = val
                          // 如果值的变化需要动态计算
                          if (this.formatZTGZ === hms) {
                            this.engine_data_below[params.index].engineSpStateWork = toMax(toMin(val) + toMin(this.engine_data_below[params.index].engineSStateWork), 'hhmmss')
                          }
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'engine_sp_state_work',
                  align: 'center',
                  width: 110,
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data_below[params.index].engineSpStateWork,
                        format: this.formatZTGZ,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSpStateWork = val
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
                    return h('TimePicker', {
                      props: {
                        value: this.engine_data_below[params.index].engineSAllStateWork,
                        format: hm,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSAllStateWork = val
                        }
                      }
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
                        value: this.engine_data_below[params.index].engineSpAllStateWork,
                        format: hm,
                        size: 'small',
                        placement: 'top'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSpAllStateWork = val
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
                        value: this.engine_data_below[params.index].engineSMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data_below[params.index].engineSMainCycle = val
                        }
                      }
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
                        value: this.engine_data_below[params.index].engineSpMainCycle,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.engine_data[params.index].engineSpMainCycle = val
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
          title: '履历本主管签字',
          align: 'center',
          key: 'sign'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center',
          key: 'operation'
        }
      ],
      engine_data_below: [],

      receiver_columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          key: 'selection'
        },
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
              }
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
                value: this.receiver_data[params.index].receiverStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.receiver_data[params.index].receiverStartTimes = val
                }
              }
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
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSGroundFlight,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSGroundFlight = val
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_ground_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSpGroundFlight,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSpGroundFlight = val
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
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSFlight,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSFlight = val
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_flight',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSpFlight,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSpFlight = val
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
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSStateWork = val
                        }
                      }
                    })
                  }
                },
                {
                  title: 'УБ',
                  key: 'receiver_ys_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverYsStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverYsStateWork = val
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSpStateWork,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSpStateWork = val
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
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSAllStateWork,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSAllStateWork = val
                        }
                      }
                    })
                  }
                },
                {
                  title: 'Б+УБ',
                  key: 'receiver_sp_all_state_work',
                  align: 'center',
                  render: (h, params) => {
                    return h('TimePicker', {
                      props: {
                        value: this.receiver_data[params.index].receiverSpAllStateWork,
                        format: hm,
                        size: 'small'
                      },
                      on: {
                        input: (val) => {
                          this.receiver_data[params.index].receiverSpAllStateWork = val
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
          title: '操作',
          slot: 'operation',
          align: 'center',
          key: 'operation'
        }
      ],
      receiver_data: [],

      engine_s_columns: [
        {
          title: '日期',
          key: 's_engine_date',
          align: 'center',
          width: 150,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: this.engine_s_data[params.index].sEngineDate,
                size: 'small'
              },
              on: {
                'on-change': (val) => {
                  this.engine_s_data[params.index].sEngineDate = val
                }
              }
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
                value: this.engine_s_data[params.index].sEngineStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.engine_s_data[params.index].sEngineStartTimes = val
                  this.engine_s_data[params.index].sEngineAllStart = val
                  if (params.index > 0) {
                    this.engine_s_data[params.index].sEngineAllStart = this.engine_s_data[params.index - 1].sEngineAllStart + val
                  }
                }
              }
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
                return h('InputNumber', {
                  props: {
                    value: this.engine_s_data[params.index].sEngineLastRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_data[params.index].sEngineLastRepair = val
                    }
                  }
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_last_oil_seal_repair',
              align: 'center',
              render: (h, params) => {
                return h('InputNumber', {
                  props: {
                    value: this.engine_s_data[params.index].sEngineLastOilSealRepair,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_data[params.index].sEngineLastOilSealRepair = val
                    }
                  }
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
                return h('InputNumber', {
                  props: {
                    value: this.engine_s_data[params.index].sEngineAllStart,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_data[params.index].sEngineAllStart = val
                    }
                  }
                })
              }
            },
            {
              title: '冷转油封启封次数',
              key: 's_engine_all_oil_seal',
              align: 'center',
              render: (h, params) => {
                return h('InputNumber', {
                  props: {
                    value: this.engine_s_data[params.index].sEngineAllOilSeal,
                    size: 'small'
                  },
                  on: {
                    input: (val) => {
                      this.engine_s_data[params.index].sEngineAllOilSeal = val
                    }
                  }
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
      engine_s_data: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.$get(`/plane/getResumeById/${this.$route.query['id']}/${this.type}`).then(res => {
        if (res) {
          if (this.type === 'engine_left' || this.type === 'engine_right') {
            this.engine_data = res.data
          } else if (this.type === 'receiver_left' || this.type === 'receiver_right') {
            this.receiver_data = res.data
          } else if (this.type === 'engine_s_left' || this.type === 'engine_s_right') {
            this.engine_s_data = res.data
            let len = this.engine_s_data.length
            if (len > 0) {
              this.engine_s_data[0].sEngineAllStart = this.engine_s_data[0].sEngineStartTimes
              for (let i = 1; i < len; i++) {
                this.engine_s_data[i].sEngineAllStart = this.engine_s_data[i - 1].sEngineAllStart + this.engine_s_data[i].sEngineStartTimes
              }
            }
          }
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    changeType (type) {
      this.engine_data = []
      this.receiver_data = []
      this.engine_data_below = []

      this.type = type
      this.getData()
    },
    deleteRecord (id) {
      deleteResume('/plane/deleteResume/' + id).then(res => {
        this.$Message.success('删除成功!')
        this.engine_data = []
        this.getData()
      })
    },
    addRecord () {
      if (this.type === 'engine_left' || this.type === 'engine_right') {
        this.engine_data.push({
          type: this.type === 'engine_left' ? 'left' : 'right',
          planeId: this.$route.query['id'],
          engineStartTimes: null,
          engineSMainCycle: null,
          engineSpMainCycle: null,
          engineSpStateWork: ''
        })
      } else if (this.type === 'receiver_left' || this.type === 'receiver_right') {
        this.receiver_data.push({
          type: this.type === 'receiver_left' ? 'left' : 'right',
          planeId: this.$route.query['id'],
          receiverStartTimes: null
        })
      } else if (this.type === 'engine_s_left' || this.type === 'engine_s_right') {
        this.engine_s_data.push({
          type: this.type === 'engine_s_left' ? 'left' : 'right',
          planeId: this.$route.query['id'],
          sEngineStartTimes: null
        })
      }
    },

    addBelow () {
      this.engine_data_below.push({
        type: this.type === 'engine_left' ? 'left' : 'right',
        engineStartTimes: null,
        engineSMainCycle: null,
        engineSpMainCycle: null,
        engineSpStateWork: ''
      })
    },

    deleteBelow (index) {
      this.engine_data_below.splice(index, 1)
      this.$Message.success('删除成功!')
    },

    // 小表格保存并清空
    saveAndClean () {
      let items = {}
      let l_data = this.engine_data.length
      for (let i = 0; i < l_data; i++) {
        items[this.engine_data[i].engineDate] = i
      }

      for (let j = 0; j < this.engine_data_below.length; j++) {
        let date_below = this.engine_data_below[j].engineDate
        if (items.hasOwnProperty(date_below)) {
          let i = items[date_below]
          this.engine_data[i].engineStartTimes += this.engine_data_below[j].engineStartTimes
          this.engine_data[i].engineSGroundFlight = toMax(toMin(this.engine_data[i].engineSGroundFlight) + toMin(this.engine_data_below[j].engineSGroundFlight))
          this.engine_data[i].engineSpGroundFlight = toMax(toMin(this.engine_data[i].engineSpGroundFlight) + toMin(this.engine_data_below[j].engineSpGroundFlight))
          this.engine_data[i].engineSFlight = toMax(toMin(this.engine_data[i].engineSFlight) + toMin(this.engine_data_below[j].engineSFlight))
          this.engine_data[i].engineSpFlight = toMax(toMin(this.engine_data[i].engineSpFlight) + toMin(this.engine_data_below[j].engineSpFlight))
          this.engine_data[i].engineSStateWork = toMax(toMin(this.engine_data[i].engineSStateWork) + toMin(this.engine_data_below[j].engineSStateWork), hms)
          this.engine_data[i].engineYsStateWork = toMax(toMin(this.engine_data[i].engineYsStateWork) + toMin(this.engine_data_below[j].engineYsStateWork), hms)
          this.engine_data[i].engineSpStateWork = toMax(toMin(this.engine_data[i].engineSpStateWork) + toMin(this.engine_data_below[j].engineSpStateWork), hms)

          if (this.formulaType === 'type3') {
            let san1 = toMin(this.engine_data_below[j].engineSGroundFlight)
            let wu1 = toMin(this.engine_data_below[j].engineSFlight)
            let yuShu1 = (san1 - wu1) % 5
            let san2 = toMin(this.engine_data_below[j].engineSpGroundFlight)
            let wu2 = toMin(this.engine_data_below[j].engineSpFlight)
            let yuShu2 = (san2 - wu2) % 5

            if (yuShu1 === 0) {
              this.engine_data[i].engineSAllStateWork = toMax(toMin(this.engine_data[i].engineSAllStateWork) + (san1 - wu1) / 5)
            } else if (yuShu1 < 3) {
              this.engine_data[i].engineSAllStateWork = toMax(toMin(this.engine_data[i].engineSAllStateWork) + Math.floor((san1 - wu1) / 5))
            } else {
              this.engine_data[i].engineSAllStateWork = toMax(toMin(this.engine_data[i].engineSAllStateWork) + Math.ceil((san1 - wu1) / 5))
            }

            if (yuShu2 === 0) {
              this.engine_data[i].engineSpAllStateWork = toMax(toMin(this.engine_data[i].engineSpAllStateWork) + (san1 - wu1) / 5)
            } else if (yuShu2 < 3) {
              this.engine_data[i].engineSpAllStateWork = toMax(toMin(this.engine_data[i].engineSpAllStateWork) + Math.floor((san1 - wu1) / 5))
            } else {
              this.engine_data[i].engineSpAllStateWork = toMax(toMin(this.engine_data[i].engineSpAllStateWork) + Math.ceil((san1 - wu1) / 5))
            }
          } else {
            this.engine_data[i].engineSAllStateWork = toMax(toMin(this.engine_data[i].engineSAllStateWork) + toMin(this.engine_data_below[j].engineSAllStateWork))
            this.engine_data[i].engineSpAllStateWork = toMax(toMin(this.engine_data[i].engineSpAllStateWork) + toMin(this.engine_data_below[j].engineSpAllStateWork))
          }

          this.engine_data[i].engineSMainCycle += this.engine_data_below[j].engineSMainCycle
          this.engine_data[i].engineSpMainCycle += this.engine_data_below[j].engineSpMainCycle
        } else {
          l_data += 1
          items[date_below] = l_data - 1
          this.engine_data.push(this.engine_data_below[j])
        }
      }

      this.engine_data_below = []
      this.$Message.success('保存成功！')
    },
    saveRecord () {
      let data = []

      if (this.type === 'engine_left' || this.type === 'engine_right') {
        data = this.engine_data
      } else if (this.type === 'receiver_left' || this.type === 'receiver_right') {
        data = this.receiver_data
      } else if (this.type === 'engine_s_left' || this.type === 'engine_s_right') {
        data = this.engine_s_data
      }
      if (this.type === 'engine_left' || this.type === 'engine_right') {
        addResumeEngine(data).then(res => {
          this.$Message.success('添加成功!')
          this.engine_data = []
          this.getData()
        })
      } else {
        addResume(data).then(res => {
          this.$Message.success('添加成功!')
          this.engine_data = []
          this.getData()
        })
      }
    },
    adjustBelow12 (index) {
      let len = this.engine_data.length
      ++index
      if (len === index) {
        return
      }
      for (; index < len;) {
        this.engine_data[index].engineSMainCycle += (this.adjustNew - this.adjustOld)
        ++index
      }
    },
    adjustBelow13 (index) {
      let len = this.engine_data.length
      ++index
      if (len === index) {
        return
      }
      for (; index < len;) {
        this.engine_data[index].engineSpMainCycle += (this.adjustNew - this.adjustOld)
        ++index
      }
    },
    formulaMode (type) {
      this.formulaType = type
      this.$get(`/plane/getResumeById/${this.$route.query['id']}/${this.type}`).then(res => {
        if (res) {
          this.engine_data_tmp = res.data
          if (type === 'type1' || type === 'type4') {
            if (type === 'type4') {
              this.typeName = '第四种'
              this.formatZTGZ = hm
              for (let i = 0; i < this.engine_data_tmp.length; i++) {
                let timeSplit1 = this.engine_data_tmp[i].engineSStateWork.split(':')
                let timeSplit2 = this.engine_data_tmp[i].engineYsStateWork.split(':')
                this.engine_data_tmp[i].engineSStateWork = timeSplit1[0] + ':' + timeSplit1[1]
                this.engine_data_tmp[i].engineYsStateWork = timeSplit2[0] + ':' + timeSplit2[1]
                this.engine_data_tmp[i].engineSpStateWork = toMax(toMin(this.engine_data_tmp[i].engineSStateWork) + toMin(this.engine_data_tmp[i].engineYsStateWork), hm)
              }
            } else if (type === 'type1') {
              this.typeName = '第一种'
              this.formatZTGZ = hms
            }

            for (let i = 0; i < this.engine_data_tmp.length; i++) {
              if (i === 0) {
                this.engine_data_tmp[i].engineSAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSGroundFlight) - toMin(this.engine_data_tmp[i].engineSFlight)) / 5) +
                  toMin(this.engine_data_tmp[i].engineSFlight), hm)
                this.engine_data_tmp[i].engineSpAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSpGroundFlight) - toMin(this.engine_data_tmp[i].engineSpFlight)) / 5) +
                  toMin(this.engine_data_tmp[i].engineSpFlight), hm)
              } else {
                this.engine_data_tmp[i].engineSAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSGroundFlight) - toMin(this.engine_data_tmp[i].engineSFlight)) / 5) +
                  toMin(this.engine_data_tmp[i].engineSFlight) + toMin(this.engine_data_tmp[i - 1].engineSAllStateWork), hm)
                this.engine_data_tmp[i].engineSpAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSpGroundFlight) - toMin(this.engine_data_tmp[i].engineSpFlight)) / 5) +
                  toMin(this.engine_data_tmp[i].engineSpFlight) + toMin(this.engine_data_tmp[i - 1].engineSpAllStateWork), hm)
              }
            }

            this.engine_data = this.engine_data_tmp
          } else if (type === 'type2') {
            this.typeName = '第二种'

            for (let i = 0; i < this.engine_data.length; i++) {
              this.sGroundFlightChangeFor2(i)
              this.spGroundFlightChangeFor2(i)
            }
          } else if (type === 'type3') {
            this.typeName = '第三种'
          }
        } else {
          this.$Message.error('请求失败')
        }
      })
    },
    selectionChange (selection) {
      this.selectionC = selection
    },
    addSelection () {
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
      let engineSMainCycle = 0
      let engineSpMainCycle = 0

      if (!isEmpty(selection) && selection.length > 0) {
        let lenI = selection.length - 1
        engineSStateWork = selection[lenI].engineSStateWork
        engineYsStateWork = selection[lenI].engineYsStateWork
        engineSpStateWork = selection[lenI].engineSpStateWork
        engineSAllStateWork = selection[lenI].engineSAllStateWork
        engineSpAllStateWork = selection[lenI].engineSpAllStateWork
        for (let i = 0; i < selection.length; i++) {
          engineStartTimes += selection[i].engineStartTimes
          engineSGroundFlight = addTime(engineSGroundFlight, selection[i].engineSGroundFlight, 'hhmm')
          engineSpGroundFlight = addTime(engineSpGroundFlight, selection[i].engineSpGroundFlight, 'hhmm')
          engineSFlight = addTime(engineSFlight, selection[i].engineSFlight, 'hhmm')
          engineSpFlight = addTime(engineSpFlight, selection[i].engineSpFlight, 'hhmm')
          engineSMainCycle += selection[i].engineSMainCycle
          engineSpMainCycle += selection[i].engineSpMainCycle
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
        engine_sp_all_state_work: {key: 'engineSpAllStateWork', value: engineSpAllStateWork},
        engine_s_main_cycle: {key: 'engineSMainCycle', value: engineSMainCycle},
        engine_sp_main_cycle: {key: 'engineSpMainCycle', value: engineSpMainCycle}
      }
    },
    addReceiver () {
      let selection = this.selectionC

      let receiverStartTimes = 0
      let receiverSGroundFlight = ''
      let receiverSpGroundFlight = ''
      let receiverSFlight = ''
      let receiverSpFlight = ''
      let receiverSStateWork = ''
      let receiverYsStateWork = ''
      let receiverSpStateWork = ''
      let receiverSAllStateWork = ''
      let receiverSpAllStateWork = ''

      if (!isEmpty(selection) && selection.length > 0) {
        let lenI = selection.length - 1
        receiverSStateWork = selection[lenI].receiverSStateWork
        receiverYsStateWork = selection[lenI].receiverYsStateWork
        receiverSpStateWork = selection[lenI].receiverSpStateWork
        receiverSAllStateWork = selection[lenI].receiverSAllStateWork
        receiverSpAllStateWork = selection[lenI].receiverSpAllStateWork
        for (let i = 0; i < selection.length; i++) {
          receiverStartTimes += selection[i].receiverStartTimes
          receiverSGroundFlight = addTime(receiverSGroundFlight, selection[i].receiverSGroundFlight, 'hhmm')
          receiverSpGroundFlight = addTime(receiverSpGroundFlight, selection[i].receiverSpGroundFlight, 'hhmm')
          receiverSFlight = addTime(receiverSFlight, selection[i].receiverSFlight, 'hhmm')
          receiverSpFlight = addTime(receiverSpFlight, selection[i].receiverSpFlight, 'hhmm')
        }
      }
      return {
        selection: {key: 'selection', value: ''},
        receiver_date: {key: 'receiver_date', value: '小结/总结'},
        operation: {key: 'operation', value: ''},
        sign: {key: 'sign', value: ''},
        receiver_start_times: {key: 'receiverStartTimes', value: receiverStartTimes},
        receiver_s_ground_flight: {key: 'receiverSGroundFlight', value: receiverSGroundFlight},
        receiver_sp_ground_flight: {key: 'receiverSpGroundFlight', value: receiverSpGroundFlight},
        receiver_s_flight: {key: 'receiverSFlight', value: receiverSFlight},
        receiver_sp_flight: {key: 'receiverSpFlight', value: receiverSpFlight},
        receiver_s_state_work: {key: 'receiverSStateWork', value: receiverSStateWork},
        receiver_ys_state_work: {key: 'receiverYsStateWork', value: receiverYsStateWork},
        receiver_sp_state_work: {key: 'receiverSpStateWork', value: receiverSpStateWork},
        receiver_s_all_state_work: {key: 'receiverSAllStateWork', value: receiverSAllStateWork},
        receiver_sp_all_state_work: {key: 'receiverSpAllStateWork', value: receiverSpAllStateWork}
      }
    },

    engineSummary ({columns, data}) {
      return this.addSelection()
    },

    receiverSummary ({columns, data}) {
      return this.addReceiver()
    },

    // 发动机地面和飞行工作持续时间, 十=（三-五）/5+五+上次十
    sGFAndUpdate (i) {
      let oldValue = toMin(this.engine_data[i].engineSAllStateWork)
      this.sGroundFlightChange(i)
      let newValue = toMin(this.engine_data[i].engineSAllStateWork)
      this.updateOtherS(i, newValue - oldValue)
    },

    spGFAndUpdate (i) {
      let oldValue = toMin(this.engine_data[i].engineSpAllStateWork)
      this.spGroundFlightChange(i)
      let newValue = toMin(this.engine_data[i].engineSpAllStateWork)
      this.updateOtherSp(i, newValue - oldValue)
    },

    sGroundFlightChange (i) {
      if (i === 0) {
        this.engine_data[i].engineSAllStateWork = toMax(Math.round((toMin(this.engine_data[i].engineSGroundFlight) - toMin(this.engine_data[i].engineSFlight)) / 5) +
          toMin(this.engine_data[i].engineSFlight), hm)
      } else {
        this.engine_data[i].engineSAllStateWork = toMax(Math.round((toMin(this.engine_data[i].engineSGroundFlight) - toMin(this.engine_data[i].engineSFlight)) / 5) +
          toMin(this.engine_data[i].engineSFlight) + toMin(this.engine_data[i - 1].engineSAllStateWork), hm)
      }
    },

    spGroundFlightChange (i) {
      if (i === 0) {
        this.engine_data_tmp[i].engineSpAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSpGroundFlight) - toMin(this.engine_data_tmp[i].engineSpFlight)) / 5) +
          toMin(this.engine_data_tmp[i].engineSpFlight), hm)
      } else {
        this.engine_data_tmp[i].engineSpAllStateWork = toMax(Math.round((toMin(this.engine_data_tmp[i].engineSpGroundFlight) - toMin(this.engine_data_tmp[i].engineSpFlight)) / 5) +
          toMin(this.engine_data_tmp[i].engineSpFlight) + toMin(this.engine_data_tmp[i - 1].engineSpAllStateWork), hm)
      }
    },

    updateOtherS (i, value) {
      if (i !== this.engine_data.length - 1) {
        for (let j = i + 1; j < this.engine_data.length; j++) {
          this.engine_data[j].engineSAllStateWork = toMax(toMin(this.engine_data[j].engineSAllStateWork) + value, hm)
        }
      }
    },

    updateOtherSp (i, value) {
      if (i !== this.engine_data.length - 1) {
        for (let j = i + 1; j < this.engine_data.length; j++) {
          this.engine_data[j].engineSpAllStateWork = toMax(toMin(this.engine_data[j].engineSpAllStateWork) + value, hm)
        }
      }
    },

    sGFAndUpdateFor2 (i) {
      let oldValue = toMin(this.engine_data[i].engineSAllStateWork)
      this.sGroundFlightChangeFor2(i)
      let newValue = toMin(this.engine_data[i].engineSAllStateWork)
      this.updateOtherS(i, newValue - oldValue)
    },

    sGroundFlightChangeFor2 (i) {
      let minSGF = toMin(this.engine_data[i].engineSGroundFlight)
      let minSF = toMin(this.engine_data[i].engineSFlight)
      if (i === 0) {
        this.engine_data[i].leftMod = (minSGF - minSF) % 5
        this.engine_data[i].engineSAllStateWork = toMax(Math.floor((minSGF - minSF) / 5) + minSF)
      } else {
        let lo = minSGF - minSF + this.engine_data[i - 1].leftMod
        this.engine_data[i].leftMod = lo % 5
        this.engine_data[i].engineSAllStateWork = toMax(Math.floor(lo / 5) + minSF +
          toMin(this.engine_data[i - 1].engineSAllStateWork))
      }
    },

    spGFAndUpdateFor2 (i) {
      let oldValue = toMin(this.engine_data[i].engineSpAllStateWork)
      this.spGroundFlightChangeFor2(i)
      let newValue = toMin(this.engine_data[i].engineSpAllStateWork)
      this.updateOtherSp(i, newValue - oldValue)
    },

    spGroundFlightChangeFor2 (i) {
      let minSGF = toMin(this.engine_data[i].engineSpGroundFlight)
      let minSF = toMin(this.engine_data[i].engineSpFlight)
      if (i === 0) {
        this.engine_data[i].rightMod = (minSGF - minSF) % 5
        this.engine_data[i].engineSpAllStateWork = toMax(Math.floor((minSGF - minSF) / 5) + minSF)
      } else {
        let lo = minSGF - minSF + this.engine_data[i - 1].rightMod
        this.engine_data[i].rightMod = lo % 5
        this.engine_data[i].engineSpAllStateWork = toMax(Math.floor(lo / 5) + minSF +
          toMin(this.engine_data[i - 1].engineSpAllStateWork))
      }
    }

  }
}
</script>
