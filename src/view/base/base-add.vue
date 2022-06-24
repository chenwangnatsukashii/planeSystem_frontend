<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">

    <Divider orientation="left">飞机基本情况</Divider>
    <Row>
      <Col span="4">
        <FormItem label="飞机型别" prop="planeType">
          <Select v-model="formValidate.planeType" placeholder="请选择飞机类别">
            <Option value="J11">歼-11</Option>
            <Option value="J11B">歼-11B</Option>
            <Option value="JJ9">歼教-9</Option>
            <Option value="J8">教-8</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11'">
        <FormItem label="在部队编号" prop="atUnitNum">
          <Input v-model="formValidate.atUnitNum" placeholder="请输入在部队编号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11'">
        <FormItem label="飞机机号" prop="plane_num">
          <Input v-model="formValidate.planeNum" placeholder="请输入飞机机号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11'">
        <FormItem label="制造日期" prop="manufacturingDate">
          <DatePicker type="date" placeholder="请选择制造日期" format="yyyy-MM-dd" v-model="formValidate.manufacturingDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11'">
        <FormItem label="垂尾编号" prop="verticalTailNum">
          <Input v-model="formValidate.verticalTailNum" placeholder="请输入垂尾编号"></Input>
        </FormItem>
      </Col>

      <Col span="4" v-show="formValidate.planeType==='J11B'">
        <FormItem label="飞机制造号" prop="planeNum">
          <Input v-model="formValidate.planeNum" placeholder="请输入飞机制造号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11B'">
        <FormItem label="制造厂" prop="factory">
          <Input v-model="formValidate.factory" placeholder="请输入制造厂"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11B'">
        <FormItem label="制造验收日期" prop="manufacturingDate">
          <DatePicker type="date" placeholder="请选择制造验收日期" v-model="formValidate.manufacturingDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J11B'">
        <FormItem label="进厂日期" prop="intoFactoryDate">
          <DatePicker type="date" placeholder="请选择进厂日期" v-model="formValidate.intoFactoryDate"></DatePicker>
        </FormItem>
      </Col>

      <Col span="4" v-show="formValidate.planeType==='JJ9'">
        <FormItem label="制造日期" prop="manufacturingDate">
          <DatePicker type="date" placeholder="请选择制造日期" v-model="formValidate.manufacturingDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='JJ9'">
        <FormItem label="制造号" prop="planeNum">
          <Input v-model="formValidate.planeNum" placeholder="请输入制造号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='JJ9'">
        <FormItem label="机头号" prop="planeNoseNum">
          <Input v-model="formValidate.planeNoseNum" placeholder="请输入机头号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='JJ9'">
        <FormItem label="垂尾编号" prop="verticalTailNum">
          <Input v-model="formValidate.verticalTailNum" placeholder="请输入垂尾编号"></Input>
        </FormItem>
      </Col>

      <Col span="4" v-show="formValidate.planeType==='J8'">
        <FormItem label="制造日期" prop="manufacturingDate">
          <DatePicker type="date" placeholder="请选择制造日期" v-model="formValidate.manufacturingDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J8'">
        <FormItem label="出厂号" prop="planeNum">
          <Input v-model="formValidate.planeNum" placeholder="请输入出厂号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J8'">
        <FormItem label="机头号" prop="planeNoseNum">
          <Input v-model="formValidate.planeNoseNum" placeholder="请输入机头号"></Input>
        </FormItem>
      </Col>
      <Col span="4" v-show="formValidate.planeType==='J8'">
        <FormItem label="垂尾编号" prop="verticalTailNum">
          <Input v-model="formValidate.verticalTailNum" placeholder="请输入垂尾编号"></Input>
        </FormItem>
      </Col>
    </Row>

    <Row v-show="formValidate.planeType==='J11'">
      <Col span="4">
        <FormItem label="进厂日期" prop="intoFactoryDate">
          <DatePicker type="date" placeholder="请选择进厂日期" v-model="formValidate.intoFactoryDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="送修单位" prop="sendUnit">
          <Input v-model="formValidate.sendUnit" placeholder="请输入送修单位"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="部队番号" prop="insititute">
          <Input v-model="formValidate.insititute" placeholder="请输入部队番号"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="修理日期" prop="repairDate">
          <DatePicker type="date" placeholder="请选择修理日期" v-model="formValidate.repairDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="当量飞行小时" prop="flightHours">
          <InputNumber :max="10000" :min="1" :step="0.01" v-model="formValidate.flightHours"></InputNumber>
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='J11'">
      <Col span="4">
        <FormItem label="规定寿命" prop="specifiedLife">
          <Input v-model="formValidate.specifiedLife" placeholder="请输入规定寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="剩余寿命" prop="residualLife">
          <Input v-model="formValidate.residualLife" placeholder="请输入剩余寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总使用寿命" prop="totalLife">
          <Input v-model="formValidate.totalLife" placeholder="请输入总使用寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总起落次数" prop="totalUpDown">
          <InputNumber :max="99999" :min="0" v-model="formValidate.totalUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="已翻修次数" prop="repairNum">
          <InputNumber :max="10000" :min="0" v-model="formValidate.repairNum"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='J11'">
      <Col span="4">
        <FormItem label="日历规定时限" prop="calendarLimitTime">
          <Input v-model="formValidate.calendarLimitTime" placeholder="请输入日历规定时限"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="剩余日历期">
          <InputNumber :max="100" :min="0" v-model="formValidate.remainingCalendarYear" style="width: 65px"></InputNumber>&nbsp;年&nbsp;
          <InputNumber :max="12" :min="0" v-model="formValidate.remainingCalendarMonth" style="width: 65px"></InputNumber>&nbsp;月
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="已使用日历期">
          <InputNumber :max="100" :min="0" v-model="formValidate.usedCalendarYear" style="width: 65px"></InputNumber>&nbsp;年&nbsp;
          <InputNumber :max="12" :min="0" v-model="formValidate.usedCalendarMonth" style="width: 65px"></InputNumber>&nbsp;月
        </FormItem>
      </Col>
    </Row>

    <Row v-show="formValidate.planeType==='J11B'">
      <Col span="4">
        <FormItem label="部队名称" prop="unitNumber">
          <Input v-model="formValidate.unitNumber" placeholder="请输入部队名称"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="部队番号" prop="insititute">
          <Input v-model="formValidate.insititute" placeholder="请输入部队番号"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="部队驻地" prop="garrison">
          <Input v-model="formValidate.garrison" placeholder="请输入部队驻地"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="飞机在部队编号" prop="atUnitNum">
          <Input v-model="formValidate.atUnitNum" placeholder="请输入飞机在部队编号"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="垂尾编号" prop="verticalTailNum">
          <Input v-model="formValidate.verticalTailNum" placeholder="请输入垂尾编号"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='J11B'">
      <Col span="4">
        <FormItem label="从开始使用飞行时间" prop="beginningTime">
          <Input v-model="formValidate.beginningTime" placeholder="请输入从开始使用飞行时间"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="最近一次翻修后飞行时间" prop="lastRefurbishmentTime">
          <Input v-model="formValidate.lastRefurbishmentTime" placeholder="请输入最近一次翻修后飞行时间"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="从开始使用起落次数" prop="totalUpDown">
          <InputNumber :max="10000" :min="0" v-model="formValidate.totalUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="最近一次翻修后起落次数" prop="lastUpDown">
          <InputNumber :max="10000" :min="0" v-model="formValidate.lastUpDown"></InputNumber>次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="已大修次数" prop="repairNum">
          <InputNumber :max="10000" :min="0" v-model="formValidate.repairNum"></InputNumber>次
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='J11B'">
      <Col span="4">
        <FormItem label="规定使用寿命" prop="specifiedLife">
          <Input v-model="formValidate.specifiedLife" placeholder="请输入规定使用寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="进厂时飞机剩余寿命" prop="residualLife">
          <Input v-model="formValidate.residualLife" placeholder="请输入进厂时飞机剩余寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="最近一次大修出厂日期" prop="repairDate">
          <DatePicker type="date" placeholder="请选择最近一次大修出厂日期" v-model="formValidate.repairDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="最近一次大修工厂" prop="sendUnit">
          <Input v-model="formValidate.sendUnit" placeholder="请输入最近一次大修工厂"></Input>
        </FormItem>
      </Col>
    </Row>

    <Row v-show="formValidate.planeType==='JJ9'">
      <Col span="4">
        <FormItem label="进厂时间" prop="intoFactoryDate">
          <DatePicker type="date" placeholder="请选择进厂时间" v-model="formValidate.intoFactoryDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="送修单位" prop="sendUnit">
          <Input v-model="formValidate.sendUnit" placeholder="请输入送修单位"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="已翻修次数" prop="repairNum">
          <InputNumber :max="10000" :min="0" v-model="formValidate.repairNum"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总使用寿命" prop="totalLife">
          <Input v-model="formValidate.totalLife" placeholder="请输入总使用寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="本次使用寿命" prop="thisUsedLife">
          <Input v-model="formValidate.thisUsedLife" placeholder="请输入本次使用寿命"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='JJ9'">
      <Col span="4">
        <FormItem label="剩余寿命" prop="residualLife">
          <Input v-model="formValidate.residualLife" placeholder="请输入剩余寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总起落次数" prop="totalUpDown">
          <InputNumber :max="99999" :min="0" v-model="formValidate.totalUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="本次起落次数" prop="lastUpDown">
          <InputNumber :max="10000" :min="0" v-model="formValidate.lastUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="规定使用时限" prop="specifiedLife">
          <Input v-model="formValidate.specifiedLife" placeholder="请输入规定使用时限"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="部队番号" prop="insititute">
          <Input v-model="formValidate.insititute" placeholder="请输入部队番号"></Input>
        </FormItem>
      </Col>
    </Row>

    <Row v-show="formValidate.planeType==='J8'">
      <Col span="4">
        <FormItem label="进厂时间" prop="intoFactoryDate">
          <DatePicker type="date" placeholder="请选择进厂时间" v-model="formValidate.intoFactoryDate"></DatePicker>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="送修单位" prop="sendUnit">
          <Input v-model="formValidate.sendUnit" placeholder="请输入送修单位"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="已翻修次数" prop="repairNum">
          <InputNumber :max="10000" :min="0" v-model="formValidate.repairNum"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总使用寿命" prop="totalLife">
          <Input v-model="formValidate.totalLife" placeholder="请输入总使用寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="本次使用寿命" prop="thisUsedLife">
          <Input v-model="formValidate.thisUsedLife" placeholder="请输入本次使用寿命"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-show="formValidate.planeType==='J8'">
      <Col span="4">
        <FormItem label="剩余寿命" prop="residualLife">
          <Input v-model="formValidate.residualLife" placeholder="请输入剩余寿命"></Input>
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="总起落次数" prop="totalUpDown">
          <InputNumber :max="99999" :min="0" v-model="formValidate.totalUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="本次起落次数" prop="lastUpDown">
          <InputNumber :max="10000" :min="0" v-model="formValidate.lastUpDown"></InputNumber>&nbsp;次
        </FormItem>
      </Col>
      <Col span="4">
        <FormItem label="规定使用时限" prop="specifiedLife">
          <Input v-model="formValidate.specifiedLife" placeholder="请输入规定使用时限"></Input>
        </FormItem>
      </Col>
    </Row>

    <!--    J11-->
    <Divider orientation="left" v-show="formValidate.planeType==='J11'">АЛ-31Ф 发动机基本情况</Divider>
    <Table :columns="columns_j11_1" :data="data_j11_1" border v-show="formValidate.planeType==='J11'"></Table>
    <Table :columns="columns_j11_2" :data="data_j11_2" :show-header="false" border :span-method="handleSpan1"
           v-show="formValidate.planeType==='J11'"></Table>
    <Table :columns="columns_j11_3" :data="data_j11_3" :show-header="false" border :span-method="handleSpan2"
           v-show="formValidate.planeType==='J11'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11'">ВКА 外置机匣基本情况</Divider>
    <Table :columns="columns_j11_4" :data="data_j11_4" border v-show="formValidate.planeType==='J11'"></Table>
    <Table :columns="columns_j11_5" :data="data_j11_5" :show-header="false" border
           v-show="formValidate.planeType==='J11'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11'">ГТДЭ-117-1-0 起动机基本情况</Divider>
    <Table :columns="columns_j11_6" :data="data_j11_6" border v-show="formValidate.planeType==='J11'"></Table>
    <Table :columns="columns_j11_7" :data="data_j11_7" :show-header="false" border
           v-show="formValidate.planeType==='J11'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11'">综合调节器基本情况</Divider>
    <Table :columns="columns_j11_8" :data="data_j11_8" border v-show="formValidate.planeType==='J11'"></Table>

    <!--    J11B-->
    <Divider orientation="left" v-show="formValidate.planeType==='J11B'">FWS10 发动机基本情况</Divider>
    <Table :columns="columns_j11b_1" :data="data_j11b_1" border v-show="formValidate.planeType==='J11B'"></Table>
    <Table :columns="columns_j11b_2" :data="data_j11b_2" :show-header="false" border
           v-show="formValidate.planeType==='J11B'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11B'">JJX-1 外置机匣基本情况</Divider>
    <Table :columns="columns_j11b_3" :data="data_j11b_3" border v-show="formValidate.planeType==='J11B'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11B'">WQ66B 起动机基本情况</Divider>
    <Table :columns="columns_j11b_4" :data="data_j11b_4" border v-show="formValidate.planeType==='J11B'"></Table>

    <Divider orientation="left" v-show="formValidate.planeType==='J11B'">综合调节器基本情况</Divider>
    <Table :columns="columns_j11b_5" :data="data_j11b_5" border v-show="formValidate.planeType==='J11B'"></Table>

    <!--    JJ9-->
    <Divider orientation="left" v-show="formValidate.planeType==='JJ9'">发动机基本情况</Divider>
    <Table :columns="columns_jj9" :data="data_jj9" border v-show="formValidate.planeType==='JJ9'"></Table>

    <!--    J8-->
    <Divider orientation="left" v-show="formValidate.planeType==='J8'">发动机基本情况</Divider>
    <Table :columns="columns_j8_1" :data="data_j8_1" border v-show="formValidate.planeType==='J8'"></Table>
    <Divider orientation="left" v-show="formValidate.planeType==='J8'">空气发生器基本情况</Divider>
    <Table :columns="columns_j8_2" :data="data_j8_2" border v-show="formValidate.planeType==='J8'"></Table>

    <FormItem style="margin-top: 20px; float: right">
      <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      <Button @click="handleReset" style="margin-left: 8px">重置</Button>
      <Button type="error" @click="exitNow" style="margin-left: 8px">退出</Button>
    </FormItem>
  </Form>
</template>
<style>
/*input[type=text]{*/
/*  color: red;*/
/*}*/
/*.ivu-input-number-input{*/
/*  color: red;*/
/*}*/

</style>
<script>
import {addPlane, updatePlane} from '@/http/plane_system/base'

export default {
  data () {
    let t = this
    return {
      formValidate: {
        'id': null,
        'workNumber': '',
        'planeType': '',
        'unitNumber': '',
        'planeNum': '',
        'planeNoseNum': '',
        'factory': '',
        'atUnitNum': '',
        'manufacturingDate': null,
        'verticalTailNum': '',
        'intoFactoryDate': null,
        'sendUnit': '',
        'insititute': '',
        'garrison': '',
        'beginningTime': '',
        'lastRefurbishmentTime': '',
        'repairDate': null,
        'flightHours': null,
        'specifiedLife': '',
        'residualLife': '',
        'totalLife': '',
        'thisUsedLife': '',
        'totalUpDown': null,
        'lastUpDown': null,
        'repairNum': null,
        'calendarLimitTime': '',
        'remainingCalendarYear': null,
        'remainingCalendarMonth': null,
        'usedCalendarYear': null,
        'usedCalendarMonth': null,
        'engineModel': '',
        'engineRemainingTime': '',
        'engineLeftNum': '',
        'engineRightNum': '',
        'engineLeftTotalWorkHours': '',
        'engineRightTotalWorkHours': '',
        'engineLeftLastRepairTime': '',
        'engineRightLastRepairTime': '',
        'engineLeftExpirationDate': null,
        'engineRightExpirationDate': null,
        'engineLeftOperationalHours': '',
        'engineRightOperationalHours': '',
        'engineLeftMidUpHours': '',
        'engineRightMidUpHours': '',
        'engineLeftMidUpRestHours': '',
        'engineRightMidUpRestHours': '',
        'engineLeftRemainingTime': '',
        'engineRightRemainingTime': '',
        'engineRightTotalServiceLife': '',
        'engineLeftTotalServiceLife': '',
        'engineLeftSpecifiedLife': '',
        'engineRightSpecifiedLife': '',
        'engineLeftResidualLife': '',
        'engineRightResidualLife': '',
        'engineLeftSpStateResidualLife': '',
        'engineRightSpStateResidualLife': '',
        'engineLeftSStateResidualLife': '',
        'engineRightSStateResidualLife': '',
        'engineLeftStartingRemainingLife': null,
        'engineRightStartingRemainingLife': null,
        'engineLeftSpMajorCycles': null,
        'engineRightSpMajorCycles': null,
        'engineLeftSMajorCycles': null,
        'engineRightSMajorCycles': null,
        'engineLeftRepairedTimes': null,
        'engineRightRepairedTimes': null,
        'engineLeftOverhaulFactory': '',
        'engineRightOverhaulFactory': '',
        'engineLeftRepairMakeFactory': '',
        'engineRightRepairMakeFactory': '',
        'engineLeftLastDeliveryDate': null,
        'engineRightLastDeliveryDate': null,
        'engineLeftManufacturingData': null,
        'engineRightManufacturingData': null,
        'engineLeftNine': null,
        'engineRightNine': null,
        'engineLeftOilNum': '',
        'engineRightOilNum': '',
        'engineLeftOilSealDate': null,
        'engineRightOilSealDate': null,
        'engineLeftOilSealDeadline': null,
        'engineRightOilSealDeadline': null,
        'engineLeftFlawDetection': '',
        'engineRightFlawDetection': '',
        'engineLeftNextInspection': '',
        'engineRightNextInspection': '',
        'receiverLeftNum': '',
        'receiverRightNum': '',
        'receiverLeftTotalHours': '',
        'receiverRightTotalHours': '',
        'receiverLeftLastRepairTime': '',
        'receiverRightLastRepairTime': '',
        'receiverLeftRemainingTime': '',
        'receiverRightRemainingTime': '',
        'receiverLeftTotalServiceLife': '',
        'receiverRightTotalServiceLife': '',
        'receiverLeftResidualLife': '',
        'receiverRightResidualLife': '',
        'receiverLeftSpStateResidualLife': '',
        'receiverRightSpStateResidualLife': '',
        'receiverLeftStateResidualLife': '',
        'receiverRightStateResidualLife': '',
        'receiverLeftStartingRemainingLife': null,
        'receiverRightStartingRemainingLife': null,
        'receiverLeftExpirationDate': null,
        'receiverRightExpirationDate': null,
        'receiverLeftManufacturingFactory': '',
        'receiverRightManufacturingFactory': '',
        'receiverLeftManufacturingDate': null,
        'receiverRightManufacturingDate': null,
        'receiverLeftSpecifiedLife': '',
        'receiverRightSpecifiedLife': '',
        'receiverLeftRepairedTimes': null,
        'receiverRightRepairedTimes': null,
        'receiverLeftOverhaulFactory': '',
        'receiverRightOverhaulFactory': '',
        'receiverLeftLastDeliveryDate': null,
        'receiverRightLastDeliveryDate': null,
        'receiverLeftManufactureDate': null,
        'receiverRightManufactureDate': null,
        'starterLeftNum': '',
        'starterRightNum': '',
        'starterLeftSpecifiedLife': null,
        'starterRightSpecifiedLife': null,
        'starterLeftResidualLife': null,
        'starterRightResidualLife': null,
        'starterLeftRenovations': null,
        'starterRightRenovations': null,
        'starterLeftRemainingTime': '',
        'starterRightRemainingTime': '',
        'starterLeftTotalServiceLife': null,
        'starterRightTotalServiceLife': null,
        'starterLeftExpirationDate': null,
        'starterRightExpirationDate': null,
        'starterLeftRepairedTimes': null,
        'starterRightRepairedTimes': null,
        'starterLeftManufacturingFactory': '',
        'starterRightManufacturingFactory': '',
        'starterLeftOverhaulFactory': '',
        'starterRightOverhaulFactory': '',
        'starterLeftLastDeliveryDate': null,
        'starterRightLastDeliveryDate': null,
        'starterLeftManufactureDate': null,
        'starterRightManufactureDate': null,
        'regulatorLeftNum': '',
        'regulatorRightNum': '',
        'regulatorLeftModel': '',
        'regulatorRightModel': '',
        'regulatorLeftRemainingTime': '',
        'regulatorRightRemainingTime': '',
        'regulatorLeftResidualLife': '',
        'regulatorRightResidualLife': '',
        'airGeneratorModel': '',
        'airGeneratorNum': '',
        'airGeneratorStartTimes': null,
        'airGeneratorRepairedTimes': null,
        'airGeneratorSpecifiedStartingTimes': null,
        'airGeneratorOverhaulFactory': '',
        'airGeneratorManufactureDate': null,
        'airGeneratorRemainingTimes': null,
        'airGeneratorRepairTimes': null
      },
      ruleValidate: {
        planeType: [
          {required: true, message: 'The name cannot be empty', trigger: 'blur'}
        ],
        mail: [
          {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
          {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
        ],
        city: [
          {required: true, message: 'Please select the city', trigger: 'change'}
        ],
        interest: [
          {required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change'},
          {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
        ],
        date: [
          {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
        ],
        time: [
          {required: true, type: 'string', message: 'Please select time', trigger: 'change'}
        ],
        desc: [
          {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
          {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
        ]
      },

      columns_j11_1: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'number',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftNum : t.formValidate.engineRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftNum = val
                  } else {
                    t.formValidate.engineRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'engine_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftRemainingTime : t.formValidate.engineRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftRemainingTime = val
                  } else {
                    t.formValidate.engineRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已使用总寿命',
          key: 'engine_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftTotalServiceLife : t.formValidate.engineRightTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftTotalServiceLife = val
                  } else {
                    t.formValidate.engineRightTotalServiceLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '(大修后)规定寿命',
          key: 'engine_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftSpecifiedLife : t.formValidate.engineRightSpecifiedLife,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftSpecifiedLife = val
                  } else {
                    t.formValidate.engineRightSpecifiedLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余寿命',
          key: 'engine_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftResidualLife : t.formValidate.engineRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftResidualLife = val
                  } else {
                    t.formValidate.engineRightResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б＋УБ状态加力剩余寿命',
          key: 'engine_sp_state_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftSpStateResidualLife : t.formValidate.engineRightSpStateResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftSpStateResidualLife = val
                  } else {
                    t.formValidate.engineRightSpStateResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б状态加力剩余寿命',
          key: 'engine_s_state_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftSStateResidualLife : t.formValidate.engineRightSStateResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftSStateResidualLife = val
                  } else {
                    t.formValidate.engineRightSStateResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '起动剩余寿命（次）',
          key: 'engine_starting_remaining_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftStartingRemainingLife : t.formValidate.engineRightStartingRemainingLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftStartingRemainingLife = val
                  } else {
                    t.formValidate.engineRightStartingRemainingLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б＋УБ主循环次数',
          key: 'engine_sp_major_cycles',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftSpMajorCycles : t.formValidate.engineRightSpMajorCycles,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftSpMajorCycles = val
                  } else {
                    t.formValidate.engineRightSpMajorCycles = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б主循环次数',
          key: 'engine_s_major_cycles',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftSMajorCycles : t.formValidate.engineRightSMajorCycles,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftSMajorCycles = val
                  } else {
                    t.formValidate.engineRightSMajorCycles = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'engine_repaired_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftRepairedTimes : t.formValidate.engineRightRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftRepairedTimes = val
                  } else {
                    t.formValidate.engineRightRepairedTimes = val
                  }
                }
              }
            })
          }
        },
        {
          title: '大修工厂',
          key: 'engine_repair_make_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftRepairMakeFactory : t.formValidate.engineRightRepairMakeFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftRepairMakeFactory = val
                  } else {
                    t.formValidate.engineRightRepairMakeFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最后一次交付日期',
          key: 'engine_last_delivery_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftLastDeliveryDate : t.formValidate.engineRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.engineRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11_1: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11_2: [
        {
          key: 'last_time',
          align: 'center',
          width: 250
        },
        {
          width: 70,
          align: 'center',
          key: 'left_right'
        },
        {
          key: 'left_right_time',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftNine : t.formValidate.engineRightNine,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftNine = val
                  } else {
                    t.formValidate.engineRightNine = val
                  }
                }
              }
            })
          }
        },
        {
          width: 500,
          key: 'empty'
        },
        {
          key: 'engine_left_flaw_detection',
          align: 'center'
        },
        {
          key: 'engine_left_flaw_detection_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftFlawDetection,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftFlawDetection = val
                }
              }
            })
          }
        },
        {
          key: 'engine_left_next_inspection',
          align: 'center'
        },
        {
          key: 'engine_left_next_inspection_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftNextInspection,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftNextInspection = val
                }
              }
            })
          }
        }
      ],
      data_j11_2: [
        {
          last_time: '发动机九级篦齿盘涡流探最近一次间',
          left_right: '左',
          engine_left_flaw_detection: '探伤后飞行左发',
          engine_left_next_inspection: '距下次探伤左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11_3: [
        {
          key: 'engine_oil_number',
          align: 'center',
          width: 250
        },
        {
          width: 70,
          align: 'center',
          key: 'left_right'
        },
        {
          width: 140,
          key: 'number_lr_number',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOilNum : t.formValidate.engineRightOilNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOilNum = val
                  } else {
                    t.formValidate.engineRightOilNum = val
                  }
                }
              }
            })
          }
        },
        {
          width: 110,
          align: 'center',
          key: 'oil_seal'
        },
        {
          key: 'oil_seal_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOilSealDate : t.formValidate.engineRightOilSealDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOilSealDate = val
                  } else {
                    t.formValidate.engineRightOilSealDate = val
                  }
                }
              }
            })
          }
        },
        {
          width: 110,
          align: 'center',
          key: 'oil_seal_deadline'
        },
        {
          key: 'oil_seal_deadline_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOilSealDeadline : t.formValidate.engineRightOilSealDeadline,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOilSealDeadline = val
                  } else {
                    t.formValidate.engineRightOilSealDeadline = val
                  }
                }
              }
            })
          }
        },
        {
          key: 'engine_right_flaw_detection',
          align: 'center'
        },
        {
          key: 'engine_right_flaw_detection_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineRightFlawDetection,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineRightFlawDetection = val
                }
              }
            })
          }
        },
        {
          key: 'engine_right_next_inspection',
          align: 'center'
        },
        {
          key: 'engine_right_next_inspection_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineRightNextInspection,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineRightNextInspection = val
                }
              }
            })
          }
        }
      ],
      data_j11_3: [
        {
          engine_oil_number: '发动机滑油牌号',
          left_right: '左',
          oil_seal: '油封日期',
          oil_seal_deadline: '油封期限',
          engine_right_flaw_detection: '探伤后飞行右发',
          engine_right_next_inspection: '距下次探伤右'
        },
        {
          left_right: '右',
          oil_seal: '油封日期',
          oil_seal_deadline: '油封期限'
        }
      ],

      columns_j11_4: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'receiver_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftNum : t.formValidate.receiverRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftNum = val
                  } else {
                    t.formValidate.receiverRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'receiver_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftRemainingTime : t.formValidate.receiverRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftRemainingTime = val
                  } else {
                    t.formValidate.receiverRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已使用总寿命',
          key: 'receiver_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftTotalServiceLife : t.formValidate.receiverRightTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftTotalServiceLife = val
                  } else {
                    t.formValidate.receiverRightTotalServiceLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '(大修后)规定寿命',
          key: 'receiver_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftSpecifiedLife : t.formValidate.receiverRightSpecifiedLife,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftSpecifiedLife = val
                  } else {
                    t.formValidate.receiverRightSpecifiedLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余寿命',
          key: 'receiver_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftResidualLife : t.formValidate.receiverRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftResidualLife = val
                  } else {
                    t.formValidate.receiverRightResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б＋УБ状态加力剩余寿命',
          key: 'receiver_sp_state_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftSpStateResidualLife : t.formValidate.receiverRightSpStateResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftSpStateResidualLife = val
                  } else {
                    t.formValidate.receiverRightSpStateResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: 'Б状态加力剩余寿命',
          key: 'receiver_state_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftStateResidualLife : t.formValidate.receiverRightStateResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftStateResidualLife = val
                  } else {
                    t.formValidate.receiverRightStateResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '起动剩余寿命（次）',
          key: 'receiver_starting_remaining_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftStartingRemainingLife : t.formValidate.receiverRightStartingRemainingLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftStartingRemainingLife = val
                  } else {
                    t.formValidate.receiverRightStartingRemainingLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'repair_time',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftRepairedTimes : t.formValidate.receiverRightRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftRepairedTimes = val
                  } else {
                    t.formValidate.receiverRightRepairedTimes = val
                  }
                }
              }
            })
          }
        },
        {
          title: '翻修制造厂',
          key: 'overhaul_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftOverhaulFactory : t.formValidate.receiverRightOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftOverhaulFactory = val
                  } else {
                    t.formValidate.receiverRightOverhaulFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最后一次交付日期',
          key: 'last_delivery_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftLastDeliveryDate : t.formValidate.receiverRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.receiverRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '出厂日期',
          key: 'last_delivery_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftManufactureDate : t.formValidate.receiverRightManufactureDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftManufactureDate = val
                  } else {
                    t.formValidate.receiverRightManufactureDate = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11_4: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11_5: [
        {
          width: 250,
          key: 'oil_type',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_type_number'
        },
        {
          width: 250,
          key: 'oil_seal_date',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_date_number'
        },
        {
          width: 250,
          key: 'oil_seal_deadline',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_deadline_number'
        }
      ],
      data_j11_5: [
        {
          oil_type: '滑油型号',
          oil_type_number: '',
          oil_seal_date: '油封日期',
          oil_seal_date_number: '',
          oil_seal_deadline: '油封期限',
          oil_seal_deadline_number: ''
        }
      ],

      columns_j11_6: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'starter_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftNum : t.formValidate.starterRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftNum = val
                  } else {
                    t.formValidate.starterRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'starter_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftRemainingTime : t.formValidate.starterRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftRemainingTime = val
                  } else {
                    t.formValidate.starterRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已使用总寿命（次）',
          key: 'starter_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftTotalServiceLife : t.formValidate.starterRightTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftTotalServiceLife = val
                  } else {
                    t.formValidate.starterRightTotalServiceLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '(翻修后)规定寿命（次）',
          key: 'starter_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftSpecifiedLife : t.formValidate.starterRightSpecifiedLife,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftSpecifiedLife = val
                  } else {
                    t.formValidate.starterRightSpecifiedLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余寿命（次）',
          key: 'starter_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftResidualLife : t.formValidate.starterRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftResidualLife = val
                  } else {
                    t.formValidate.starterRightResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'starter_renovations',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftRenovations : t.formValidate.starterRightRenovations,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftRenovations = val
                  } else {
                    t.formValidate.starterRightRenovations = val
                  }
                }
              }
            })
          }
        },
        {
          title: '翻修制造厂',
          key: 'starter_overhaul_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftOverhaulFactory : t.formValidate.starterRightOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftOverhaulFactory = val
                  } else {
                    t.formValidate.starterRightOverhaulFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最后一次交付日期',
          key: 'starter_last_delivery_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftLastDeliveryDate : t.formValidate.starterRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.starterRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '出厂日期',
          key: 'starter_manufacture_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftManufactureDate : t.formValidate.starterRightManufactureDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftManufactureDate = val
                  } else {
                    t.formValidate.starterRightManufactureDate = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11_6: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11_7: [
        {
          width: 250,
          key: 'oil_type',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_type_number',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_date',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_date_number',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_deadline',
          align: 'center'
        },
        {
          width: 250,
          key: 'oil_seal_deadline_number',
          align: 'center'
        }
      ],
      data_j11_7: [
        {
          oil_type: '滑油型号',
          oil_type_number: '',
          oil_seal_date: '油封日期',
          oil_seal_date_number: '',
          oil_seal_deadline: '油封期限',
          oil_seal_deadline_number: ''
        }
      ],

      columns_j11_8: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'regulator_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftNum : t.formValidate.regulatorRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftNum = val
                  } else {
                    t.formValidate.regulatorRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '型号',
          key: 'regulator_model',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftModel : t.formValidate.regulatorRightModel,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftModel = val
                  } else {
                    t.formValidate.regulatorRightModel = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'regulator_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftRemainingTime : t.formValidate.regulatorRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftRemainingTime = val
                  } else {
                    t.formValidate.regulatorRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余寿命',
          key: 'regulator_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftResidualLife : t.formValidate.regulatorRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftResidualLife = val
                  } else {
                    t.formValidate.regulatorRightResidualLife = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11_8: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11b_1: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'number',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftNum : t.formValidate.engineRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftNum = val
                  } else {
                    t.formValidate.engineRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '总工作时间',
          key: 'engine_total_work_hours',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftTotalWorkHours : t.formValidate.engineRightTotalWorkHours,
                // readonly: false,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftTotalWorkHours = val
                  } else {
                    t.formValidate.engineRightTotalWorkHours = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修后工作时间',
          key: 'engine_last_repair_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              class: 'read_only',
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftLastRepairTime : t.formValidate.engineRightLastRepairTime,
                readonly: false,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftLastRepairTime = val
                  } else {
                    t.formValidate.engineRightLastRepairTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '日历期限到期日期',
          key: 'engine_expiration_date',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftExpirationDate : t.formValidate.engineRightExpirationDate,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftExpirationDate = val
                  } else {
                    t.formValidate.engineRightExpirationDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '作战状态剩余工作时间',
          key: 'engine_operational_hours',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOperationalHours : t.formValidate.engineRightOperationalHours,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOperationalHours = val
                  } else {
                    t.formValidate.engineRightOperationalHours = val
                  }
                }
              }
            })
          }
        },
        {
          title: '中间以上状态剩余工作时间',
          key: 'engine_mid_up_hours',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftMidUpHours : t.formValidate.engineRightMidUpHours,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftMidUpHours = val
                  } else {
                    t.formValidate.engineRightMidUpHours = val
                  }
                }
              }
            })
          }
        },
        {
          title: '作战状态的中间以上状态剩余工作时间',
          key: 'engine_mid_up_rest_hours',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftMidUpRestHours : t.formValidate.engineRightMidUpRestHours,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftMidUpRestHours = val
                  } else {
                    t.formValidate.engineRightMidUpRestHours = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余工作时间',
          key: 'engine_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftResidualLife : t.formValidate.engineRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftResidualLife = val
                  } else {
                    t.formValidate.engineRightResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftRepairedTimes : t.formValidate.engineRightRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftRepairedTimes = val
                  } else {
                    t.formValidate.engineRightRepairedTimes = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修工厂',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOverhaulFactory : t.formValidate.engineRightOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOverhaulFactory = val
                  } else {
                    t.formValidate.engineRightOverhaulFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修验收日期',
          key: 'manufacture_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftLastDeliveryDate : t.formValidate.engineRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.engineRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '大修（制造）工厂',
          key: 'engine_repair_make_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftRepairMakeFactory : t.formValidate.engineRightRepairMakeFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftRepairMakeFactory = val
                  } else {
                    t.formValidate.engineRightRepairMakeFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '制造验收日期',
          key: 'manufacture_date',
          align: 'center',
          width: 140,
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftManufacturingData : t.formValidate.engineRightManufacturingData,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftManufacturingData = val
                  } else {
                    t.formValidate.engineRightManufacturingData = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11b_1: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11b_2: [
        {
          width: 805,
          key: 'engine_oil',
          align: 'center'
        },
        {
          width: 805,
          key: 'engine_oil_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.engineLeftOilNum : t.formValidate.engineRightOilNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.engineLeftOilNum = val
                  } else {
                    t.formValidate.engineRightOilNum = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11b_2: [
        {
          engine_oil: '发动机滑油牌号左'
        },
        {
          engine_oil: '发动机滑油牌号右'
        }
      ],

      columns_j11b_3: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'receiver_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftNum : t.formValidate.receiverRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftNum = val
                  } else {
                    t.formValidate.receiverRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '总工作时间',
          key: 'receiver_total_hours',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftTotalHours : t.formValidate.receiverRightTotalHours,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftTotalHours = val
                  } else {
                    t.formValidate.receiverRightTotalHours = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修后工作时间',
          key: 'receiver_last_repair_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftLastRepairTime : t.formValidate.receiverRightLastRepairTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftLastRepairTime = val
                  } else {
                    t.formValidate.receiverRightLastRepairTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余工作时间',
          key: 'receiver_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftRemainingTime : t.formValidate.receiverRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftRemainingTime = val
                  } else {
                    t.formValidate.receiverRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '日历期限到期日期',
          key: 'receiver_expiration_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftExpirationDate : t.formValidate.receiverRightExpirationDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftExpirationDate = val
                  } else {
                    t.formValidate.receiverRightExpirationDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftRepairedTimes : t.formValidate.receiverRightRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftRepairedTimes = val
                  } else {
                    t.formValidate.receiverRightRepairedTimes = val
                  }
                }
              }
            })
          }
        },
        {
          title: '制造工厂',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftManufacturingFactory : t.formValidate.receiverRightManufacturingFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftManufacturingFactory = val
                  } else {
                    t.formValidate.receiverRightManufacturingFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '制造验收日期',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftManufacturingDate : t.formValidate.receiverRightManufacturingDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftManufacturingDate = val
                  } else {
                    t.formValidate.receiverRightManufacturingDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修工厂',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftOverhaulFactory : t.formValidate.receiverRightOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftOverhaulFactory = val
                  } else {
                    t.formValidate.receiverRightOverhaulFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修验收日期',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.receiverLeftLastDeliveryDate : t.formValidate.receiverRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.receiverLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.receiverRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11b_3: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11b_4: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'starter_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftNum : t.formValidate.starterRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftNum = val
                  } else {
                    t.formValidate.starterRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '总起动次数',
          key: 'starter_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftTotalServiceLife : t.formValidate.starterRightTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftTotalServiceLife = val
                  } else {
                    t.formValidate.starterRightTotalServiceLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修后起动次数',
          key: 'starter_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftSpecifiedLife : t.formValidate.starterRightSpecifiedLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftSpecifiedLife = val
                  } else {
                    t.formValidate.starterRightSpecifiedLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余起动次数',
          key: 'starter_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftResidualLife : t.formValidate.starterRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftResidualLife = val
                  } else {
                    t.formValidate.starterRightResidualLife = val
                  }
                }
              }
            })
          }
        },
        {
          title: '日历期限到期日期',
          key: 'starter_expiration_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftExpirationDate : t.formValidate.starterRightExpirationDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftExpirationDate = val
                  } else {
                    t.formValidate.starterRightExpirationDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftRepairedTimes : t.formValidate.starterRightRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftRepairedTimes = val
                  } else {
                    t.formValidate.starterRightRepairedTimes = val
                  }
                }
              }
            })
          }
        },
        {
          title: '制造工厂',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftManufacturingFactory : t.formValidate.starterRightManufacturingFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftManufacturingFactory = val
                  } else {
                    t.formValidate.starterRightManufacturingFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '制造验收日期',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftManufactureDate : t.formValidate.starterRightManufactureDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftManufactureDate = val
                  } else {
                    t.formValidate.starterRightManufactureDate = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修工厂',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftOverhaulFactory : t.formValidate.starterRightOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftOverhaulFactory = val
                  } else {
                    t.formValidate.starterRightOverhaulFactory = val
                  }
                }
              }
            })
          }
        },
        {
          title: '最近一次翻修验收日期',
          key: 'manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: params.index === 0 ? t.formValidate.starterLeftLastDeliveryDate : t.formValidate.starterRightLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.starterLeftLastDeliveryDate = val
                  } else {
                    t.formValidate.starterRightLastDeliveryDate = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11b_4: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_j11b_5: [
        {
          title: ' ',
          key: 'left_right',
          width: 70,
          align: 'center'
        },
        {
          title: '号码',
          key: 'regulator_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftNum : t.formValidate.regulatorRightNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftNum = val
                  } else {
                    t.formValidate.regulatorRightNum = val
                  }
                }
              }
            })
          }
        },
        {
          title: '型号',
          key: 'regulator_model',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftModel : t.formValidate.regulatorRightModel,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftModel = val
                  } else {
                    t.formValidate.regulatorRightModel = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'regulator_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftRemainingTime : t.formValidate.regulatorRightRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftRemainingTime = val
                  } else {
                    t.formValidate.regulatorRightRemainingTime = val
                  }
                }
              }
            })
          }
        },
        {
          title: '剩余寿命',
          key: 'regulator_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.index === 0 ? t.formValidate.regulatorLeftResidualLife : t.formValidate.regulatorRightResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  if (params.index === 0) {
                    t.formValidate.regulatorLeftResidualLife = val
                  } else {
                    t.formValidate.regulatorRightResidualLife = val
                  }
                }
              }
            })
          }
        }
      ],
      data_j11b_5: [
        {
          left_right: '左'
        },
        {
          left_right: '右'
        }
      ],

      columns_jj9: [
        {
          title: '型号',
          key: 'engine_model',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineModel,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineModel = val
                }
              }
            })
          }
        },
        {
          title: '号码',
          key: 'engine_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftNum = val
                }
              }
            })
          }
        },
        {
          title: '进厂时剩余工作时间',
          key: 'engine_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineRemainingTime,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineRemainingTime = val
                }
              }
            })
          }
        },
        {
          title: '已使用总寿命',
          key: 'engine_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftTotalServiceLife = val
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'engine_repaired_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.engineLeftRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftRepairedTimes = val
                }
              }
            })
          }
        },
        {
          title: '规定使用时限',
          key: 'engine_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftSpecifiedLife,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftSpecifiedLife = val
                }
              }
            })
          }
        },
        {
          title: '进厂时最近一次翻修后工作时间',
          key: 'engine_last_repair_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftLastRepairTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftLastRepairTime = val
                }
              }
            })
          }
        },
        {
          title: '大修（制造）工厂',
          key: 'after_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftOverhaulFactory = val
                }
              }
            })
          }
        },
        {
          title: '(制造、大修后)出厂日期',
          key: 'after_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: t.formValidate.engineLeftLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftLastDeliveryDate = val
                }
              }
            })
          }
        }
      ],
      data_jj9: [
        {
          total_service_life: 1253
        }
      ],

      columns_j8_1: [
        {
          title: '型号',
          key: 'engine_model',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineModel,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineModel = val
                }
              }
            })
          }
        },
        {
          title: '号码',
          key: 'number',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftNum = val
                }
              }
            })
          }
        },
        {
          title: '剩余日历时限',
          key: 'engine_left_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftRemainingTime = val
                }
              }
            })
          }
        },
        {
          title: '已使用总寿命',
          key: 'engine_total_service_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftTotalServiceLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftTotalServiceLife = val
                }
              }
            })
          }
        },
        {
          title: '翻修后工作时间',
          key: 'engine_remaining_time',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineRemainingTime,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineRemainingTime = val
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'engine_repaired_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.engineLeftRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftRepairedTimes = val
                }
              }
            })
          }
        },
        {
          title: '（大修后）规定寿命',
          key: 'after_specified_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftSpecifiedLife,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftSpecifiedLife = val
                }
              }
            })
          }
        },
        {
          title: '剩余寿命',
          key: 'engine_residual_life',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftResidualLife,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftResidualLife = val
                }
              }
            })
          }
        },
        {
          title: '大修（制造）工厂',
          key: 'engine_repair_make_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.engineLeftRepairMakeFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftRepairMakeFactory = val
                }
              }
            })
          }
        },
        {
          title: '(制造、大修后)出厂日期',
          key: 'engine_last_delivery_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: t.formValidate.engineLeftLastDeliveryDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.engineLeftLastDeliveryDate = val
                }
              }
            })
          }
        }
      ],
      data_j8_1: [{}],

      columns_j8_2: [
        {
          title: '型号',
          key: 'air_generator_model',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.airGeneratorModel,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorModel = val
                }
              }
            })
          }
        },
        {
          title: '号码',
          key: 'air_generator_num',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.airGeneratorNum,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorNum = val
                }
              }
            })
          }
        },
        {
          title: '进厂时总起动次数',
          key: 'air_generator_start_times',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.airGeneratorStartTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorStartTimes = val
                }
              }
            })
          }
        },
        {
          title: '翻修后起动次数',
          key: 'air_generator_repair_times',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.airGeneratorRepairTimes,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorRepairTimes = val
                }
              }
            })
          }
        },
        {
          title: '已翻修次数',
          key: 'air_generator_repaired_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.airGeneratorRepairedTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorRepairedTimes = val
                }
              }
            })
          }
        },
        {
          title: '（大修后）规定起动次数',
          key: 'air_generator_specified_starting_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.airGeneratorSpecifiedStartingTimes,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorSpecifiedStartingTimes = val
                }
              }
            })
          }
        },
        {
          title: '剩余起动次数',
          key: 'air_generator_remaining_times',
          align: 'center',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                value: t.formValidate.airGeneratorRemainingTimes,
                readonly: this.is_read_only,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorRemainingTimes = val
                }
              }
            })
          }
        },
        {
          title: '大修（制造）工厂',
          key: 'air_generator_overhaul_factory',
          align: 'center',
          render: (h, params) => {
            return h('Input', {
              props: {
                value: t.formValidate.airGeneratorOverhaulFactory,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorOverhaulFactory = val
                }
              }
            })
          }
        },
        {
          title: '(制造、大修后)出厂日期',
          key: 'air_generator_manufacture_date',
          align: 'center',
          render: (h, params) => {
            return h('DatePicker', {
              props: {
                value: t.formValidate.airGeneratorManufactureDate,
                size: 'small'
              },
              on: {
                input: (val) => {
                  t.formValidate.airGeneratorManufactureDate = val
                }
              }
            })
          }
        }
      ],
      data_j8_2: [{}],

      // is_read_only: !Object.is(this.formValidate.id, null)
      is_read_only: false
    }
  },

  created: function () {
    if (Object.is(this.$route.query['id'], undefined)) {
      return
    }
    this.$get(`/plane/findPlaneById/${this.$route.query['id']}`).then(res => {
      if (res) {
        this.formValidate = res.data
      } else {
        this.$Message.error('请求失败')
      }
    })
  },

  methods: {
    handleSpan1 ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0 && columnIndex === 0) {
        return [2, 1]
      } else if (rowIndex === 1 && columnIndex === 0) {
        return [0, 0]
      }

      if (rowIndex === 0 && columnIndex >= 3) {
        return [2, 1]
      } else if (rowIndex === 1 && columnIndex >= 3) {
        return [0, 0]
      }
    },
    handleSpan2 ({row, column, rowIndex, columnIndex}) {
      if (rowIndex === 0 && columnIndex === 0) {
        return [2, 1]
      } else if (rowIndex === 1 && columnIndex === 0) {
        return [0, 0]
      }

      if (rowIndex === 0 && columnIndex >= 7) {
        return [2, 1]
      } else if (rowIndex === 1 && columnIndex >= 7) {
        return [0, 0]
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (Object.is(this.formValidate.id, null)) {
            addPlane(this.formValidate).then(res => {
              this.$Message.success('添加成功!')
            })
          } else {
            updatePlane(this.formValidate).then(res => {
              this.$Message.success('保存成功!')
            })
          }
          this.exitNow()
        } else {
          this.$Message.error('非空字段不能为空!')
        }
      })
    },
    exitNow () {
      this.$store.dispatch('delVisitedViews', this.$route)
      this.$router.go(-1)
    },
    handleReset () {
      this.$refs['formValidate'].resetFields()
    }
  }
}
</script>
