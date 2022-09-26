
const customer = attrName => ({
  title: '客户列表',
  url: '/Customer/CustomerInfo/Index',
  pageName: 'CustomerInfo',
  attrName
})
const vendor = attrName => ({
  title: '供应商列表',
  url: '/Vendor/VendorInfo/Index',
  pageName: 'VendorInfo',
  attrName
})
const requirement = attrName => ({
  title: '需求列表',
  url: '/Requirement/RequirementInfo/RfqIndex',
  pageName: 'RfqInfo',
  attrName
})
const bom = attrName => ({
  title: '物料清单列表',
  url: '/Requirement/BomInfo/Index',
  pageName: 'BomInfo',
  attrName
})
const sellOrder = attrName => ({
  title: '销售订单列表',
  url: '/Sale/SellOrder/Index',
  pageName: 'SellOrder',
  attrName
})
const purchaseOrder = attrName => ({
  title: '采购订单列表',
  url: '/Purchase/PurchaseOrder/Index',
  pageName: 'PurchaseOrder',
  attrName
})
const financePayment = attrName => ({
  title: '付款列表',
  url: '/Finance/FinancePayment/Index',
  pageName: 'FinancePayment',
  attrName
})
const financeReceipt = attrName => ({
  title: '美金收款',
  url: '/Finance/FinanceReceipt/Index',
  pageName: 'FinanceReceipt',
  attrName
})
const financeReceiptRmb = attrName => ({
  title: '人民币收款',
  url: '/Finance/FinanceReceiptRmb/Index',
  pageName: 'FinanceReceiptRmb',
  attrName
})
const invoice = attrName => ({
  title: 'Invoice列表',
  url: '/Finance/Invoice/Index',
  pageName: 'Invoice',
  attrName
})
const sellInvoice = attrName => ({
  title: '销项发票列表',
  url: '/Finance/SellInvoice/Index',
  pageName: 'SellInvoice',
  attrName
})
const stockIn = attrName => ({
  title: '入库列表',
  url: '/Stock/StockInV2/Index',
  pageName: 'StockInV2',
  attrName
})
const stockOut = attrName => ({
  title: '出库列表',
  url: '/Stock/StockOut/Index',
  pageName: 'StockOut',
  attrName
})
const stockItem = attrName => ({
  title: '库存明细',
  url: '/Stock/StockItem/Index',
  pageName: 'StockItem',
  attrName
})
const stockQC = attrName => ({
  title: '质检列表',
  url: '/Stock/QC/Index',
  pageName: 'QC',
  attrName
})
const packing = attrName => ({
  title: '装箱单列表',
  url: '/Stock/PackingV2/Index',
  pageName: 'PackingV2',
  attrName
})
const inspection = attrName => ({
  title: '验货列表',
  url: '/Stock/InspectionInfo/Index',
  pageName: 'InspectionInfo',
  attrName
})

const urls = [
  {
    title: '客户编号',
    start: ['CH', 'CZ'],
    pages: [
      customer('CustomerCode'),
      stockIn('StockInLocationCode'),
      stockItem('BillCode')
    ]
  },
  {
    title: '供应商编号',
    start: ['VH', 'VZ', 'VX'],
    pages: [vendor('VendorCode')]
  },
  {
    title: '需求编号',
    start: ['RF'],
    pages: [requirement('RequirementCode')]
  },
  {
    title: '',
    start: ['BM'],
    pages: [bom('BOMCode')]
  },
  {
    title: '',
    start: ['SO'],
    pages: [sellOrder('SellOrderCode')]
  },
  {
    title: '',
    start: ['PO'],
    pages: [purchaseOrder('PurchaseOrderCode')]
  },
  {
    title: '',
    start: ['PE', 'PZ', 'PD'],
    pages: [packing('PackingCode')]
  },
  {
    title: '',
    start: ['FT'],
    pages: [financePayment('FinancePaymentCode')]
  },
  {
    title: '',
    start: ['FI'],
    pages: [financeReceipt('FinanceReceiptCode')]
  },
  {
    title: '',
    start: ['FR'],
    pages: [financeReceiptRmb('FinanceReceiptCode')]
  },
  {
    title: '',
    start: ['PH'],
    pages: [invoice('InvoiceNo'), packing('PackingCode')]
  },
  {
    title: '',
    start: ['QC'],
    pages: [stockQC('QcCode')]
  },
  {
    title: '',
    start: ['ST'],
    pages: [stockOut('StockOutCode')]
  },
  {
    title: '',
    start: ['FS'],
    pages: [sellInvoice('InvoiceCode')]
  },
  {
    title: '',
    start: ['IR'],
    pages: [inspection('Code')]
  }
]

export default code => {
  const key = code?.match(/([a-z]+)?([A-Z]+).*/)?.[2]
  return urls.find(item => item.start.includes(key))?.pages || []
}