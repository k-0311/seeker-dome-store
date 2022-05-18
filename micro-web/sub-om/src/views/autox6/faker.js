const faker = {
  "PrvNode": [
    {
      "Parent": [
        {
          "Parent": [
            {
              "Parent": [
                {
                  "Parent": [
                    {
                      "Parent": [],
                      "Name": "JYSO220529J",
                      "DataId": "",
                      "NamePlus": "销售订单  JYSO220529J",
                      "EventDate": "2022-05-16",
                      "Type": 1,
                      "SubType": 10,
                      "JumpPageInfo": {
                        "Url": "/Sale/SellOrder/Index?SellOrderCode=JYSO220529J",
                        "PageName": "SellOrder",
                        "ParentId": null,
                        "Params": [
                          {
                            "Key": "SellOrderCode",
                            "Value": "JYSO220529J"
                          }
                        ]
                      }
                    }
                  ],
                  "Name": "JYPR22052UJM",
                  "DataId": "",
                  "NamePlus": "采购申请  JYPR22052UJM",
                  "EventDate": "2022-05-16",
                  "Type": 22,
                  "SubType": 10,
                  "JumpPageInfo": {
                    "Url": "/Purchase/PurchaseOrder/PurchasingRequisition?BillCode=JYPR22052UJM",
                    "PageName": "PurchasingRequisition",
                    "ParentId": null,
                    "Params": [
                      {
                        "Key": "BillCode",
                        "Value": "JYPR22052UJM"
                      }
                    ]
                  }
                }
              ],
              "Name": "JYPO2205596Z",
              "DataId": "",
              "NamePlus": "采购订单  JYPO2205596Z",
              "EventDate": "2022-05-16",
              "Type": 2,
              "SubType": 10,
              "JumpPageInfo": {
                "Url": "/Purchase/PurchaseOrder/Index?PurchaseOrderCode=JYPO2205596Z",
                "PageName": "PurchaseOrder",
                "ParentId": null,
                "Params": [
                  {
                    "Key": "PurchaseOrderCode",
                    "Value": "JYPO2205596Z"
                  }
                ]
              }
            }
          ],
          "Name": "#3a03ddc8-26ea-dcb2-cf8c-1fa6625b12e2",
          "DataId": "3a03ddc8-26ea-dcb2-cf8c-1fa6625b12e2",
          "NamePlus": "到货通知  ",
          "EventDate": "2022-05-16",
          "Type": 30,
          "SubType": 30,
          "JumpPageInfo": {
            "Url": "/Purchase/StockInNotify/Index?DataId=#3a03ddc8-26ea-dcb2-cf8c-1fa6625b12e2",
            "PageName": "StockInNotify",
            "ParentId": null,
            "Params": [
              {
                "Key": "DataId",
                "Value": "#3a03ddc8-26ea-dcb2-cf8c-1fa6625b12e2"
              }
            ]
          }
        }
      ],
      "Name": "JYQC22051JP",
      "DataId": "",
      "NamePlus": "质检  JYQC22051JP",
      "EventDate": "2022-05-16",
      "Type": 32,
      "SubType": 30,
      "JumpPageInfo": {
        "Url": "/Stock/QC/Index?QcCode=JYQC22051JP",
        "PageName": "QC",
        "ParentId": null,
        "Params": [
          {
            "Key": "QcCode",
            "Value": "JYQC22051JP"
          }
        ]
      }
    }
  ],
  "NextNode": [
    {
      "Children": [
        {
          "Children": [
            {
              "Children": [],
              "Name": "JYST2205L9",
              "DataId": "",
              "NamePlus": "出库  JYST2205L9",
              "EventDate": "2022-05-16",
              "Type": 51,
              "SubType": 30,
              "JumpPageInfo": {
                "Url": "/Stock/StockOut/Index?StockOutCode=JYST2205L9",
                "PageName": "StockOut",
                "ParentId": null,
                "Params": [
                  {
                    "Key": "StockOutCode",
                    "Value": "JYST2205L9"
                  }
                ]
              }
            }
          ],
          "Name": "JYPZ2205ZB",
          "DataId": "",
          "NamePlus": "装箱单  JYPZ2205ZB",
          "EventDate": "2022-05-16",
          "Type": 53,
          "SubType": 30,
          "JumpPageInfo": {
            "Url": "/Stock/PackingV2/Index?PackingCode=JYPZ2205ZB",
            "PageName": "PackingV2",
            "ParentId": null,
            "Params": [
              {
                "Key": "PackingCode",
                "Value": "JYPZ2205ZB"
              }
            ]
          }
        }
      ],
      "Name": "CZ D 012784_1",
      "DataId": "",
      "NamePlus": "库存  CZ D 012784_1",
      "EventDate": "2022-05-16",
      "Type": 42,
      "SubType": 30,
      "JumpPageInfo": {
        "Url": "/Stock/StockItem/Index?BillCode=CZ D 012784_1",
        "PageName": "StockItem",
        "ParentId": null,
        "Params": [
          {
            "Key": "BillCode",
            "Value": "CZ D 012784_1"
          }
        ]
      }
    }
  ],
  "Name": "CZ D 012784",
  "DataId": "",
  "NamePlus": "入库  CZ D 012784",
  "EventDate": "2022-05-16",
  "Type": 4,
  "SubType": 30,
  "JumpPageInfo": null
}

export class List {
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

export const getDataList = () => {
  const list = new List(faker)
  return list.getDataList()
}