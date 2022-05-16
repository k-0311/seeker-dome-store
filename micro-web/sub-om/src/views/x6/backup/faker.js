const faker = {
  PrvNode: [{
    Parent: [{
      Parent: [{
        Parent: [{
          Parent: [{
            Parent: [],
            Name: 'JYSO220529E',
            DataId: '',
            NamePlus: '销售订单  JYSO220529E',
            EventDate: '2022-05-13',
            Type: 1,
            SubType: 10,
            JumpPageInfo: {
              Url: '/Sale/SellOrder/Index?SellOrderCode=JYSO220529E',
              PageName: 'SellOrder',
              ParentId: null,
              Params: [{
                Key: 'SellOrderCode',
                Value: 'JYSO220529E'
              }]
            }
          }],
          Name: 'JYPR22052UJF',
          DataId: '',
          NamePlus: '采购申请  JYPR22052UJF',
          EventDate: '2022-05-13',
          Type: 22,
          SubType: 10,
          JumpPageInfo: {
            Url: '/Purchase/PurchaseOrder/PurchasingRequisition?BillCode=JYPR22052UJF',
            PageName: 'PurchasingRequisition',
            ParentId: null,
            Params: [{
              Key: 'BillCode',
              Value: 'JYPR22052UJF'
            }]
          }
        }],
        Name: 'JYPO2205596X',
        DataId: '',
        NamePlus: '采购订单  JYPO2205596X',
        EventDate: '2022-05-13',
        Type: 2,
        SubType: 10,
        JumpPageInfo: {
          Url: '/Purchase/PurchaseOrder/Index?PurchaseOrderCode=JYPO2205596X',
          PageName: 'PurchaseOrder',
          ParentId: null,
          Params: [{
            Key: 'PurchaseOrderCode',
            Value: 'JYPO2205596X'
          }]
        }
      }],
      Name: '#3a03ce32-48b1-bb0d-9ade-2c0d1c36af07',
      DataId: '3a03ce32-48b1-bb0d-9ade-2c0d1c36af07',
      NamePlus: '到货通知',
      EventDate: '2022-05-13',
      Type: 30,
      SubType: 30,
      JumpPageInfo: {
        Url: '/Purchase/StockInNotify/Index?DataId=#3a03ce32-48b1-bb0d-9ade-2c0d1c36af07',
        PageName: 'StockInNotify',
        ParentId: null,
        Params: [{
          Key: 'DataId',
          Value: '#3a03ce32-48b1-bb0d-9ade-2c0d1c36af07'
        }]
      }
    }],
    Name: 'JYQC22051JN',
    DataId: '',
    NamePlus: '质检  JYQC22051JN',
    EventDate: '2022 - 05 - 13',
    Type: 32,
    SubType: 30,
    JumpPageInfo: {
      Url: '/Stock/QC / Index ? QcCode = JYQC22051JN',
      PageName: 'QC',
      ParentId: null,
      Params: [{
        Key: 'QcCode',
        Value: 'JYQC22051JN'
      }]
    }
  }],
  NextNode: [{
    Children: [],
    Name: 'CZ R 012783_1',
    DataId: '',
    NamePlus: '库存  CZ R 012783_1',
    EventDate: '2022 - 05 - 13',
    Type: 42,
    SubType: 30,
    JumpPageInfo: {
      Url: '/Stock/StockItem / Index ? BillCode = CZ R 012783_1',
      PageName: 'StockItem', ParentId: null, Params: [{
        Key: 'BillCode',
        Value: ' CZ R 012783_1'
      }]
    }
  }],
  Name: ' CZ R 012783',
  DataId: '',
  NamePlus: '入库  CZ R 012783',
  EventDate: '2022 - 05 - 13',
  Type: 4,
  SubType: 30,
  JumpPageInfo: null
}

class List {
  constructor(source) {
    this.source = source
  }
  getDataList () {
    this.key = 10000
    this.dataList = []
    this.source.Children = this.source.NextNode
    this.source.Parent = this.source.PrvNode
    this.source.image = '/static/images/triangle.png'
    this.setKey(this.source)
    this.pushDataList(this.source)
    return this.dataList
  }
  pushDataList (data, parent, dir) {
    this.setKey(data)
    this.parse(data, parent, dir)
    if (Array.isArray(data.Children)) {
      data.Children.forEach(child => this.pushDataList(child, data.key, 'right'))
    }
    if (Array.isArray(data.Parent)) {
      data.Parent.forEach(child => this.pushDataList(child, data.key, 'left'))
    }
  }
  parse (data, parent, dir) {
    const jumpInfo = data.JumpPageInfo
    this.dataList.push({
      key: data.key,
      image: data.image,
      title: data.NamePlus,
      date: data.EventDate,
      type: data.Type,
      code: data.Name,
      subType: data.SubType,
      jumpInfo,
      hasLink: jumpInfo && jumpInfo.PageName,
      parent,
      dir
    })
  }
  setKey (data) {
    this.key++
    data.key = 'KEY_' + this.key
  }
}

export const formatList = data => {
  const list = new List(data)
  return list.getDataList()
}

const calcWidth = data => {
  
}