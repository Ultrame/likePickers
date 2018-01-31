// templet/input-templet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pregnant: false,
    birthday: false,
    stature: false,
    weight: false,
    defaultValueA: 0,
    defaultValueB: 0,
    title: '',
    inputting: false,
    inputtingPhone: false,
    marginBottom: '-230px',
    inputDatasA: [],
    inputDatasB: [],
    selectDataA: 0,
    selectDataB: 0,
    startY: 0,
    j: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toInputPhone:function(){
    this.setData({
      inputtingPhone: true
    })
  },
  complete:function(){
    this.setData({
      inputtingPhone: false
    })
  },
  // 控制输入框
  toInput: function (e) {
    var that = this

    var type = e.target.dataset.type
    var defaultValues = e.target.dataset.defaultvalue.split(',')
    var defaultValueA = defaultValues[0]
    var defaultValueB = defaultValues[1]
    if (type == 'pregnant') {
      that.setData({
        pregnant: true,
        birthday: false,
        stature: false,
        weight: false,
        defaultValueA: defaultValueA,
        selectDataA: defaultValueA,
        title: '请选择孕期'

      })
    } else if (type == 'birthday') {
      that.setData({
        birthday: true,
        pregnant: false,
        stature: false,
        weight: false,
        defaultValueA: defaultValueA,
        defaultValueB: defaultValueB,
        selectDataA: defaultValueA,
        selectDataB: defaultValueB,
        title: '请选择出生年月'
      })
    } else if (type == 'stature') {
      that.setData({
        stature: true,
        pregnant: false,
        birthday: false,
        weight: false,
        defaultValueA: defaultValueA,
        selectDataA: defaultValueA,
        title: '请选择身高'
      })
    } else if (type == 'weight') {
      that.setData({
        weight: true,
        pregnant: false,
        birthday: false,
        stature: false,
        defaultValueA: defaultValueA,
        selectDataA: defaultValueA,
        title: '请选择体重'
      })
    }

    var marginBottomValue = parseInt(that.data.marginBottom)
    that.setData({
      inputting: true
    })
    this.initInput(this.data.defaultValueA, 0)
    this.initInput(this.data.defaultValueB, 1)
    var showInput = setInterval(function () {
      if (marginBottomValue < 0) {
        marginBottomValue += 5
        that.setData({
          marginBottom: marginBottomValue + 'px'
        })
      } else {
        clearInterval(showInput)
      }
    }, 1)
  },
  initInput: function (data, num) {
    num = num ? num : false
    var inputDatasA = []
    var inputDatasB = []
    if (data >= 3) {
      var inputData = []
      for (var i = 0; i < 5; i++) {
        var aData = data - 2 + i
        if (aData <= 0) inputData[i] = '-'
        inputData.push(aData)
      }
    } else if (data == 2) {
      inputData = [0, 1, 2, 3, 4]
    } else if (data == 1) {
      inputData = ['-', 0, 1, 2, 3]
    } else if (data == 0) {
      inputData = ['-', '-', 0, 1, 2]
    }
    if (num == 0) {
      this.setData({
        inputDatasA: inputData
      })
    } else if (num == 1) {
      this.setData({
        inputDatasB: inputData
      })
    }
  },
  cancel: function () {
    var that = this
    var marginBottomValue = parseInt(that.data.marginBottom)
    that.setData({
      pregnant: false,
      birthday: false,
      stature: false,
      weight: false,
      inputting: false,
      selectData: []
    })
    var showInput = setInterval(function () {
      if (marginBottomValue >= -230) {
        marginBottomValue -= 5
        that.setData({
          marginBottom: marginBottomValue + 'px'
        })
      } else {
        clearInterval(showInput)
      }
    }, 1)
  },
  confirm: function () {
    if (this.data.pregnant) {
      this.setData({
        pregnantValue: '第' + this.data.selectDataA + '周'
      })
    } else if (this.data.birthday) {
      this.setData({
        birthdayValue: this.data.selectDataA + '-' + this.data.selectDataB
      })
    } else if (this.data.stature) {
      this.setData({
        statureValue: this.data.selectDataA + 'cm'
      })
    } else if (this.data.weight) {
      this.setData({
        weightValue: this.data.selectDataA + 'kg'
      })
    }
    var that = this
    var marginBottomValue = parseInt(that.data.marginBottom)
    var showInput = setInterval(function () {
      if (marginBottomValue >= -230) {
        marginBottomValue -= 5
        that.setData({
          marginBottom: marginBottomValue + 'px',
          inputting: false
        })
      } else {
        clearInterval(showInput)
      }
    }, 1)
  },
  touchStart: function (res) {
    var startY = res.touches[0].pageY
    this.setData({
      startY: startY
    })
  },
  touchMoveA: function (res) {
    var startY = this.data.startY
    var currentY = res.touches[0].pageY
    var moveY = currentY - startY
    var j = this.data.j
    this.moveChangeData(moveY, j, this.data.defaultValueA, 0)
  },
  touchMoveB: function (res) {
    var startY = this.data.startY
    var currentY = res.touches[0].pageY
    var moveY = currentY - startY
    var j = this.data.j
    this.moveChangeData(moveY, j, this.data.defaultValueB, 1)
  },
  moveChangeData: function (moveY, j, data, i) {
    var moveLaterInputData = 0;
    if (moveY > 0 && parseInt(moveY / 10) > j) {
      if (i == 0) {
        if (this.data.defaultValueA > 0) moveLaterInputData = --this.data.defaultValueA
      } else {
        if (this.data.defaultValueB > 0) moveLaterInputData = --this.data.defaultValueB
      }
      this.setData({
        j: ++this.data.j
      })
      console.log(moveLaterInputData)
      this.initInput(moveLaterInputData, i)
    } else if (moveY > 0 && parseInt(moveY / 10) < j) {
      if (i == 0) {
        moveLaterInputData = ++this.data.defaultValueA
      } else {
        moveLaterInputData = ++this.data.defaultValueB
      }
      this.setData({
        j: --this.data.j
      })
      console.log(moveLaterInputData)
      this.initInput(moveLaterInputData, i)
    } else if (moveY < 0 && parseInt(moveY / 10) > j) {
      if (i == 0) {
        if (this.data.defaultValueA > 0) moveLaterInputData = --this.data.defaultValueA
      } else {
        if (this.data.defaultValueB > 0) moveLaterInputData = --this.data.defaultValueB
      }
      this.setData({
        j: ++this.data.j
      })
      console.log(moveLaterInputData)
      this.initInput(moveLaterInputData, i)
    } else if (moveY < 0 && parseInt(moveY / 10) < j) {
      if (i == 0) {
        moveLaterInputData = ++this.data.defaultValueA
      } else {
        moveLaterInputData = ++this.data.defaultValueB
      }
      this.setData({
        j: --this.data.j
      })
      console.log(moveLaterInputData)
      this.initInput(moveLaterInputData, i)
    }
    return moveLaterInputData
  },
  touchEnd: function (res) {
    this.setData({
      selectDataA: this.data.defaultValueA,
      selectDataB: this.data.defaultValueB,
      j: 0
    })
  }
})